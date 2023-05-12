class Textbox extends Component
{
    componentName = "Textbox"
    textColor
    textFont
    textAlign
    textString

    constructor(color, font, string, align)
    {
        super()
        this.textColor = color
        this.textFont = font
        this.textString = string
        this.textAlign = align
    }

    drawGUI(ctx)
    {
        ctx.fillStyle = this.textColor
        ctx.font = this.textFont
        console.log(ctx.font)
        ctx.textAlign = this.align
        ctx.fillText(this.textString, this.getTransform().x, this.getTransform().y)
    }
}

window.Textbox = Textbox