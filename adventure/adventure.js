import "/engine/engine.js"
//Title Screen
class titleControllerGameObject extends gameObject
{
    start()
    {
        this.addComponent(new titleControllerComponent())
        this.addComponent(new titleControllerDrawComponent())
        let title = new Textbox("white", "50px Arial","Schüt Game","left")
        title.componentName = "titleText"
        this.addComponent(title)
        //this.addComponent(new Textbox("white", "50px Arial","Schüt Game","left"))
        //this.addComponent(new Textbox("white","20px Arial","Press Space to Start","left"))
    }
}

class titleMessageControllerGameObject extends gameObject
{
    start()
    {
        this.addComponent(new titleMessageControllerDrawComponent())
        let message = new Textbox("white","20px Arial","Press E to Start","left")
        message.componentName = "messageText"
        this.addComponent(message)
    }
}

class titleMessageControllerDrawComponent extends Component
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

        let message = this.componentParent.getComponent("messageText")
        let x2 = (xWidth / 3)
        let y2 = yHeight - (yHeight / 3)
        let worldCoords = Camera.screenToWorld(ctx, zeros.zeroX + x2,zeros.zeroY + y2)
        message.getTransform().x = worldCoords.x
        message.getTransform().y = worldCoords.y
    }
}

class titleControllerComponent extends Component
{
    start()
    {
        
    }

    update(ctx)
    {   
        if (Input.keysUp["e"])
        {
            sceneManager.changeScene(1)
        }
    }
}

class titleControllerDrawComponent extends Component
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

        let text = this.componentParent.getComponent("titleText")
        let x = (xWidth / 4)
        //console.log(xWidth)
        //console.log(ctx.measureText(text.textString).width)
        let y = yHeight / 3
        let worldCoords = Camera.screenToWorld(ctx, zeros.zeroX + x,zeros.zeroY + y)
        //console.log(worldCoords.x)
        text.getTransform().x = worldCoords.x
        text.getTransform().y = worldCoords.y
    }
}



//Main Game

class startControllerGameObject extends gameObject
{
    start()
    {
        this.addComponent(new startControllerComponent())
        //console.log("added start component")
        let debugAccel = new Textbox("white", "20px Arial","ba","left")
        debugAccel.componentName = "debugAccel"
        this.addComponent(debugAccel)
    }
}

class startControllerComponent extends Component
{
    componentName = "startControllerComponent"
    
    start()
    {
        this.componentParent.getComponent("debugAccel").textString = "None"
    }
    
    update(ctx)
    {
        //let player = gameObject.getObjectByName("playerGameObject").getComponent("playerComponent").pAccel

        let count = sceneManager.getCurrentScene().gameObjects.length

        let zeros = Camera.GUIToScreen(ctx, 0, 0)
        
        //console.log("0, 0 in GUI space is " + zeros.x + " ," + zeros.y + "in screen space")

        //this.componentParent.getComponent("debugAccel").getTransform().y = 0
        //this.componentParent.getComponent("debugAccel").getTransform().y = 0
    }

    handleUpdate(component, eventName)
    {
        if (eventName == "weaponPickup")
        {
            this.componentParent.getComponent("debugAccel").textString = component.containedWeapon
        }
    }
}

class startDrawGameObject extends gameObject
{
    start()
    {
        this.addComponent(new startDrawComponent())
        //this.addComponent(new Textbox("white", "Impact", 50, "JSQuest", "center"))
        //console.log("added draw component")
    }
}

class startDrawComponent extends Component
{
    draw(ctx)
    {   
        let scgo = gameObject.getObjectByName("startControllerGameObject")
        
        let screenZeros = Camera.getZeros(ctx)

        let screenSpaceCoords = Camera.screenToWorld(ctx, screenZeros.zeroX + 40, screenZeros.zeroY + 40)

        scgo.getComponent("debugAccel").getTransform().x = screenSpaceCoords.x
        scgo.getComponent("debugAccel").getTransform().y = screenSpaceCoords.y
        
        /*let xo = sceneManager.getCurrentScene().xOriginPoint
        let yo = sceneManager.getCurrentScene().yOriginPoint

        let xw = window.innerWidth / 2
        let yh = window.innerHeight / 2
        
        //ctx.fillStyle = "black"
        //ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = "white"
        ctx.fillRect(xo, yo, xw, yh)
        ctx.fillStyle = "blue"
        ctx.font = "50px Arial"
        ctx.textAlign = "center"
        ctx.fillText("Outing", xw, yh)
        ctx.font = "30px Arial"
        ctx.fillText("Press Any Key to Start", xw, yh + 60)
        console.log("im drawing")*/
    }
}

class debugGUIObject extends gameObject
{
    start()
    {
        this.addComponent(new debugGUIComponent())
    }
}

class debugGUIComponent extends Component
{
    start(ctx)
    {
        let zeros = Camera.getZeros(ctx)
        
        let coords = Camera.screenToGUI(ctx, zeros.zeroX, zeros.zeroY)
    }
    
    drawScreen(ctx)
    {
        //console.log("screen draw")

        ctx.fillStyle = "yellow"

        ctx.fillRect(0, 0, 50, 50)
    }
}

class playerGameObject extends gameObject
{
    layer = 15
    
    start()
    {
        this.addComponent(new playerComponent())
        //this.addComponent(new playerDrawComponent())
        this.addComponent(new RectangleCollider(10,10,"yellow",true))
        this.addComponent(new RectangleColliderDraw())
    }
}

class playerComponent extends Component
{
    componentName = "playerComponent"
    
    pvx
    pvy
    pAccel = 0
    playerWidth = 0
    playerHeight = 0
    IS_MOVING = false
    IS_ATTACKING = false
    levelAreaXLeft
    levelAreaXRight
    levelAreaYUp
    levelAreaYDown
    levelAreaConnectedEdgeUp
    levelAreaConnectedEdgeDown
    levelAreaConnectedEdgeLeft
    levelAreaConnectedEdgeRight
    
    start()
    {
        this.pvx = 80
        this.pvy = 270
        this.pAccel = 0
        this.playerWidth = this.componentParent.getComponent("RectangleCollider").colliderWidth
        this.playerHeight = this.componentParent.getComponent("RectangleCollider").colliderHeight
        this.IS_MOVING = false
        this.IS_ATTACKING = false
        this.getTransform().x = this.pvx
        this.getTransform().y = this.pvy
        //console.log("started player")
    }

