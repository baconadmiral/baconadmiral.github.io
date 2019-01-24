function BackBtn(sketch, posX, posY, backBtnImg)
{
  this.xPos = posX;
  this.yPos = posY;

  this.update = function()
  {
    sketch.image(backBtnImg, this.xPos, this.yPos, 35, 35);
  }

  this.mousePressed = function()
  {
    if(sketch.dist(sketch.mouseX, sketch.mouseY, this.xPos, this.yPos) < 50)
    {
      return true;
    }

    return false;
  }
}
