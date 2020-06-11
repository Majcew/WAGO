// Algorytm służacy do narysowania zewnętrznej otoczki, przyjmujący liste punktów
function otoczka(punkty) {
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
function poligony(punkty) {
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

function wielokatWypukly(figura) {
  //Pobieramy listę punktów danego wielokąta.
  const punkty = figura.getPoints();
  //Długość tablicy punktów (potrzebna do pętli for oraz liczenia wyznacznika)
  const dlugosc = punkty.length;
  //Tablica z wyznacznikami 3x3, pomocnicza stała tablica
  const det = [];
  let wynik = true;
  /*Pomocnicza funkcja dla liczenia wyznacznika 3x3
    wyznaczkik przyjmuje 3 punkty oraz liczy w taki sposób
    [a.x, a.y, 1
     b.x, b.y ,1
     c.y, c.y ,1], gdzie a to punkty (a.x, a.y), b to (b.x, b.y) itd.*/
  const wyznacznik = (a, b, c) => {
    return (
      a.x * b.y * 1 +
      a.y * 1 * c.x +
      1 * b.x * c.y -
      1 * b.y * c.x -
      a.y * b.x * 1 -
      a.x * 1 * c.y
    );
  };

  for (let i = 0; i < dlugosc; i++) {
    //Trzy punkty do wyznacznika, jeżeli wszystkie wyznaczniki będą dodatnie to figura jest wypukła
    let punktyDoSprawdzenia = [
      punkty[i % dlugosc],
      punkty[(i + 1) % dlugosc],
      punkty[(i + 2) % dlugosc],
    ];
    //Wynik wyznacznika dodajemy do tablicy
    det.push(
      wyznacznik(
        punktyDoSprawdzenia[0],
        punktyDoSprawdzenia[1],
        punktyDoSprawdzenia[2]
      )
    );
  }
  det.forEach((el) => {
    //Punkty wybieraliśmy według wskazówki zegara, więc ujemny wyznacznik mówi nam, że figura nie jest wypukła
    if (el < 0) {
      wynik = false;
    }
  });
  return wynik;
}

function wielokatProsty(figura) {
  const punkty = figura.getPoints();
  const linie = [];
  let wynik = [];

  //Pushowanie linii do tablicy (wygenerowane za pomocą punktów)
  for (let i = 0; i < punkty.length; i++) {
    if (i === punkty.length - 1) {
      linie.push(new Line(punkty[i], punkty[0]));
    } else {
      linie.push(new Line(punkty[i], punkty[i + 1]));
    }
  }

  for (let i = 0; i < linie.length; i++) {
    if (i === linie.length - 1) {
      wynik.push(przecieciaOdcinkow(linie[i], linie[0]));
    } else {
      wynik.push(przecieciaOdcinkow(linie[i], linie[i + 1]));
    }
  }
  return wynik;
}
