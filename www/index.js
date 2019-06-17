import  { PlayerShip } from "shooter"

const playerShip = PlayerShip.new()

const canvas=document.getElementById("space");
const ctx=canvas.getContext("2d");
canvas.width = 1660
canvas.height = 860
const cw=canvas.width;
const ch=canvas.height;

const strokeWidth=4;
const strokeColor='purple';
const fillColor='skyblue';

let ball
let ballArray = []


  
  
const drawPolygon = (centerX,centerY,strokeWidth,strokeColor,fillColor,rotationDegrees) => {
  const radians=rotationDegrees*Math.PI/180;
  ctx.translate(centerX,centerY)
  ctx.rotate(radians)
  ctx.beginPath()
  ctx.moveTo (playerShip.generate_new_x(), playerShip.generate_new_y())   
  for (let i = 1; i <= playerShip.get_side_count();i += 1) {
    ctx.lineTo (playerShip.draw_line_x(i), playerShip.draw_line_y(i))
  }
  ctx.closePath()
  ctx.fillStyle=fillColor
  ctx.strokeStyle = strokeColor
  ctx.lineWidth = strokeWidth
  ctx.stroke()
  ctx.fill()
  ctx.rotate(-radians)
  ctx.translate(-centerX,-centerY);  
  }
    

 window.addEventListener("keydown", (e) => {
  if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
  }
}, false)

let map = {}
onkeydown = onkeyup = (e) =>{
  e = e || event
  map[e.key] = e.type == 'keydown';
  Object.keys(map).forEach(key => {
    if(key === 'ArrowLeft' && map[key]){
      playerShip.set_rotation_degrees(-10)
    } else if (key == 'ArrowRight' && map[key]){
      playerShip.set_rotation_degrees(10)
    } else if(key === 'a' && map[key]){
      playerShip.set_centre_x(-10)
    } else if (key === 'd' && map[key]){
      playerShip.set_centre_x(10)
    } else if(key === 'w' && map[key]){
      playerShip.set_centre_y(-10)
    } else if(key === 's' && map[key]){
      playerShip.set_centre_y(10)
    } else if (key === ' ' && map[key]){
      ball = {
        x: playerShip.get_centre_x(),
        y: playerShip.get_centre_y(),
        speed: 10,
        initialAngle: playerShip.get_rotation_degrees()
      }
      ballArray = [ ...ballArray, ball ]
    }
  })
  ctx.clearRect(0,0,cw,ch)
  drawPolygon(playerShip.get_centre_x(),playerShip.get_centre_y(),strokeWidth,strokeColor,fillColor,playerShip.get_rotation_degrees())
}


const animate = window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function(callback) { window.setTimeout(callback, 1000/60) }

const step = () => {
  update()
  render()
  animate(step)
}

const update = () => {
  ctx.clearRect(0,0,cw,ch)
  // ball.x = playerShip.get_centre_x()
  // ball.y =  playerShip.get_centre_y()
  ballArray.forEach(ball => {
    ball.x += Math.cos(ball.initialAngle*Math.PI/180)* ball.speed
    ball.y += Math.sin(ball.initialAngle*Math.PI/180)* ball.speed
  })
}

const render = () => {
  drawPolygon(playerShip.get_centre_x(),playerShip.get_centre_y(),strokeWidth,strokeColor,fillColor, playerShip.get_rotation_degrees())
  ballArray.forEach(ball => {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, 10, 2 * Math.PI, false)
    ctx.fill()
  })
}
                

window.onload = () => {
  
  animate(step);
}              