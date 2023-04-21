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

  //Coming soon to a theater near you
  /*isColliding(otherComponent) {
    if (this.xPosition + this.colliderWidth >= otherComponent.xPosition && this.xPosition + this.colliderWidth <= otherComponent.xPosition + otherComponent.colliderWidth
      && this.yPosition + this.colliderHeight >= otherComponent.yPosition && this.yPosition + this.colliderHeight <= otherComponent.yPosition + otherComponent.colliderHeight) {
      return true
    }
    else {
      return false
    }
  }*/

  draw(ctx) {
    if (this.toDraw) {
      ctx.fillStyle = this.colliderColor
      ctx.beginPath()
      ctx.arc(this.xPosition, this.yPosition, this.colliderRadius, 0, (Math.PI * 2))
      ctx.fill()
      //ctx.stroke()
      ctx.closePath()
    }
  }
}

window.CircleCollider = CircleCollider