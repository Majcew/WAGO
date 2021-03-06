// autorzy Szymon Babula i Krzysztof Dragon

let list = [];
let _x = 0,
  _y = 0;
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
    q.fillRect(this.x - 5, this.y - 5, /*szerokość*/ 10, /*wysokość*/ 10);
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
  //Ustawia nową wartość do współrzędnej x
  setPointX(value) {
    this.x += value;
    this.draw(q);
  }
  //Ustawia nową wartość do współrzędnej y
  setPointY(value) {
    this.y += value;
    this.draw(q);
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
  setPointX(value) {
    this.p1.x += value;
    this.p2.x += value;
    this.draw(q);
  }
  setPointY(value) {
    this.p1.y += value;
    this.p2.y += value;
    this.draw(q);
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
  //Zwraca liste punktów wielokąta
  getPoints() {
    return this.points;
  }
  setPointX(value) {
    this.points.forEach((el) => {
      el.x += value;
    });
    this.draw(q);
  }
  setPointY(value) {
    this.points.forEach((el) => {
      el.y += value;
    });
    this.draw(q);
  }
}

// Musi mieć listę obiektów
function przesun(value) {
  clearCanvas();
  q.translate(300, 300);
  list.forEach((el) => {
    el.setPointX(value);
  });
}

// Musi mieć listę obiektów
function przesun2(value) {
  clearCanvas();
  q.translate(300, 300);
  list.forEach((el) => {
    el.setPointY(value);
  });
}

// Funkcja która próbuje obrócić elementy na canvas
function obrot(value) {
  clearCanvas();
  q.translate(300, 300);
  // Wyznaczanie środka canvasu
  q.rotate((Math.PI / 180) * value);
  //Rysowanie elementów po obrocie.
  list.forEach((el) => {
    el.draw(q);
  });
  //q.strokeRect(600 / 2, 200 / 2, 200, 200);
}

//funkcja czyszcząca canvas
function clearCanvas() {
  can.width = can.width;
}
