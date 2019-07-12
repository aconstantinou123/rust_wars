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
  Star,
  draw_projectile,
  draw_spiral_enemy,
  draw_player_ship,
  draw_shockwave,
  draw_power_up,
  draw_square_enemy,
  draw_basic_enemy,
  draw_enemy_projectile,
  draw_follow_enemy,
  draw_claw_enemy,
  draw_star,
  draw_outline,
  draw_offscreen_canvas,
} from "shooter"

import BufferLoader from './bufferLoader'

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max))
const spaceX = 1100
const spaceY =  1100

let playerShip = PlayerShip.new()
const space = Space.new(spaceX, spaceY)
const powerUp = PowerUp.new()


const canvas=document.getElementById("space")
const offscreen = new OffscreenCanvas(space.get_width(), space.get_height())

const primaryCtx = canvas.getContext("2d",  { alpha: false })
const offscreenCtx = offscreen.getContext("2d", { alpha: false })

canvas.width = (window.innerWidth - 20) * 0.75
canvas.height = 860 * 0.75

let initStarArray = []

const times = []
let fps
let projectileArray = []
let powerUpProjectileArray1 = []
let powerUpProjectileArray2 = []
let squareEnemyArray = []
let followEnemyArray = []
let clawEnemyArray = []
let spiralEnemyArray = []
let basicEnemyArray = []
let starArray = []
let keys = []
let velX = 0
let velY = 0
let rotationSpeed = 0
let delay = 0
let startGame = false
let startBackgroundMusic = false
let playerShotStarted = false

let squareEnemyInterval
let followEnemyInterval
let clawEnemyInterval
let spiralEnemyInterval
let basicEnemyInterval

let bufferLoader
const explosionContext = new AudioContext()
const context = new AudioContext()
const playerShotContext = new AudioContext()
const playerExplosionContext = new AudioContext()

let backgroundMusic
let playerShotSound
let explosionSound
let playerExplosionSound

let playerShotGainNode


const playButton = document.getElementById('play-button')
const modal = document.getElementById('modal-content')

playButton.addEventListener('click', function() {
  const computedDisplay = window.getComputedStyle(modal, null).getPropertyValue('display');
  if (computedDisplay === "block") {
    modal.style.display = "none"
  } else {
    modal.style.display = "block"
  }
  startGame = !startGame
  if(!startBackgroundMusic){
    context.resume().then(() => {
      backgroundMusic.loop = true
      backgroundMusic.start(0)
      startBackgroundMusic = true
    })
  }
})

const finishedLoading = (bufferList) => {
  const backgroundMusicGainNode = context.createGain()
  backgroundMusicGainNode.gain.value = 0.4 
  backgroundMusicGainNode.connect(context.destination)

  backgroundMusic = context.createBufferSource()
  backgroundMusic.buffer = bufferList[0]
  backgroundMusic.connect(backgroundMusicGainNode)

  playerShotGainNode = playerShotContext.createGain()
  playerShotGainNode.gain.value = 0.5 
  playerShotGainNode.connect(playerShotContext.destination)

  playerShotSound = playerShotContext.createBufferSource()
  playerShotSound.buffer = bufferList[1]
  playerShotSound.connect(playerShotGainNode)

  explosionSound = bufferList[2]
  playerExplosionSound = bufferList[3]
  
  const loading = document.querySelector('.loading')
  const playerInfo = document.querySelector('#player-info')
  const modalWrapper = document.querySelector('.modal-wrapper')
  modalWrapper.style.display = "block"
  playerInfo.style.display = "flex"
  loading.style.display = "none"
}

const playExplosion = () => {
  const explosion = explosionContext.createBufferSource()
  explosion.buffer = explosionSound
  explosion.connect(explosionContext.destination)
  explosion.start(0)
  explosion.stop(explosionContext.currentTime + 1)
  explosion.onended(() => {
    explosion.disconnect()
  })
}

const playPlayerExplosion = () => {
  const playerExplosion = playerExplosionContext.createBufferSource()
  playerExplosion.buffer = playerExplosionSound
  playerExplosion.connect(playerExplosionContext.destination)
  playerExplosion.start(0)
}