    update()
    {   
        this.up = 0
        this.left = 0
        this.down = 0
        this.right = 0

        this.keyPressed = false

        if (Input.keysDown["w"])
        {
            this.up = -1
            this.keyPressed = true
            //console.log("W")
        }

        if (Input.keysDown["a"])
        {
            this.left = -1
            this.keyPressed = true
        }

        if (Input.keysDown["s"])
        {
            this.down = 1
            this.keyPressed = true
        }

        if (Input.keysDown["d"])
        {
            this.right = 1
            this.keyPressed = true
        }

        if (this.keyPressed)
        {
            if (this.pAccel < 5)
            {
                this.pAccel++
            }
        }
        else if (this.pAccel > 0)
        {
            this.pAccel--
        }

        this.IS_MOVING = this.pAccel > 0

        this.pvx = this.left + this.right
        this.pvy = this.up + this.down

        this.magnitude = Math.sqrt((this.pvx * this.pvx) + (this.pvy * this.pvy)) 

        if (this.pvx != 0)
        {
            this.pvx = this.pvx / this.magnitude
        }

        if (this.pvy != 0)
        {
            this.pvy = this.pvy / this.magnitude
        }

        let nextXLocation = this.getTransform().x + this.pvx * this.pAccel
        let nextYLocation = this.getTransform().y + this.pvy * this.pAccel
        
        if (this.levelAreaConnectedEdgeUp == false)
        {
            if (nextYLocation < this.levelAreaYUp)
            {
            nextYLocation = this.levelAreaYUp
            }
        }
        if (this.levelAreaConnectedEdgeDown == false)
        {
            if (nextYLocation + this.playerHeight > this.levelAreaYDown)
            {
                nextYLocation = this.levelAreaYDown - this.playerHeight
            }
        }
        if (this.levelAreaConnectedEdgeLeft == false)
        {
            if (nextXLocation < this.levelAreaXLeft)
            {
                nextXLocation = this.levelAreaXLeft
            }
        }
        if (this.levelAreaConnectedEdgeRight == false)
        {
            if (nextXLocation + this.playerWidth > this.levelAreaXRight)
            {
                nextXLocation = this.levelAreaXRight - this.playerWidth
            }
        }

        this.getTransform().x = nextXLocation
        this.getTransform().y = nextYLocation
        
        /*switch(this.levelAreaConnectedEdge)
        {
            case "up":
                if ((this.getTransform().x + this.pvx * this.pAccel) + this.playerWidth > this.levelAreaXRight)
                {
                    this.getTransform().x = this.levelAreaXRight - this.playerWidth
                }
                else if (this.getTransform().x + this.pvx * this.pAccel < this.levelAreaXLeft)
                {
                    this.getTransform().x = this.levelAreaXLeft
                }
                else
                {
                    this.getTransform().x += this.pvx * this.pAccel
                }

                if ((this.getTransform().y + this.pvy * this.pAccel) + this.playerHeight > this.levelAreaYDown)
                {
                    this.getTransform().y = this.levelAreaYDown - this.playerHeight
                }
                else
                {
                    this.getTransform().y += this.pvy * this.pAccel
                }
                break;
            case "down":
                if ((this.getTransform().x + this.pvx * this.pAccel) + this.playerWidth > this.levelAreaXRight)
                {
                    this.getTransform().x = this.levelAreaXRight - this.playerWidth
                }
                else if (this.getTransform().x + this.pvx * this.pAccel < this.levelAreaXLeft)
                {
                    this.getTransform().x = this.levelAreaXLeft
                }
                else
                {
                    this.getTransform().x += this.pvx * this.pAccel
                }

                if (this.getTransform().y + this.pvy * this.pAccel < this.levelAreaYUp)
                {
                    this.getTransform().y = this.levelAreaYUp
                }
                else
                {
                    this.getTransform().y += this.pvy * this.pAccel
                }
                break;
            case "left":
                if ((this.getTransform().x + this.pvx * this.pAccel) + this.playerWidth > this.levelAreaXRight)
                {
                    this.getTransform().x = this.levelAreaXRight - this.playerWidth
                }
                else
                {
                    this.getTransform().x += this.pvx * this.pAccel
                }

                if (this.getTransform().y + this.pvy * this.pAccel < this.levelAreaYUp)
                {
                    this.getTransform().y = this.levelAreaYUp
                }
                else if ((this.getTransform().y + this.pvy * this.pAccel) + this.playerHeight > this.levelAreaYDown)
                {
                    this.getTransform().y = this.levelAreaYDown - this.playerHeight
                }
                else
                {
                    this.getTransform().y += this.pvy * this.pAccel
                }
                break;
            case "right":
                if (this.getTransform().x + this.pvx * this.pAccel < this.levelAreaXLeft)
                {
                    this.getTransform().x = this.levelAreaXLeft
                }
                else
                {
                    this.getTransform().x += this.pvx * this.pAccel
                }

                if (this.getTransform().y + this.pvy * this.pAccel < this.levelAreaYUp)
                {
                    this.getTransform().y = this.levelAreaYUp
                }
                else if ((this.getTransform().y + this.pvy * this.pAccel) + this.playerHeight > this.levelAreaYDown)
                {
                    this.getTransform().y = this.levelAreaYDown - this.playerHeight
                }
                else
                {
                    this.getTransform().y += this.pvy * this.pAccel
                }
                break;
        }
        
        //this.getTransform().x += this.pvx * this.pAccel
        //this.getTransform().y += this.pvy * this.pAccel
        
        /*if ((this.getTransform().x + this.pvx * this.pAccel) + this.playerWidth > this.levelAreaXRight)
        {
            this.getTransform().x = this.levelAreaXRight - this.playerWidth
        }

        if (this.getTransform().x + this.pvx * this.pAccel < this.levelAreaXLeft)
        {
            this.getTransform().x = this.levelAreaXLeft
        }

        if (this.getTransform().y + this.pvy * this.pAccel < this.levelAreaYUp)
        {
            this.getTransform().y = this.levelAreaYUp
        }

        if ((this.getTransform().y + this.pvy * this.pAccel) + this.playerHeight > this.levelAreaYDown)
        {
            this.getTransform().y = this.levelAreaYDown - this.playerHeight
        }*/
    }

    handleUpdate(component, eventName)
    {
        if (eventName == "activeLevelArea")
        {
            this.levelAreaConnectedEdgeUp = component.connectedEdgeUp
            this.levelAreaConnectedEdgeDown = component.connectedEdgeDown
            this.levelAreaConnectedEdgeLeft = component.connectedEdgeLeft
            this.levelAreaConnectedEdgeRight = component.connectedEdgeRight
            this.levelAreaXLeft = component.xPosition
            this.levelAreaXRight = component.xPosition + component.width
            this.levelAreaYUp = component.yPosition
            this.levelAreaYDown = component.yPosition + component.height
        }

        if (eventName == "levelsInitialized")
        {
            this.getTransform().x = 80
            this.getTransform().y = 270
        }
    }
}

class levelAreaGameObject extends gameObject
{
    start()
    {
        //this.addComponent(new levelAreaComponent())
        //this.addComponent(new levelAreaDrawComponent())
        this.layer = -10
    }
}

class levelAreaComponent extends Component
{
    componentName = "levelAreaComponent"

    xPosition
    yPosition
    width
    height
    color
    enemies
    weapons
    connectedEdgeUp
    connectedEdgeDown
    connectedEdgeLeft
    connectedEdgeRight
    transitionEdge

    constructor(xPosition,yPosition,width,height,color,enemies,weapons,connectedEdgeUp,connectedEdgeDown,connectedEdgeLeft,connectedEdgeRight,transitionEdge)
    {
        super()
        this.xPosition = xPosition
        this.yPosition = yPosition
        this.width = width
        this.height = height
        this.color = color
        this.enemies = enemies
        this.weapons = weapons
        this.connectedEdgeUp = connectedEdgeUp
        this.connectedEdgeDown = connectedEdgeDown
        this.connectedEdgeLeft = connectedEdgeLeft
        this.connectedEdgeRight = connectedEdgeRight
        this.transitionEdge = transitionEdge
    }

    start()
    {
        for (let i = 0; i < this.enemies; i++)
        {
            let enemyX = Math.floor(Math.random() * (this.width)) + this.xPosition
            let enemyY = Math.floor(Math.random() * (this.height)) + this.yPosition
            //console.log("enemyX " + enemyX + " enemyY " + enemyY)
            let generatedEnemy = new enemyGameObject("enemyGameObject")
            gameObject.instantiate(generatedEnemy)
            let generatedEnemyCO = generatedEnemy.getComponent("enemyComponent")
            //console.log("spawned an enemy")
            generatedEnemyCO.getTransform().x = enemyX
            generatedEnemyCO.getTransform().y = enemyY
        }
        for (let i = 0; i < this.weapons; i++)
        {
            let weaponX = Math.floor(Math.random() * (this.width)) + this.xPosition
            let weaponY = Math.floor(Math.random() * (this.height)) + this.yPosition
            //console.log("weaponX " + weaponX + " weaponY " + weaponY)
            let generatedWeapon = new weaponPickupGameObject("weaponPickupGameObject")
            gameObject.instantiate(generatedWeapon)
            //let generatedWeaponCO = generatedWeapon.getComponent("weaponPickupComponent")
            //console.log("spawned a weapon pickup")
            generatedWeapon.Transform.x = weaponX
            generatedWeapon.Transform.y = weaponY
        }
    }

