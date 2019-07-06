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

import { Howl, Howler } from 'howler';
import BufferLoader from './bufferLoader'

const enemyExplosion = new Howl({
  src: ['http://localhost:5000/media/enemy-explosion.wav'],
  volume: 0.2,
})


const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max))

let playerShip = PlayerShip.new()
const space = Space.new(1800, 1200)
const powerUp = PowerUp.new()


const canvas=document.getElementById("space")
const offscreen=document.createElement('canvas')

const primaryCtx=canvas.getContext("2d",  { alpha: false })
const offscreenCtx = offscreen.getContext("2d", { alpha: false })

canvas.width = window.innerWidth - 20
canvas.height = 860
offscreen.width = space.get_width()
offscreen.height = space.get_height()


let initProjectileArray = []
let initPowerUpProjectileArray1 = []
let initPowerUpProjectileArray2 = []
let initStarArray = []

const times = []
let fps
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
let drawSpirals = true
let spiralX = getRandomInt(space.get_width() - 30)
let spiralY = getRandomInt(space.get_height() - 30)
let startGame = false
let startBackgroundMusic = false
let playerShotStarted = false

let squareEnemyInterval
let followEnemyInterval
let clawEnemyInterval
let spiralEnemyInterval
let basicEnemyInterval

let bufferLoader
let context
let playerShotContext

let backgroundMusic
let playerShotSound

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
      startBackgroundMusic = true
      backgroundMusic.start(0)
    })
  }
})

const finishedLoading = (bufferList) => {
  backgroundMusic = context.createBufferSource()
  backgroundMusic.buffer = bufferList[0]
  backgroundMusic.connect(context.destination)

  playerShotGainNode = playerShotContext.createGain()
  playerShotGainNode.gain.value = 0.5 
  playerShotGainNode.connect(playerShotContext.destination)

  playerShotSound = playerShotContext.createBufferSource()
  playerShotSound.buffer = bufferList[1]
  playerShotSound.connect(playerShotGainNode)
  
  const loading = document.querySelector('.loading')
  const playerInfo = document.querySelector('#player-info')
  const modalWrapper = document.querySelector('.modal-wrapper')
  modalWrapper.style.display = "block"
  playerInfo.style.display = "flex"
  loading.style.display = "none"
}

const init = () => {
  window.AudioContext = window.AudioContext || window.webkitAudioContext
  context = new AudioContext()
  playerShotContext = new AudioContext()

  bufferLoader = new BufferLoader(
    context,
    [
      'http://localhost:5000/media/technical-debt.mp3',
      'http://localhost:5000/media/player-shot-2.wav',
      'http://localhost:5000/media/enemy-explosion.wav',
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
    if(projectile.is_active()){
      draw_projectile(projectile, '#ff073a', offscreenCtx)
    }
  })
}

const drawStars = () => {
  starArray.forEach(star => {
    draw_star(star, 'white', offscreenCtx)
  })
}

const drawPowerUp = () => {
  draw_power_up(powerUp, offscreenCtx)
}

const drawSpiralEnemy = () => {
  spiralEnemyArray.forEach(spiralEnemy => {
    if(spiralEnemy.get_added_to_array()){
      spiralEnemy.spiral_movement()
      draw_spiral_enemy(spiralEnemy, "#0033FF", offscreenCtx)
    }
  })
}

const drawSquareEnemy = () => {
  squareEnemyArray.forEach(squareEnemy => {
    if(squareEnemy.get_added_to_array()){
      draw_square_enemy(squareEnemy, "#FFFF00", offscreenCtx)
      drawEnemyProjectile(squareEnemy)
    }
  })
}

const drawBasicEnemy = () => {
  basicEnemyArray.forEach(basicEnemy => {
    if(basicEnemy.get_added_to_array()){
      draw_basic_enemy(basicEnemy,  "#00FF00", offscreenCtx)
    }
  })
}

const drawEnemyProjectile = (squareEnemy) => {
  if(squareEnemy.get_can_shoot()){
    draw_enemy_projectile(squareEnemy, "#FF00FF", offscreenCtx)
  }
}

const drawFollowEnemy = () => {
  followEnemyArray.forEach(followEnemy => {
    if(followEnemy.get_added_to_array()){
      draw_follow_enemy(followEnemy, "#9D00FF", offscreenCtx)
    }
  })
}

const drawClawEnemy = () => {
  clawEnemyArray.forEach(clawEnemy => {
    if(clawEnemy.get_added_to_array()){
      draw_claw_enemy(clawEnemy, "#FF0000", offscreenCtx)
    }
  })
}

