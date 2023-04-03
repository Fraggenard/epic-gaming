class sceneContainer {
    gameObjects = []
    //xOriginPoint = (window.innerWidth / 4)
    //yOriginPoint = (window.innerHeight / 4)
    
    constructor(bgFill)
    {
      //this.addGameObject(new gameObject("CameraGameObject").addComponent(new Camera)) //fix it here you blithering tart
      this.cameraGameObject = new gameObject("CameraGameObject")
      this.cameraComponent = new Camera(bgFill)
      this.cameraGameObject.addComponent(this.cameraComponent)
      this.addGameObject(this.cameraGameObject)
    }
  
    addGameObject(gameObject)
    {
      this.gameObjects.push(gameObject)
    }
  }

  window.sceneContainer = sceneContainer