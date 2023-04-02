class Camera extends Component {
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
}

window.Camera = Camera