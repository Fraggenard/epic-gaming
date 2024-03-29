class gameObject
{
  gameObjectName = ""
  components = []
  gameObjectStarted = false
  markedForDestroy = false
  markedDoNotDestroyOnLoad = false
  layer = 0

  constructor(name)
  {
    this.gameObjectName = name
    this.addComponent(new Transform())
  }

  get Transform()
  {
    return this.components[0]
  }

  addComponent(component)
  {
    this.components.push(component)
    component.componentParent = this
  }

  static getObjectByName(name)
  {
    return sceneManager.getCurrentScene().gameObjects.find(gameObject=>gameObject.gameObjectName == name)
  }

  getComponent(name)
  {
    return this.components.find(c=>c.componentName == name)
  }

  destroy()
  {
    this.markedForDestroy = true
  }

  doNotDestroyOnLoad()
  {
    this.markedDoNotDestroyOnLoad = true
  }

  static instantiate(gameObject)
  {
    sceneManager.getCurrentScene().gameObjects.push(gameObject)
    if (gameObject.start && !gameObject.gameObjectStarted)
    {
      gameObject.gameObjectStarted = true
      gameObject.start()
    }
  }
}

window.gameObject = gameObject