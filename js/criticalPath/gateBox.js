function GateBox(sketch, posX, posY, description, flow, afterBoxList)
{
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

  this.update = function()
  {
    sketch.fill(0);
    sketch.text(this.description, this.posX + 5, this.posY + this.h/3);
    sketch.text("Flow: " + this.flow, this.posX + 5, this.posY + this.h/2 + this.h/4);

    sketch.fill(this.r, this.g, this.b, 127);
    sketch.rect(this.posX, this.posY, this.w, this.h, roundedCorner);


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

  this.drawLines = function(afterBox)
  {
    sketch.line(this.posX+this.w/2, this.posY+this.h, afterBox.posX+this.w/2, afterBox.posY);
  }

  this.clickSuccess = function()
  {
    this.g = 255;
  }
}
