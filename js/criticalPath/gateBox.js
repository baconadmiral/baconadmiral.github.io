function GateBox(sketch, posX, posY, afterBoxList)
{
  this.posX = posX;
  this.posY = posY;

  this.r = 10;
  this.g = 10;
  this.b = 10;

  this.h = 60;
  this.w = 60;
  var roundedCorner = 10;

  this.update = function()
  {
    sketch.fill(this.r, this.g, this.b, 127);
    sketch.rect(this.posX, this.posY, this.w, this.h, roundedCorner);
    if(typeof afterBoxList != 'undefined')
      for(let i = 0; i < afterBoxList.length; i++)
      {
        if(afterBoxList[i] != this)
          this.drawLines(afterBoxList[i]);
      }
  }

  this.drawLines = function(afterBox)
  {
    sketch.line(this.posX+this.w/2, this.posY+this.h, afterBox.posX+this.w/2, afterBox.posY);
  }
}
