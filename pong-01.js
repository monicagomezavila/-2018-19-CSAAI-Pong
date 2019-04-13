function main(){

  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;

  var ctx = canvas.getContext("2d");

  //--Evento que escucha al teclado para el movimiento de las palas
  window.onkeydown = (event) => {
    //--Para usar sólo tú la tecla y que no la pueda utilizar el navegador
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


//--Constructor BOLA
function bola(x_ini,y_ini){
  //--Posicion inicial
  this.x_ini = x_ini;
  this.y_ini = y_ini;

  //--Posiciones movimiento
  this.x = 0;
  this.y = 0;

  //--Velocidad inicial del juego
  this.vel_x_init = null;
  this.vel_y_init = null;

  //--Asigna la velocidad inicial al empezar el juego
  this.velocidad = function(x,y){
    this.vel_x_init = x;
    this.vel_y_init = y;
  }

  //--Velocidad del juego según se va jugando
  this.vel_x = 0;
  this.vel_y = 0;

  //--Contexto que se le pasará como parámetro
  this.ctx = null;

  //--Reseteas posición de la bola y velocidad
  this.reset  = function() {
    this.x = this.x_ini;
    this.y = this.y_ini;

    this.vel_x = this.vel_x_init;
    this.vel_y = this.vel_y_init;
  }

  //--Inicia el juego
  this.init = function(ctx,ganador) {
    this.reset();
    this.ctx = ctx;
    if (ganador == "player1") {
      this.x = 450;
      this.y = 200;
      this.vel_x = (-1) * this.vel_x;
      this.vel_y = (-1) * this.vel_x;
    }
  }

  //--Dibuja la bola
  this.draw = function() {
    this.ratio = 7;
    this.ctx.beginPath();
    this.ctx.arc(this.x,this.y, this.ratio, 0, 2 * Math.PI);
    this.ctx.stroke()
    this.ctx.fillStyle = "yellow";
    this.ctx.fill();
  }

  //--Actualiza posición de la bola
  this.update = function() {
    this.x = this.x + this.vel_x;
    this.y = this.y +this.vel_y;
  }

  //--La bola rebota con las paredes
  this.hit = function(){
    this.vel_y = this.vel_y * (-1);
  }

  //--Choque con una de las palas, calcula distinto ángulo de rebote
  this.hit_shovel = function(){
    var n = null;
    n = Math.random();
    n = (Math.floor(n * (5 - 1)) + 1) * 0.1;
    vel_total = Math.abs(this.vel_y) + Math.abs(this.vel_x);
    this.vel_y = Math.sign(this.vel_y) * (-1) * vel_total * n;
    this.vel_x = Math.sign(this.vel_x) * (-1) * vel_total * (1-n);
  }

}

//--Constructor PALA
function pala(x,y){
  this.ctx = null;

  //--Posición inicial de la pala
  this.x_ini = x;
  this.y_ini = y;

  //--Posiciones de la pala según se vaya moviendo
  this.x = 0;
  this.y = 0;

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
    if (((this.y + cant+20) < canvas.height) && (this.y + cant+20)>0){
      this.y = this.y + cant;
    }else{
      this.y = this.y;
    }
  }
}

  //--Campo de juego
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

  //--Marcador
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
      if (boolean == "player1") {
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


  //--PROGRAMA PRINCIPAL
  var pala1 = new pala(70,180);
  var pala2 = new pala(530,180);
  pala1.init(ctx);
  pala2.init(ctx);
  pala1.draw();
  pala2.draw();

  var bola = new bola(150,200);
  //--Se inicializa el ganador como player2 para que empiece sacando player 1
  var ganador = "player2";
  bola.init(ctx,ganador);
  bola.draw();
  campo.draw(ctx);
  marcador.draw(ctx);

  //--ANIMANDO
  var timer = null;

  var sacar = document.getElementById("sacar");
  var reiniciar = document.getElementById("reiniciar");

  var vel1 = document.getElementById("vel1");
  var vel2 = document.getElementById("vel2");
  var vel3 = document.getElementById("vel3");

  reiniciar.onclick = () => {
    bola.reset();
    pala1.reset();
    pala2.reset();
    marcador.reset();
    clearInterval(timer);
    timer = null;
    ctx.clearRect(0,0,canvas.width, canvas.height)
    bola.draw();
    campo.draw(ctx);
    pala1.draw();
    pala2.draw();
    marcador.draw(ctx);

  }
  //Velocidades que elige el usuario que vaya a jugar
  vel1.onclick = () => {
    bola.vel_x_init = 1;
    bola.vel_y_init = 2;
    bola.reset()
  }
  vel2.onclick = () => {
    bola.vel_x_init = 2;
    bola.vel_y_init = 4;
    bola.reset()
  }
  vel3.onclick = () => {
    bola.vel_x_init = 4;
    bola.vel_y_init = 6;
    bola.reset()
  }

  sacar.onclick = () => {
    //Sólo activa timer si no ha sido ya activado
    if (!timer) {
      timer = setInterval(()=>{
        //--Actualiza bola, nueva posicion con UPDATE
        bola.update();
        ctx.clearRect(0,0,canvas.width, canvas.height)

        //--Condición de choque con el canvas
        if (bola.y <= 0 || bola.y >= canvas.height){
          bola.hit();
        }
        
        //--Pierde un jugador
        if (bola.x <= 0 || bola.x >= canvas.width){
          clearInterval(timer);
          timer = null;
          ctx.clearRect(0,0,canvas.width, canvas.height)
          //--Cambiar marcador
          if (bola.x >= canvas.width){
            marcador.point("player1");
            ganador = "player1";
          }else{
            marcador.point("player2");
            ganador = "player2";
          }
          bola.init(ctx,ganador);
        }

        //-- Choque con las palas
        if (pala2.x <= bola.x && bola.x <= (pala2.x+10) && pala2.y <= bola.y && bola.y <= (pala2.y+40)){
          bola.hit_shovel();
        }
        if (pala1.x <= bola.x && bola.x <= (pala1.x+10) && pala1.y <= bola.y && (bola.y<= pala1.y+40)){
          bola.hit_shovel();
        }

        //--Despúes de mirar si ha ocurrido algo de lo anterio, dibuja todo
        bola.draw();
        campo.draw(ctx);
        marcador.draw(ctx);
        pala1.draw();
        pala2.draw();
      }, 20)
    }
  }
}
