function main()
{

  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;

  var ctx = canvas.getContext("2d");

  //sacar coasas del navegador o ver cosas que maneje el navegador
  window.onkeydown = (event) => {
    //para usar solo tu la tecla que no la utilice el navegadop
    console.log(event.key);
    event.preventDefault();
    if (event.key == "w") {
      playing_field.update(-20, "true");
    }

    if (event.key == "s") {
      playing_field.update(20, "true");
    }

    if (event.key == "ArrowUp") {
      playing_field.update(-20, "false");
    }

    if (event.key == "ArrowDown") {
      playing_field.update(20, "false");
    }
    ctx.clearRect(0,0,canvas.width, canvas.height)
    bola.draw();
    playing_field.draw();
  }

/*
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
  */


// MI BOLAAAAAAA
  var bola = {

    //Posicion inicial
    x_ini : 150,
    y_ini :200,

    //Posiciones movimiento
    x : 0,
    y : 0,

    //De esto depende el angulo de rebote. Lo que se mueve en cada eje
    vel_x_init : 1,
    vel_y_init : 2,

    // Velocidad del juego
    vel_x : 0,
    vel_y : 0,

    //contexto que se le pasara como parametro
    ctx : null,

    //Bola cuadrada
    width : 5,
    height : 5,

    //  Vuelves a la posicion inicila de la bola
    reset :function() {
      this.x = this.x_ini;
      this.y = this.y_ini;

      this.vel_x = this.vel_x_init;
      this.vel_y = this.vel_y_init;
    },

    // Iniciaas el juego
    init : function(ctx) {
      this.reset();
      this.ctx = ctx;
    },

    //Dibujas la bola
    draw : function() {
      this.ctx.fillStyle = "white";
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    },

    // Actializas posicion de la bola
    update : function() {
      this.x = this.x + this.vel_x;
      this.y = this.y +this.vel_y;
    },

    // Cuando la bola rebote
    hit : function(){
      //rnd = Math.random();
      //console.log(rnd);
      //v_total = this.vel_x + this.vel_y;
      //this.vel_x = this.vel_x * (-1);
      this.vel_y = this.vel_y * (-1);
    },

    hit_shovel : function(){
      this.vel_y = this.vel_y * (-1);
      this.vel_x = this.vel_x * (-1);
    }
  }



// MI ZONA DE JUEGOOO

  var playing_field = {
    //Posicion inicial PALA 1
    x_ini1 : 50,
    y_ini1 :50,

    //Posiciones movimiento PALA 1
    x1 : 0,
    y1 : 0,

    //Posicion inicial PALA 2
    x_ini2 : 550,
    y_ini2 :310,

    //Posiciones movimiento PALA 2
    x2 : 0,
    y2 : 0,

    //contexto que se le pasara como parametro
    ctx : null,

    init : function(ctx) {
      this.reset();
      this.ctx = ctx;
    },

    reset :function() {
      this.x1 = this.x_ini1;
      this.y1 = this.y_ini1;

      this.x2 = this.x_ini2;
      this.y2 = this.y_ini2;
    },

    draw : function() {
      this.ctx.fillStyle = "white";
      ctx.fillRect(this.x1,this.y1,10,40);
      ctx.fillRect(this.x2,this.y2,10,40);
    },

    update : function(cant,  boolean) {
      if (boolean == "true"){
        this.y1 = this.y1 + cant;
      }else{
        this.y2 = this.y2 + cant;
      }
    }
  }


  // PROGRAMA PRINCIPAL


  //se inicializa bola
  bola.init(ctx);
  bola.draw();

  playing_field.init(ctx);
  playing_field.draw();

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
        playing_field.draw();


        //--Condicion de choque con el canvas
        if (bola.y <= 0 || bola.y >= canvas.height){
          //clearInterval(timer);
          //timer = null;
          //reiniciar bola posicion inicializa
          //bola.reset();
          bola.hit();
          bola.draw();
          playing_field.draw();
        }

        // Cuando pierde un jugador
        if (bola.x <= 0 || bola.x >= canvas.width){
          clearInterval(timer);
          timer = null;
          ctx.clearRect(0,0,canvas.width, canvas.height)
          bola.init(ctx);
          bola.draw();
          playing_field.draw();

        }

        if (playing_field.x2 <= bola.x && bola.x <= (playing_field.x2+10) && playing_field.y2 <= bola.y && bola.y <= (playing_field.y2+40)){
          bola.hit_shovel();
          bola.draw();
          playing_field.draw();
        }

        if (playing_field.x1 <= bola.x && bola.x <= (playing_field.x1+10) && playing_field.y1 <= bola.y && bola.y <= (playing_field.y1+40)){
          bola.hit_shovel();
          bola.draw();
          playing_field.draw();
        }


      }, 20)
    }
  }
}
