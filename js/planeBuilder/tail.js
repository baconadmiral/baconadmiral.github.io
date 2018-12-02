function Tail(sketch, posX, posY, tailImg)
{
  this.drag = false;
  this.xPos = posX;
  this.yPos = posY;
  
  this.update = function()
  {
    sketch.rect(posX - 18 , posY - 28 , 65 , 65,5);
    sketch.image(tailImg, this.xPos - 12, this.yPos - 20, 50, 50);
    sketch.textSize(22);
    sketch.text("Tail", posX, posY - 30);
  }
  
  this.touchStarted = function(tailXpos, tailYpos)
  {
    if(sketch.dist(sketch.mouseX, sketch.mouseY, tailXpos, tailYpos) < 60)
    {
      this.drag = true;
    }
    else {
      this.drag = false;
    }
  }
  
  this.touchEnded = function(attachSnd)
  {
    
    //I dont exactly like this but not sure atm how else to do it
    if(this.drag)
    {
      for(let i = 0; i < fuselageList.length; i++)
      {
        if(sketch.dist(sketch.mouseX, sketch.mouseY, fuselageList[i].posX + 25, fuselageList[i].posY + 25) < 50)
        {
          if(fuselageList[i].hasTail == false)
          {
            fuselageList[i].hasTail = true;
            attachSnd.play();
          }
        }
      }
    }
    
    this.drag = false;

    this.popBackToDefault();

  }
  
  this.touchMoved = function(fuselageList)
  {
    if(this.drag)
    {
      this.xPos = sketch.mouseX - 20;
      this.yPos = sketch.mouseY - 20;
    }
  }
  
  this.popBackToDefault = function()
  {
    this.xPos = posX;
    this.yPos = posY;
  }
}