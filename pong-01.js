function main(){

  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;

  var ctx = canvas.getContext("2d");

  // Evento que escucha al teclado para el movimiento de las palas
  window.onkeydown = (event) => {
    // Para usar solo tu la tecla y que no la pueda utilizar el navegador
    event.preventDefault();
    if (event.key == "w") {
      pala1.update(-20);
    }

    if (event.key == "s") {
      pala1.update(20);
    }

    if (event.key == "ArrowUp") {
      pala2.update(-20);
    }

    if (event.key == "ArrowDown") {
      pala2.update(20);
    }
    ctx.clearRect(0,0,canvas.width, canvas.height)
    bola.draw();
    campo.draw(ctx);
    marcador.draw(ctx);
    pala1.draw();
    pala2.draw();
  }


// MI BOLA
  var bola = {
    //Posicion inicial
    x_ini : 150,
    y_ini :200,

    //Posiciones movimiento
    x : 0,
    y : 0,

    //De esto depende el angulo de rebote. Lo que se mueve en cada eje
    vel_x_init : null,
    vel_y_init : null,

    velocidad : function(x,y){
      this.vel_x_init = x;
      console.log(this.vel_x_init)
      this.vel_y_init = y;
    },

    // Velocidad del juego
    vel_x : 0,
    vel_y : 0,

    //contexto que se le pasara como parametro
    ctx : null,

    //Bola cuadrada
    width : 5,
    height : 5,

    //  Vuelves a la posicion inicial de la bola
    reset :function() {
      this.x = this.x_ini;
      this.y = this.y_ini;

      this.vel_x = this.vel_x_init;
      this.vel_y = this.vel_y_init;
    },

    // Iniciaas el juego
    init : function(ctx,prueba) {
      this.reset();
      this.ctx = ctx;
      if (prueba == "player1") {
        this.x = 450;
        this.y = 200;
        this.vel_x = (-1) * this.vel_x;
        this.vel_y = (-1) * this.vel_x;
      }
    },

    //Dibujas la bola
    draw : function() {
      this.ctx.fillStyle = "white";
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    },

    // Actualizas posicion de la bola
    update : function() {
      this.x = this.x + this.vel_x;
      console.log(this.vel_x)
      console.log(this.x)
      this.y = this.y +this.vel_y;
    },

    // Cuando la bola rebote
    hit : function(){
      //rnd = Math.random();
      this.vel_y = this.vel_y * (-1);
    },

    // Choque con una de las palas con misma velocidad pero distinto angulo de rebote
    hit_shovel : function(){
      var n = null;
      n = Math.random();
      vel_total = Math.abs(this.vel_y) + Math.abs(this.vel_x)
      console.log(vel_total);
      this.vel_y = Math.sign(this.vel_y) * (-1) * vel_total * n;
      this.vel_x = Math.sign(this.vel_x) * (-1) * vel_total * (1-n);
    }
  }

//Constructor PALA
function pala(x,y){

  this.ctx = null;

  this.x_ini = x;
  this.y_ini = y;

  x = 0;
  y = 0;

  this.reset = function() {
    this.x = this.x_ini;
    this.y = this.y_ini;
  }

  this.init = function(ctx) {
    this.reset();
    this.ctx = ctx;
  }

  this.draw = function() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(this.x,this.y,10,40);
    this.ctx.fillRect(this.x,this.y,10,40);
  }

  this.update = function(cant) {
    this.y = this.y + cant;
  }
}

//Campò de juego
  var campo = {
    ctx : null,
    draw : function(ctx){
      this.ctx = ctx;
      this.ctx.beginPath();
      this.ctx.strokeStyle = "white";
      this.ctx.setLineDash([5, 5]);
      this.ctx.moveTo(canvas.width/2, 0);
      this.ctx.lineTo(canvas.width/2, canvas.height);
      this.ctx.stroke();
    }
  }

// Marcador
  var marcador = {
    ctx : null,
    player1 : 0,
    player2 : 0,

    draw : function(ctx){
      this.ctx = ctx;
      this.ctx.font = "60px Arial";
      this.ctx.fillStyle = 'white';
      this.ctx.fillText(this.player1, 150, 50);
      this.ctx.fillText(this.player2, 430, 50);
    },

    point : function(boolean){
      if (boolean == "true") {
        this.player1 += 1;
      }else{
        this.player2 += 1;
      }
    },

    reset : function(){
      this.player1 =0;
      this.player2 =0;
    }
  }



  // PROGRAMA PRINCIPAL

  var pala1 = new pala(70,180);
  var pala2 = new pala(530,180);
  pala1.init(ctx);
  pala1.draw();
  pala2.init(ctx);
  pala2.draw();

  bola.init(ctx,prueba);
  bola.draw();
  campo.draw(ctx);
  marcador.draw(ctx);

  //ANIMANDO
  var prueba = "player1";
  var timer = null;

  var sacar = document.getElementById("sacar");
  var reiniciar = document.getElementById("reiniciar");

  var vel1 = document.getElementById("vel1");
  var vel2 = document.getElementById("vel2");
  var vel3 = document.getElementById("vel3");


  reiniciar.onclick = () => {
    console.log("reiniciar")
    bola.reset();
    pala1.reset();
    pala2.reset();
    clearInterval(timer);
    timer = null;
    ctx.clearRect(0,0,canvas.width, canvas.height)
    marcador.reset();
    bola.draw();
    campo.draw(ctx);
    pala1.draw();
    pala2.draw();
    marcador.draw(ctx);

  }

  vel1.onclick = () => {
    console.log("HAS ELEGIDO DIFICULTAD 1")
    bola.vel_x_init = 1;
    bola.vel_y_init = 2;
    bola.reset()
  }

  vel2.onclick = () => {
    console.log("HAS ELEGIDO DIFICULTAD 2")
    bola.vel_x_init = 2;
    bola.vel_y_init = 4;
    bola.reset()
  }

  vel3.onclick = () => {
    console.log("HAS ELEGIDO DIFICULTAD 3")
    bola.vel_x_init = 4;
    bola.vel_y_init = 6;
    bola.reset()
  }

  sacar.onclick = () => {
    //Sólo activa timer si no ha sido ya activado
    if (!timer) {
      timer = setInterval(()=>{
        //--Actualizar bola, saber nueva posicion en bola UPDATE
        bola.update();
        ctx.clearRect(0,0,canvas.width, canvas.height)

        //--Condicion de choque con el canvas
        if (bola.y <= 0 || bola.y >= canvas.height){
          bola.hit();
        }

        // Cuando pierde un jugador
        if (bola.x <= 0 || bola.x >= canvas.width){

          clearInterval(timer);
          timer = null;
          ctx.clearRect(0,0,canvas.width, canvas.height)

          // REVISAR ESTA CONDICION
          if (bola.x >= canvas.width){
            marcador.point("true");
            prueba = "player1";
          }else{
            marcador.point("false");
            prueba = "player2";
          }
          bola.init(ctx,prueba);
        }


        if (pala2.x <= bola.x && bola.x <= (pala2.x+10) && pala2.y <= bola.y && bola.y <= (pala2.y+40)){
          bola.hit_shovel();
        }

        if (pala1.x <= bola.x && bola.x <= (pala1.x+10) && pala1.y <= bola.y && (bola.y<= pala1.y+40)){
          bola.hit_shovel();
        }

        bola.draw();
        campo.draw(ctx);
        marcador.draw(ctx);
        pala1.draw();
        pala2.draw();
      }, 20)
    }
  }
}
