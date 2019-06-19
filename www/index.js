import  { PlayerShip, Projectile, Space, SquareEnemy } from "shooter"

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max))

const playerShip = PlayerShip.new()
const space = Space.new()

const canvas=document.getElementById("space")
const ctx=canvas.getContext("2d")
canvas.height = space.get_height()
canvas.width = space.get_width()
const cw=canvas.width
const ch=canvas.height
// ctx.fillStyle='black'
ctx.fillRect(0,0,canvas.width,canvas.height);

const strokeWidth=4;
const strokeColor='purple'
const fillColor='skyblue'

let projectileArray = []
let squareEnemyArray = []

// ctx.fillStyle='white'

const drawSquareEnemy = () => {
  squareEnemyArray.forEach(squareEnemy => {
    ctx.fillStyle='white'
    ctx.fillRect(squareEnemy.get_x(), squareEnemy.get_y(),
    squareEnemy.get_size(), squareEnemy.get_size())
  })
}

const addSquareEnemies = () => {
  const squareEnemy = SquareEnemy
        .new(getRandomInt(space.get_width() - 30), getRandomInt(space.get_height() - 30))
      squareEnemyArray = [
        ...squareEnemyArray,
        squareEnemy,
      ]
  setInterval(() => {
    if(squareEnemyArray.length < 10){
      const squareEnemy = SquareEnemy
        .new(getRandomInt(space.get_width() - 30), getRandomInt(space.get_height() - 30))
      squareEnemyArray = [
        ...squareEnemyArray,
        squareEnemy,
      ]
    }
  }, 10000)
}

const updateSquareEnemy = () => {
  squareEnemyArray.forEach(squareEnemy => {
    space.check_enemy_at_edge(squareEnemy)
    squareEnemy.move_enemy()
  })
}

  
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
  ctx.translate(-centerX,-centerY) 
  }
    

 window.addEventListener("keydown", (e) => {
  if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault()
  }
}, false)

let map = {}
onkeydown = onkeyup = (e) =>{
  e = e || event
  map[e.key] = e.type == 'keydown';
  Object.keys(map).forEach(key => {
    if(key === 'ArrowLeft' && map[key]){
      playerShip.increment_rotation_degrees(-20)
    } else if (key == 'ArrowRight' && map[key]){
      playerShip.increment_rotation_degrees(20)
    } else if(key === 'a' && map[key]){
      playerShip.increment_centre_x(-20)
    } else if (key === 'd' && map[key]){
      playerShip.increment_centre_x(20)
    } else if(key === 'w' && map[key]){
      playerShip.increment_centre_y(-20)
    } else if(key === 's' && map[key]){
      playerShip.increment_centre_y(20)
    } else if (key === ' ' && map[key]){
      const projectile = Projectile.new(
        playerShip.get_centre_x(), 
        playerShip.get_centre_y(),
        playerShip.get_rotation_degrees(),
        10.0
      )
      projectileArray = [ ...projectileArray, projectile ]
    }
  })
  space.check_player_ship_out_of_bounds(playerShip)
  ctx.clearRect(0,0,cw,ch)
  ctx.fillStyle='black'
  ctx.fillRect(0,0,canvas.width,canvas.height)
  drawPolygon(playerShip.get_centre_x(),playerShip.get_centre_y(),strokeWidth,strokeColor,fillColor,playerShip.get_rotation_degrees())
}

addSquareEnemies()


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
  ctx.fillStyle='black'
  ctx.fillRect(0,0,canvas.width,canvas.height)
  projectileArray.forEach(projectile => {
    space.check_projectile_out_of_bounds(projectile)
    projectile.calculate_new_x()
    projectile.calculate_new_y()
  })
  projectileArray = projectileArray.filter(projectile => projectile.is_active())
  updateSquareEnemy()
}

const render = () => {
  drawPolygon(playerShip.get_centre_x(),playerShip.get_centre_y(),strokeWidth,strokeColor,fillColor, playerShip.get_rotation_degrees())
  drawSquareEnemy()
  projectileArray.forEach(projectile => {
    ctx.beginPath()
    ctx.fillStyle='red'
    ctx.arc(projectile.get_x(), projectile.get_y(), 10, 2 * Math.PI, false)
    ctx.fill()
  })
}
                

window.onload = () => {
  animate(step)
} 

window.onload()