const initProjectileArrays = (arrayToUpdate) => {
  for(let i = 0; i < 100; i++){
    const projectile = Projectile.new(0,0,0)
    arrayToUpdate = [ ...arrayToUpdate, projectile ]
  }
  return arrayToUpdate
}

const initSquareEnemies = () => {
  for(let i = 0; i < 5; i++){
    const buffer = 120
    const patrolWidth = 1560
    const patrolHeight = 960
    const x = getRandomInt(patrolWidth) + buffer
    const y = getRandomInt(patrolHeight) + buffer
    const squareEnemy = SquareEnemy.new(x, y)
    squareEnemyArray = [
      ...squareEnemyArray,
      squareEnemy,
    ]
  }
}

const initFollowEnemies = (amountToAdd) => {
  for(let i = 0; i < amountToAdd; i++){
    const followEnemy = FollowEnemy
    .new(getRandomInt(space.get_width() - 30), getRandomInt(space.get_height() - 30))
    followEnemyArray = [
      ...followEnemyArray,
      followEnemy,
    ]
  }
}

const initStars = (amountToAdd) => {
  for(let i = 0; i < amountToAdd; i++){
    const star = Star
      .new(space.get_width() / 2, space.get_height() / 2)
      initStarArray = [
        ...initStarArray,
        star,
      ]
    }
  }
  
const initBasicEnemies = (amountToAdd) => {
  for(let i = 0; i < amountToAdd; i++){
    const basicEnemy = BasicEnemy 
      .new(getRandomInt(space.get_width() - 30), getRandomInt(space.get_height() - 30))
    basicEnemyArray = [
      ...basicEnemyArray,
      basicEnemy,
    ]
  }
}

const initClawEnemies = (amountToAdd) => {
  for(let i = 0; i < amountToAdd; i++){
    const clawEnemy = ClawEnemy
      .new(getRandomInt(space.get_width() - 30), getRandomInt(space.get_height() - 30))
    clawEnemyArray = [
      ...clawEnemyArray,
      clawEnemy,
    ]
  }
}

const initSpiralEnemies = (amountToAdd) => {
  for(let i = 0; i < amountToAdd; i++){
    const spiralEnemy = SpiralEnemy
      .new(0, 0)
    spiralEnemyArray = [
      ...spiralEnemyArray,
      spiralEnemy
    ]
  }
}

initProjectileArray = initProjectileArrays(initProjectileArray, 0)
initPowerUpProjectileArray1 = initProjectileArrays(initPowerUpProjectileArray1, -10)
initPowerUpProjectileArray2 = initProjectileArrays(initPowerUpProjectileArray2, 10)
initBasicEnemies(20)
initSquareEnemies(5)
initFollowEnemies(20)
initClawEnemies(10)
initSpiralEnemies(30)
initStars(10)

const addStars = () => {
  setInterval(() => {
    if(starArray.length < 10){
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
      enemyArray[idx] = enemyToSet
    }
  }, 2000)
}


const updateSpiralEnemies = () => {
  spiralEnemyInterval = setInterval(() => {
    const addedArrayLength = spiralEnemyArray
    .filter(enemy => enemy.get_added_to_array()).length
    const activeArrayLength = spiralEnemyArray
    .filter(enemy => enemy.base.is_active()).length
  if(addedArrayLength == 30 && activeArrayLength == 30){
    drawSpirals = false
  } else if(activeArrayLength <= 30 && drawSpirals && startGame){
      let idx
      const spiralEnemyToSet = spiralEnemyArray
        .find((enemy, index)  => {
          idx = index
          return !enemy.base.is_active()
        })
      spiralEnemyToSet.set_active()
      spiralEnemyToSet.set_add_to_array()
      spiralEnemyToSet.set_x(spiralX)
      spiralEnemyToSet.set_x(spiralY)
      spiralEnemyToSet.set_speed(1)
      spiralEnemyArray[idx] = spiralEnemyToSet
  } else if (addedArrayLength == 30 && activeArrayLength == 0){
    drawSpirals = true
    spiralX = getRandomInt(space.get_width() - 30)
    spiralY = getRandomInt(space.get_height() - 30)
  }
  }, 10)
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
      enemy.update(playerShip, space)
    }
  })
}

