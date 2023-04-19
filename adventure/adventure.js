import "/engine/engine.js"
//Title Screen

//let canvas = document.querySelector("#canv")
//let ctx = canvas.getContext("2d")

class StartControllerGameObject extends gameObject
{
    start()
    {
        this.addComponent(new StartControllerComponent())
        console.log("added start component")
        let debugAccel = new Textbox("white", "Impact", 50,"ba","left")
        debugAccel.componentName = "debugAccel"
        this.addComponent(debugAccel)
    }
}

class StartControllerComponent extends Component
{
    update()
    {
        let player = gameObject.getObjectByName("playerGameObject").getComponent("playerComponent").pAccel

        let count = sceneManager.getCurrentScene().gameObjects.length
        
        this.componentParent.getComponent("debugAccel").textString = "game objects = " + count
    }
}

class StartDrawGameObject extends gameObject
{
    start()
    {
        this.addComponent(new StartDrawComponent())
        //this.addComponent(new Textbox("white", "Impact", 50, "JSQuest", "center"))
        console.log("added draw component")
    }
}

class StartDrawComponent extends Component
{
    draw(ctx)
    {
        
        
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
    
    pvx
    pvy
    pAccel = 0
    playerWidth
    playerHeight
    IS_MOVING
    IS_ATTACKING
    
    start()
    {
        this.pvx = 0
        this.pvy = 0
        this.pAccel = 0
        this.playerWidth = this.componentParent.getComponent("RectangleCollider").colliderWidth
        this.playerHeight = this.componentParent.getComponent("RectangleCollider").colliderHeight
        this.IS_MOVING = false
        this.IS_ATTACKING = false
        console.log("started player")
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
            console.log("W")
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
    player = gameObject.getObjectByName("playerGameObject")
    
    start()
    {
        //this.getTransform().x = this.player.Transform.x + 5
        //this.getTransform().y = this.player.Transform.y + 5
        console.log("started schutplayer")
    }

    update(ctx)
    {
        this.getTransform().x = this.player.Transform.x
        this.getTransform().y = this.player.Transform.y
        
        this.mx = Input.mouseX
        this.my = Input.mouseY

        let worldSpaceValues = Camera.toWorldSpace(this.mx,this.my,ctx)

        this.mx = worldSpaceValues.x
        this.my = worldSpaceValues.y

        console.log("X: " + this.mx + " Y: " + this.my)

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

        this.getTransform().x += (scaledX + (this.player.getComponent("playerComponent").playerWidth / 2))
        this.getTransform().y += (scaledY + (this.player.getComponent("playerComponent").playerHeight / 2))

        //console.log(this.player.getComponent("playerComponent").playerWidth)

    }
}

class bulletGameObject extends gameObject
{
    start()
    {
        //this.addComponent(new bulletComponent())
        this.addComponent(new RectangleCollider(2, 2, "orange", true))
    }
}

class bulletComponent extends Component
{
    componentName = "bulletComponent"

    shootergo = gameObject.getObjectByName("shooterGameObject")
    shooter = this.shootergo.getComponent("shooterComponent")
    
    bvx
    bvy
    bulletSpeed = 10
    lifeTime = 0
    maxlifeTime = 100
    mx
    my

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

        let differenceX = this.mx - this.getTransform().x
        let differenceY = this.my - this.getTransform().y

        console.log(differenceX + " " + differenceY)

        let theta = Math.atan2(differenceY, differenceX)

        console.log(theta + "")

        differenceX = this.bulletSpeed * Math.cos(theta)
        differenceY = this.bulletSpeed * Math.sin(theta)

        this.bvx += differenceX
        this.bvy += differenceY
    }

    update(ctx)
    {   
            this.getTransform().x += this.bvx
            this.getTransform().y += this.bvy

            this.lifeTime++
            
            if (this.lifeTime >= this.maxlifeTime)
            {
                this.componentParent.destroy()
            }
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

    currentWeapon
    reserveSize = 500
    magSize = 50
    currentReserve
    currentMag
    IS_RELOADING
    
    start()
    {
        this.currentReserve = this.reserveSize
        this.currentMag = this.magSize
    }

    update(ctx)
    {
        if (Input.mousedown && this.currentMag > 0)
        {
            let worldcoords = Camera.toWorldSpace(Input.mouseX, Input.mouseY, ctx)
            let spawnedBullet = new bulletGameObject("bulletGameObject")
            spawnedBullet.addComponent(new bulletComponent(worldcoords.x, worldcoords.y))
            gameObject.instantiate(spawnedBullet)
            this.currentMag--
            console.log("pew!")
        }
        else if (this.currentMag <= 0)
        {
            if (this.currentReserve > 0)
            {
                if (this.currentReserve < this.magSize)
                {
                    this.currentMag += this.currentReserve
                    this.currentReserve -= this.currentReserve
                }
                else
                {
                    this.currentMag += this.magSize
                    this.currentReserve -= this.magSize
                }
            }
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
    }
}

class shooterControllerDrawComponent extends Component
{
    ammoCon
    ammoConCo
    reserve
    mag
    ammoText
    ammoString
    
    start()
    {
        this.ammoCon = gameObject.getObjectByName("shooterControllerGameObject")
        //this.ammoCon = this.ammoConCo.getComponent("shooterControllerComponent")
        this.ammoConCo = this.ammoCon.getComponent("shooterControllerComponent")
        this.ammoText = this.componentParent.getComponent("ammoCounter")
        this.ammoText.getTransform().y += 50
    }

    update()
    {
        this.reserve = this.ammoConCo.currentReserve
        this.mag = this.ammoConCo.currentMag
        this.ammoString = this.mag + "/" + this.reserve
        this.ammoText.textString = this.ammoString
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
        this.addGameObject(new StartControllerGameObject())
        console.log("added controller object")
        this.addGameObject(new StartDrawGameObject())
        console.log("added draw object")
        this.addGameObject(new playerGameObject("playerGameObject"))
        console.log("added the player")
        this.addGameObject(new cameraTrackerGameObject("cameraTrackerGameObject"))
        console.log("camera tracking enabled")
        this.addGameObject(new shooterGameObject("shooterGameObject"))
        console.log("shooter added to scene")
        this.addGameObject(new shooterControllerGameObject("shooterControllerGameObject"))
        console.log("shoot input loaded")
        this.addGameObject(new shooterControllerDrawGameObject("shooterControllerDrawGameObject"))

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
console.log("added title scene")