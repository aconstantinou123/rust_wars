import  { 
  PlayerShip, 
  Projectile, 
  Space, 
  SquareEnemy, 
  FollowEnemy, 
  ClawEnemy, 
  SpiralEnemy,
  BasicEnemy,
} from "shooter"

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max))

const playerShip = PlayerShip.new()
const space = Space.new()
const basicEnemy = BasicEnemy.new(500, 500)

const canvas=document.getElementById("space")
const ctx=canvas.getContext("2d")
canvas.height = space.get_height()
canvas.width = space.get_width()
const cw=canvas.width
const ch=canvas.height
ctx.fillRect(0,0,canvas.width,canvas.height)

const strokeWidth=5
const strokeColor='purple'

let projectileArray = []
let squareEnemyArray = []
let followEnemyArray = []
let clawEnemyArray = []
let spiralEnemyArray = []
let keys = []
let velX = 0
let velY = 0
let rotationSpeed = 0
let delay = 0
let drawSpirals = true
let spiralX = getRandomInt(space.get_width() - 30)
let spiralY = getRandomInt(space.get_height() - 30)

const drawPlayerShip = (centerX,centerY,rotationDegrees) => {
  const radians=rotationDegrees*Math.PI/180;
  ctx.translate(centerX,centerY)
  ctx.rotate(radians)
  ctx.beginPath()
  ctx.moveTo (playerShip.generate_new_x(), playerShip.generate_new_y())   
  for (let i = 1; i <= playerShip.get_side_count();i += 1) {
    ctx.lineTo (playerShip.draw_line_x(i), playerShip.draw_line_y(i))
  }
  ctx.closePath()
  ctx.strokeStyle = '#33F0FF'
  ctx.lineWidth = 3
  ctx.stroke()
  ctx.fill()
  ctx.rotate(-radians)
  ctx.translate(-centerX,-centerY) 
}

const drawSpiral = () => {
  if(spiralEnemyArray.length == 30){
    drawSpirals = false
  } else if (spiralEnemyArray.length == 0){
    drawSpirals = true
    spiralX = getRandomInt(space.get_width() - 30)
    spiralY = getRandomInt(space.get_height() - 30)
  }
  if(spiralEnemyArray.length <= 30 && drawSpirals){
    const spiralEnemy = SpiralEnemy
      .new(spiralX, spiralY)
    spiralEnemyArray = [
      ...spiralEnemyArray,
      spiralEnemy
    ]
  }
  spiralEnemyArray.forEach(spiralEnemy => {
    spiralEnemy.spiral_movement()
    ctx.beginPath()
    ctx.strokeStyle="#8D33FF"
    ctx.arc(spiralEnemy.get_x(),spiralEnemy.get_y(), 10,0, 2*Math.PI,false);
    ctx.closePath()
    ctx.stroke()
  })
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
    ctx.strokeRect(squareEnemy.base.get_x(), squareEnemy.base.get_y(),
    squareEnemy.base.get_size(), squareEnemy.base.get_size())
    drawEnemyProjectile(squareEnemy)
  })
}

const drawEnemyProjectile = (squareEnemy) => {
  if(squareEnemy.get_can_shoot()){
    ctx.beginPath()
    ctx.moveTo(squareEnemy.base.get_x() + (squareEnemy.base.get_size() / 2),
    squareEnemy.base.get_y() + (squareEnemy.base.get_size() / 2))
    ctx.lineTo(squareEnemy.get_laser_x(), 
    squareEnemy.get_laser_y())
    ctx.stroke()
  }
}

const drawFollowEnemy = () => {
  followEnemyArray.forEach(followEnemy => {
    const numberOfSides = 6
    ctx.beginPath()
    ctx.moveTo (followEnemy.base.get_x() + followEnemy.base.get_size() * Math.cos(0), 
    followEnemy.base.get_y() +  followEnemy.base.get_size() *  Math.sin(0))         
    for (var i = 1; i <= numberOfSides; i += 1) {
      ctx.lineTo (followEnemy.base.get_x() + followEnemy.base.get_size() * Math.cos(i * 2 * Math.PI / numberOfSides), 
      followEnemy.base.get_y() + followEnemy.base.get_size() * Math.sin(i * 2 * Math.PI / numberOfSides));
    }
    ctx.strokeStyle = "red"
    ctx.stroke()
  })
}

