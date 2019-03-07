function main()
{
  console.log("Pong: Main: Start!")

  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;

  var ctx = canvas.getContext("2d");

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

}
