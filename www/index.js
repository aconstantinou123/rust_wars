import  { 
  PlayerShip, 
  Projectile, 
  Space, 
  SquareEnemy, 
  FollowEnemy, 
  ClawEnemy, 
  SpiralEnemy,
  BasicEnemy,
  PowerUp,
} from "shooter"

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max))

const playerShip = PlayerShip.new()
const space = Space.new(window.innerWidth - 20, 860)
const powerUp = PowerUp.new()


const canvas=document.getElementById("space")
const ctx=canvas.getContext("2d")
canvas.height = space.get_height()
canvas.width = space.get_width()
const cw=canvas.width
const ch=canvas.height
ctx.fillRect(0,0,canvas.width,canvas.height)

let projectileArray = []
let powerUpProjectileArray1 = []
let powerUpProjectileArray2 = []
let squareEnemyArray = []
let followEnemyArray = []
let clawEnemyArray = []
let spiralEnemyArray = []
let basicEnemyArray = []
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
  
  ctx.moveTo(0, 0)
  ctx.lineTo(40, 0)
  ctx.moveTo(0, 0)
  ctx.lineTo(-30, 0)
  ctx.closePath()
  ctx.strokeStyle = '#33F0FF'
  ctx.lineWidth = 3
  ctx.stroke()
  ctx.fill()
  ctx.rotate(-radians)
  ctx.translate(-centerX,-centerY)
  if(playerShip.shockwave.get_is_active()){
    drawShockwave()
  }
}

const drawShockwave = () => {
  ctx.strokeStyle = "#FFFF00";
  ctx.strokeRect(
    playerShip.shockwave.get_x(), 
    playerShip.shockwave.get_y(),
    playerShip.shockwave.get_width(), 
    playerShip.shockwave.get_height())
  if(playerShip.shockwave.get_x() !== 0){
    ctx.strokeRect(
      playerShip.shockwave.get_x() + 25, 
      playerShip.shockwave.get_y() + 25,
      playerShip.shockwave.get_width() - 50, 
      playerShip.shockwave.get_height() -50)
    ctx.strokeRect(
      playerShip.shockwave.get_x() + 50, 
      playerShip.shockwave.get_y() + 50,
      playerShip.shockwave.get_width() - 100, 
      playerShip.shockwave.get_height() -100)
  }
}



const drawProjectiles = (array) => {
  array.forEach(projectile => {
    ctx.beginPath()
    ctx.fillStyle='#FF0000'
    ctx.arc(projectile.get_x(), projectile.get_y(), 5, 2 * Math.PI, false)
    ctx.fill()
  })
}

const drawPowerUp = () => {
  ctx.beginPath()
  ctx.fillStyle='#FF0000'
  ctx.arc(powerUp.get_x(), powerUp.get_y(), powerUp.get_size(), 2 * Math.PI, false)
  ctx.fill()
}

const drawSpiralEnemy = () => {
  spiralEnemyArray.forEach(spiralEnemy => {
    spiralEnemy.spiral_movement()
    ctx.beginPath()
    ctx.strokeStyle="#0033FF"
    ctx.arc(spiralEnemy.base.get_x(),spiralEnemy.base.get_y(), 10,0, 2*Math.PI,false);
    ctx.closePath()
    ctx.stroke()
  })
}

const drawSquareEnemy = () => {
  squareEnemyArray.forEach(squareEnemy => {
    ctx.strokeStyle = "#FFFF00";
    ctx.strokeRect(squareEnemy.base.get_x() - (squareEnemy.base.get_size() / 2), 
    squareEnemy.base.get_y() - (squareEnemy.base.get_size() / 2),
    squareEnemy.base.get_size(), squareEnemy.base.get_size())
    drawEnemyProjectile(squareEnemy)
  })
}

const drawBasicEnemy = () => {
  basicEnemyArray.forEach(basicEnemy => {
    ctx.strokeStyle = "#00FF00";
    ctx.strokeRect(basicEnemy.base.get_x()  - (basicEnemy.base.get_size() / 2.0), 
    basicEnemy.base.get_y() - (basicEnemy.base.get_size() / 2.0),
    basicEnemy.base.get_size(), basicEnemy.base.get_size())  
  })
}