    update()
    {
        let playerGO = gameObject.getObjectByName("playerGameObject")
        let playerCO = playerGO.getComponent("playerComponent")
        
        if (this.componentListeners.length == 0)
        {
            this.addListener(playerCO)

            let gameObjects = sceneManager.getCurrentScene().gameObjects
            for (let gameObject of gameObjects)
            {
                if (gameObject.gameObjectName == "enemyGameObject")
                {
                    let enemyCO = gameObject.getComponent("enemyComponent")
                    this.addListener(enemyCO)
                }
            }
        }

        let gameObjects = sceneManager.getCurrentScene().gameObjects
        for (let gameObject of gameObjects)
        {
            if (gameObject.gameObjectName == "enemyGameObject")
                {
                    let enemyCO = gameObject.getComponent("enemyComponent")
                    let enemyX = enemyCO.getTransform().x
                    let enemyY = enemyCO.getTransform().y

                    if (enemyX >= this.xPosition && enemyX <= this.xPosition + this.width)
                    {
                        if (enemyY >= this.yPosition && enemyY <= this.yPosition + this.height)
                        {
                            enemyCO.levelAreaConnectedEdgeUp = this.connectedEdgeUp
                            enemyCO.levelAreaConnectedEdgeDown = this.connectedEdgeDown
                            enemyCO.levelAreaConnectedEdgeLeft = this.connectedEdgeLeft
                            enemyCO.levelAreaConnectedEdgeRight = this.connectedEdgeRight
                            enemyCO.levelAreaXLeft = this.xPosition
                            enemyCO.levelAreaXRight = this.xPosition + this.width
                            enemyCO.levelAreaYUp = this.yPosition
                            enemyCO.levelAreaYDown = this.yPosition + this.height
                        }
                    }
                }
        }

        let playerX = playerCO.getTransform().x
        let playerY = playerCO.getTransform().y

        if (playerX >= this.xPosition && playerX <= this.xPosition + this.width)
        {
            if (playerY >= this.yPosition && playerY <= this.yPosition + this.height)
            {
                this.updateListeners("activeLevelArea")
            }
        }
    }
}

class levelAreaDrawComponent extends Component
{
    componentName = "levelAreaDrawComponent"

    xPosition
    yPosition
    width
    height
    color

    draw(ctx)
    {
        let levelCO = this.componentParent.getComponent("levelAreaComponent")
        this.xPosition = levelCO.xPosition
        this.yPosition = levelCO.yPosition
        this.width = levelCO.width
        this.height = levelCO.height
        this.color = levelCO.color

        ctx.fillStyle = this.color
        ctx.fillRect(this.xPosition,this.yPosition,this.width,this.height)
    }
}

class levelAreaConfigurationGameObject extends gameObject
{
    start()
    {
        this.addComponent(new levelAreaConfigurationComponent())
    }
}

class levelAreaConfigurationComponent extends Component
{
    componentName = "levelAreaConfigurationComponent"

    levelAreas = []
    numberOfLevels = 10
    LEVELS_INITIALIZED = false
    
    start()
    {
        for (let i = 0; i < this.numberOfLevels; i++)
        {
            if (i == 0)
            {
                let edgeUp = true
                let edgeDown = false
                let edgeLeft = false
                let edgeRight = false
                let transition = "up"
                let x = 0
                let y = 0
                let width = 300
                let height = 300
                let color = "blue"
                let enemies = 0
                let weapons = 0

                let levelGO = new levelAreaGameObject("levelAreaGameObject")
                let levelCO = new levelAreaComponent(x,y,width,height,color,enemies,weapons,edgeUp,edgeDown,edgeLeft,edgeRight,transition)
                gameObject.instantiate(levelGO)
                levelGO.addComponent(levelCO)
                levelGO.addComponent(new levelAreaDrawComponent())
                this.levelAreas.push(levelCO)
                let initialWeapon = new weaponPickupGameObject()
                
                initialWeapon.Transform.x = 160
                initialWeapon.Transform.y = 200
                gameObject.instantiate(initialWeapon)
                //console.log(initialWeapon.Transform.x + " " + initialWeapon.Transform.y)
            }
            else
            {
                let previousLevel = this.levelAreas[i - 1]
                let edgeUp = false
                let edgeDown= false
                let edgeLeft = false
                let edgeRight = false
                let transition = "up"

                let x = 0
                let y = 0
                let width = 300
                let height = 300
                let color = "blue"
                let enemies = Math.floor(Math.random() * 4)
                let weapons = Math.floor(Math.random() * 2)

                let nextTransition = Math.floor(Math.random() * 3) + 1
                //console.log(nextTransition)

                switch(previousLevel.transitionEdge)
                {
                    case "up":
                        edgeDown = true
                        x = previousLevel.xPosition
                        y = previousLevel.yPosition - height
                        while (nextTransition != -1)
                        {
                        if (nextTransition == 1)
                        {
                            if (this.searchForOverlap("left",x,y,width,height) == false)
                            {
                            transition = "left"
                            edgeLeft = true
                            nextTransition = -1
                            }
                            else
                            {
                                nextTransition++
                            }
                        }
                        else if (nextTransition == 2)
                        {
                            if (this.searchForOverlap("up",x,y,width,height) == false)
                            {
                            transition = "up"
                            edgeUp = true
                            nextTransition = -1
                            }
                            else
                            {
                                nextTransition++
                            }
                        }
                        else if (nextTransition == 3)
                        {
                            if (this.searchForOverlap("right",x,y,width,height) == false)
                            {
                            transition = "right"
                            edgeRight = true
                            nextTransition = -1
                            }
                            else
                            {
                                nextTransition = 1
                            }
                        }
                    }
                        break;
                    case "down":
                        edgeUp = true
                        x = previousLevel.xPosition
                        y = previousLevel.yPosition + height
                        while(nextTransition != -1)
                        {
                        if (nextTransition == 1)
                        {
                            if (this.searchForOverlap("left",x,y,width,height) == false)
                            {
                            transition = "left"
                            edgeLeft = true
                            nextTransition = -1
                            }
                            else
                            {
                                nextTransition++
                            }
                        }
                        else if (nextTransition == 2)
                        {
                            if (this.searchForOverlap("down",x,y,width,height) == false)
                            {
                            transition = "down"
                            edgeDown = true
                            nextTransition = -1
                            }
                            else
                            {
                                nextTransition++
                            }
                        }
                        else if (nextTransition == 3)
                        {
                            if (this.searchForOverlap("right",x,y,width,height) == false)
                            {
                                transition = "right"
                                edgeRight = true
                                nextTransition = -1
                            }
                            else
                            {
                                nextTransition = 1
                            }
                        }
                    }
                        break;
                    case "left":
                        edgeRight = true
                        x = previousLevel.xPosition - width
                        y = previousLevel.yPosition
                        while (nextTransition != -1)
                        {
                        if (nextTransition == 1)
                        {
                            if (this.searchForOverlap("down",x,y,width,height) == false)
                            {
                            transition = "down"
                            edgeDown = true
                            nextTransition = -1
                            }
                            else
                            {
                                nextTransition++
                            }
                        }
                        else if (nextTransition == 2)
                        {
                            if (this.searchForOverlap("left",x,y,width,height) == false)
                            {
                            transition = "left"
                            edgeLeft = true
                            nextTransition = -1
                            }
                            else
                            {
                                nextTransition++
                            }
                        }
                        else if (nextTransition == 3)
                        {
                            if (this.searchForOverlap("up",x,y,width,height) == false)
                            {
                                transition = "up"
                                edgeUp = true
                                nextTransition = -1
                            }
                            else
                            {
                                nextTransition = 1
                            }
                        }
                    }
                        break;
                    case "right":
                        edgeLeft = true
                        x = previousLevel.xPosition + width
                        y = previousLevel.yPosition
                        while (nextTransition != -1)
                        {
                        if (nextTransition == 1)
                        {
                            if (this.searchForOverlap("up",x,y,width,height) == false)
                            {
                            transition = "up"
                            edgeUp = true
                            nextTransition = -1
                            }
                            else
                            {
                                nextTransition++
                            }
                        }
                        else if (nextTransition == 2)
                        {
                            if (this.searchForOverlap("right",x,y,width,height) == false)
                            {
                            transition = "right"
                            edgeRight = true
                            nextTransition = -1
                            }
                            else
                            {
                                nextTransition++
                            }
                        }
                        else if (nextTransition == 3)
                        {
                            if (this.searchForOverlap("down",x,y,width,height) == false)
                            {
                                transition = "down"
                                edgeDown = true
                                nextTransition = -1
                            }
                            else
                            {
                                nextTransition = 1
                            }
                        }
                    }
                        break;
                }

                if ( i == this.numberOfLevels - 1)
                {
                    if (transition == "up")
                    {
                        edgeUp = false
                    }
                    else if (transition == "down")
                    {
                        edgeDown = false
                    }
                    else if (transition == "left")
                    {
                        edgeLeft = false
                    }
                    else if (transition == "right")
                    {
                        edgeRight = false
                    }
                }

                let levelGO = new levelAreaGameObject("levelAreaGameObject")
                let levelCO = new levelAreaComponent(x,y,width,height,color,enemies,weapons,edgeUp,edgeDown,edgeLeft,edgeRight,transition)
                levelGO.addComponent(levelCO)
                levelGO.addComponent(new levelAreaDrawComponent())
                gameObject.instantiate(levelGO)
                
                this.levelAreas.push(levelCO)
            }
        }

        this.LEVELS_INITIALIZED = true
    }

