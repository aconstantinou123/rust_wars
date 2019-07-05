const express = require('express')
const path = require('path')
const cors = require('cors')

const app = express()

const port = process.env.PORT || 5000

app.use(cors())
app.use(express.static(path.join(__dirname, './dist')))

app.get('/media/technical-debt.mp3', (req, res) => {
  res.sendFile(path.join(__dirname, './media/technical-debt.mp3'))
})

app.get('/media/player-shot-2.wav', (req, res) => {
  res.sendFile(path.join(__dirname, './media/player-shot-2.wav'))
})

app.get('/media/enemy-explosion.wav', (req, res) => {
  res.sendFile(path.join(__dirname, './media/enemy-explosion.wav'))
})

app.listen(port, () => {
  console.log(`Shooter is ready to go on port ${port}`)
})
