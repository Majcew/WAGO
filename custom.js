class Line
{
    constructor(context){
        this.context = q
    }
    draw(x1,y1,x2,y2) {
        q.beginPath();
        q.moveTo(x1,y1); 
        q.lineWidth=5;
        q.lineTo(x2, y2);
        q.closePath();
        q.stroke();
    }
}
class Circle{
    constructor(context){
        this.context = q;
    }
    draw(x,y,r,k1,k2){
        q.beginPath();
        q.arc(x,y,r,k1,k2);
        q.stroke();
    }
}
class Point{
    constructor(context){
        this.context = q;
    }
    draw(x,y){
        q.fillRect(x,y,2,2);
    }
}
class Polygon{
    constructor(context){
        this.context = q;
    }
    draw(x1,y1,x2,y2,x3,y3,x4,y4,x5,y5){
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