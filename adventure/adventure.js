import "/engine/engine.js"
//Title Screen

class StartControllerGameObject extends gameObject
{
    start()
    {
        this.addComponent(new StartControllerComponent())
        console.log("added start component")
    }
}

class StartControllerComponent extends Component
{

}

class StartDrawGameObject extends gameObject
{
    start()
    {
        this.addComponent(new StartDrawComponent())
        this.addComponent(new Textbox("white", "Impact", 50, "JSQuest", "center"))
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
    //px = this.getTransform().x
    //py = this.getTransform().y
    pvx
    pvy
    pAccel
    IS_MOVING
    IS_ATTACKING
    
    start()
    {
        this.pvx = 0
        this.pvy = 0
        this.pAccel = 0
        this.IS_MOVING = false
        this.IS_ATTACKING = false
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

        this.getTransform().x += this.pvx
        this.getTransform().y += this.pvy
    }
}

class playerDrawComponent extends Component
{
    draw(ctx)
    {

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
        this.addGameObject(new playerGameObject())

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