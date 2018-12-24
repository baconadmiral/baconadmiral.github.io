function ConveyerBelt(sketch, inPosX)
{

  this.posX = inPosX;
  this.posY = sketch.height/2 -20;

  this.shrinkFactor = 2;

  this.conveyer1 = sketch.loadImage("images/game/planeBuilder/CONVEYOR_1.png");
  this.conveyer2 = sketch.loadImage("images/game/planeBuilder/CONVEYOR_2.png");
  this.conveyer3 = sketch.loadImage("images/game/planeBuilder/CONVEYOR_3.png");
  this.conveyer4 = sketch.loadImage("images/game/planeBuilder/CONVEYOR_4.png");
  this.conveyer5 = sketch.loadImage("images/game/planeBuilder/CONVEYOR_5.png");


  this.converyerList = [];
  this.converyerList.push(this.conveyer1);
  this.converyerList.push(this.conveyer2);
  this.converyerList.push(this.conveyer3);
  this.converyerList.push(this.conveyer4);
  this.converyerList.push(this.conveyer5);

  this.ctr = 0;

  this.update = function()
  {
    if(sketch.frameCount % 20 == 0)
    {
      this.ctr++;
      if(this.ctr > 4)
      {
        this.ctr = 0;
      }
    }

    if(typeof this.converyerList != 'undefined')
    {
      if(this.ctr == 0)
        sketch.image(this.conveyer1, this.posX, this.posY, sketch.width, this.conveyer1.height/this.shrinkFactor);
      else if(this.ctr == 1)
        sketch.image(this.conveyer2, this.posX, this.posY, sketch.width, this.conveyer2.height/this.shrinkFactor);
      else if(this.ctr == 2)
        sketch.image(this.conveyer3, this.posX, this.posY, sketch.width, this.conveyer3.height/this.shrinkFactor);
      else if(this.ctr == 3)
        sketch.image(this.conveyer4, this.posX, this.posY, sketch.width, this.conveyer3.height/this.shrinkFactor);
      else if(this.ctr == 4)
        sketch.image(this.conveyer5, this.posX, this.posY, sketch.width, this.conveyer3.height/this.shrinkFactor);
    }

  }

}
