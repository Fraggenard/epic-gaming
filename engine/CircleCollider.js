class CircleCollider extends Component
{
  componentName = "CircleCollider"
  xPosition
  yPosition
  colliderRadius
  colliderColor
  toDraw

  constructor(colliderRadius, colliderColor, toDraw)
  {
    super()
    this.colliderRadius = colliderRadius
    this.colliderColor = colliderColor
    this.toDraw = toDraw
  }

  start()
  {
    this.xPosition = this.getTransform().x
    this.yPosition = this.getTransform().y
    this.colliderRadius *= this.getTransform().scaleX
  }

  update()
  {
    this.xPosition = this.getTransform().x
    this.yPosition = this.getTransform().y
    this.colliderRadius *= this.getTransform().scaleX
  }
}

window.CircleCollider = CircleCollider