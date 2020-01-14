var canvas = document.getElementById("bg-canvas"),
context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// lineColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
// lineColor = '#FF0068';
lineColor = '#000000';

var pointsArr = [], // Array of points
    FPS = 60, // Frames per second
    numPts = 230; // Number of points

for (var i = 0; i < numPts; i++) { //Populate Point Array
  pointsArr.push({
    radius: Math.random() * 1 + 1, //Point Size
    xPos: Math.random() * window.innerWidth,
    yPos: Math.random() * window.innerHeight,
    ptColor: '#'+(Math.random()*0xFFFFFF<<0).toString(16),
    //First Number dictates speed, halfing it determines its positive or neg direction
    xMovement: Math.floor(Math.random() * 50) - 25,
    yMovement: Math.floor(Math.random() * 50) - 25
  });
}

function drawToCanvas() {
    context.clearRect(0,0,canvas.width,canvas.height); 
    context.globalCompositeOperation = "screen"; //Give lighter picture & greater contrast to lines and points
  
  for (var i = 0, numPts = pointsArr.length; i < numPts; i++) {
    var pt = pointsArr[i];
    context.beginPath();
    context.arc(pt.xPos, pt.yPos, pt.radius, 0, 2 * Math.PI);
    context.fill();
    context.fillStyle = pt.ptColor;
    context.stroke();
  }
  
  context.beginPath();
  for (var i = 0, numPts = pointsArr.length; i < numPts; i++) {
    var pointI = pointsArr[i];
    context.moveTo(pointI.xPos,pointI.yPos); //Draw point to its location
    for (var j = 0, numPts = pointsArr.length; j < numPts; j++) {
      var pointII = pointsArr[j];
      if(getDistance(pointI, pointII) < 175) { //If within distance to another point
        context.lineTo(pointII.xPos,pointII.yPos); //Create line
      }
    }
  }
  context.lineWidth = 0.08;
  context.strokeStyle = lineColor;
  context.stroke();
}

function updateCanvas() {
  for (var i = 0, numPts = pointsArr.length; i < numPts; i++) {
    var point = pointsArr[i];
    point.xPos += point.xMovement / FPS; //Update X Position
    point.yPos += point.yMovement / FPS; //Update Y Position
    if (point.xPos < 0 || point.xPos > canvas.width) point.xMovement = -point.xMovement; 
    if (point.yPos < 0 || point.yPos > canvas.height) point.yMovement = -point.yMovement;
  }
}

function getDistance( pt1, pt2 ){
  var xDist = 0;
  var yDist = 0;
  xDist = pt2.xPos - pt1.xPos;
  xDist = xDist * xDist; 
  yDist = pt2.yPos - pt1.yPos;
  yDist = yDist * yDist;
  return Math.sqrt( xDist + yDist ); //sqrt of x^2 + y^2
}

function tick() {
  drawToCanvas();
  updateCanvas();
  requestAnimationFrame(tick); //Continue to run and update
}

tick(); //Run