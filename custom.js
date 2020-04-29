class IMethods {
  draw() {}
}

class Point extends IMethods {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
  }
  draw(q) {
    q.fillRect(this.x, this.y, 5, 5);
  }
}

class Line extends IMethods {
  constructor(p1, p2) {
    super();
    this.p1 = p1;
    this.p2 = p2;
  }
  draw(q) {
    q.beginPath();
    q.moveTo(this.p1.x, this.p1.y);
    q.lineWidth = 2;
    q.lineTo(this.p2.x, this.p2.y);
    q.closePath();
    q.stroke();
  }
}
class Circle extends IMethods {
  constructor(x, y, r, k1, k2) {
    super();
    this.x = x;
    this.y = y;
    this.r = r;
    this.k1 = k1;
    this.k2 = k2;
  }
  draw(q) {
    q.beginPath();
    q.arc(this.x, this.y, this.r, this.k1, this.k2);
    q.stroke();
  }
}
class Polygon extends IMethods {
  //ten tak zostanie na razie
  constructor(context) {
    super();
    this.context = q;
  }
  draw(p1, p2, p3, p4 = null, p5 = null, p6 = null, p7 = null, p8 = null) {
    let points = [
      [x1, y1],
      [x2, y2],
      [x3, y3],
      [x4, y4],
      [x5, y5],
    ];
    q.beginPath();
    q.moveTo(points[0][0], points[0][1]);
    for (var i = 1; i < points.length; i++) {
      q.lineTo(points[i][0], points[i][1]);
    }
    q.closePath();
    q.stroke();
  }
}
function Otoczka(punkty) {
  const posortowane = punkty.sort((a, b) => a.x - b.x);
  const wyznacznik = (a, b, c) =>
    a[0] * b[1] * c[2] -
    a[0] * b[2] * c[1] -
    b[0] * a[1] * c[2] +
    b[0] * a[2] * c[1] +
    c[0] * a[1] * b[2] -
    c[0] * a[2] * b[1];
  const wyznacznikDlaPunktow = (a, b, c) =>
    wyznacznik([a.x, a.y, 1], [b.x, b.y, 1], [c.x, c.y, 1]);
  const getHalf = (first = true) => {
    let punktyOtoczki1 = [posortowane[0], posortowane[1], posortowane[2]];
    for (let i = 3; i < posortowane.length; i++) {
      let pointer;

      punktyOtoczki1.push(posortowane[i]);
      pointer = punktyOtoczki1.length - 1;

      while (pointer >= 2) {
        const endPoint = punktyOtoczki1[pointer];
        const middlePoint = punktyOtoczki1[pointer - 1];
        const startPoint = punktyOtoczki1[pointer - 2];
        const wynikWyznacznika = wyznacznikDlaPunktow(
          startPoint,
          middlePoint,
          endPoint
        );

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
  const punktyOtoczkiGora = getHalf();
  const punktyOtoczkiDol = getHalf(false);

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
