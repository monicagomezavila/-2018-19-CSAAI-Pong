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
    campo.draw(ctx);
    marcador.draw(ctx);
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
      this.y = this.y +this.vel_y;
    },

    // Cuando la bola rebote
    hit : function(){
      //rnd = Math.random();
      this.vel_y = this.vel_y * (-1);
    },

    // Choque con una de las palas
    hit_shovel : function(){
      this.vel_y = this.vel_y * (-1);
      this.vel_x = this.vel_x * (-1);
    }
  }



// MI ZONA DE JUEGO

  var playing_field = {
    //Posicion inicial PALA 1
    x_ini1 : 50,
    y_ini1 :180,

    //Posiciones movimiento PALA 1
    x1 : 0,
    y1 : 0,

    //Posicion inicial PALA 2
    x_ini2 : 550,
    y_ini2 :180,

    //Posiciones movimiento PALA 2
    x2 : 0,
    y2 : 0,

    //Contexto que se le pasara como parametro
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
    }
  }

  // PROGRAMA PRINCIPAL


  //se inicializa bola
  bola.init(ctx,prueba);
  bola.draw();

  playing_field.init(ctx);
  playing_field.draw();
  campo.draw(ctx);
  marcador.draw(ctx);

  //ANIMANDO
  var prueba = "player1";
  var timer = null;

  var sacar = document.getElementById("sacar");

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
          if (bola.x >= canvas.width){
            marcador.point("true");
            prueba = "player1";
          }else{
            marcador.point("false");
            prueba = "player2";
          }
          bola.init(ctx,prueba);

        }

        if (playing_field.x2 <= bola.x && bola.x <= (playing_field.x2+10) && playing_field.y2 <= bola.y && bola.y <= (playing_field.y2+40)){
          bola.hit_shovel();

        }

        if (playing_field.x1 <= bola.x && bola.x <= (playing_field.x1+10) && playing_field.y1 <= bola.y && bola.y <= (playing_field.y1+40)){
          bola.hit_shovel();

        }

        bola.draw();
        playing_field.draw();
        campo.draw(ctx);
        marcador.draw(ctx);
      }, 20)
    }
  }
}
