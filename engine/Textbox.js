class Textbox extends Component
{
    componentName = "Textbox"
    textColor
    textFont
    textSize
    textString

    constructor(color, font, size, string)
    {
        this.textColor = color
        this.textFont = font
        this.textSize = size
        this.textString = string
    }

    start()
    {

    }

    update()
    {

    }
    
    draw(ctx)
    {
        ctx.fillStyle = color
        ctx.font = "${size}px ${font}"
        ctx.fillText(string, this.getTransform().x, this.getTransform().y)
    }

    /*ctx.fillStyle = "white"
        ctx.fillRect(xo, yo, xw, yh)
        ctx.fillStyle = "blue"
        ctx.font = "50px Arial"
        ctx.textAlign = "center"
        ctx.fillText("Outing", xw, yh)
        ctx.font = "30px Arial"
        ctx.fillText("Press Any Key to Start", xw, yh + 60)
        console.log("im drawing")*/
}

window.Textbox = Textbox