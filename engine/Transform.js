class Transform extends Component
{
  componentName = "Transform"
  x = 0
  y = 0
  scaleX = 1
  scaleY = 1
  //rotate = 0

  setPosition(newX, newY) 
  {
    this.x = newX
    this.y = newY
  }

  setScale(newScaleX, newScaleY)
  {
    this.scaleX = newScaleX
    this.scaleY = newScaleY
  }
}

window.Transform = Transform