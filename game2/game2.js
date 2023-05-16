import "/engine/engine.js"

//Game
class playerGameObject extends gameObject
{
    start()
    {
        this.addComponent(new playerComponent())
        this.addComponent(new RectangleCollider(25,25,"yellow",true))
        this.addComponent(new RectangleColliderDraw())
    }
}

class playerComponent extends Component
{
    componentName = "playerComponent"
    
    upVelocity
    downVelocity
    IS_JUMPING
    IS_FROZEN

    start()
    {
        this.getTransform().x = -200
        this.getTransform().y = 25
        this.upVelocity = 0
        this.downVelocity = 0
        this.IS_JUMPING = false
        this.IS_FROZEN = false
    }

    update()
    {
        if (this.IS_FROZEN == false)
        {
            let nextLocation = this.getTransform().y - (this.upVelocity - this.downVelocity)

            if (this.upVelocity >= this.downVelocity || this.upVelocity < this.downVelocity)
            {
                if (this.upVelocity > 0)
                {
                    this.upVelocity -= 0.5
                    this.downVelocity += 0.5
                    console.log(this.upVelocity + " " + this.downVelocity)
                }
            }

            let groundGO = gameObject.getObjectByName("groundGameObject")
            let playerRC = this.componentParent.getComponent("RectangleCollider")
            
            if (this.getTransform().y + playerRC.colliderHeight > groundGO.Transform.y)
            {
                this.getTransform().y = 25
                this.downVelocity = 0
                this.IS_JUMPING = false
            }
            else
            {
                this.getTransform().y = nextLocation
            }
        }
    }

    handleUpdate(component, eventName)
    {
        if (eventName == "jump")
        {
            console.log("jump event")
            
            if (this.IS_JUMPING == false)
            {
                this.IS_JUMPING = true
                this.upVelocity = 15
            }
        }

        if (eventName == "freeze")
        {
            this.IS_FROZEN = true
        }
    }
}

class playerControlGameObject extends gameObject
{
    start()
    {
        this.addComponent(new playerControlComponent())
    }
}

class playerControlComponent extends Component
{
    componentName = "playerControlComponent"

    IS_FROZEN

    start()
    {
        let playerGO = gameObject.getObjectByName("playerGameObject")
        let playerCO = playerGO.getComponent("playerComponent")
        this.addListener(playerCO)
        this.IS_FROZEN = false
        let resetterGO = gameObject.getObjectByName("resetterGameObject")
        let resetterCO = resetterGO.getComponent("resetterComponent")
        this.addListener(resetterCO)
    }
    
    update()
    {
        if (this.IS_FROZEN == false)
        {
            if (Input.keysDown["e"])
            {
                this.updateListeners("jump")
                console.log("jump pressed")
            }
        }
    }

    handleUpdate(component, eventName)
    {
        if (eventName == "freeze")
        {
            this.IS_FROZEN = true
            this.updateListeners("reset")
        }
    }
}

class groundGameObject extends gameObject
{
    start()
    {
        this.addComponent(new groundComponent())
        this.addComponent(new RectangleCollider(500,20,"red",true))
        this.addComponent(new RectangleColliderDraw())
    }
}

class groundComponent extends Component
{
    componentName = "groundComponent"
    
    start()
    {
        this.getTransform().x = -250
        this.getTransform().y = 50
    }
}

class obstacleGameObject extends gameObject
{
    start()
    {
        this.addComponent(new RectangleCollider(30,70,"blue",false))
        this.addComponent(new RectangleColliderDraw())
        this.addComponent(new obstacleComponent())
    }
}

class obstacleComponent extends Component
{
    componentName = "obstacleComponent"

    IS_FROZEN
    POINT_COUNTED

    start()
    {
        let groundGO = gameObject.getObjectByName("groundGameObject")
        let obstacleRC = this.componentParent.getComponent("RectangleCollider")

        this.getTransform().x = 250
        this.getTransform().y = groundGO.Transform.y - obstacleRC.colliderHeight
        obstacleRC.toDraw = true

        this.IS_FROZEN = false
        this.POINT_COUNTED = false
    }

    update()
    {
        if (this.componentListeners.length == 0)
        {
            let playerGO = gameObject.getObjectByName("playerGameObject")
            let playerCO = playerGO.getComponent("playerComponent")
            let obstacleControllerGO = gameObject.getObjectByName("obstacleControllerGameObject")
            let obstacleControllerCO = obstacleControllerGO.getComponent("obstacleControllerComponent")
            this.addListener(playerCO)
            this.addListener(obstacleControllerCO)
            let scoreControllerGO = gameObject.getObjectByName("scoreControllerGameObject")
            let scoreControllerCO = scoreControllerGO.getComponent("scoreControllerComponent")
            this.addListener(scoreControllerCO)
            let playerControlGO = gameObject.getObjectByName("playerControlGameObject")
            let playerControlCO = playerControlGO.getComponent("playerControlComponent")
            this.addListener(playerControlCO)
        }
        
        let playerGO = gameObject.getObjectByName("playerGameObject")
        let playerRC = playerGO.getComponent("RectangleCollider")
        let obstacleRC = this.componentParent.getComponent("RectangleCollider")

        if (obstacleRC.isColliding(playerRC))
        {
            this.IS_FROZEN = true
            this.updateListeners("freeze")
        }
        
        if (this.IS_FROZEN == false)
        {
            this.getTransform().x -= 5

            if (this.getTransform().x <= playerRC.getTransform().x + (playerRC.colliderWidth / 2) && this.POINT_COUNTED == false)
            {
                this.POINT_COUNTED = true
                this.updateListeners("score")
            }

            if (this.getTransform().x <= -250 - obstacleRC.colliderWidth)
            {
                this.componentParent.destroy()
            }
        }
    }
}

