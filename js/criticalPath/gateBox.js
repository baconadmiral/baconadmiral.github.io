function GateBox(sketch, posX, posY, description, flow, afterBoxList)
{
  this.hasPower = false;
  this.powerOut = false;
  
  this.clicked = false;
  this.posX = posX;
  this.posY = posY;

  this.description = description;
  this.flow = flow;

  this.r = 10;
  this.g = 10;
  this.b = 10;

  this.h = 60;
  this.w = 60;
  var roundedCorner = 10;
  this.beakerImg1 = sketch.loadImage("images/game/criticalPath/beaker1.png");
  this.beakerImg2 = sketch.loadImage("images/game/criticalPath/beaker2.png");
  this.beakerImg3 = sketch.loadImage("images/game/criticalPath/beaker3.png");
  this.beakerList = [];
  this.beakerList.push(this.beakerImg1);
  this.beakerList.push(this.beakerImg2);
  this.beakerList.push(this.beakerImg3);
  
  this.animIndex = 0;

  this.update = function()
  {
    sketch.textSize(12);
    sketch.fill(0);
    sketch.text(this.description, this.posX + 5, this.posY + this.h/3);
    sketch.text("Flow: " + this.flow, this.posX + 5, this.posY + this.h/2 + this.h/4);

    sketch.fill(this.r, this.g, this.b, 127);
    //sketch.rect(this.posX, this.posY, this.w, this.h, roundedCorner);
    
    if(sketch.frameCount % 5 == 0)
    {
      this.animIndex++;
      
      if(this.animIndex > 2)
        this.animIndex = 0;
    }
    
    sketch.image(this.beakerList[this.animIndex], this.posX, this.posY, 25, 45);

    if(typeof afterBoxList != 'undefined')
    if($.isArray(afterBoxList))
    {
      for(let i = 0; i < afterBoxList.length; i++)
      {
        if(afterBoxList[i] != this)
          this.drawLines(afterBoxList[i]);
      }
    }
    else {
      this.drawLines(afterBoxList);
    }
  }
  
  this.givePower = function()
  {
    this.hasPower = true;
  }

  this.drawLines = function(afterBox)
  {
    sketch.line(this.posX+this.w/2, this.posY+this.h, afterBox.posX+this.w/2, afterBox.posY);
  }

  this.click = function()
  {
    this.r = 204;
    this.g = 102;
    this.b = 0;
    this.clicked = true;
  }

  this.unclick = function()
  {
    this.r = 10;
    this.g = 10;
    this.b = 10;
    this.clicked = false;
  }
}
