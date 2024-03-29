class RectangleCollider extends Component
{
  componentName = "RectangleCollider"
  xPosition
  yPosition
  colliderWidth
  colliderHeight
  colliderColor
  toDraw

  constructor(colliderWidth, colliderHeight, colliderColor, toDraw)
  {
    super()
    this.colliderWidth = colliderWidth
    this.colliderHeight = colliderHeight
    this.colliderColor = colliderColor
    this.toDraw = toDraw
  }

  start()
  {
    this.xPosition = this.getTransform().x
    this.yPosition = this.getTransform().y
    this.colliderWidth *= this.getTransform().scaleX
    this.colliderHeight *= this.getTransform().scaleY
  }

  update()
  {
    this.xPosition = this.getTransform().x
    this.yPosition = this.getTransform().y
    this.colliderWidth *= this.getTransform().scaleX
    this.colliderHeight *= this.getTransform().scaleY
  }

  isColliding(otherComponent)
  {
    if (this.xPosition + this.colliderWidth > otherComponent.xPosition && this.xPosition < otherComponent.xPosition + otherComponent.colliderWidth
      && this.yPosition + this.colliderHeight > otherComponent.yPosition && this.yPosition < otherComponent.yPosition + otherComponent.colliderHeight)
      {
        return true
      }
      else
      {
        return false
      }
  }
}

window.RectangleCollider = RectangleCollider