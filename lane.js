function Lane(xLoc, divider)
{
  this.xLoc = xLoc;
  this.carQueue = [];
  this.carsInLane = 0;
  this.tollBothSprite;
  
  this.tollBoothSprite = createSprite(this.xLoc-35, divider.yLoc);
  this.tollBoothSprite.addAnimation("open", "imgs/gate_open.png");
  this.tollBoothSprite.addAnimation("closed", "imgs/gate closed.png");
  this.tollBoothSprite.changeAnimation("open");
  this.tollBoothSprite.scale = .18;
  
  this.gateAnimationCtr = 0;
  this.gateOpen = true;
  
  this.openCloseGate = function()
  {
    if(this.gateAnimationCtr % 2 == 0)
    {
      this.tollBoothSprite.changeAnimation("closed");
      this.gateOpen = false;
    }
    else 
    {
      this.tollBoothSprite.changeAnimation("open");
      this.gateOpen = true;
    }
    
    this.gateAnimationCtr++;
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
