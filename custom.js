class IMethods{
    draw()
}

class Point extends IMethods{
  constructor(x,y){
      this.x = x;
      this.y = y;
  }
  draw(q){
      q.fillRect(x,y,1,1);
  }
}

class Line extends IMethods{
    constructor(p1,p2){
        this.p1 = p1;
        this.p2 = p2;
    }
    draw(q) {
        q.beginPath();
        q.moveTo(p1.x,p1.y); 
        q.lineWidth=5;
        q.lineTo(p2.x, p2.y);
        q.closePath();
        q.stroke();
    }
}
class Circle extends IMethods{
    constructor(x,y,r,k1,k2){
        this.x = x;
        this.y = y;
        this.r = r;
        this.k1 = k1;
        this.k2 = k2
    }
    draw(q){
        q.beginPath();
        q.arc(x,y,r,k1,k2);
        q.stroke();
    }
}
class Polygon extends IMethods{ //ten tak zostanie na razie
    constructor(context){
        this.context = q;
    }
    draw(p1,p2,p3,p4=null,p5=null,p6=null,p7=null,p8=null){
        let points = [
            [x1, y1],
            [x2, y2],
            [x3, y3],
            [x4, y4],
            [x5, y5]
            ];
        q.beginPath();
        q.moveTo(points[0][0], points[0][1]);
        for(var i=1; i<points.length; i++){
            q.lineTo(points[i][0],points[i][1]);
        }
        q.closePath();
        q.stroke();
    }
}
function policzOdcinkiOtoczki(punkty) {
  // sortowanie
  const posortowane = punkty.sort((a, b) => a.x - b.x);
  // funckcja liczy wyznacznik 3x3
  const wyznacznik = (a, b, c) => (a[0] * b[1] * c[2]) - (a[0] * b[2] * c[1]) - (b[0]*a[1] * c[2]) + (b[0] * a[2] * c[1]) + (c[0] * a[1] * b[2]) - (c[0] * a[2] * b[1]);
  // pomocniczna funckja
  const wyznacznikDlaPunktow = (a, b, c) => wyznacznik(
    [a.x, a.y, 1],
    [b.x, b.y, 1],
    [c.x, c.y, 1],
  );
  // funkcja do wynzacznia punktów otoczki
  const getHalf = (first = true) => {
    let punktyOtoczki1 = [
      posortowane[0],
      posortowane[1],
      posortowane[2],
    ];

    // algorytm
    for (let i = 3; i < posortowane.length; i++) {
      let pointer;

      punktyOtoczki1.push(posortowane[i]);
      pointer = punktyOtoczki1.length - 1;

      while (pointer >= 2) {
        const endPoint = punktyOtoczki1[pointer];
        const middlePoint = punktyOtoczki1[pointer - 1];
        const startPoint = punktyOtoczki1[pointer - 2];
        // tu liczymy wyznacznik
        const wynikWyznacznika = wyznacznikDlaPunktow(startPoint, middlePoint, endPoint);

        // w zależności od wartosci wyznacznika wurzycamy punkt
        if ( first ? wynikWyznacznika > 0 : wynikWyznacznika < 0 ) {
          punktyOtoczki1 = punktyOtoczki1.filter((i, index) => index !== (pointer - 1));
        }

        pointer--;
      }
    }

    return punktyOtoczki1;
  };

  // generuje górną część otoczki
  const punktyOtoczkiGora = getHalf();
  // generuje dolną część otoczki
  const punktyOtoczkiDol = getHalf(false);

  // na dole pomocniczny kod do wygenerowania odcinków które będą tworzyć otoczkę
  punktyOtoczkiGora.reverse();
  const temp = [...punktyOtoczkiDol, ...punktyOtoczkiGora];
  const odcinki = [];

  for(let i = 0; i < temp.length - 1; i++) {
    const a = temp[i];
    const b = temp[i + 1];

    odcinki.push(new Line(a, b, 'blue'));
  }

  return odcinki;
}