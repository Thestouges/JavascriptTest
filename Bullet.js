class Bullet{
    constructor(x, y, speed, vector){
        this.position = Victor(x, y);
        this.speed = speed;
        this.direction = Victor.fromObject(vector).normalize();
    }

    updatePosition(){
        //alert("test");
        //document.getElementById("demo5").innerHTML = "new pos: "+ this.position;
        var vecdir = this.direction;
        vecdir.multiply(Victor(this.speed, this.speed));
        this.position = this.position.add(vecdir);
        this.direction.normalize();
        //this.position = this.position.add(this.direction);
        //document.getElementById("demo5").innerHTML = "new pos: "+ this.direction;

    }
}