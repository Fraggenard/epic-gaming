class sceneManager
{
  static scenes = []
  static currentSceneIndex = 0
  static sceneChanged = true
  static previousSceneIndex = -1

  static getCurrentScene()
  {
    return this.scenes[this.currentSceneIndex]
  }

  static addScene(scene)
  {
    this.scenes.push(scene)
  }

  static changeScene(index)
  {
    this.previousSceneIndex = this.currentSceneIndex
    this.currentSceneIndex = index
    this.sceneChanged = true
  }

  static getPreviousScene()
  {
    if (this.previousSceneIndex == -1)
    {
      return
    }
    return this.scenes[this.previousSceneIndex]
  }
}

window.sceneManager = sceneManager