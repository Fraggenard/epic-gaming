let margin = 20;
    let size = 500;



    let pongX = margin + size / 2
    let pongY = margin + size / 2
    let pongVX = 3
    let pongVY = 2
    let paddleX = margin + size / 2
    let paddleWidth = 80;
    let points = 0;

    let bgColor = ["red", "orange", "yellow", "green", "blue", "purple"]
    let bgIndex = 0

    function update() {
        if (scene == 0) {
          if(keysDown[" "]){
            scene = 1;
            pongX = margin + size / 2
            pongY = margin + size / 2
            bgIndex = 0
            paddleX = margin + size / 2
            points = 0
          }
        }
        else if (scene == 1) {
  
          //Model of MVC
          pongX += pongVX
          pongY += pongVY
  
          if (pongX > margin + size) {
            pongVX *= -1
          }
          if (pongY > margin + size) {
            //Check for a collision with the paddle
            if (paddleX - paddleWidth / 2 <= pongX && paddleX + paddleWidth / 2 >= pongX){
              pongVY *= -1
              if (bgIndex == 5)
              {
                  bgIndex = 0
              }
              else
              {
                  bgIndex++
              }
              points++
              }
            else {
              console.log("You are dead")
              bgIndex = 0
              scene = 2;
            }
          }
          if (pongX < margin) {
            pongVX *= -1
          }
          if (pongY < margin) {
            pongVY *= -1
          }
  
          //Update the paddle based on input
          if (keysDown["ArrowLeft"]) {
            paddleX -= 10
          }
          else if (keysDown["ArrowRight"]) {
            paddleX += 10
          }
  
          //Constrain the paddle position
          if (paddleX < margin + paddleWidth / 2) {
            paddleX = paddleWidth / 2 + margin
          }
          if (paddleX > margin - paddleWidth / 2 + size) {
            paddleX = -paddleWidth / 2 + margin + size
          }
        }
        else {
          //Scene 2
          if(keysDown[" "]){
              pongX = margin + size / 2
              pongY = margin + size / 2
              paddleX = margin + size / 2
              points = 0;
              scene = 1;
          }
        }
      }
  
      function draw() {
  
        
  
        if (scene == 0) {
          ctx.fillStyle = "black";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "white";
          ctx.fillText("ITS PONGIN TIME", 250, 250);
        }
        else if (scene == 1) {
          //View part of MVC
          ctx.fillStyle = bgColor[bgIndex]
          ctx.fillRect(0, 0, canvas.width, canvas.height)
  
          ctx.strokeStyle = "black"
          ctx.beginPath()
          ctx.moveTo(margin, margin)
          ctx.lineTo(margin + size, margin)
          ctx.lineTo(margin + size, margin + size)
          ctx.moveTo(margin, margin + size)
          ctx.lineTo(margin, margin)
          ctx.stroke()
  
          //Now draw the paddle
          ctx.beginPath()
          ctx.moveTo(paddleX - paddleWidth / 2, margin + size)
          ctx.lineTo(paddleX + paddleWidth / 2, margin + size)
          ctx.stroke()
  
          ctx.fillStyle = "white"
  
          ctx.beginPath()
          ctx.arc(pongX, pongY, 5, 0, Math.PI * 2)
          ctx.fill()
  
          ctx.fillStyle = "white"
          ctx.fillText(points, 0, 10);
        }
        else{
          ctx.fillStyle = "black";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "red";
          ctx.fillText("YOU SUCK", 250, 250);
        }
  
      }