    update()
    {
        if (this.componentListeners.length == 0 && this.LEVELS_INITIALIZED)
        {
            let playerGO = gameObject.getObjectByName("playerGameObject")
            let playerCO = playerGO.getComponent("playerComponent")
            this.addListener(playerCO)
            let cameraGO = gameObject.getObjectByName("cameraTrackerGameObject")
            let cameraCO = cameraGO.getComponent("cameraTrackerComponent")
            this.addListener(cameraCO)
            this.updateListeners("levelsInitialized")
        }
    }

    searchForOverlap(direction, xPosition, yPosition, width, height)
    {
        let result = false
        
        for (let i = 0; i < this.levelAreas.length; i++)
        {
            let levelArea = this.levelAreas[i]
            switch (direction)
            {
                case "up":
                    if (levelArea.yPosition == yPosition - height)
                    {
                        result = true
                    }
                    break;
                case "down":
                    if (levelArea.yPosition == yPosition + height)
                    {
                        result = true
                    }
                    break;
                case "left":
                    if (levelArea.xPosition == xPosition - width)
                    {
                        result = true
                    }
                    break;
                case "right":
                    if (levelArea.xPosition == xPosition + width)
                    {
                        result = true
                    }
                    break;
            }
        }

        return result
    }
}

class shooterGameObject extends gameObject
{
    start()
    {
        this.addComponent(new shooterComponent())
        this.addComponent(new CircleCollider(2, "green", true))
        this.addComponent(new CircleColliderDraw())
    }
}

class shooterComponent extends Component
{
    componentName = "shooterComponent"
    
    scaleFactor = 1/4
    maxReach = 25
    mx
    my
    player   
    
    start()
    {
        //this.getTransform().x = this.player.Transform.x + 5
        //this.getTransform().y = this.player.Transform.y + 5
        //console.log("started schutplayer")

        this.player = gameObject.getObjectByName("playerGameObject")
    }

    update(ctx)
    {
        this.getTransform().x = this.player.Transform.x
        this.getTransform().y = this.player.Transform.y
        
        this.mx = Input.mouseX
        this.my = Input.mouseY

        let worldSpaceValues = Camera.screenToWorld(ctx,this.mx,this.my)

        //let logicalSpaceValues = Camera.toLogicalScreenSpace(this.mx, this.my, ctx)

        //this.mx = logicalSpaceValues.x
        //this.my = logicalSpaceValues.y

        
        
        this.mx = worldSpaceValues.x
        this.my = worldSpaceValues.y

        //console.log("X: " + this.mx + " Y: " + this.my)

        let differenceX = this.mx - this.getTransform().x
        let differenceY = this.my - this.getTransform().y
        
        let scaledX = differenceX * this.scaleFactor
        let scaledY = differenceY * this.scaleFactor

        let theta = Math.atan2(scaledY, scaledX)

        //if ((scaledX * scaledX) + (scaledY * scaledY) > this.maxReach)
        //{
            scaledX = this.maxReach * Math.cos(theta)
            scaledY = this.maxReach * Math.sin(theta)
       // }

       //console.log(this.player.getComponent("playerComponent").playerWidth)
        
       let pc = this.player.getComponent("playerComponent")
       
       /*this.getTransform().x += (scaledX + (this.player.getComponent("playerComponent").playerWidth / 2))
        this.getTransform().y += (scaledY + (this.player.getComponent("playerComponent").playerHeight / 2))*/

        this.getTransform().x += (scaledX + (pc.playerWidth / 2))
        this.getTransform().y += (scaledY + (pc.playerHeight / 2))

        //console.log(this.player.getComponent("playerComponent").playerWidth)

    }
}

class bulletGameObject extends gameObject
{
    start()
    {
        //this.addComponent(new bulletComponent())
        this.addComponent(new RectangleCollider(2, 2, "orange", false))
        this.addComponent(new bulletDrawComponent())
    }
}

class bulletComponent extends Component
{
    componentName = "bulletComponent"

    shootergo = gameObject.getObjectByName("shooterGameObject")
    shooter = this.shootergo.getComponent("shooterComponent")
    
    bvx
    bvy
    bulletSpeed = 25
    lifeTime = 0
    maxlifeTime = 30
    mx
    my
    differenceX
    differenceY
    MADE_COLLISION = false

    constructor(mx,my)
    {
        super()
        this.mx = mx
        this.my = my
    }
    
    start()
    {   
        this.bvx = 0
        this.bvy = 0
        
        this.getTransform().x = this.shooter.getTransform().x
        this.getTransform().y = this.shooter.getTransform().y

        this.differenceX = this.mx - this.getTransform().x
        this.differenceY = this.my - this.getTransform().y

        //console.log(this.differenceX + " " + this.differenceY)

        let theta = Math.atan2(this.differenceY, this.differenceX)

        //console.log(theta + "")

        this.differenceX = this.bulletSpeed * Math.cos(theta)
        this.differenceY = this.bulletSpeed * Math.sin(theta)

        this.bvx += this.differenceX
        this.bvy += this.differenceY
    }

    update(ctx)
    {   
        if (this.componentListeners.length == 0)
        {
            let ecgo = gameObject.getObjectByName("enemyControllerGameObject")
            let ecc = ecgo.getComponent("enemyControllerComponent")
            this.addListener(ecc)
            ecc.addListener(this)
        }   
        
        this.getTransform().x += this.bvx
            this.getTransform().y += this.bvy

            let bullet = this.componentParent.getComponent("RectangleCollider")

            for (let gameObject of sceneManager.getCurrentScene().gameObjects)
            {
                for (let component of gameObject.components)
                {
                    if (component.componentName == "RectangleCollider")
                    {
                        if (this.bulletCollision(this, component))
                        {
                            this.updateListeners("bulletContact")
                            console.log("bullet contact event")
                        }
                        else
                        {
                            console.log("nothing :(")
                        }
                    }
                }
            }

            this.lifeTime++
            
            if (this.lifeTime >= this.maxlifeTime)
            {
                this.componentParent.destroy()
            }
    }

