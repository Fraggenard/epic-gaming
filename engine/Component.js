class Component 
{
  componentName = ""
  componentParent
  componentStarted = false
  componentListeners = []

  addListener(listener)
  {
    this.componentListeners.push(listener)
  }

  updateListeners(eventName)
  {
    for (let listener of this.componentListeners)
    {
      if (listener.handleUpdate)
      {
        listener.handleUpdate(this, eventName)
      }
    }
  }

  getTransform()
  {
    return this.componentParent.components[0]
  }
}

window.Component = Component