const checkProjectileHit = () => {
  initProjectileArray.forEach(projectile => {
    squareEnemyArray.forEach(enemy => {
      enemy.check_dead(projectile)
      enemy.blow_up(playerShip, 300)
      // if(!enemy.base.is_active()){
      //   enemyExplosion.play()
      // }
    })
    followEnemyArray.forEach(enemy => {
      enemy.check_dead(projectile)
      enemy.blow_up(playerShip, 200)
      // if(!enemy.base.is_active()){
      //   enemyExplosion.play()
      // }
    })
    clawEnemyArray.forEach(enemy => {
      enemy.avoid_projectile(projectile)
      enemy.check_dead(projectile)
      enemy.blow_up(playerShip, 500)
      // if(!enemy.base.is_active()){
      //   enemyExplosion.play()
      // }
    })
    spiralEnemyArray.forEach(enemy => {
      enemy.check_dead(projectile)
      enemy.blow_up(playerShip, 15)
      // if(!enemy.base.is_active()){
      //   enemyExplosion.play()
      // }
    })
    basicEnemyArray.forEach(enemy => {
      enemy.check_dead(projectile)
      enemy.blow_up(playerShip, 100)
      // if(!enemy.base.is_active()){
      //   enemyExplosion.play()
      // }
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
      const amountToDelay =  playerShip.get_power_up() === 'projectile' ? 0 : 5
      if(delay > amountToDelay ){
          initProjectileArray = shootProjectile(initProjectileArray, 0)
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
            initPowerUpProjectileArray1 = shootProjectile(initPowerUpProjectileArray1, -10)
            initPowerUpProjectileArray2 = shootProjectile(initPowerUpProjectileArray2,10)
          }
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
    addEnemies(basicEnemyArray, 20, basicEnemyInterval)
    addEnemies(followEnemyArray, 10, followEnemyInterval)
    addEnemies(squareEnemyArray, 3, squareEnemyInterval)
    addEnemies(clawEnemyArray, 5, clawEnemyInterval)
    updateSpiralEnemies()
  } 
  // else if (playerShip.get_score() >= 1000 && space.get_intensity_level() === 1) {
  //   space.increment_intensity_level()
    // addFollowEnemies(20)
  //   addSquareEnemies(4)
  // } else if (playerShip.get_score() >= 10000 && space.get_intensity_level() === 2) {
  //   space.increment_intensity_level()
  //   clearInterval(basicEnemyInterval)
  //   addBasicEnemies(16)
  //   addClawEnemies(4)
  // } else if (playerShip.get_score() >= 20000 && space.get_intensity_level() === 3) {
  //   space.increment_intensity_level()
  //   updateSpiralEnemies() 
  // } else if (playerShip.get_score() >= 40000 && space.get_intensity_level() === 4) {
  //   space.increment_intensity_level()
  //   clearInterval(followEnemyInterval)
  //   addFollowEnemies(30)
  //   clearInterval(squareEnemyInterval)
  //   addSquareEnemies(4)
  // } else if (playerShip.get_score() >= 60000 && space.get_intensity_level() === 5) {
  //   space.increment_intensity_level()
  //   clearInterval(squareEnemyInterval)
  //   addSquareEnemies(10)
  // }
}



const restartGame = () => {
  renderGameOverText()
  initProjectileArray = []
  initPowerUpProjectileArray1 = []
  initPowerUpProjectileArray2 = []
  squareEnemyArray = []
  followEnemyArray = []
  clawEnemyArray = []
  spiralEnemyArray = []
  basicEnemyArray = []
  keys = []
  velX = 0
  velY = 0
  rotationSpeed = 0
  delay = 0
  drawSpirals = true
  spiralX = getRandomInt(space.get_width() - 30)
  spiralY = getRandomInt(space.get_height() - 30)
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

refreshLoop()
addStars()

const step = () => {
  animate(step)
  update()
  render()
}

const update = () => {
  starArray = updateStarArray()
  if(startGame){
    enemyRampUp()
    updatePlayerShip()
    updateProjectiles(initProjectileArray)
    if(playerShip.get_power_up() === 'projectile'){
      updateProjectiles(initPowerUpProjectileArray1)
      updateProjectiles(initPowerUpProjectileArray2)
    }
    updateEnemies()
    checkProjectileHit()
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
      playButton.click()
    }
    drawSquareEnemy()
    drawProjectiles(initProjectileArray)
    if(playerShip.get_power_up() === 'projectile'){
      drawProjectiles(initPowerUpProjectileArray1)
      drawProjectiles(initPowerUpProjectileArray2)
    }
    drawFollowEnemy()
    drawClawEnemy()
    drawSpiralEnemy()
    drawBasicEnemy()
    drawPowerUp()
  }
}
                

window.onload = () => {
  init()
  animate(step)
} 

window.onload()