function Widget(sketch)
{
  this.velocity = 1;

  this.crate = sketch.loadImage("images/game/conveyerImgs/crate.svg");
  this.jet = sketch.loadImage("images/game/conveyerImgs/f16sprite.png")

  this.posX = 0;
  this.posY = sketch.height/2 + sketch.height/5 - 20;

  this.update = function()
  {
    if(this.posX < sketch.width)
    {
      this.posX = this.posX + this.velocity;

      if(this.posX < sketch.width/2)
      {
        sketch.image(this.crate, this.posX, this.posY, this.crate.width/6.5, this.crate.height/6.5);
      }
      else {
        sketch.image(this.jet, this.posX, this.posY);
      }
    }
  }
}
