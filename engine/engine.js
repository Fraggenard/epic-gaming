import "./Component.js"
import "./GameObject.js"
import "./RectangleCollider.js"
import "./SceneContainer.js"
import "./SceneManager.js"

import "./Transform.js"
import "./Camera.js"

let canvas = document.querySelector("#canv")
let ctx = canvas.getContext("2d")

let keysDown = []

document.addEventListener("keydown", keyDown)
document.addEventListener("keyup", keyUp)

let paused = false

function keyUp(e) {
  keysDown[e.key] = false
}

function keyDown(e) {
  keysDown[e.key] = true
  if (e.key == "p") {
    paused = !paused
  }
}

function engineUpdate() {
  if (paused) {
    return
  }
  if (sceneManager.sceneChanged && sceneManager.getCurrentScene().start)
  {
    let camera = sceneManager.getCurrentScene().gameObjects[0]
    sceneManager.getCurrentScene().gameObjects = []
    sceneManager.getCurrentScene().gameObjects.push(camera)
    console.log("camera added")

    let previousScene = sceneManager.getPreviousScene()
    if (previousScene)
    {
      for (let gameObject of previousScene.gameObjects)
      {
        if (gameObject.markedDoNotDestroyOnLoad)
        {
          sceneManager.getCurrentScene().gameObjects.push(gameObject)
        }
      }
    }
    
    sceneManager.getCurrentScene().start()
    sceneManager.sceneChanged = false
  }

for (let gameObject of sceneManager.getCurrentScene().gameObjects)
{
  if (!gameObject.gameObjectStarted && gameObject.start)
  {
    gameObject.start()
    gameObject.gameObjectStarted = true
  }
}

for (let gameObject of sceneManager.getCurrentScene().gameObjects)
{
  for (let component of gameObject.components)
  {
    if (!component.componentStarted && component.start)
    {
      component.start()
      component.componentStarted = true
    }
  }
}

let keptGameObjects = []
for (let gameObject of sceneManager.getCurrentScene().gameObjects)
{
  if (!gameObject.markedForDestroy)
  {
    keptGameObjects.push(gameObject)
  }
}
sceneManager.getCurrentScene().gameObjects = keptGameObjects

for (let gameObject of sceneManager.getCurrentScene().gameObjects)
{
  for (let component of gameObject.components)
  {
    if(component.update)
    {
      component.update()
    }
  }
}
}

let aspectRatio = 1
let logicalWidth = 100

function engineDraw() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  ctx.fillStyle = Camera.main.getComponent("Camera").bgFill
  ctx.fillRect(0,0,canvas.width, canvas.height)

  let currentAspectRatio = canvas.width / canvas.height
  let offsetX = 0
  let offsetY = 0
  let actualWidth = canvas.width
  if (aspectRatio > currentAspectRatio)
  {
    let desiredHeight = canvas.width/aspectRatio 
    let amount = (canvas.height - desiredHeight) / 2
    offsetY = amount
  }
  else
  {
    let desiredWidth = canvas.height * aspectRatio
    let amount = (canvas.width - desiredWidth) / 2
    offsetX = amount
    actualWidth -= 2 * amount
  }

  ctx.save()
  ctx.translate(offsetX, offsetY)
  ctx.translate(ctx.canvas.width/2, ctx.canvas.height/2)
  let logicalScale = actualWidth / logicalWidth
  ctx.scale(logicalScale, logicalScale)

  ctx.translate(-Camera.main.Transform.x, -Camera.main.Transform.y)

  

  for (let gameObject of sceneManager.getCurrentScene().gameObjects)
  {
    for (let component of gameObject.components)
    {
      if(component.draw)
      {
      component.draw(ctx)
      }
    }
  }

  ctx.restore()

  if (aspectRatio > currentAspectRatio)
  {
    let desiredHeight = canvas.width/aspectRatio 
    let amount = (canvas.height - desiredHeight) / 2
    ctx.fillStyle = "magenta"
    ctx.fillRect(0,0,canvas.width, amount)
    ctx.fillRect(0,canvas.height-amount,canvas.width, amount)
  }
  else
  {
    let desiredWidth = canvas.height * aspectRatio
    let amount = (canvas.width - desiredWidth) / 2
    ctx.fillStyle = "magenta"
    ctx.fillRect(0,0,amount, canvas.height)
    ctx.fillRect(canvas.width - amount,0,amount, canvas.height)
  }
}

function start(title) {
  document.title = title

  function gameLoop() {
    engineUpdate()
    engineDraw()
  }

  setInterval(gameLoop, 1000 / 60)
}

window.start = start

window.engineUpdate = engineUpdate

window.engineDraw = engineDraw

window.keysDown = keysDown