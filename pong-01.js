function main()
{
  console.log("Pong: Main: Start!")

  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;

  var ctx = canvas.getContext("2d");

  //sacar coasas del navegador o ver cosas que maneje el navegador
  window.onkeydown = (event) => {
    //para usar solo tu la tecla que no la utilice el navegadop
    console.log(event.key);
    event.preventDefault();
    if (event.key == "a") {
      console.log("una a loco");
    }
  }

/*
  ctx.fillStyle = "white";
  ctx.fillRect(50,50,10,40);
  ctx.fillRect(550,310,10,40);

  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.setLineDash([5, 5]);
  ctx.moveTo(canvas.width/2, 0);
  ctx.lineTo(canvas.width/2, canvas.height);
  ctx.stroke();

  ctx.font = "60px Arial";
  ctx.fillStyle = 'white';
  ctx.fillText("0", 150, 50);
  ctx.fillText("0", 430, 50);

  ctx.beginPath();
  ctx.arc(350, 200, 5, 0, 2 * Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill()

  */

  var bola = {

    //Posicion inicial
    x_ini : 50,
    y_ini :50,

    x : 0,
    y : 0,

    //De esto depende el angulo de rebote
    vel_x : 3,
    vel_y : 1,

    ctx : null,

    //Bola cuadrada
    width : 5,
    height : 5,

    reset :function() {
      this.x = this.x_ini;
      this.y = this.y_ini;
    },

    init : function(ctx) {
      this.reset();
      this.ctx = ctx;
    },

    draw : function() {
      this.ctx.fillStyle = "white";
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    },

    update : function() {
      console.log("update")
      this.x = this.x + this.vel_x;
      this.y = this.y +this.vel_y;
    }
  }

  //se inicializa bola
  bola.init(ctx);
  bola.draw();

  //ANIMANDO
  var timer = null;

  var sacar = document.getElementById("sacar");

  sacar.onclick = () => {
    //Sólo activa timer si no ha sido ya activado
    if (!timer) {
      timer = setInterval(()=>{
        //--Actualizar bola, saber nueva posicion en bola UPDATE
        bola.update();
        ctx.clearRect(0,0,canvas.width, canvas.height)
        bola.draw();
        //--Condicion de terminar, mcuando salga del canvas para
        if (bola.x > canvas.width){
          clearInterval(timer);
          timer = null;
          //reiniciar bola posicion inicializa
          bola.reset();
          bola.draw();
        }

      }, 20)
    }
  }
}
