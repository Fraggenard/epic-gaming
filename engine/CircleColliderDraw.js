class CircleColliderDraw extends Component
{
  componentName = "CircleColliderDraw"
  xPosition
  yPosition
  colliderRadius
  colliderColor
  toDraw

  start()
  {
    let circleColliderComponent = this.componentParent.getComponent("CircleCollider")
    
    this.xPosition = circleColliderComponent.xPosition
    this.yPosition = circleColliderComponent.yPosition
    this.colliderRadius = circleColliderComponent.colliderRadius
    this.colliderColor = circleColliderComponent.colliderColor
    this.toDraw = circleColliderComponent.toDraw
  }
  
  draw(ctx) {
    let circleColliderComponent = this.componentParent.getComponent("CircleCollider")
    
    this.xPosition = circleColliderComponent.xPosition
    this.yPosition = circleColliderComponent.yPosition
    this.colliderRadius = circleColliderComponent.colliderRadius
    this.colliderColor = circleColliderComponent.colliderColor
    this.toDraw = circleColliderComponent.toDraw

    if (this.toDraw) {
      ctx.fillStyle = this.colliderColor
      ctx.beginPath()
      ctx.arc(this.xPosition, this.yPosition, this.colliderRadius, 0, (Math.PI * 2))
      ctx.fill()
      ctx.closePath()
    }
  }
}

window.CircleColliderDraw = CircleColliderDraw