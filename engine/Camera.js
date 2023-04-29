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

  static getLogicalScaleZoomable(ctx)
  {
    let browserAspectRatio = ctx.canvas.width / ctx.canvas.height
    let browserWidth = ctx.canvas.width
    if (EngineGlobals.requestedAspectRatio <= browserAspectRatio)
    {
      browserWidth -= (ctx.canvas.width - ctx.canvas.height * EngineGlobals.requestedAspectRatio)
    }

    return browserWidth / EngineGlobals.logicalWidth * Camera.main.Transform.scaleX
  }

  static getZeros(ctx)
  {
    let browserAspectRatio = ctx.canvas.width / ctx.canvas.height
    let zeroX = 0
    let zeroY = 0

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

  static screenToGUI(ctx, x, y)
  {
    let zeros = Camera.getZeros(ctx)

    let sx = Camera.getLogicalScale(ctx)
    let sy = sx

    x -= zeros.zeroX
    y -= zeros.zeroY

    x /= sx
    y /= sy

    return {x, y}
  }

  static screenToWorld(ctx, x, y)
  {
    let sx = Camera.getLogicalScale(ctx)
    let sy = sx

    x -= ctx.canvas.width / 2
    y -= ctx.canvas.height / 2
    
    x /= sx
    y /= sy

    x += Camera.main.Transform.x
    y += Camera.main.Transform.y

    return {x, y}
  }

  static GUIToScreen(ctx, x, y)
  {
    let logicalScale = Camera.getLogicalScale(ctx)

    let zeros = Camera.getZeros(ctx)

    x += zeros.zeroX
    y += zeros.zeroY

    x *= logicalScale
    y *= logicalScale

    return {x, y}
  }

  static GUIToWorld(ctx, x, y)
  {
    let logicalScale = Camera.getLogicalScale(ctx)

    let sx = Camera.getLogicalScaleZoomable(ctx)
    let sy = sx

    let zeros = Camera.getZeros(ctx)

    x *= logicalScale
    y *= logicalScale

    x += zeros.zeroX
    y += zeros.zeroY

    x -= ctx.canvas.width / 2
    y -= ctx.canvas.height / 2

    x /= sx
    y /= sy

    x += Camera.main.Transform.x
    y += Camera.main.Transform.y

    return {x, y}
  }

  static worldToScreen(ctx, x, y)
  {
    let sx = Camera.getLogicalScale(ctx)
    let sy = sx

    x += ctx.canvas.width / 2
    y += ctx.canvas.height / 2
    
    x *= sx
    y *= sy

    x -= Camera.main.Transform.x
    y -= Camera.main.Transform.y

    return {x, y}
  }

  static worldToGUI(ctx, x, y)
  {
    let logicalScale = Camera.getLogicalScale(ctx)

    let zeros = Camera.getZeros(ctx)

    x /= logicalScale
    y /= logicalScale

    x -= zeros.zeroX
    y -= zeros.zeroY

    x += ctx.canvas.width / 2
    y += ctx.canvas.height / 2

    x -= Camera.main.Transform.x
    y -= Camera.main.Transform.y

    return {x, y}
  }
}

window.Camera = Camera