const init = () => {
  window.AudioContext = window.AudioContext || window.webkitAudioContext
  bufferLoader = new BufferLoader(
    context,
    [
      'http://localhost:5000/media/future-club.mp3',
      'http://localhost:5000/media/player-shot-2.wav',
      'http://localhost:5000/media/enemy-explosion.wav',
      'http://localhost:5000/media/player-explosion.wav',
    ],
    finishedLoading
    )
  bufferLoader.load()
}



const drawPlayerShip = () => {
  draw_player_ship(playerShip, offscreenCtx)
  if(playerShip.shockwave.get_is_active()){
    drawShockwave()
  }
}

const drawShockwave = () => {
  draw_shockwave(playerShip, "#FFFF00", offscreenCtx)
}

const drawProjectiles = (array) => {
  array.forEach(projectile => {
    if(projectile.is_active()
    && projectile.can_draw(playerShip, window.innerWidth / 0.7, window.innerHeight / 0.7)){
      draw_projectile(projectile, '#ff073a', offscreenCtx)
    }
  })
}

const drawStars = () => {
  starArray.forEach(star => {
    if(star.can_draw(playerShip, window.innerWidth / 0.7, window.innerHeight / 0.7)){
      draw_star(star, 'white', offscreenCtx)
    }
  })
}

const drawPowerUp = () => {
  draw_power_up(powerUp, offscreenCtx)
}

const drawSpiralEnemy = () => {
  spiralEnemyArray.forEach(spiralEnemy => {
    if(spiralEnemy.get_added_to_array() && spiralEnemy.base.is_active()
    && spiralEnemy.base.can_draw(playerShip, window.innerWidth / 0.7, window.innerHeight / 0.7)){
      spiralEnemy.spiral_movement()
      draw_spiral_enemy(spiralEnemy, "#0033FF", offscreenCtx)
    }
  })
}

const drawSquareEnemy = () => {
  squareEnemyArray.forEach(squareEnemy => {
    if(squareEnemy.get_added_to_array() && squareEnemy.base.is_active()
    && squareEnemy.base.can_draw(playerShip, window.innerWidth / 0.7, window.innerHeight / 0.7)){
      draw_square_enemy(squareEnemy, "#FFFF00", offscreenCtx)
      drawEnemyProjectile(squareEnemy)
    }
  })
}

const drawEnemyProjectile = (squareEnemy) => {
  if(squareEnemy.get_can_shoot()
  && squareEnemy.base.can_draw(playerShip, window.innerWidth / 0.7, window.innerHeight / 0.7)){
    draw_enemy_projectile(squareEnemy, "#FF00FF", offscreenCtx)
  }
}

const drawEnemy = (enemyArray, color, drawFunction, playerShip) => {
  enemyArray.forEach(enemy => {
    if(enemy.get_added_to_array() && enemy.base.is_active()
    && enemy.base.can_draw(playerShip, window.innerWidth / 0.7, window.innerHeight / 0.7)){
      drawFunction(enemy, color, offscreenCtx)
    }
  })
}

const initObjectArrays = (array, amountToAdd, Type, optionalX, optionalY, optionalRadians) => {
  const x = optionalX ? optionalX : getRandomInt(space.get_width() - 30)
  const y = optionalY ? optionalY : getRandomInt(space.get_height() - 30)
  const radians = optionalRadians ? optionalRadians : null
  for(let i = 0; i < amountToAdd; i++){
    const object = Type.new(x, y, radians)
    array = [
      ...array,
      object,
    ]
  }
  return array
}

const initSquareArray = (squareEnemyArray, amountToAdd) => {
  for(let i = 0; i < amountToAdd; i++){
    const buffer = 300
    const patrolWidth = spaceX - (buffer * 2)
    const patrolHeight = spaceY - (buffer * 2)
    const squareEnemyX = getRandomInt(patrolWidth) + buffer
    const squareEnemyY = getRandomInt(patrolHeight) + buffer
    const squareEnemy = SquareEnemy.new(squareEnemyX, squareEnemyY)
    squareEnemyArray = [
      ...squareEnemyArray,
      squareEnemy,
    ]
  }
  return squareEnemyArray
}

