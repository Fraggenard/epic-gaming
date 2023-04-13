class Input
{
    static mouseX = 0
    static mouseY = 0

    static start()
    {
        let canvas = document.querySelector("#canv")
        canvas.addEventListener("mousemove", (e) => {
            console.log(Input.mouseX + Input.mouseY)
            Input.mouseX = e.clientX
            Input.mouseY = e.clientY
        })
        console.log("input started")
    }
}

window.Input = Input