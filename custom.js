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