import "/engine/engine.js"
//Title Screen

//let canvas = document.querySelector("#canv")
//let ctx = canvas.getContext("2d")

class startControllerGameObject extends gameObject
{
    start()
    {
        this.addComponent(new startControllerComponent())
        //console.log("added start component")
        let debugAccel = new Textbox("white", "Impact", 50,"ba","left")
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
    start()
    {
        this.addComponent(new playerComponent())
        //this.addComponent(new playerDrawComponent())
        this.addComponent(new RectangleCollider(10,10,"yellow",true))
    }
}

class playerComponent extends Component
{
    componentName = "playerComponent"
    
    pvx = 0
    pvy = 0
    pAccel = 0
    playerWidth = 0
    playerHeight = 0
    IS_MOVING = false
    IS_ATTACKING = false
    
    start()
    {
        this.pvx = 0
        this.pvy = 0
        this.pAccel = 0
        this.playerWidth = this.componentParent.getComponent("RectangleCollider").colliderWidth
        this.playerHeight = this.componentParent.getComponent("RectangleCollider").colliderHeight
        this.IS_MOVING = false
        this.IS_ATTACKING = false
        //console.log("started player")
    }

    update()
    {
        this.up = 0
        this.left = 0
        this.down = 0
        this.right = 0

        this.keyPressed = false

        if (keysDown["w"])
        {
            this.up = -1
            this.keyPressed = true
            //console.log("W")
        }

        if (keysDown["a"])
        {
            this.left = -1
            this.keyPressed = true
        }

        if (keysDown["s"])
        {
            this.down = 1
            this.keyPressed = true
        }

        if (keysDown["d"])
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

        this.getTransform().x += this.pvx * this.pAccel
        this.getTransform().y += this.pvy * this.pAccel 
    }
}

class shooterGameObject extends gameObject
{
    start()
    {
        this.addComponent(new shooterComponent())
        this.addComponent(new CircleCollider(2, "green", true))
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
    maxlifeTime = 100
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
                        if (bullet.isColliding(component))
                        {
                            this.updateListeners("bulletContact")
                            console.log("bullet contact event")
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

    bulletCollision(component)
    {
        
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
        let ammoCounter = new Textbox("white", "Impact", "heehoo", "right")
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

    update(ctx)
    {
        //this.ctx = ctx
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

        
        /*ctx.beginPath()
        ctx.moveTo(this.shooterCo.getTransform.x, this.shooterCo.getTransform.y)
        ctx.lineTo(this.mouseWorldCoords.x, this.mouseWorldCoords.y)
        ctx.stroke()*/
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
        let zeros = Camera.getZeros(ctx)

        let yHeight = 0

        let xWidth = 0

        let textWidth = ctx.measureText(this.ammoString).width

        let textHeight = ctx.measureText(this.ammoString).actualBoundingBoxAscent

        let currentAspectRatio = ctx.canvas.width / ctx.canvas.height

        if (EngineGlobals.requestedAspectRatio > currentAspectRatio) //letterboxes top and bottom
        {
            yHeight = ctx.canvas.width/EngineGlobals.requestedAspectRatio - (textHeight * 3)

            xWidth = ctx.canvas.width - (textWidth * 3)
        }
        else //letterboxes on sides
        {
            yHeight = ctx.canvas.height - (textHeight * 3)

            xWidth = ctx.canvas.height * EngineGlobals.requestedAspectRatio - (textWidth * 3)
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
    IS_MOVING
    IS_ATTACKING
    IS_DEAD
    
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
        this.IS_MOVING = false
        this.IS_ATTACKING = false
        this.IS_DEAD = false
        //console.log("started enemy")
        this.getTransform().x = 100
        this.getTransform().y = 120
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
        
        if (this.IS_DEAD == false)
        {

        }
        else
        {
            let collider = this.componentParent.getComponent("RectangleCollider")
            collider.colliderColor = "black"
        }
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

                    console.log(enemyCollider.isColliding(bulletCollider))

                    if (enemyCollider.isColliding(bulletCollider))
                    {
                        this.IS_DEAD = true
                        bulletComponent.MADE_COLLISION = true
                        this.updateListeners("bulletHit")
                        console.log("enemy shot dead")
                    }
                }
            }
        }
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
        this.getTransform().x = -77
        this.getTransform().y = -77
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
    
    update()
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

        Camera.main.Transform.x = this.getTransform().x
        Camera.main.Transform.y = this.getTransform().y
    }
}

class TitleScene extends sceneContainer
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
        this.addGameObject(new enemyGameObject("enemyGameObject"))
        this.addGameObject(new enemyControllerGameObject("enemyControllerGameObject"))
    }
    update()
    {

    }
    draw(ctx)
    {

    }
}

//Main Game

class GameScene extends sceneContainer
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

let titleScene = new TitleScene("purple")
sceneManager.addScene(titleScene)
//console.log("added title scene")