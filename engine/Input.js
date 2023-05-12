class Input
{
    static mouseX = 0
    static mouseY = 0
    static mousedown = false
    static paused = false
    static keysDown = []
    static keysUp = []

    static start()
    {
        let canvas = document.querySelector("#canv")

        /*document.addEventListener("keydown", keyDown)
        document.addEventListener("keyup", keyUp)

        function keyUp(e) {
        Input.keysDown[e.key] = false
        Input.keysUp[e.key] = true
        }

        function keyDown(e) {
        Input.keysDown[e.key] = true
        if (e.key == "p") {
            Input.paused = !Input.paused
        }
        }*/

        document.addEventListener("keydown", (e) =>{
            Input.keysDown[e.key] = true
        if (e.key == "p") {
            Input.paused = !Input.paused}
        })

        document.addEventListener("keyup", (e) =>{
            Input.keysDown[e.key] = false
            Input.keysUp[e.key] = true
        })

        canvas.addEventListener("mousemove", (e) => {
            Input.mouseX = e.clientX
            Input.mouseY = e.clientY
        })

        document.addEventListener("mousedown", (e) => {
            if (e.button == 0)
            {
                Input.mousedown = true
            }
        })

        document.addEventListener("mouseup", (e) =>{
            if (e.button == 0)
            {
                Input.mousedown = false
            }
        })
    }

    static finishFrame()
    {
        Input.keysUp = []
    }
}

window.Input = Input