const drawEnemyProjectile = (squareEnemy) => {
  if(squareEnemy.get_can_shoot()){
    ctx.beginPath()
    ctx.moveTo(squareEnemy.base.get_x() + (squareEnemy.base.get_size() / 2),
    squareEnemy.base.get_y() + (squareEnemy.base.get_size() / 2))
    ctx.lineTo(squareEnemy.get_laser_x(), 
    squareEnemy.get_laser_y())
    ctx.strokeStyle = "#FF00FF"
    ctx.stroke()
  }
}

const drawFollowEnemy = () => {
  followEnemyArray.forEach(followEnemy => {
    ctx.beginPath()
    ctx.moveTo (followEnemy.x_draw_position(), followEnemy.y_draw_position())         
    for (let i = 1; i <= followEnemy.get_number_of_sides(); i += 1) {
      ctx.lineTo (followEnemy.draw_x(i), followEnemy.draw_y(i))
    }
    ctx.strokeStyle = "#9D00FF"
    ctx.stroke()
  })
}

const drawClawEnemy = () => {
  clawEnemyArray.forEach(enemy => {
    const centerX = enemy.base.get_x() + enemy.base.get_size() / 2
    const centerY = enemy.base.get_y() + enemy.base.get_size() / 2
    ctx.translate(centerX, centerY)
    ctx.rotate(enemy.get_radians())
    ctx.beginPath()
    ctx.moveTo (enemy.x_draw_position(), enemy.y_draw_position())         
    for (let i = 1; i <= enemy.get_number_of_sides(); i += 1) {
      ctx.lineTo (enemy.draw_x(i), enemy.draw_y(i))
    }
    ctx.strokeStyle = "#FF0000"
    ctx.stroke()
    ctx.rotate(-enemy.get_radians())
    ctx.translate(-centerX, -centerY)
  })
}

const addSquareEnemies = (amountToAdd) => {
  const buffer = 120
  const patrolWidth = space.get_width() - 240
  const patrolHeight = space.get_height() - 240
  const x = getRandomInt(patrolWidth) + buffer
  const y = getRandomInt(patrolHeight) + buffer
  setInterval(() => {
    if(squareEnemyArray.length < amountToAdd){
      const squareEnemy = SquareEnemy.new(x, y)
      squareEnemyArray = [
        ...squareEnemyArray,
        squareEnemy,
      ]
    }
  }, 5000)
}

const addFollowEnemies = (amountToAdd) => {
  setInterval(() => {
    if(followEnemyArray.length < amountToAdd){
      const followEnemy = FollowEnemy
      .new(getRandomInt(space.get_width() - 30), getRandomInt(space.get_height() - 30))
      followEnemyArray = [
        ...followEnemyArray,
        followEnemy,
      ]
    }
  }, 2000)
}

const addBasicEnemies = (amountToAdd) => {
  setInterval(() => {
    if(basicEnemyArray.length < amountToAdd){
      const basicEnemy = BasicEnemy
      .new(getRandomInt(space.get_width() - 30), getRandomInt(space.get_height() - 30))
      basicEnemyArray = [
        ...basicEnemyArray,
        basicEnemy,
      ]
    }
  }, 2000)
}

const updateSpiralEnemies = () => {
  setInterval(() => {
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
  }, 10)
}    

const addClawEnemies = (amountToAdd) => {
  setInterval(() => {
    if(clawEnemyArray.length < amountToAdd){
      const clawEnemy = ClawEnemy
        .new(getRandomInt(space.get_width() - 30), getRandomInt(space.get_height() - 30))
      clawEnemyArray = [
        ...clawEnemyArray,
        clawEnemy,
      ]
    }
  }, 1000)
}

const updatePlayerHealthDisplay = () => {
  const playerHealthElement = document.getElementById("player-health")
  if(playerShip.get_health() >= 1){
    playerHealthElement.innerText = `Ship armor: ${playerShip.get_health()}`
  } else {
    playerHealthElement.innerText = 'Game Over'
  }
}

const updateScoreDisplay = () => {
  const scoreElement = document.getElementById("score")
  scoreElement.innerText = `Score: ${playerShip.get_score()}` 
}

