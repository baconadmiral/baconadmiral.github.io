function Car(sketch, startX, startY, carWidth, carHeight)
{
  this.posX = startX;
  this.posY = startY;
  this.carWidth = carWidth;
  this.carHeight = carHeight;

  this.update = function(velocity)
  {
    if(this.posY > (0 - this.carHeight))
    {
      this.posY = this.posY - velocity;
      sketch.rect(this.posX, this.posY, this.carWidth, this.carHeight);
    }
  }
}
