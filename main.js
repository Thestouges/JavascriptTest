var canvas;
var context;
var arenaSize = 150;
var bullets;
var center;
var bulletspeed = 10;
var bulletsize = 5;

var lines;


function initialize(){
    canvas = document.getElementById('myCanvas');
    context = canvas.getContext("2d");
    context.lineWidth = 1;
    //canvas.addEventListener('click', FireBullet, false);
    window.addEventListener('resize', getCurrentCenter);

    bullets = [];
    lines = [];

    setInterval(redraw, 100);

    addEvent(window, "resize", function(event) {
        console.log('resized');
      });
    //setInterval(alerter, 5000);
}
function alerter(){
    alert("test");
}
function redraw(){
    getCurrentCenter();
    clearCanvas();
    drawArena();
    DrawUpdateBullets();
    DestroyBullets();
    //drawCircle(e);
}

function getCurrentCenter(){
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    center = Victor(canvas.width/2,canvas.height/2);

    //document.getElementById("demo2").innerHTML = canvas.width+","+canvas.height+ ":" + center.toString();

}

function drawArena(){
    context.beginPath();
    context.arc(center.x,center.y,arenaSize+bullets.length*5,0,2*Math.PI);
    context.stroke();
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);

}

function FireBullet(e){
    var mousepos = getMousePos(canvas, e);
    var bullet = new Bullet(center.x,center.y,bulletspeed,Victor(-(center.x - mousepos.x), -(center.y - mousepos.y)));
    var index = bullets.push(bullet);
    //document.getElementById("demo").innerHTML = bullets[index-1].direction.toString()+"<br/>";
    //document.getElementById("demo").innerHTML += e.clientX + "-" + center.x + " : " + e.clientY + "-" + center.y;

    var linetofromcenter = Victor(mousepos.x,mousepos.y);
    lines.push(linetofromcenter);
}

function DrawUpdateBullets(){
    //document.getElementById("demo3").innerHTML = "total: "+ bullets.length + "<br />";

    bullets.forEach(element => {
        
        context.beginPath();
        context.arc(element.position.x,element.position.y,bulletsize,0,2*Math.PI);
        context.stroke();

        element.updatePosition();
        
        //document.getElementById("demo4").innerHTML += element.position + "<br />";
    });

    lines.forEach(element =>{
        context.beginPath();
        context.moveTo(center.x, center.y);
        context.lineTo(element.x, element.y);
        context.stroke();
    });
}

function DestroyBullets(){
    for(var i = 0; i < bullets.length; i++){
        if(bullets[i].position.x < 0 || bullets[i].position.y < 0
            || bullets[i].position.x > canvas.width || bullets[i].position.y > canvas.height){
                bullets.splice(i,1);
                lines.splice(i,1);
            }
    }
}