const addStars = () => {
  setInterval(() => {
    if(starArray.length < 20){
      const star = initStarArray.pop()
      starArray = [
        ...starArray,
        star,
      ]
    }
  }, 75)
}

const addEnemies = (enemyArray, amountToAdd, interval) => {
  interval = setInterval(() => {
    const activeArrayLength = enemyArray
      .filter(enemy => enemy.get_added_to_array()).length
      if(activeArrayLength < amountToAdd && startGame){
      let idx
      const enemyToSet = enemyArray
      .find((enemy, index)  => {
        idx = index
        return !enemy.get_added_to_array()
      })
      enemyToSet.set_add_to_array()
      enemyToSet.set_ready_to_remove_false()
      enemyArray[idx] = enemyToSet
    } else {
      clearInterval(interval)
    }
  }, 2000)
}


// const updateSpiralEnemies = () => {
//   spiralEnemyInterval = setInterval(() => {
//     const addedArrayLength = spiralEnemyArray
//     .filter(enemy => enemy.get_added_to_array()).length
//     const activeArrayLength = spiralEnemyArray
//     .filter(enemy => enemy.base.is_active()).length
//   if(addedArrayLength == 30 && activeArrayLength == 30){
//     drawSpirals = false
//   } else if(activeArrayLength <= 30 && drawSpirals && startGame){
//       let idx
//       const spiralEnemyToSet = spiralEnemyArray
//         .find((enemy, index)  => {
//           idx = index
//           return !enemy.base.is_active()
//         })
//       spiralEnemyToSet.set_active()
//       spiralEnemyToSet.set_add_to_array()
//       spiralEnemyToSet.set_x(spiralX)
//       spiralEnemyToSet.set_x(spiralY)
//       spiralEnemyToSet.set_speed(1)
//       spiralEnemyArray[idx] = spiralEnemyToSet
//   } else if (addedArrayLength == 30 && activeArrayLength == 0){
//     drawSpirals = true
//     spiralX = getRandomInt(space.get_width() - 30)
//     spiralY = getRandomInt(space.get_height() - 30)
//   }
//   }, 10)
// }    

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

const updateFPSDisplay = () => {
  const shockwavesElement = document.getElementById("fps")
  shockwavesElement.innerText = `FPS: ${fps}` 
}

const renderGameOverText = () => {
  const modalText = document.getElementById("modal-text")
  modalText.innerHTML = ''
  const gameOver =  document.createElement("h2")
  const score = document.createElement("h2")
  gameOver.innerText = "Game Over"
  gameOver.setAttribute("class", "game-over")
  score.innerText = `Final Score: ${playerShip.get_score()}`
  score.setAttribute("class", "game-over")
  modalText.appendChild(gameOver)
  modalText.appendChild(score)
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
}

const updateStarArray = () => {
  starArray.forEach(star => {
    space.check_star_out_of_bounds(star)
    star.calculate_new_x()
    star.calculate_new_y()
  })
  return starArray
}

const updatePowerUp = () => {
  if(playerShip.get_power_up() !== 'normal'){
    powerUp.power_up_countdown(playerShip)
  } else if(startGame) {
    powerUp.generate_random_position(space)
  }
  powerUp.check_collision_with_player_ship(playerShip)
}

const updateEnemies = () => {
  [
    ...spiralEnemyArray,
    ...squareEnemyArray,
    ...basicEnemyArray,
    ...clawEnemyArray,
    ...followEnemyArray
  ].forEach(enemy => {
    if(enemy.get_added_to_array()){
      enemy.update(playerShip, space, spaceX, spaceY)
      if (enemy.base.get_is_ready_to_remove() && enemy.base.is_active() && enemy.base.get_size() === 100.0){
        playExplosion()
      }
    } 
  })
}