    //portions from https://www.topcoder.com/thrive/articles/Geometry%20Concepts%20part%202:%20%20Line%20Intersection%20and%20its%20Applications
    bulletCollision(bulletComponent, rectangleComponent)
    {
        let bulletX2 = bulletComponent.getTransform().x
        let bulletX1 = bulletComponent.getTransform().x - bulletComponent.bvx
        let bulletY2 = bulletComponent.getTransform().y
        let bulletY1 = bulletComponent.getTransform().y - bulletComponent.bvy

        let rectangleLeftX = rectangleComponent.getTransform().x
        let rectangleTopY = rectangleComponent.getTransform().y
        let rectangleRightX = rectangleLeftX + rectangleComponent.colliderWidth
        let rectangleBottomY = rectangleComponent.getTransform().y + rectangleComponent.colliderHeight

        let colliding = false

        let A1 = bulletY2 - bulletY1
        let B1 = bulletX1 - bulletX2
        let C1 = (A1 * bulletX1) + (B1 * bulletY1)

        //left line
        let A2 = rectangleBottomY - rectangleTopY
        let B2 = rectangleLeftX - rectangleLeftX
        let C2 = (A2 * rectangleLeftX) + (B2 * rectangleTopY)

        let det = A1 * B2 - A2 * B1

        if (det != 0)
        {
            let foundX = (B2 * C1 - B1 * C2) / det
            let foundY = (A1 * C2 - A2 * C1) / det

            //console.log(foundX + " " + foundY)

            if (Math.min(bulletX1, bulletX2) <= foundX && Math.max(bulletX1, bulletX2) >= foundX)
            {
                if (Math.min(bulletY1, bulletY2) <= foundY && Math.max(bulletY1, bulletY2) >= foundY)
                {
                    //console.log("ON BULLET LINE")
                    
                    if (foundX >= rectangleLeftX - 0.1 && foundX <= rectangleLeftX + 0.1)
                    {
                        if (foundY >= rectangleTopY && foundY <= rectangleBottomY)
                        {
                            colliding = true
                        }
                    }
                }
            }
        }

        //right line
        A2 = rectangleBottomY - rectangleTopY
        B2 = rectangleRightX - rectangleRightX
        C2 = (A2 * rectangleRightX) + (B2 * rectangleTopY)

        det = A1 * B2 - A2 * B1

        if (det != 0)
        {
            let foundX = (B2 * C1 - B1 * C2) / det
            let foundY = (A1 * C2 - A2 * C1) / det

            //console.log(foundX + " " + foundY)

            if (Math.min(bulletX1, bulletX2) <= foundX && Math.max(bulletX1, bulletX2) >= foundX)
            {
                if (Math.min(bulletY1, bulletY2) <= foundY && Math.max(bulletY1, bulletY2) >= foundY)
                {
                    //console.log("ON BULLET LINE")
                    
                    if (foundX >= rectangleRightX - 0.1 && foundX <= rectangleRightX + 0.1)
                    {
                        if (foundY >= rectangleTopY && foundY <= rectangleBottomY)
                        {
                            colliding = true
                        }
                    }
                }
            }
        }

        //top line
        A2 = rectangleTopY - rectangleTopY
        B2 = rectangleLeftX - rectangleRightX
        C2 = (A2 * rectangleLeftX) + (B2 * rectangleTopY)

        det = A1 * B2 - A2 * B1

        if (det != 0)
        {
            let foundX = (B2 * C1 - B1 * C2) / det
            let foundY = (A1 * C2 - A2 * C1) / det

            if (Math.min(bulletX1, bulletX2) <= foundX && Math.max(bulletX1, bulletX2) >= foundX)
            {
                if (Math.min(bulletY1, bulletY2) <= foundY && Math.max(bulletY1, bulletY2) >= foundY)
                {
                    console.log("We Got Here at Least")

                    console.log(foundX + " " + foundY)
                    
                    if (foundX >= rectangleLeftX && foundX <= rectangleRightX)
                    {
                        ("At least the X was right")
                        
                        if (foundY >= rectangleTopY - 0.1 && foundY <= rectangleTopY + 0.1)
                        {
                            colliding = true
                        }
                    }
                }
            }
        }

        //bottom line
        A2 = rectangleBottomY - rectangleBottomY
        B2 = rectangleLeftX - rectangleRightX
        C2 = (A2 * rectangleLeftX) + (B2 * rectangleBottomY)

        det = A1 * B2 - A2 * B1

        if (det != 0)
        {
            let foundX = (B2 * C1 - B1 * C2) / det
            let foundY = (A1 * C2 - A2 * C1) / det

            //console.log(foundX + " " + foundY)

            if (Math.min(bulletX1, bulletX2) <= foundX && Math.max(bulletX1, bulletX2) >= foundX)
            {
                if (Math.min(bulletY1, bulletY2) <= foundY && Math.max(bulletY1, bulletY2) >= foundY)
                {
                    //console.log("ON BULLET LINE")
                    
                    if (foundX >= rectangleLeftX && foundX <= rectangleRightX)
                    {
                        if (foundY >= rectangleBottomY - 0.1 && foundY <= rectangleBottomY + 0.1)
                        {
                            colliding = true
                        }
                    }
                }
            }
        }

        return colliding

    }

    handleUpdate(component, eventName)
    {
        if (eventName == "bulletHit")
        {
            if (this.MADE_COLLISION)
            {
            this.componentParent.destroy()
            }
        }
        
    }
}

class bulletDrawComponent extends Component
{
    componentName = "bulletDrawComponent"

    draw(ctx)
    {
        let dx = this.componentParent.getComponent("bulletComponent").differenceX
        let dy = this.componentParent.getComponent("bulletComponent").differenceY

        let theta = Math.atan2(dy, dx)

        //dx = Math.cos(theta)
        //dy = Math.sin(theta)

        let bx = this.componentParent.getComponent("bulletComponent").getTransform().x
        let by = this.componentParent.getComponent("bulletComponent").getTransform().y

        let colorVariance = Math.floor(Math.random() * 61) - 30
        let orangeVariance = 160 + colorVariance
        ctx.strokeStyle = "rgb(245, " + orangeVariance + ", 66)"
        ctx.beginPath()
        //ctx.strokeStyle = "red"
        ctx.lineWidth = 2
        ctx.moveTo(bx, by)
        ctx.lineTo((bx - (dx)), (by - (dy)))
        ctx.stroke()
        ctx.closePath()
    }
}

class shooterControllerGameObject extends gameObject
{
    start()
    {
        this.addComponent(new shooterControllerComponent())
    }
} 

class shooterControllerComponent extends Component
{
    componentName = "shooterControllerComponent"

    currentScene = sceneManager.getCurrentScene()

    currentWeapon = "None"
    reserveSize = 0
    magSize = 0
    currentReserve = 0
    currentMag = 0
    IS_RELOADING = false
    fireRateCooldown = 0
    reloadTime = 0
    currentReloadTime = 0
    currentFireRateCooldown = 0
    
    start()
    {
        let wcgo = gameObject.getObjectByName("weaponControllerGameObject")

        let wcc = wcgo.getComponent("weaponControllerComponent")
        
        this.currentWeapon = wcc.currentWeapon
        this.reserveSize = wcc.reserveSize
        this.magSize = wcc.magSize
        this.IS_RELOADING = wcc.IS_RELOADING
        this.fireRateCooldown = wcc.fireRateCooldown
        this.reloadTime = wcc.reloadTime
        
        this.currentReserve = this.reserveSize
        this.currentMag = this.magSize

        this.currentFireRateCooldown = this.fireRateCooldown
    }

    update(ctx)
    {
        if (this.componentListeners.length == 0)
        {
            let scdgo = gameObject.getObjectByName("shooterControllerDrawGameObject")

            let scdc = scdgo.getComponent("shooterControllerDrawComponent")

            this.addListener(scdc)
        }
        
        let wcgo = gameObject.getObjectByName("weaponControllerGameObject")

        let wcc = wcgo.getComponent("weaponControllerComponent")
        
        this.currentWeapon = wcc.currentWeapon
        this.reserveSize = wcc.reserveSize
        this.magSize = wcc.magSize
        //this.IS_RELOADING = wcc.IS_RELOADING
        this.fireRateCooldown = wcc.fireRateCooldown
        this.reloadTime = wcc.reloadTime
        
        if (this.componentListeners.length == 0)
        {
            let shooterGO = gameObject.getObjectByName("shooterControllerDrawGameObject")
            let shooterDraw = shooterGO.getComponent("shooterControllerDrawComponent")
           // this.addListener(shooterDraw)
            //console.log("listener added :3")
        }
        
        if(this.IS_RELOADING == false)
        {
        if (Input.mousedown && this.currentMag > 0)
        {
            if (this.currentFireRateCooldown == this.fireRateCooldown)
            {
            let worldcoords = Camera.screenToWorld(ctx, Input.mouseX, Input.mouseY)
            let spawnedBullet = new bulletGameObject("bulletGameObject")
            spawnedBullet.addComponent(new bulletComponent(worldcoords.x, worldcoords.y))
            gameObject.instantiate(spawnedBullet)
            this.currentMag--
            //console.log("pew!")
            //this.updateListeners("playerShoot")
            this.currentFireRateCooldown = 0
            }
            else
            {
                if (this.currentFireRateCooldown < this.fireRateCooldown)
                {
                this.currentFireRateCooldown++
                }
            }
        }
        else 
        {
            if (this.currentFireRateCooldown < this.fireRateCooldown)
            {
            this.currentFireRateCooldown++
            }
            if (this.currentMag <= 0)
            {
                if (this.currentWeapon != "None")
                {
                this.reload()
                }
            }
        }
    }
    else
    {
        if (this.currentReloadTime > 0)
        {
            this.currentReloadTime--
        }
        else
        {
            this.currentReloadTime = 0
            this.IS_RELOADING = false
            this.updateListeners("doneReloading")
        }
    }
    }


