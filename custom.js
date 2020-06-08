// pseudo-interfejs zawierający metode do rysowania na canvasie
class IMethods {
  draw() {}
  getColor() {}
  setColor() {}
}

// klasa do stworzenia punktu, która dziedziczy po interfejsie IMethods. Posiada 2 metody do kolorowania (parametr w konstruktorze bądź w metodzie draw).
class Point extends IMethods {
  // przypisanie domyślnych wartości
  // gdzie x to wpsołrzędna punktu x
  // y to wspołrzedna punktu y
  // color to kolor (domyślnie jest czarny, można zmienić jego kolor za pomocą funkcji "setColor").
  constructor(x, y, color = "black") {
    super();
    this.x = x;
    this.y = y;
    this.color = color;
  }
  //narysowanie punktu na canvasie, gdzie q to kontekst canvasu, c to kolor
  //(domyślnie jest undefined, żeby nie przypisywał śmieciowe dane do metody strokeStyle/fillStyle)
  draw(q, c = undefined) {
    if (!c) {
      //Jeżeli do metody "draw()" nie przypiszemy koloru, to on pobiera go z konstruktora
      q.fillStyle = this.color;
    } else {
      q.fillStyle = c;
    }
    q.fillRect(this.x, this.y, /*szerokość*/ 10, /*wysokość*/ 10);
  }
  //Getter odpowiedzialny za pobranie koloru punktu
  getColor() {
    return this.color;
  }
  //Setter odpowiedzialny za zmianę koloru punktu
  setColor(value) {
    try {
      this.color = value;
    } catch (e) {
      console.log("Error message while trying to change the color: " + e);
    }
  }
}

// klasa do stworzenia linii dziedzicząca po interfejsie IMethods
class Line extends IMethods {
  // przypisanie domyślnych wartości
  // p1,p2 - obiekty typu Point
  constructor(p1, p2, color = "#000000") {
    super();
    this.p1 = p1;
    this.p2 = p2;
    this.color = color;
  }
  //narysowanie linii na canvasie, gdzie q to kontekst canvasu
  draw(
    q,
    /*opcjonalny parametr - kolor linii przypisany w metodzie, domyślnie jest undefined*/ c = undefined
  ) {
    q.beginPath();
    q.moveTo(this.p1.x, this.p1.y);
    q.lineWidth = 2;
    //Wykorzystaliśmy tutaj skrócony zapis ifa dostępny w javascripcie ("ternary statement" po angielsku).
    c
      ? //Jeżeli podaliśmy jakiś argument (np kolor "white") do parametru metody draw, to wywołuje się ten kawałek, w innym przypadku tamten
        (q.strokeStyle = c)
      : //Pobiera z punktu początkowego kolor (od tego jest właśnie metoda "getColor()") oraz tworzy linię z tym kolorem.
        (q.strokeStyle = this.p1.getColor());
    q.lineTo(this.p2.x, this.p2.y);
    q.closePath();
    q.stroke();
  }
  //Getter odpowiedzialny za pobranie koloru linii
  getColor() {
    return this.color;
  }
  //Setter odpowiedzialny za zmianę koloru linii
  setColor(value) {
    try {
      this.color = value;
    } catch (e) {
      console.log("Error message while trying to change the color: " + e);
    }
  }
}

// klasa służaca do utworzenia okręgu dziedzicząca po interfejsie IMethods
class Circle extends IMethods {
  // przypisanie domyślnych wartości
  // x,y - środek okręgu
  // r - promień
  // color - kolor, domyślnie przyjmuje wartość #000000, czyli czarny
  constructor(x, y, r, color = "#000000") {
    super();
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
  }
  // narysowanie okręgu na canvasie, gdzie q to kontekst canvasu
  draw(q, c = undefined) {
    q.beginPath();
    //Wykorzystaliśmy tutaj skrócony zapis ifa dostępny w javascripcie ("ternary statement" po angielsku).
    c
      ? //Jeżeli podaliśmy jakiś argument (np kolor "white") do parametru metody draw, to wywołuje się ten kawałek, w innym przypadku tamten
        (q.strokeStyle = c)
      : //Pobiera z obiektu kolor.
        (q.strokeStyle = this.color);
    q.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    q.stroke();
  }
  //Getter odpowiedzialny za pobranie koloru okręgu
  getColor() {
    return this.color;
  }
  //Setter odpowiedzialny za zmianę koloru okręgu
  setColor(value) {
    try {
      this.color = value;
    } catch (e) {
      console.log("Error message while trying to change the color: " + e);
    }
  }
}

// klasa służaca do utworzenia wielokątu
class Polygon extends IMethods {
  points = [];
  // przyjmuje listę punktów i za pomocą nich tworzy figurę (jako obiekt).
  constructor(list, color = "#000000") {
    super();
    list.forEach((point) => {
      this.points.push(point);
    });
    this.color = color;
  }
  // narysowanie figury na canvasie, gdzie q to kontekst canvasu
  draw(q, c = undefined) {
    q.beginPath();
    c
      ? //Jeżeli podaliśmy jakiś argument (np kolor "white") do parametru metody draw, to wywołuje się ten kawałek, w innym przypadku tamten
        (q.strokeStyle = c)
      : //Pobiera z obiektu kolor.
        (q.strokeStyle = this.color);
    q.moveTo(this.points[0].x, this.points[0].y);
    for (var i = 1; i < this.points.length; i++) {
      q.lineTo(this.points[i].x, this.points[i].y);
    }
    q.closePath();
    q.stroke();
  }
  //Getter odpowiedzialny za pobranie koloru figury
  getColor() {
    return this.color;
  }
  //Setter odpowiedzialny za zmianę koloru figury
  setColor(value) {
    try {
      this.color = value;
    } catch (e) {
      console.log("Error message while trying to change the color: " + e);
    }
  }
}