const updateShockwavesDisplay = () => {
  const shockwavesElement = document.getElementById("shockwaves")
  shockwavesElement.innerText = `Shockwaves Remaining: ${playerShip.shockwave.get_shockwaves_remaining()}` 
}

const renderGameOverText = () => {
  ctx.font = "70px Verdana"
  ctx.fillStyle = "white"
  ctx.textAlign = "center"
  ctx.fillText("Game Over", canvas.width/2, canvas.height/2)
  ctx.fillText(`Final Score: ${playerShip.get_score()}`, canvas.width/2, (canvas.height/2) + 70)
}

const updatePlayerShip = () => {
  velX *= 0.98
  velY *= 0.98
  rotationSpeed *= 0.98
  controlShip()
  playerShip.increment_rotation_degrees(rotationSpeed)
  playerShip.increment_centre_x(velX)
  playerShip.increment_centre_y(velY)
  if(playerShip.shockwave.get_is_active()){
    playerShip.detonate(space)
  }
  space.check_player_ship_out_of_bounds(playerShip)
  playerShip.check_is_dead()
}

const updateProjectiles = (array) => {
  array.forEach(projectile => {
    space.check_projectile_out_of_bounds(projectile)
    projectile.calculate_new_x()
    projectile.calculate_new_y()
  })
  return array.filter(projectile => projectile.is_active())
}

const updatePowerUp = () => {
  powerUp.generate_random_position(space)
}

const updateEnemies = () => {
  spiralEnemyArray.forEach(spiralEnemy => {
    spiralEnemy.check_player_ship_collision(playerShip)
    space.check_spiral_enemy_at_edge(spiralEnemy)
    spiralEnemy.check_shockwave_collision(playerShip.shockwave)
  })
  squareEnemyArray.forEach(squareEnemy => {
    squareEnemy.check_player_ship_collision(playerShip)
    space.check_enemy_at_edge(squareEnemy)
    squareEnemy.move_enemy(space, playerShip)
    squareEnemy.check_shockwave_collision(playerShip.shockwave)
  })
  basicEnemyArray.forEach(basicEnemy => {
    basicEnemy.check_player_ship_collision(playerShip)
    space.check_basic_enemy_at_edge(basicEnemy)
    basicEnemy.move_enemy()
    basicEnemy.check_shockwave_collision(playerShip.shockwave)
  })
  followEnemyArray.forEach(followEnemy => {
    followEnemy.check_player_ship_collision(playerShip)
    followEnemy.move_enemy(playerShip)
    followEnemy.check_shockwave_collision(playerShip.shockwave)
  })
  clawEnemyArray.forEach(clawEnemy => {
    clawEnemy.check_player_ship_collision(playerShip)
    space.check_claw_enemy_at_edge(clawEnemy)
    clawEnemy.move_enemy(playerShip)
    clawEnemy.check_shockwave_collision(playerShip.shockwave)
  })
}

const checkProjectileHit = () => {
  projectileArray.forEach(projectile => {
    squareEnemyArray.forEach(enemy => {
      enemy.check_dead(projectile)
      enemy.blow_up(playerShip, 300)
    })
    followEnemyArray.forEach(enemy => {
      enemy.check_dead(projectile)
      enemy.blow_up(playerShip, 200)
    })
    clawEnemyArray.forEach(enemy => {
      enemy.avoid_projectile(projectile)
      enemy.check_dead(projectile)
      enemy.blow_up(playerShip, 500)
    })
    spiralEnemyArray.forEach(enemy => {
      enemy.check_dead(projectile)
      enemy.blow_up(playerShip, 15)
    })
    basicEnemyArray.forEach(enemy => {
      enemy.check_dead(projectile)
      enemy.blow_up(playerShip, 100)
    })
  })
  squareEnemyArray = squareEnemyArray.filter(squareEnemy => squareEnemy.base.is_active())
  followEnemyArray = followEnemyArray.filter(followEnemy => followEnemy.base.is_active())
  clawEnemyArray = clawEnemyArray.filter(clawEnemy => clawEnemy.base.is_active())
  spiralEnemyArray = spiralEnemyArray.filter(spiralEnemy => spiralEnemy.base.is_active())
  basicEnemyArray = basicEnemyArray.filter(basicEnemy => basicEnemy.base.is_active())
  
}

