class Textbox extends Component
{
    componentName = "Textbox"
    textColor
    textFont
    textSize
    textAlign
    textString

    constructor(color, font, size, string, align)
    {
        super()
        this.textColor = color
        this.textFont = font
        this.textSize = size
        this.textString = string
        this.textAlign = align
    }

    draw(ctx)
    {
        ctx.fillStyle = this.textColor
        ctx.font = "${textSize}px ${textFont}"
        ctx.textAlign = this.align
        ctx.fillText(this.textString, this.getTransform().x, this.getTransform().y)
    }
}

window.Textbox = Textbox