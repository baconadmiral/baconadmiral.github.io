function Billboard(sketch)
{
  this.xLoc =  200;
  this.yLoc =  50;
  this.billboardSprite = sketch.createSprite(this.xLoc, this.yLoc);
  this.billboardSprite.addImage(sketch.loadImage("../images/game/billboard.png"));
  this.billboardSprite.depth = 100;

  this.timer;

  this.showLittlesLaw = function(carCt, time)
  {
    sketch.fill(255, 255, 0);
    /*text(arrival + "         x", this.xLoc/3 + 20,  this.yLoc - 20);
    text(throughPut + "             =", this.xLoc/2 + 65, this.yLoc - 20);
    text(totalCars, this.xLoc + 60, this.yLoc - 20);

    text("Arrival Rate  x   ", this.xLoc/4 + 5, this.yLoc);
    text("Throughput      =   ", this.xLoc/2 + 35, this.yLoc);
    text("Total Cars", this.xLoc + 40, this.yLoc);*/

    if(typeof carCt != 'undefined')
      sketch.text("Total Cars Through: " + carCt, this.xLoc/4 + 10 , this.yLoc);

    if(typeof time != 'undefined')
      sketch.text("Remaining Time: " + time, this.xLoc + 10, this.yLoc);

  }
}