    reload()
    {
        this.updateListeners("reloading")
        this.IS_RELOADING = true
        this.currentReloadTime = this.reloadTime
        if (this.currentMag < this.magSize)
        {
            if (this.currentReserve > 0)
            {
                let refillAmount = (this.magSize - this.currentMag)
                if (this.currentReserve >= refillAmount)
                {
                    this.currentReserve -= refillAmount
                    this.currentMag += refillAmount
                }
                else
                {
                    this.currentMag += this.currentReserve
                    this.currentReserve -= this.currentReserve
                }
            }
        }
            this.currentFireRateCooldown = this.fireRateCooldown
    }

    handleUpdate(component, eventName)
    {
        if (eventName == "weaponPickup")
        {
            let wcgo = gameObject.getObjectByName("weaponControllerGameObject")

            let wcc = wcgo.getComponent("weaponControllerComponent")
            
            this.currentReserve = wcc.reserveSize
            this.currentMag = wcc.magSize
            this.currentFireRateCooldown = wcc.fireRateCooldown
        }
    }
}

class shooterControllerDrawGameObject extends gameObject
{
    start()
    {
        let ammoCounter = new Textbox("white", "20px Arial", "heehoo", "right")
        ammoCounter.componentName = "ammoCounter"
        this.addComponent(ammoCounter)
        this.addComponent(new shooterControllerDrawComponent())
        this.layer = 5
    }
}

class shooterControllerDrawComponent extends Component
{
    ammoCon
    ammoConCo
    reserve = 0
    mag = 0
    ammoText
    ammoString
    mouseWorldCoords
    shooterGo
    shooterCo
    ctx
    lineDraw = false
    IS_RELOADING = false
    
    start()
    {
        this.shooterGo = gameObject.getObjectByName("shooterControllerGameObject")
        this.shooterCo = this.shooterGo.getComponent("shooterControllerComponent")
        this.shooterCo.addListener(this)
        this.ammoCon = gameObject.getObjectByName("shooterControllerGameObject")
        //this.ammoCon = this.ammoConCo.getComponent("shooterControllerComponent")
        this.ammoConCo = this.ammoCon.getComponent("shooterControllerComponent")
        this.ammoText = this.componentParent.getComponent("ammoCounter")
        //this.ammoText.getTransform().y += 50
    }

    handleUpdate(component, eventName)
    {
        if (eventName == "reloading")
        {
            this.IS_RELOADING = true

            /*let differenceX = this.mouseWorldCoords.x - this.shooterCo.getTransform().x
            let differenceY = this.mouseWorldCoords.y - this.shooterCo.getTransform().y
            let colorVariance = Math.floor(Math.random() * 61) - 30
            let orangeVariance = 160 + colorVariance
            this.ctx.strokeStyle = "rgb(245, orangeVariance, 66)"
            this.ctx.lineWidth = 1000
            this.ctx.beginPath()
            this.ctx.moveTo(this.shooterCo.getTransform().x, this.shooterCo.getTransform().y)
            this.ctx.lineTo((this.mouseWorldCoords.x), (this.mouseWorldCoords.y))
            this.ctx.fill()
            this.ctx.closePath()*/

            //this.lineDraw = true
        }

        if (eventName == "doneReloading")
        {
            this.IS_RELOADING = false
        }
    }

    draw(ctx)
    {
        if (this.lineDraw)
        {
        let differenceX = this.mouseWorldCoords.x - this.shooterCo.getTransform().x
        let differenceY = this.mouseWorldCoords.y - this.shooterCo.getTransform().y
        let shooterGo2 = gameObject.getObjectByName("shooterGameObject")
        let shooterCo2 = shooterGo2.getComponent("shooterComponent")
        let colorVariance = Math.floor(Math.random() * 61) - 30
        let orangeVariance = 160 + colorVariance
        ctx.strokeStyle = "rgb(245, " + orangeVariance + ", 66)"
        ctx.beginPath()
        //ctx.strokeStyle = "red"
        ctx.lineWidth = 2
        ctx.moveTo(shooterCo2.getTransform().x, shooterCo2.getTransform().y)
        ctx.lineTo((this.mouseWorldCoords.x), (this.mouseWorldCoords.y))
        ctx.stroke()
        ctx.closePath()
        this.lineDraw = false
        }
    }

    draw(ctx)
    {
        this.mouseWorldCoords = Camera.GUIToWorld(ctx, Input.mouseX, Input.mouseY)
        this.reserve = this.ammoConCo.currentReserve
        this.mag = this.ammoConCo.currentMag

        if (this.IS_RELOADING == false)
        {
        this.ammoString = this.mag + "/" + this.reserve
        }
        else
        {
            this.ammoString = "Reloading!"
        }
        this.ammoText.textString = this.ammoString
        
        let zeros = Camera.getZeros(ctx)

        let yHeight = 0

        let xWidth = 0

        let textWidth = ctx.measureText(this.ammoString).width

        let textHeight = ctx.measureText(this.ammoString).actualBoundingBoxAscent

        let currentAspectRatio = ctx.canvas.width / ctx.canvas.height

        if (EngineGlobals.requestedAspectRatio > currentAspectRatio) //letterboxes top and bottom
        {
            yHeight = ctx.canvas.width/EngineGlobals.requestedAspectRatio - (textHeight * 3)

            xWidth = ctx.canvas.width - (textWidth * 5)
        }
        else //letterboxes on sides
        {
            yHeight = ctx.canvas.height - (textHeight * 3)

            xWidth = ctx.canvas.height * EngineGlobals.requestedAspectRatio - (textWidth * 5)
        }
        
        let worldSpaceCoords = Camera.screenToWorld(ctx, zeros.zeroX + xWidth, zeros.zeroY + yHeight)
        
        this.ammoText.getTransform().x = worldSpaceCoords.x
        this.ammoText.getTransform().y = worldSpaceCoords.y

    }
}

class enemyGameObject extends gameObject
{
   start()
   {
    this.addComponent(new enemyComponent())
    this.addComponent(new RectangleCollider(10,10,"red",true))
    this.addComponent(new RectangleColliderDraw())
   }
}

class enemyComponent extends Component
{
    componentName = "enemyComponent"
    
    evx
    evy
    eAccel = 0
    enemyWidth
    enemyHeight
    enemyHealth
    enemyMaxHealth
    IS_MOVING
    IS_ATTACKING
    IS_DEAD
    HEALTH_INITIALIZED
    healthBar = 0
    healthBarCo
    movementTimer
    IS_ALERTED
    TEXT_ACTIVE
    TEXT_ACTIVE_FRAMES
    alertText
    MOVEMENT_INITIALIZED
    levelAreaXLeft
    levelAreaXRight
    levelAreaYUp
    levelAreaYDown
    levelAreaConnectedEdgeUp
    levelAreaConnectedEdgeDown
    levelAreaConnectedEdgeLeft
    levelAreaConnectedEdgeRight
    
    start(ctx)
    {
       
        
        let collider = this.componentParent.getComponent("RectangleCollider")
        collider.colliderColor = "red"
        this.evx = 0
        this.evy = 0
        this.eAccel = 0
        this.enemyWidth = this.componentParent.getComponent("RectangleCollider").colliderWidth
        this.enemyHeight = this.componentParent.getComponent("RectangleCollider").colliderHeight
        this.enemyHealth = 100
        this.enemyMaxHealth = 100
        this.IS_MOVING = false
        this.IS_ATTACKING = false
        this.IS_DEAD = false
        this.HEALTH_INITIALIZED = false
        this.movementTimer = 0
        this.IS_ALERTED = false
        this.TEXT_ACTIVE
        this.TEXT_ACTIVE_FRAMES = 0
        this.MOVEMENT_INITIALIZED = false
        //console.log("started enemy")
        //this.getTransform().x = 100
        //this.getTransform().y = 120

    }

