class Input
{
    static mouseX = 0
    static mouseY = 0
    static mousedown = false

    static start()
    {
        let canvas = document.querySelector("#canv")

        canvas.addEventListener("mousemove", (e) => {
            //console.log(Input.mouseX + Input.mouseY)
            Input.mouseX = e.clientX
            Input.mouseY = e.clientY
        })
        //console.log("input started")

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
}

window.Input = Input