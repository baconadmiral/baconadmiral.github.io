function Lane(xLoc, divider)
{
  this.xLoc = xLoc;
  this.carQueue = [];
  this.carsInLane = 0;
  this.tollBothSprite;
  this.tollBoothImg = loadImage('imgs/gate_open.png');
  
  this.tollBoothSprite = createSprite(this.xLoc-35, divider.yLoc);
  this.tollBoothSprite.addImage(this.tollBoothImg);
  this.tollBoothSprite.scale = .18;


  this.showLane = function()
  {
    //fill(120);
    //rect(this.xLoc, divider.yLoc, 25, 25);
  }

  this.addCarToLane = function(car)
  {
    let angle;
    
    if(typeof car!= 'undefined')
    {
      this.carQueue.push(car);
      this.carsInLane = this.carQueue.length;
      car.carSprite.rotateToDirection = true;
      
      if(car.carSprite.position.x <= this.xLoc)
        angle=320;

      else
        angle=225;
        
      car.carSprite.setSpeed(2.75, angle);
    }
        
    return angle;
  }



  this.removeCarFromLane = function()
  {
    //this.shiftCarsUp();
    this.carsInLane = this.carQueue.length;
  }
  
  

/*  this.shiftCarsUp = function()
  {
    for(let i = 0; i < this.carQueue.length; i++)
    {
      if(typeof this.carQueue[i] != 'undefined')
      {
        this.carQueue[i].speed = 1.4;
       }
    }
  }

  this.myPlaceInLine = function(car)
  {

    for(let i = 0; i < this.carQueue.length; i++)
    {
      if(typeof this.carQueue[i] != 'undefined' && car.carId == this.carQueue[i].carId)
      {
        console.log(i + 1);
         return i + 1;
       }
    }

    return 1;
  }

  this.findLaneFrontX = function()
  {
    return divider.xLoc;
  }
*/
}
