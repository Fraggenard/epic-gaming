import "./Component.js"
import "./GameObject.js"
import "./RectangleCollider.js"
import "./CircleCollider.js"
import "./SceneContainer.js"
import "./SceneManager.js"
import "./Transform.js"
import "./Camera.js"
import "./Textbox.js"
import "./Time.js"
import "./Input.js"

class EngineGlobals
{
  static requestedAspectRatio = 16/9
  static logicalWidth = 500
}

let canvas = document.querySelector("#canv")
let ctx = canvas.getContext("2d")

let keysDown = []

document.addEventListener("keydown", keyDown)
document.addEventListener("keyup", keyUp)

//document.addEventListener("mousedown", mouseDown)
//document.addEventListener("mouseup", mouseUp)

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

/*function mouseDown(e)
{
  console.log("mouseDown: " + e.clientX + " " + e.clientY)
}*/

/*function mouseUp(e)
{
  console.log("mouseUp: " + e.clientX + " " + e.clientY)
}*/

/*function mouseMove(e)
{
  //this.mouseX = e.clientX
  //this.mouseY = e.clientY

  let rect = canvas.getBoundingClientRect()
  this.mouseX = e.clientX - rect.left
  this.mouseY = e.clientY - rect.top
  console.log("mouseMove: " + this.mouseX + " " + this.mouseY)
}*/

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
    gameObject.start(ctx)
    gameObject.gameObjectStarted = true
  }
}

for (let gameObject of sceneManager.getCurrentScene().gameObjects)
{
  for (let component of gameObject.components)
  {
    if (!component.componentStarted && component.start)
    {
      component.start(ctx)
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
      component.update(ctx)
    }
  }
}
}

//let aspectRatio = 16/9
//let logicalWidth = 500

function engineDraw() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  ctx.fillStyle = Camera.main.getComponent("Camera").bgFill
  ctx.fillRect(0,0,canvas.width, canvas.height)

  let currentAspectRatio = canvas.width / canvas.height
  let offsetX = 0
  let offsetY = 0
  let actualWidth = canvas.width
  if (EngineGlobals.requestedAspectRatio > currentAspectRatio)
  {
    let desiredHeight = canvas.width/EngineGlobals.requestedAspectRatio 
    let amount = (canvas.height - desiredHeight) / 2
    //offsetY = amount
  }
  else
  {
    let desiredWidth = canvas.height * EngineGlobals.requestedAspectRatio
    let amount = (canvas.width - desiredWidth) / 2
    //offsetX = amount
    actualWidth -= 2 * amount
  }

  ctx.save()
  //ctx.translate(offsetX, offsetY)
  let logicalScale = actualWidth / EngineGlobals.logicalWidth
  ctx.translate(ctx.canvas.width/2, ctx.canvas.height/2)
  ctx.scale(logicalScale, logicalScale)

  ctx.translate(-Camera.main.Transform.x, -Camera.main.Transform.y)

let min = sceneManager.getCurrentScene().gameObjects.filter(go=>go.components.some(c=>c.draw)).map(go => go.layer).reduce((previous,current)=>Math.min(previous,current))
let max = sceneManager.getCurrentScene().gameObjects.filter(go=>go.components.some(c=>c.draw)).map(go => go.layer).reduce((previous,current)=>Math.max(previous,current))
  
for (let i = min; i <= max; i++)
{
  let gameObjects = sceneManager.getCurrentScene().gameObjects.filter(go => go.layer==i)
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
}

  ctx.restore()

  if (EngineGlobals.requestedAspectRatio > currentAspectRatio)
  {
    let desiredHeight = canvas.width/EngineGlobals.requestedAspectRatio
    let amount = (canvas.height - desiredHeight) / 2
    ctx.fillStyle = "magenta"
    ctx.fillRect(0,0,canvas.width, amount)
    ctx.fillRect(0,canvas.height-amount,canvas.width, amount)
  }
  else
  {
    let desiredWidth = canvas.height * EngineGlobals.requestedAspectRatio
    let amount = (canvas.width - desiredWidth) / 2
    ctx.fillStyle = "magenta"
    ctx.fillRect(0,0,amount, canvas.height)
    ctx.fillRect(canvas.width - amount,0,amount, canvas.height)
  }

//min = sceneManager.getCurrentScene().gameObjects.filter(go=>go.components.some(c=>c.drawGUI)).map(go => go.layer).reduce((previous,current)=>Math.min(previous,current))
//max = sceneManager.getCurrentScene().gameObjects.filter(go=>go.components.some(c=>c.drawGUI)).map(go => go.layer).reduce((previous,current)=>Math.max(previous,current))
  
ctx.save()
//ctx.translate(offsetX, offsetY)
logicalScale = actualWidth / EngineGlobals.logicalWidth
ctx.translate(ctx.canvas.width/2, ctx.canvas.height/2)
ctx.scale(logicalScale, logicalScale)

ctx.translate(-Camera.main.Transform.x, -Camera.main.Transform.y)

for (let i = min; i <= max; i++)
{
  let gameObjects = sceneManager.getCurrentScene().gameObjects.filter(go => go.layer==i)
  for (let gameObject of sceneManager.getCurrentScene().gameObjects)
  {
    for (let component of gameObject.components)
    {
      if(component.drawGUI)
      {
      component.drawGUI(ctx)
      }
    }
  }
}

  ctx.restore()

  ctx.save()
  min = sceneManager.getCurrentScene().gameObjects.filter(go=>go.components.some(c=>c.drawScreen)).map(go => go.layer).reduce((previous, current)=>Math.min(previous, current),0)

  max = sceneManager.getCurrentScene().gameObjects.filter(go=>go.components.some(c=>c.drawScreen)).map(go => go.layer).reduce((previous, current)=>Math.max(previous, current),0)

  ctx.save()
  for(let i = min; i <= max; i++)
  {
    let gameObjects = sceneManager.getCurrentScene().gameObjects.filter(go=>go.layer==i)

    for(let gameObject of gameObjects)
    {
      for (let component of gameObject.components)
      {
        if (component.drawScreen)
        {
          component.drawScreen(ctx)
        }
      }
    }
  }
ctx.restore()
}

function start(title) {
  Input.start()
  document.title = title

  function gameLoop() {
    engineUpdate()
    engineDraw()
  }

  setInterval(gameLoop, 1000 * Time.deltaTime)
}

window.start = start

window.engineUpdate = engineUpdate

window.engineDraw = engineDraw

window.keysDown = keysDown

window.EngineGlobals = EngineGlobals