class obstacleControllerGameObject extends gameObject
{
    start()
    {
        this.addComponent(new obstacleControllerComponent())
    }
}

class obstacleControllerComponent extends Component
{
    componentName = "obstacleControllerComponent"

    spawnTimer
    nextSpawn
    ON_SPAWN_COOLDOWN
    IS_FROZEN
    
    start()
    {
        this.spawnTimer = 0
        this.nextSpawn = Math.floor(Math.random() * 121) + 60
        this.ON_SPAWN_COOLDOWN = false
        this.IS_FROZEN = false
    }

    update()
    {
        if (this.IS_FROZEN == false)
        {
            if (this.ON_SPAWN_COOLDOWN == false)
            {
                this.ON_SPAWN_COOLDOWN = true
                let obstacle = new obstacleGameObject("obstacleGameObject")
                gameObject.instantiate(obstacle)
                this.spawnTimer = 0
                this.nextSpawn = Math.floor(Math.random() * 121) + 60
            }
            else
            {
                if (this.spawnTimer >= this.nextSpawn)
                {
                    this.ON_SPAWN_COOLDOWN = false
                }

                this.spawnTimer++
            }
        }
    }

    handleUpdate(component, eventName)
    {
        if (eventName == "freeze")
        {
            this.IS_FROZEN = true
        }
    }
}

class scoreControllerGameObject extends gameObject
{
    start()
    {
        this.addComponent(new Textbox("black","20px Arial","","center"))
        this.addComponent(new scoreControllerComponent())
        this.addComponent(new scoreControllerDrawComponent())
    }
}

class scoreControllerComponent extends Component
{
    componentName = "scoreControllerComponent"
    
    score 
    
    start()
    {
        this.score = 0
    }

    update()
    {
        let textCO = this.componentParent.getComponent("Textbox")
        textCO.textString = `${this.score}`
    }

    handleUpdate(component, eventName)
    {
        if (eventName == "score")
        {
            this.score++
        }
    }
}

class scoreControllerDrawComponent extends Component
{
    draw(ctx)
    {
        let zeros = Camera.getZeros(ctx)
        
        let currentAspectRatio = ctx.canvas.width / ctx.canvas.height
        let xWidth = 0
        let yHeight = 0

        if (EngineGlobals.requestedAspectRatio > currentAspectRatio) //letterboxes top and bottom
        {
            yHeight = ctx.canvas.width / EngineGlobals.requestedAspectRatio

            xWidth = ctx.canvas.width
        }
        else //letterboxes on side
        {
            xWidth = ctx.canvas.height * EngineGlobals.requestedAspectRatio

            yHeight = ctx.canvas.height
        }

        let text = this.componentParent.getComponent("Textbox")
        let x = xWidth / 2
        let y = yHeight - (yHeight / 8)
        let worldCoords = Camera.screenToWorld(ctx, zeros.zeroX + x,zeros.zeroY + y)
        text.getTransform().x = worldCoords.x
        text.getTransform().y = worldCoords.y
    }
}

class resetterGameObject extends gameObject
{
    start()
    {
        this.addComponent(new resetterComponent())
    }
}

class resetterComponent extends Component
{
    componentName = "resetterComponent"

    handleUpdate(component, eventName)
    {
        if (eventName == "reset")
        {
            let scoreControllerGO = gameObject.getObjectByName("scoreControllerGameObject")
            scoreControllerGO.doNotDestroyOnLoad()
            sceneManager.changeScene(1)
            console.log("resetter")
        }
    }
}

class resetControllerGameObject extends gameObject
{
    start()
    {
        this.addComponent(new resetControllerComponent())
    }
}

class resetControllerComponent extends Component
{
    update()
    {
        if (Input.keysUp["e"])
        {
            console.log("reset complete")
            let scoreControllerGO = gameObject.getObjectByName("scoreControllerGameObject")
            scoreControllerGO.destroy()
            sceneManager.changeScene(0)
        }
    }
}

//Scene

class gameScene extends sceneContainer
{
    start()
    {
        this.addGameObject(new resetterGameObject("resetterGameObject"))
        this.addGameObject(new scoreControllerGameObject("scoreControllerGameObject"))
        this.addGameObject(new playerGameObject("playerGameObject"))
        this.addGameObject(new playerControlGameObject("playerControlGameObject"))
        this.addGameObject(new groundGameObject("groundGameObject"))
        this.addGameObject(new obstacleControllerGameObject("obstacleControllerGameObject"))
    }
}

class resetScene extends sceneContainer
{
    start()
    {
        this.addGameObject(new resetControllerGameObject("resetControllerGameObject"))
        this.addGameObject(new groundGameObject("groundGameObject"))
    }
}

let GameScene = new gameScene("orange")
let ResetScene = new resetScene("orange")
sceneManager.addScene(GameScene)
sceneManager.addScene(ResetScene)