// Algorytm służacy do narysowania zewnętrznej otoczki, przyjmujący liste punktów
function Otoczka(punkty) {
  // sortowanie punktów
  const posortowane = punkty.sort((a, b) => a.x - b.x);
  // policzenie wyznacznika z macierzy 3x3
  const wyznacznik = (a, b, c) =>
    a[0] * b[1] * c[2] -
    a[0] * b[2] * c[1] -
    b[0] * a[1] * c[2] +
    b[0] * a[2] * c[1] +
    c[0] * a[1] * b[2] -
    c[0] * a[2] * b[1];

  // funkcja pomocnicza
  const wyznacznikDlaPunktow = (a, b, c) =>
    wyznacznik([a.x, a.y, 1], [b.x, b.y, 1], [c.x, c.y, 1]);

  //funckja służąca do wyznaczenia punktów otoczki
  const getHalf = (first = true) => {
    let punktyOtoczki1 = [posortowane[0], posortowane[1], posortowane[2]];

    // główna pętla naszego algorytmu
    for (let i = 3; i < posortowane.length; i++) {
      let pointer;

      // dodanie punktów na koniec tablicy i zwrócenie jej nowej długości
      punktyOtoczki1.push(posortowane[i]);
      // odejmowanie długości nowej tablicy
      pointer = punktyOtoczki1.length - 1;

      while (pointer >= 2) {
        const endPoint = punktyOtoczki1[pointer];
        const middlePoint = punktyOtoczki1[pointer - 1];
        const startPoint = punktyOtoczki1[pointer - 2];
        // liczymy wyznacznik
        const wynikWyznacznika = wyznacznikDlaPunktow(
          startPoint,
          middlePoint,
          endPoint
        );
        // sprawdzamy wartość wyznacznika i w zalezności od jego wartosci wyrzucamy punkt
        if (first ? wynikWyznacznika > 0 : wynikWyznacznika < 0) {
          punktyOtoczki1 = punktyOtoczki1.filter(
            (i, index) => index !== pointer - 1
          );
        }
        pointer--;
      }
    }
    return punktyOtoczki1;
  };

  // tworzy górną i dolną część otoczki
  const punktyOtoczkiGora = getHalf();
  const punktyOtoczkiDol = getHalf(false);

  // wygenerowanie odcinków które będą tworzyć otoczkę
  punktyOtoczkiGora.reverse();
  const temp = [...punktyOtoczkiDol, ...punktyOtoczkiGora];
  const odcinki = [];

  for (let i = 0; i < temp.length - 1; i++) {
    const a = temp[i];
    const b = temp[i + 1];

    odcinki.push(new Line(a, b));
  }

  return odcinki;
}

// Algorytm służacy do rysowania figur w otoczce przyjmuje jako parametr liste punktów
function Poligony(punkty) {
  // Mapowanie współrzędnych do obiektu typu "Point".
  const punktyToPoints = punkty.map(
    (response) => new Point(response[0] * 3, response[1] * 3)
  );
  // Rysowanie obiektów na canvasie.
  punktyToPoints.forEach((element) => {
    element.draw(q);
  });
  // tworzenie otoczki z punktów zadanych jako parametr funkcji
  const polygon = Otoczka(punktyToPoints);
  // Wyświetlanie tej otoczki na canvasie
  polygon.forEach((element) => {
    element.draw(q);
  });
}

// Algorytm służacy do sprawdzenia punkótw przecięcia odcinków/prostych przyjmuje jako paramter 2 odcinki/proste
function przecieciaOdcinkow(lineA, lineB) {
  // zadeklarowanie prostych
  const p0_x = lineA.p1.x;
  const p0_y = lineA.p1.y;
  const p1_x = lineA.p2.x;
  const p1_y = lineA.p2.y;

  const p2_x = lineB.p1.x;
  const p2_y = lineB.p1.y;
  const p3_x = lineB.p2.x;
  const p3_y = lineB.p2.y;

  // długość odcinka
  let st1_x, st1_y, st2_x, st2_y;

  st1_x = p1_x - p0_x;
  st1_y = p1_y - p0_y;
  st2_x = p3_x - p2_x;
  st2_y = p3_y - p2_y;

  let s, t;
  // odpowiednie działania za pomocą których wiemy, że 2 proste się przecinają
  // źródło: https://stackoverflow.com/questions/9043805/test-if-two-lines-intersect-javascript-function
  s =
    (-st1_y * (p0_x - p2_x) + st1_x * (p0_y - p2_y)) /
    (-st2_x * st1_y + st1_x * st2_y);
  t =
    (st2_x * (p0_y - p2_y) - st2_y * (p0_x - p2_x)) /
    (-st2_x * st1_y + st1_x * st2_y);

  // warunek sprawdzający, czy dwie proste się przecinają (a tak na prawdę sprawdza, czy zmierzają do tego samego miejsca)
  if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
    return {
      koliduje: true, // odpowiedź algorytmu przedstawiony za pomocą booleana (w tym przypadku true).
      punkt: new Point(p0_x + t * st1_x, p0_y + t * st1_y, "green"), // punkt przecięcia się dwóch prostych.
    };
  }
  return {
    koliduje: false, // odpowiedź algorytmu przedstawiony za pomocą booleana (w tym przypadku false).
  };
}