const shootProjectile = (arrayToUpdate, degreesToModify) => {
  const projectile = Projectile.new(
    playerShip.get_centre_x(), 
    playerShip.get_centre_y(),
    playerShip.get_rotation_degrees() + degreesToModify,
    )
  return [ ...arrayToUpdate, projectile ]
}
 

window.addEventListener("keydown", (e) => {
  if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault()
  }
}, false)

document.body.addEventListener("keydown", (e) => {
  keys[e.keyCode] = true
})

document.body.addEventListener("keyup", (e) => {
  keys[e.keyCode] = false
})

const controlShip = () => {
  if(playerShip.get_is_alive()) {
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
    } 
    if (keys[70] && !playerShip.shockwave.get_is_active()) {
      playerShip.activate_shockwave()
    } 
    if (keys[32]){
      if(delay > 0 ){
          projectileArray = shootProjectile(projectileArray, 0)
          powerUpProjectileArray1 = shootProjectile(powerUpProjectileArray1, -10)
          powerUpProjectileArray2 = shootProjectile(powerUpProjectileArray2,10)
          delay = 0
      } else {
          delay += 1
      }
    }
  }
}

const enemyRampUp = () => {
  if (playerShip.get_score() >= 0 && space.get_intensity_level() === 0) {
    space.increment_intensity_level()
    addBasicEnemies(5)
  }
  if (playerShip.get_score() >= 1000 && space.get_intensity_level() === 1) {
    space.increment_intensity_level()
    addBasicEnemies(5)
    addFollowEnemies(5)
    addSquareEnemies(1)
  }
  if (playerShip.get_score() >= 10000 && space.get_intensity_level() === 2) {
    space.increment_intensity_level()
    addBasicEnemies(8)
    addFollowEnemies(5)
    addClawEnemies(1)
  }
  if (playerShip.get_score() >= 20000 && space.get_intensity_level() === 3) {
    space.increment_intensity_level()
    addBasicEnemies(5)
    addFollowEnemies(5)
    addClawEnemies(2)
    updateSpiralEnemies()
  }
  if (playerShip.get_score() >= 40000 && space.get_intensity_level() === 4) {
    space.increment_intensity_level()
    addBasicEnemies(5)
    addFollowEnemies(8)
    addClawEnemies(2)
    updateSpiralEnemies()
    addSquareEnemies(2)
  }
  if (playerShip.get_score() >= 60000 && space.get_intensity_level() === 5) {
    space.increment_intensity_level()
    addBasicEnemies(5)
    addFollowEnemies(8)
    addClawEnemies(2)
    updateSpiralEnemies()
    addSquareEnemies(3)
  }
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
  enemyRampUp()
  updatePlayerShip()
  projectileArray = updateProjectiles(projectileArray)
  powerUpProjectileArray1 = updateProjectiles(powerUpProjectileArray1)
  powerUpProjectileArray2 = updateProjectiles(powerUpProjectileArray2)
  updateEnemies()
  checkProjectileHit()
  updatePlayerHealthDisplay()
  updateScoreDisplay()
  updateShockwavesDisplay()
  updatePowerUp()
}

const render = () => {
  ctx.clearRect(0,0,cw,ch)
  ctx.fillStyle='black'
  ctx.fillRect(0,0,canvas.width,canvas.height)
  if(playerShip.get_is_alive()){
    drawPlayerShip(playerShip.get_centre_x(),playerShip.get_centre_y(), playerShip.get_rotation_degrees())
  } else {
    renderGameOverText()
  }
  drawSquareEnemy()
  drawProjectiles(projectileArray)
  drawProjectiles(powerUpProjectileArray1)
  drawProjectiles(powerUpProjectileArray2)
  drawFollowEnemy()
  drawClawEnemy()
  drawSpiralEnemy()
  drawBasicEnemy()
  drawPowerUp()
}
                

window.onload = () => {
  animate(step)
} 

window.onload()