    update(ctx)
    {   
        if (this.HEALTH_INITIALIZED == false)
        {
            this.healthBar = new enemyHealthBarGameObject("enemyHealthBarGameObject")
            gameObject.instantiate(this.healthBar)
            this.healthBarCo = this.healthBar.getComponent("enemyHealthBarComponent")
            this.healthBarCo.healthBarParent = this
            this.addListener(this.healthBarCo)
            this.updateListeners("healthInitialized")
            this.HEALTH_INITIALIZED = true
        }
        
        if (this.componentListeners.length < 2)
        {
            let ecgo = gameObject.getObjectByName("enemyControllerGameObject")
            let ecc = ecgo.getComponent("enemyControllerComponent")
            this.addListener(ecc)
            ecc.addListener(this)
        }

        if (this.IS_ALERTED == false)
        {
            let playerGO = gameObject.getObjectByName("playerGameObject")
            let playerX = playerGO.Transform.x
            let playerY = playerGO.Transform.y
            let distance = Math.sqrt(((this.getTransform().x - playerX)*(this.getTransform().x - playerX)) + ((this.getTransform().y - playerY)*(this.getTransform().y - playerY)))
            if (distance <= 50)
            {
                this.IS_ALERTED = true
                this.TEXT_ACTIVE = true
                let alertedText = new enemyAlertGameObject("enemyAlertGameObject")
                gameObject.instantiate(alertedText)
                let alertedTextCO = alertedText.getComponent("enemyAlertComponent")
                alertedTextCO.linkedEnemy = this
                this.alertText = alertedText
            }
        }
        
        if (this.IS_DEAD == false)
        {
            if (this.IS_ALERTED)
            {
            //this.up = 0
            //this.left = 0
            //this.down = 0
            //this.right = 0

            if (this.movementTimer <= 30)
            {
                if (this.MOVEMENT_INITIALIZED == false)
                {
                this.up = Math.floor(Math.random() * 2) * -1
                this.down = Math.floor(Math.random() * 2)
                this.left = Math.floor(Math.random() * 2) * -1
                this.right = Math.floor(Math.random() * 2)
                this.MOVEMENT_INITIALIZED = true
                }

                this.movementTimer++
            }
            else 
            {
                this.up = 0
                this.down = 0 //was 1
                this.left = 0
                this.right = 0
                if (this.movementTimer >= 60)
                {
                    this.movementTimer = 0
                    this.MOVEMENT_INITIALIZED = false
                }
                else
                {
                    this.movementTimer++
                }
            }
            
            this.evx = this.left + this.right
            this.evy = this.up + this.down

            if (this.evx != 0 || this.evy != 0)
            {
                this.IS_MOVING = true
            }
            else
            {
                this.IS_MOVING = false
            }

            if (this.IS_MOVING && this.eAccel < 1)
            {
                this.eAccel++
            }
            
            else if (this.IS_MOVING == false && this.eAccel > 0)
            {
                this.eAccel--
            }

            this.IS_MOVING = this.eAccel > 0

            this.magnitude = Math.sqrt((this.evx * this.evx) + (this.evy * this.evy)) 

            if (this.evx != 0)
            {
                this.evx = this.evx / this.magnitude
            }

            if (this.evy != 0)
            {
                this.evy = this.evy / this.magnitude
            }

            this.getTransform().x += this.evx * this.eAccel
            this.getTransform().y += this.evy * this.eAccel

            let nextXLocation = this.getTransform().x + this.evx * this.eAccel
            let nextYLocation = this.getTransform().y + this.evy * this.eAccel

            console.log(nextXLocation + " " + nextYLocation + " " + this.eAccel)
            
            if (this.levelAreaConnectedEdgeUp == false)
            {
                if (nextYLocation < this.levelAreaYUp)
                {
                nextYLocation = this.levelAreaYUp
                }
            }
            if (this.levelAreaConnectedEdgeDown == false)
            {
                if (nextYLocation + this.enemyHeight > this.levelAreaYDown)
                {
                    nextYLocation = this.levelAreaYDown - this.enemyHeight
                }
            }
            if (this.levelAreaConnectedEdgeLeft == false)
            {
                if (nextXLocation < this.levelAreaXLeft)
                {
                    nextXLocation = this.levelAreaXLeft
                }
            }
            if (this.levelAreaConnectedEdgeRight == false)
            {
                if (nextXLocation + this.enemyWidth > this.levelAreaXRight)
                {
                    nextXLocation = this.levelAreaXRight - this.enemyWidth
                }
            }

            this.getTransform().x = nextXLocation
            this.getTransform().y = nextYLocation

            if (this.TEXT_ACTIVE && this.TEXT_ACTIVE_FRAMES <= 30)
            {
                this.TEXT_ACTIVE_FRAMES++
            }
            else if (this.TEXT_ACTIVE_FRAMES > 30)
            {
                this.alertText.destroy()
            }
        }
            }
            else
            {
                let collider = this.componentParent.getComponent("RectangleCollider")
                collider.colliderColor = "black"
                this.IS_MOVING = false
                this.healthBar.destroy()
                //this.evx = 0
                //this.evy = 0
            }
    }

    decideMovementDirection()
    {

    }

    handleUpdate(component, eventName)
    {
        if (eventName == "bulletCheck")
        {
            for (let gameObject of sceneManager.getCurrentScene().gameObjects)
            {
                if (gameObject.gameObjectName == "bulletGameObject")
                {
                    console.log("I recognize the bullet!")
                    
                    let bulletCollider = gameObject.getComponent("RectangleCollider")

                    let bulletComponent = gameObject.getComponent("bulletComponent")

                    let enemyCollider = this.componentParent.getComponent("RectangleCollider")

                    console.log(bulletComponent.bulletCollision(bulletComponent, enemyCollider))

                    if (bulletComponent.bulletCollision(bulletComponent, enemyCollider))
                    {
                        //this.IS_DEAD = true
                        bulletComponent.MADE_COLLISION = true
                        this.updateListeners("bulletHit")
                        this.enemyHealth -= 20
                        if (this.enemyHealth <= 0)
                        {
                            this.IS_DEAD = true
                        }
                    }
                }
            }
        }
    }
}

class enemyBulletGameObject extends gameObject
{

}

class enemyHealthBarGameObject extends gameObject
{
    start()
    {
        this.addComponent(new enemyHealthBarComponent())
        this.addComponent(new enemyHealthBarDrawComponent())
    }
}

class enemyHealthBarComponent extends Component
{
    componentName = "enemyHealthBarComponent"
    
    healthBarParent
    currentHealth
    maxHealth
    HEALTH_INITIALIZED = false

    /*start()
    {
        this.currentHealth = this.healthBarParent.enemyHealth
        this.maxHealth = this.healthBarParent.enemyMaxHealth
    }*/

    update()
    {
        if (this.HEALTH_INITIALIZED)
        {
            this.currentHealth = this.healthBarParent.enemyHealth
            this.maxHealth = this.healthBarParent.enemyMaxHealth
        }
    }

    handleUpdate(component, eventName)
    {
        if (eventName == "healthInitialized")
        {
            this.HEALTH_INITIALIZED = true
        }
    }
}

class enemyHealthBarDrawComponent extends Component
{
    componentName = "enemyHealthBarDrawComponent"
    
    healthBarParentCo
    healthBarParent
    currentHealth
    maxHealth
    
    start()
    {
        this.healthBarParentCo = this.componentParent.getComponent("enemyHealthBarComponent")
        this.healthBarParent = this.healthBarParentCo.healthBarParent
        this.currentHealth = this.healthBarParentCo.currentHealth
       
        console.log("health bar started")
    }

    drawScreen(ctx)
    {
        let amount = 0
        let toDraw = false
        
        this.healthBarParentCo = this.componentParent.getComponent("enemyHealthBarComponent")
        this.healthBarParent = this.healthBarParentCo.healthBarParent
        this.currentHealth = this.healthBarParentCo.currentHealth
        this.maxHealth = this.healthBarParentCo.maxHealth
        let enemyX = this.healthBarParent.componentParent.Transform.x
        let enemyY = this.healthBarParent.componentParent.Transform.y
        let enemyHeightCo = this.healthBarParent.componentParent.getComponent("RectangleCollider")
        let enemyHeight = enemyHeightCo.colliderHeight

        let guiValues = Camera.worldToScreen(ctx, enemyX - enemyHeight * 0.5, enemyY - enemyHeight * 0.75)

        let guiX = guiValues.x
        let guiY = guiValues.y

        let currentAspectRatio = ctx.canvas.width / ctx.canvas.height

        if (EngineGlobals.requestedAspectRatio > currentAspectRatio)
        {
            let desiredHeight = ctx.canvas.width/EngineGlobals.requestedAspectRatio //top and bottom
            amount = (ctx.canvas.height - desiredHeight) / 2

            if (guiY > amount && guiY < ctx.canvas.height - amount)
            {
                toDraw = true
            }
        }
        else
        {
            let desiredWidth = ctx.canvas.height * EngineGlobals.requestedAspectRatio //sides
            let amount = (ctx.canvas.width - desiredWidth) / 2
            
            if (guiX > amount && guiX < ctx.canvas.width - amount)
            {
                toDraw = true
            }
        }

        //let guiX = enemyX
        //let guiY = enemyY

        if (this.currentHealth > 0)
        {
            let healthPercentage = this.currentHealth / this.maxHealth

            ctx.fillStyle = "red"

            if (toDraw)
            {
            ctx.fillRect(guiX,guiY,50,10)
            }

            ctx.fillStyle = "green"

            if (toDraw)
            {
            ctx.fillRect(guiX,guiY,(50 * healthPercentage),10)
            }

            //console.log("health bar drawn")
        }

    }
}

