function Car(sketch, carImg, startX, startY, carWidth, carHeight, showTimer)
{
  this.carImg = carImg;
  this.posX = startX;
  this.posY = startY;
  this.carWidth = carWidth;
  this.carHeight = carHeight;
  this.showTimer = showTimer;


  this.update = function(velocity)
  {
    if(this.posY < (-1*this.carHeight))
    {
      return false;
    }
    else
    {
      this.posY = this.posY - velocity;
      sketch.image(this.carImg, this.posX,
        this.posY, this.carWidth, this.carHeight);
      if (this.showTimer)
      {
      sketch.text('' + Math.round((sketch.height - this.posY)/velocity/60*10)/10.0, this.posX+carWidth, this.posY + (carHeight/2)+5);
      }
      return true;
    }
  }
}