const checkProjectileHit = (projectileArray) => {
  projectileArray.forEach(projectile => {
    [
      ...spiralEnemyArray,
      ...squareEnemyArray,
      ...basicEnemyArray,
      ...followEnemyArray
    ].forEach(enemy => {
        enemy.check_dead(projectile)
    })
    clawEnemyArray.forEach(enemy => {
      enemy.avoid_projectile(projectile)
      enemy.check_dead(projectile)
    })
  }) 
}

const shootProjectile = (projectileArray, degreesToModify) => {
    let idx
    const projectileToSet = projectileArray
      .find((projectile, index)  => {
        idx = index
        return !projectile.is_active()
      })
    projectileToSet.reset_state(
      playerShip.get_centre_x(), 
      playerShip.get_centre_y(),
      playerShip.get_rotation_degrees() + degreesToModify,
      )
      projectileArray[idx] = projectileToSet
  return projectileArray
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
  if(e.keyCode === 32){
    if(context.state === 'running') {
      playerShotSound.loopEnd = 1;
      setTimeout(() => {
        playerShotContext.suspend()
      }, 500)
    }
  }
})

const controlShip = () => {
  if(playerShip.get_is_alive()) {
    if(keys[37] && rotationSpeed > -4){
      rotationSpeed -= 2
    } if (keys[39] && rotationSpeed < 4){
      rotationSpeed += 2
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
      const amountToDelay =  playerShip.get_power_up() === 'projectile' ? 0 : 2
      if(delay > amountToDelay ){
          projectileArray = shootProjectile(projectileArray, 0)
          playerShotContext.resume().then(() => {
          playerShotSound.loopEnd = 0.1
          playerShotGainNode.gain.value = 0.5
            if(!playerShotStarted){
              playerShotSound.loop = true
              playerShotSound.start(0)
              playerShotStarted = true
            }
          })
          if(playerShip.get_power_up() === 'projectile'){
            powerUpProjectileArray1 = shootProjectile(powerUpProjectileArray1, -10)
            powerUpProjectileArray2 = shootProjectile(powerUpProjectileArray2,10)
          }
          delay = 0
      } else {
          delay += 1
      }
    }
  }
}

const resetEnemyArray = (enemyArray) => {
  enemyArray.forEach(enemy => {
    enemy.remove_enemy_from_array()
  })
  return enemyArray
}

