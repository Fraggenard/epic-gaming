class RectangleColliderDraw extends Component
{
  componentName = "RectangleColliderDraw"
  xPosition
  yPosition
  colliderWidth
  colliderHeight
  colliderColor
  toDraw

  start()
  {
    let rectangleColliderComponent = this.componentParent.getComponent("RectangleCollider")
    
    this.xPosition = rectangleColliderComponent.xPosition
    this.yPosition = rectangleColliderComponent.yPosition
    this.colliderWidth = rectangleColliderComponent.colliderWidth
    this.colliderHeight = rectangleColliderComponent.colliderHeight
    this.colliderColor = rectangleColliderComponent.colliderColor
    this.toDraw = rectangleColliderComponent.toDraw
  }

  draw(ctx) {
    let rectangleColliderComponent = this.componentParent.getComponent("RectangleCollider")
    
    this.xPosition = rectangleColliderComponent.xPosition
    this.yPosition = rectangleColliderComponent.yPosition
    this.colliderWidth = rectangleColliderComponent.colliderWidth
    this.colliderHeight = rectangleColliderComponent.colliderHeight
    this.colliderColor = rectangleColliderComponent.colliderColor
    this.toDraw = rectangleColliderComponent.toDraw

    if (this.toDraw) {
      ctx.fillStyle = this.colliderColor
      ctx.fillRect(this.xPosition, this.yPosition, this.colliderWidth, this.colliderHeight)
    }
  }
}

window.RectangleColliderDraw = RectangleColliderDraw