class enemyAlertGameObject extends gameObject
{
    start()
    {
        this.addComponent(new enemyAlertComponent())
    }
}

class enemyAlertComponent extends Component
{
    componentName = "enemyAlertComponent"

    linkedEnemy

    text

    start()
    {
       this.text = new Textbox("white", "15px Arial","!","left")
       this.componentParent.addComponent(this.text)
    }
    
    update()
    {
        this.getTransform().x = this.linkedEnemy.getTransform().x
        this.getTransform().y = this.linkedEnemy.getTransform().y - 15
    }
}

class enemyControllerGameObject extends gameObject
{
    start()
    {
        this.addComponent(new enemyControllerComponent())
    }
}

class enemyControllerComponent extends Component
{
    componentName = "enemyControllerComponent"
    
    start()
    {

    }

    update()
    {
        
    }

    handleUpdate(component, eventName)
        {
            if (eventName == "bulletContact")
            {
                this.updateListeners("bulletCheck")
                console.log("bullet check event")
            }

            if (eventName == "bulletHit")
            {
                this.updateListeners("bulletHit")
                console.log("bullet hit event")
            }
        }
}

class weaponControllerGameObject extends gameObject
{
    start()
    {
    this.addComponent(new weaponControllerComponent())
    }
}

class weaponControllerComponent extends Component
{
    componentName = "weaponControllerComponent"
    
    currentWeapon = "None"
    reserveSize = 0
    magSize = 0
    IS_RELOADING = false
    fireRateCooldown = 0
    reloadTime = 0

    start()
    {
        this.currentWeapon = "None"
        this.reserveSize = 0
        this.magSize = 0
        this.IS_RELOADING = false
        this.fireRateCooldown = 0
        this.reloadTime = 0
    }

    handleUpdate(component, eventName)
    {
        if(eventName == "weaponPickup")
        {
            console.log("weapon picked up")
            
            let weaponName = component.containedWeapon

            switch (weaponName)
            {
                case "None":
                    this.currentWeapon = "None"
                    this.reserveSize = 0
                    this.magSize = 0
                    this.IS_RELOADING = false
                    this.fireRateCooldown = 0
                    this.reloadTime = 0
                break;
                case "Rifle":
                    this.currentWeapon = "Rifle"
                    this.reserveSize = 90
                    this.magSize = 30
                    this.IS_RELOADING = false
                    this.fireRateCooldown = 10
                    this.reloadTime = 120
                break;
                default:

                break;
            }
        }
    }
}

class weaponPickupGameObject extends gameObject
{
    start()
    {
        this.addComponent(new weaponPickupComponent())
        this.addComponent(new RectangleCollider(5,5,"black",true))
        this.addComponent(new RectangleColliderDraw())
    }
}

class weaponPickupComponent extends Component
{
    containedWeapon = "Rifle"
    
    /*constructor(weapon)
    {
        this.containedWeapon = weapon
    }*/
    
    start()
    {
        let wcgo = gameObject.getObjectByName("weaponControllerGameObject")
        let wcc = wcgo.getComponent("weaponControllerComponent")
        this.addListener(wcc)
        let scgo = gameObject.getObjectByName("startControllerGameObject")
        let sctb = scgo.getComponent("startControllerComponent")
        this.addListener(sctb)
        let shcgo = gameObject.getObjectByName("shooterControllerGameObject")
        let shcc = shcgo.getComponent("shooterControllerComponent")
        this.addListener(shcc)
        //this.getTransform().x = -770
        //this.getTransform().y = -770
    }

    update()
    {
        let pgo = gameObject.getObjectByName("playerGameObject")
        let pc = pgo.getComponent("RectangleCollider")
        let wpc = this.componentParent.getComponent("RectangleCollider")
        
        if (wpc.isColliding(pc))
        {
            this.updateListeners("weaponPickup")
            this.componentParent.destroy()
        }
    }
}

/*class ammoControllerGameObject extends gameObject
{
    start()
    {
        this.addComponent(new ammoControllerComponent)
        this.addComponent(new ammoControllerDrawComponent)
    }
} 

class ammoControllerComponent extends Component
{

}

class ammoControllerDrawComponent extends Component
{

}*/

class playerDrawComponent extends Component
{
    draw(ctx)
    {
       
    }
}

class cameraTrackerGameObject extends gameObject
{
    start()
    {
        this.addComponent(new cameraTrackerComponent())
    }

    update()
    {
        
    }
}

class cameraTrackerComponent extends Component
{
    componentName = "cameraTrackerComponent"

    LEVELS_INITIALIZED = false
    
    start()
    {
        this.getTransform().x = 80
        this.getTransform().y = 270
    }
    
    update()
    {
        if (this.LEVELS_INITIALIZED)
        {
        let player = gameObject.getObjectByName("playerGameObject")

        let boundingBox = 30
        let differenceX = player.Transform.x - this.getTransform().x
        let differenceY = player.Transform.y - this.getTransform().y

        if (differenceX > boundingBox)
        {
            this.getTransform().x += .2 * (differenceX - boundingBox)
        }
        else if (differenceX < -boundingBox)
        {
            this.getTransform().x += .2 * (differenceX + boundingBox)
        }

        if (differenceY > boundingBox)
        {
            this.getTransform().y += .2 * (differenceY - boundingBox)
        }
        else if (differenceY < -boundingBox)
        {
            this.getTransform().y += .2 * (differenceY + boundingBox)
        }
    }

        Camera.main.Transform.x = this.getTransform().x
        Camera.main.Transform.y = this.getTransform().y
    }

    handleUpdate(component, eventName)
    {
        if (eventName == "levelsInitialized")
        {
            this.LEVELS_INITIALIZED = true
        }
    }
}

class GameScene extends sceneContainer
{
    start()
    {
        //this.gameObjects = []
        this.addGameObject(new startControllerGameObject("startControllerGameObject"))
        //console.log("added controller object")
        this.addGameObject(new startDrawGameObject())
        //console.log("added draw object")
        this.addGameObject(new playerGameObject("playerGameObject"))
        //console.log("added the player")
        this.addGameObject(new cameraTrackerGameObject("cameraTrackerGameObject"))
        //console.log("camera tracking enabled")
        this.addGameObject(new shooterGameObject("shooterGameObject"))
        //console.log("shooter added to scene")
        this.addGameObject(new shooterControllerGameObject("shooterControllerGameObject"))
        //console.log("shoot input loaded")
        this.addGameObject(new shooterControllerDrawGameObject("shooterControllerDrawGameObject"))
        this.addGameObject(new debugGUIObject("debugGUIObject"))
        this.addGameObject(new weaponControllerGameObject("weaponControllerGameObject"))
        this.addGameObject(new weaponPickupGameObject("weaponPickupGameObject"))
        //this.addGameObject(new enemyGameObject("enemyGameObject"))
        this.addGameObject(new enemyControllerGameObject("enemyControllerGameObject"))
        this.addGameObject(new levelAreaConfigurationGameObject("levelAreaConfigurationGameObject"))
    }
    update()
    {

    }
    draw(ctx)
    {

    }
}

//Main Game

class TitleScene extends sceneContainer
{
    start()
    {
        this.addGameObject(new titleControllerGameObject("titleControllerGameObject"))
        this.addGameObject(new titleMessageControllerGameObject("titleMessageControllerGameObject"))
    }
    update()
    {

    }
    draw(ctx)
    {
    
    }
}

//Death Screen

class DeathScene extends sceneContainer
{
    start()
    {

    }
    update()
    {

    }
    draw(ctx)
    {
    
    }
}

let gameScene = new GameScene("purple")
let titleScene = new TitleScene("black")
sceneManager.addScene(titleScene)
sceneManager.addScene(gameScene)
//console.log("added title scene")