const enemyRampUp = () => {
  if (playerShip.get_score() >= 0 && space.get_intensity_level() === 0) {
    space.increment_intensity_level()
    addEnemies(basicEnemyArray, 5, basicEnemyInterval)
    addEnemies(spiralEnemyArray, 5, spiralEnemyInterval)
    // addEnemies(followEnemyArray, 5, followEnemyInterval)
    // addEnemies(squareEnemyArray, 5, squareEnemyInterval)
    // addEnemies(clawEnemyArray, 3, clawEnemyInterval)
    // updateSpiralEnemies() 
  } 
  else if (playerShip.get_score() >= 1000 && space.get_intensity_level() === 1) {
    space.increment_intensity_level()
    basicEnemyArray = resetEnemyArray(basicEnemyArray)
    spiralEnemyArray = resetEnemyArray(spiralEnemyArray)
    addEnemies(followEnemyArray, 5, followEnemyInterval)
    addEnemies(squareEnemyArray, 2, squareEnemyInterval)
    addEnemies(spiralEnemyArray, 5, spiralEnemyInterval)
    addEnemies(clawEnemyArray, 2, clawEnemyInterval)
  } 
  else if (playerShip.get_score() >= 20000 && space.get_intensity_level() === 2) {
    space.increment_intensity_level()
    basicEnemyArray = resetEnemyArray(basicEnemyArray)
    followEnemyArray = resetEnemyArray(followEnemyArray)
    squareEnemyArray = resetEnemyArray(squareEnemyArray)
    spiralEnemyArray = resetEnemyArray(spiralEnemyArray)
    clawEnemyArray = resetEnemyArray(clawEnemyArray)
    addEnemies(followEnemyArray, 5, followEnemyInterval)
    addEnemies(squareEnemyArray, 2, squareEnemyInterval)
    addEnemies(basicEnemyArray, 10, basicEnemyInterval)
    addEnemies(clawEnemyArray, 5, clawEnemyInterval)
    addEnemies(spiralEnemyArray, 7, spiralEnemyInterval)
  } else if (playerShip.get_score() >= 40000 && space.get_intensity_level() === 3) {
    space.increment_intensity_level()
    basicEnemyArray = resetEnemyArray(basicEnemyArray)
    followEnemyArray = resetEnemyArray(followEnemyArray)
    squareEnemyArray = resetEnemyArray(squareEnemyArray)
    clawEnemyArray = resetEnemyArray(clawEnemyArray)
    spiralEnemyArray = resetEnemyArray(spiralEnemyArray)
    addEnemies(followEnemyArray, 5, followEnemyInterval)
    addEnemies(squareEnemyArray, 2, squareEnemyInterval)
    addEnemies(basicEnemyArray, 10, basicEnemyInterval)
    addEnemies(clawEnemyArray, 2, clawEnemyInterval)
    addEnemies(spiralEnemyArray, 10, spiralEnemyInterval)
    // updateSpiralEnemies() 
  } else if (playerShip.get_score() >= 60000 && space.get_intensity_level() === 4) {
    space.increment_intensity_level()
    basicEnemyArray = resetEnemyArray(basicEnemyArray)
    followEnemyArray = resetEnemyArray(followEnemyArray)
    squareEnemyArray = resetEnemyArray(squareEnemyArray)
    clawEnemyArray = resetEnemyArray(clawEnemyArray)
    spiralEnemyArray = resetEnemyArray(spiralEnemyArray)
    addEnemies(basicEnemyArray, 10, basicEnemyInterval)
    addEnemies(clawEnemyArray, 2, clawEnemyInterval)
    addEnemies(followEnemyArray, 10, followEnemyInterval)
    addEnemies(squareEnemyArray, 2, squareEnemyInterval)
    addEnemies(spiralEnemyArray, 10, spiralEnemyInterval)
    // updateSpiralEnemies()
  } else if (playerShip.get_score() >= 80000 && space.get_intensity_level() === 5) {
    space.increment_intensity_level()
    basicEnemyArray = resetEnemyArray(basicEnemyArray)
    followEnemyArray = resetEnemyArray(followEnemyArray)
    squareEnemyArray = resetEnemyArray(squareEnemyArray)
    clawEnemyArray = resetEnemyArray(clawEnemyArray)
    spiralEnemyArray = resetEnemyArray(spiralEnemyArray)
    addEnemies(squareEnemyArray, 4, squareEnemyInterval)
    addEnemies(basicEnemyArray, 10, basicEnemyInterval)
    addEnemies(clawEnemyArray, 2, clawEnemyInterval)
    addEnemies(followEnemyArray, 10, followEnemyInterval)
    addEnemies(spiralEnemyArray, 10, spiralEnemyInterval)
    // updateSpiralEnemies()
  }
}



const restartGame = () => {
  renderGameOverText()
  projectileArray = []
  powerUpProjectileArray1 = []
  powerUpProjectileArray2 = []
  squareEnemyArray = []
  followEnemyArray = []
  clawEnemyArray = []
  spiralEnemyArray = []
  basicEnemyArray = []
  projectileArray = initObjectArrays(projectileArray, 100, Projectile, 0, 0, 0)
  powerUpProjectileArray1 = initObjectArrays(powerUpProjectileArray1, 100, Projectile, 0, 0, 0)
  powerUpProjectileArray2 = initObjectArrays(powerUpProjectileArray2, 100, Projectile, 0, 0, 0)
  basicEnemyArray = initObjectArrays(basicEnemyArray, 20, BasicEnemy)
  squareEnemyArray = initSquareArray(squareEnemyArray, 5, SquareEnemy)
  followEnemyArray = initObjectArrays(followEnemyArray, 20, FollowEnemy)
  clawEnemyArray = initObjectArrays(clawEnemyArray, 10, ClawEnemy)
  spiralEnemyArray = initObjectArrays(spiralEnemyArray, 30, SpiralEnemy)
  const starX = space.get_width() / 2
  const starY = space.get_height() / 2
  initStarArray = initObjectArrays(initStarArray, 20, Star, starX, starY)
  keys = []
  velX = 0
  velY = 0
  rotationSpeed = 0
  delay = 0
  playerShip = PlayerShip.new()
  space.reset_intensity_level()
  clearInterval(squareEnemyInterval)
  clearInterval(followEnemyInterval)
  clearInterval(clawEnemyInterval)
  clearInterval(spiralEnemyInterval)
  clearInterval(basicEnemyInterval)
}


