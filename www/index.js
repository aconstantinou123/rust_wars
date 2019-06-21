import  { PlayerShip, Projectile, Space, SquareEnemy, FollowEnemy } from "shooter"

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max))

const playerShip = PlayerShip.new()
const space = Space.new()

const canvas=document.getElementById("space")
const ctx=canvas.getContext("2d")
canvas.height = space.get_height()
canvas.width = space.get_width()
const cw=canvas.width
const ch=canvas.height
ctx.fillRect(0,0,canvas.width,canvas.height)

const strokeWidth=5
const strokeColor='purple'
const fillColor='skyblue'

let projectileArray = []
let squareEnemyArray = []
let followEnemyArray = []
let canShoot = true
let velX = 0
let velY = 0
let rotationSpeed = 0
let keys = []

const canShootProjectile = () => {
  setInterval(() => {
    canShoot = !canShoot
  }, 100)
}

const drawProjectiles = () => {
  projectileArray.forEach(projectile => {
    ctx.beginPath()
    ctx.fillStyle='red'
    ctx.arc(projectile.get_x(), projectile.get_y(), 5, 2 * Math.PI, false)
    ctx.fill()
  })
}

const drawSquareEnemy = () => {
  squareEnemyArray.forEach(squareEnemy => {
    ctx.strokeStyle = "green";
    ctx.strokeRect(squareEnemy.get_x(), squareEnemy.get_y(),
    squareEnemy.get_size(), squareEnemy.get_size())
  })
}

const drawFollowEnemy = () => {
  followEnemyArray.forEach(followEnemy => {
    const numberOfSides = 6
    ctx.beginPath();
    ctx.moveTo (followEnemy.get_x() +  followEnemy.get_size() * Math.cos(0), 
    followEnemy.get_y() +  followEnemy.get_size() *  Math.sin(0))         
    for (var i = 1; i <= numberOfSides; i += 1) {
      ctx.lineTo (followEnemy.get_x() + followEnemy.get_size() * Math.cos(i * 2 * Math.PI / numberOfSides), 
      followEnemy.get_y() + followEnemy.get_size() * Math.sin(i * 2 * Math.PI / numberOfSides));
    }
    ctx.strokeStyle = "red";
    ctx.stroke();
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
  }, 500)
}

const addFollowEnemies = () => {
  setInterval(() => {
    if(followEnemyArray.length < 10){
      const followEnemy = FollowEnemy
        .new(getRandomInt(space.get_width() - 30), getRandomInt(space.get_height() - 30))
      followEnemyArray = [
        ...followEnemyArray,
        followEnemy,
      ]
    }
  }, 500)
}

const updatePlayerShip = () => {
  velX *= 0.98
  velY *= 0.98
  rotationSpeed *= 0.98
  controlShip()
  playerShip.increment_rotation_degrees(rotationSpeed)
  playerShip.increment_centre_x(velX)
  playerShip.increment_centre_y(velY)
  space.check_player_ship_out_of_bounds(playerShip)
}

const updateProjectiles = () => {
  projectileArray.forEach(projectile => {
    space.check_projectile_out_of_bounds(projectile)
    projectile.calculate_new_x()
    projectile.calculate_new_y()
  })
  projectileArray = projectileArray.filter(projectile => projectile.is_active())
}

const updateEnemies = () => {
  squareEnemyArray.forEach(squareEnemy => {
    space.check_enemy_at_edge(squareEnemy)
    squareEnemy.move_enemy()
  })
  followEnemyArray.forEach(followEnemy => {
    followEnemy.move_enemy(playerShip)
  })
}

const checkProjectileHit = () => {
  projectileArray.forEach(projectile => {
    squareEnemyArray.forEach(enemy => {
      enemy.check_dead(projectile)
      enemy.blow_up()
    })
    followEnemyArray.forEach(enemy => {
      enemy.check_dead(projectile)
      enemy.blow_up()
    })
  })
  squareEnemyArray = squareEnemyArray.filter(squareEnemy => squareEnemy.is_active())
  followEnemyArray = followEnemyArray.filter(followEnemy => followEnemy.is_active())
  
}
 
const drawPolygon = (centerX,centerY,strokeWidth,strokeColor,rotationDegrees) => {
  const radians=rotationDegrees*Math.PI/180;
  ctx.translate(centerX,centerY)
  ctx.rotate(radians)
  ctx.beginPath()
  ctx.moveTo (playerShip.generate_new_x(), playerShip.generate_new_y())   
  for (let i = 1; i <= playerShip.get_side_count();i += 1) {
    ctx.lineTo (playerShip.draw_line_x(i), playerShip.draw_line_y(i))
  }
  ctx.closePath()
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

document.body.addEventListener("keydown", (e) => {
  keys[e.keyCode] = true;
})

document.body.addEventListener("keyup", (e) => {
  keys[e.keyCode] = false;
})

// canShootProjectile() 

const controlShip = () => {
  if(keys[37] && rotationSpeed > -playerShip.get_speed()){
    rotationSpeed -= 1
  } if (keys[39] && rotationSpeed < playerShip.get_speed()){
    rotationSpeed += 1
  } if(keys[65] && velX > -playerShip.get_speed()){
    velX -= 1
  } if (keys[68] && velX < playerShip.get_speed()){
    velX += 1
  }  if(keys[87] && velY > -playerShip.get_speed()){
    velY -= 1
  }  if(keys[83] && velY < playerShip.get_speed()){
    velY += 1
  }  if (keys[32]){ 
    if(canShoot){
      const projectile = Projectile.new(
        playerShip.get_centre_x(), 
        playerShip.get_centre_y(),
        playerShip.get_rotation_degrees(),
        10.0
      )
      projectileArray = [ ...projectileArray, projectile ]
    }
  }
}


addSquareEnemies()
addFollowEnemies()

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
  updatePlayerShip()
  updateProjectiles()
  updateEnemies()
  checkProjectileHit()
}

const render = () => {
  ctx.clearRect(0,0,cw,ch)
  ctx.fillStyle='black'
  ctx.fillRect(0,0,canvas.width,canvas.height) 
  drawPolygon(playerShip.get_centre_x(),playerShip.get_centre_y(),
  strokeWidth,strokeColor, playerShip.get_rotation_degrees())
  drawSquareEnemy()
  drawProjectiles()
  drawFollowEnemy()
}
                

window.onload = () => {
  animate(step)
} 

window.onload()