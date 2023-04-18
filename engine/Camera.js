class Camera extends Component 
{
  componentName = "Camera"
  bgFill = "white"

  constructor(bgFill)
  {
    super()
    this.bgFill = bgFill
  }

  setBGFill(bgFill)
  {
    this.bgFill = bgFill
  }

  static get main()
  {
    let scene =sceneManager.getCurrentScene()
    return scene.gameObjects[0]
  }

  static getLogicalScale(ctx)
  {
    let browserAspectRatio = ctx.canvas.width / ctx.canvas.height
    let browserWidth = ctx.canvas.width
    if (EngineGlobals.requestedAspectRatio <= browserAspectRatio)
    {
      browserWidth -= (ctx.canvas.width - ctx.canvas.height * EngineGlobals.requestedAspectRatio)
    }

    return browserWidth / EngineGlobals.logicalWidth
  }

  static getZeros(ctx)
  {
    let browserAspectRatio = ctx.canvas.width / ctx.canvas.height
    let zeroX = 0
    let zeroY = 0
    let browserWidth = ctx.canvas.width

    if (EngineGlobals.requestedAspectRatio > browserAspectRatio)
    {
      zeroY = (ctx.canvas.height - ctx.canvas.width / EngineGlobals.requestedAspectRatio) / 2
    }
    else
    {
      zeroX = (ctx.canvas.width - ctx.canvas.height * EngineGlobals.requestedAspectRatio) / 2
    }

    return {zeroX, zeroY}
  }

  static toWorldSpace(x,y,ctx)
  {
    let logicalScaling = Camera.getLogicalScale(ctx)

    x -= ctx.canvas.width / 2
    y -= ctx.canvas.height / 2
    x /= logicalScaling
    y /= logicalScaling
    x += Camera.main.Transform.x
    y += Camera.main.Transform.y

    return {x,y}
  }

  static toLogicalScreenSpace(x,y,ctx)
  {
    let logicalScaling = Camera.getLogicalScale(ctx)
    let zeros = Camera.getZeros(ctx)

    x -= zeros.zeroX
    y -= zeros.zeroY
    x /= logicalScaling
    y /= logicalScaling

    return {x,y}
  }
}

window.Camera = Camera