const animate = requestAnimationFrame

function refreshLoop() {
  window.requestAnimationFrame(() => {
    const now = performance.now()
    while (times.length > 0 && times[0] <= now - 1000) {
      times.shift()
    }
    times.push(now)
    fps = times.length
    refreshLoop()
  });
}

projectileArray = initObjectArrays(projectileArray, 100, Projectile, 0, 0, 0)
powerUpProjectileArray1 = initObjectArrays(powerUpProjectileArray1, 100, Projectile, 0, 0, 0)
powerUpProjectileArray2 = initObjectArrays(powerUpProjectileArray2, 100, Projectile, 0, 0, 0)
basicEnemyArray = initObjectArrays(basicEnemyArray, 20, BasicEnemy)
squareEnemyArray = initSquareArray(squareEnemyArray, 5, SquareEnemy)
followEnemyArray = initObjectArrays(followEnemyArray, 20, FollowEnemy)
clawEnemyArray = initObjectArrays(clawEnemyArray, 10, ClawEnemy)
spiralEnemyArray = initObjectArrays(spiralEnemyArray, 30, SpiralEnemy)
const starX = space.get_width() / 2
const starY = space.get_height() / 2
initStarArray = initObjectArrays(initStarArray, 20, Star, starX, starY)

refreshLoop()
addStars()


const framerate = 1000 / 60
const step = () => {
    const delta = Date.now()
    const deltaTime = Date.now() - delta
    if (deltaTime >= framerate) {
        animate(step)
        update()
        render()
    }
    else {
        setTimeout(() => { 
          animate(step)
          update()
          render()
      }, framerate - deltaTime)
    }
}

const update = () => {
  starArray = updateStarArray()
  if(startGame){
    enemyRampUp()
    updatePlayerShip()
    updateProjectiles(projectileArray)
    if(playerShip.get_power_up() === 'projectile'){
      updateProjectiles(powerUpProjectileArray1)
      updateProjectiles(powerUpProjectileArray2)
      checkProjectileHit(powerUpProjectileArray1)
      checkProjectileHit(powerUpProjectileArray2)
    }
    updateEnemies()
    checkProjectileHit(projectileArray)
    updatePlayerHealthDisplay()
    updateScoreDisplay()
    updateShockwavesDisplay()
    updatePowerUp()
    updateFPSDisplay()
    draw_offscreen_canvas(space, playerShip, canvas, offscreen, primaryCtx, offscreenCtx)
  }
}

const render = () => {
  drawStars()
  if(startGame){
    draw_outline(space, '#ea00d9', offscreenCtx)
    if(playerShip.get_is_alive()){
      drawPlayerShip()
    } else {
      restartGame()
      playPlayerExplosion()
      playButton.click()
    }
    if(playerShip.get_power_up() === 'projectile'){
      drawProjectiles(powerUpProjectileArray1)
      drawProjectiles(powerUpProjectileArray2)
    }
    drawSquareEnemy()
    drawProjectiles(projectileArray)
    drawEnemy(followEnemyArray, "#9D00FF", draw_follow_enemy, playerShip)
    drawEnemy(clawEnemyArray, "#FF0000", draw_claw_enemy, playerShip)
    drawSpiralEnemy()
    drawEnemy(basicEnemyArray,  "#00FF00", draw_basic_enemy, playerShip)
    drawPowerUp()
  }
}
                

window.onload = () => {
  init()
  animate(step)
} 

window.onload()