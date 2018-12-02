function Wings(sketch, posX, posY, wingsImg)
{
  this.drag = false;
  this.xPos = posX;
  this.yPos = posY;
  
  this.update = function()
  {
    sketch.rect(posX - 4 , posY - 28 , 65 , 65,5);
    sketch.image(wingsImg, this.xPos - 4, this.yPos - 20, 50, 50);
    sketch.textSize(22);
    sketch.text("Wings", posX, posY - 30);
  }
  
  this.touchStarted = function(wingXpos, wingYpos)
  {
    if(sketch.dist(sketch.mouseX, sketch.mouseY, wingXpos, wingYpos) < 60)
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
        if(sketch.dist(sketch.mouseX, sketch.mouseY, fuselageList[i].posX + 25, fuselageList[i].posY + 25) < 100)
        {
          if(fuselageList[i].hasWings == false)
          {
            fuselageList[i].hasWings = true;
            attachSnd.play();
          }
        }
      }
    }
    this.drag = false;

    this.popBackToDefault();
  }
  
  this.touchMoved = function()
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