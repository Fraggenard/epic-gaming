class sceneContainer {
    gameObjects = []
    
    constructor(bgFill)
    {
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