const drawClawEnemy = () => {
  clawEnemyArray.forEach(enemy => {
    const centerX = enemy.base.get_x() + enemy.base.get_size() / 2
    const centerY = enemy.base.get_y() + enemy.base.get_size() / 2
    const numberOfSides = 4.5
    ctx.translate(centerX, centerY)
    ctx.rotate(enemy.get_radians())
    ctx.beginPath()
    ctx.moveTo (0 +  enemy.base.get_size() * Math.cos(0), 0 +  enemy.base.get_size() *  Math.sin(0))         
    for (var i = 1; i <= numberOfSides; i += 1) {
      ctx.lineTo (0 + enemy.base.get_size() * Math.cos(i * 2 * Math.PI / numberOfSides), 
      0 + enemy.base.get_size() * Math.sin(i * 2 * Math.PI / numberOfSides));
    }
    ctx.strokeStyle = "blue";
    ctx.stroke()
    ctx.rotate(-enemy.get_radians())
    ctx.translate(-centerX, -centerY)
  })
}

const addSquareEnemies = () => {
  const buffer = 120
  const patrolWidth = space.get_width() - 240
  const patrolHeight = space.get_height() - 240
  const x = getRandomInt(patrolWidth) + buffer
  const y = getRandomInt(patrolHeight) + buffer
  const squareEnemy = SquareEnemy.new(x, y)
  // const squareEnemy = SquareEnemy
  //       .new(getRandomInt(space.get_width() - 30), getRandomInt(space.get_height() - 30))
      squareEnemyArray = [
        ...squareEnemyArray,
        squareEnemy,
      ]
  // setInterval(() => {
  //   if(squareEnemyArray.length < 10){
  //     const squareEnemy = SquareEnemy
  //       .new(getRandomInt(space.get_width() - 30), getRandomInt(space.get_height() - 30))
  //     squareEnemyArray = [
  //       ...squareEnemyArray,
  //       squareEnemy,
  //     ]
  //   }
  // }, 2000)
}

const addFollowEnemies = () => {
  setInterval(() => {
    if(followEnemyArray.length < 5){
      const followEnemy = FollowEnemy
        .new(getRandomInt(space.get_width() - 30), getRandomInt(space.get_height() - 30))
      followEnemyArray = [
        ...followEnemyArray,
        followEnemy,
      ]
    }
  }, 2000)
}

const addClawEnemies = () => {
  setInterval(() => {
    if(clawEnemyArray.length < 1){
      const clawEnemy = ClawEnemy
        .new(getRandomInt(space.get_width() - 30), getRandomInt(space.get_height() - 30))
      clawEnemyArray = [
        ...clawEnemyArray,
        clawEnemy,
      ]
    }
  }, 5000)
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
  spiralEnemyArray.forEach(spiralEnemy => {
    space.check_spiral_enemy_at_edge(spiralEnemy)
  })
  squareEnemyArray.forEach(squareEnemy => {
    space.check_enemy_at_edge(squareEnemy)
    squareEnemy.move_enemy(space, playerShip)
  })
  followEnemyArray.forEach(followEnemy => {
    followEnemy.move_enemy(playerShip)
  })
  clawEnemyArray.forEach(clawEnemy => {
    space.check_claw_enemy_at_edge(clawEnemy)
    clawEnemy.move_enemy(playerShip)
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
    clawEnemyArray.forEach(enemy => {
      enemy.avoid_projectile(projectile)
      enemy.check_dead(projectile)
      enemy.blow_up()
    })
    spiralEnemyArray.forEach(enemy => {
      enemy.check_dead(projectile)
      enemy.blow_up()
    })
  })
  squareEnemyArray = squareEnemyArray.filter(squareEnemy => squareEnemy.base.is_active())
  followEnemyArray = followEnemyArray.filter(followEnemy => followEnemy.base.is_active())
  clawEnemyArray = clawEnemyArray.filter(clawEnemy => clawEnemy.base.is_active())
  spiralEnemyArray = spiralEnemyArray.filter(spiralEnemy => spiralEnemy.is_active())
  
}

const shootProjectile = () => {
  const projectile = Projectile.new(
    playerShip.get_centre_x(), 
    playerShip.get_centre_y(),
    playerShip.get_rotation_degrees(),
    10.0
    )
  projectileArray = [ ...projectileArray, projectile ]
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

const controlShip = () => {
  if(keys[37] && rotationSpeed > -2){
    rotationSpeed -= 1
  } if (keys[39] && rotationSpeed < 2){
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
    if(delay > 5){
        shootProjectile()
        delay = 0
    } else {
        delay += 1
    }
  }
}


addSquareEnemies()
addFollowEnemies()
addClawEnemies()

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
  drawPlayerShip(playerShip.get_centre_x(),playerShip.get_centre_y(), playerShip.get_rotation_degrees())
  drawSquareEnemy()
  drawProjectiles()
  drawFollowEnemy()
  drawClawEnemy()
  // drawSpiral()
}
                

window.onload = () => {
  animate(step)
} 

window.onload()