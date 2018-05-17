
function Car(id)
{


  let evaluationPoint = 600;


  this.carId = id;
  this.isLookingForSpot = false;
  this.isWaitingInTraffic = false;
  this.waitingAtGate = false;
  this.yLoc =  height + 10;
  this.xLoc =  random(laneXVals);


  this.waitTimer = 50;
  this.waited = false;
  this.speed = -1;
  this.myLaneIndex = -1;

  this.carSprite = createSprite(this.xLoc, this.yLoc-20, 30, 30);
  this.carSprite.addImage(loadImage(random(imageNameList)));
  this.carSprite.velocity.y = this.speed;
  this.carSprite.rotateToDirection = true;
  this.carSprite.scale = .25;

  this.collisionFinished = false;
  this.annealCollide = 20;

  this.angle = 0;


  this.update = function(throughPut, carList, gateList, divider)
  {
    //look for the lane with the least cars
    if(this.carSprite.position.y <= evaluationPoint && !this.waited)
    {
      //Stops Car at gateList
      if(this.carSprite.overlap(divider.dividerSprite))
      {
          this.carSprite.rotateToDirection = false;
          this.carSprite.velocity.y = 0;
          this.waitingAtGate = true;


      }

      if(this.waitingAtGate == true)
      {
        this.waitTimer -= throughPut;
      }

      if(this.waitTimer <= 0)
      {
        this.waited = true;
        this.carSprite.velocity.y  = this.speed * 2;
        gateList[this.myLaneIndex].removeCarFromLane();
      }


      if(this.myLaneIndex == -1)
      {
          this.myLaneIndex = this.findLane(carList, gateList, divider);
          this.angle = gateList[this.myLaneIndex].addCarToLane(this);
      }

      if(!this.carSprite.overlap(divider.dividerSprite))
          this.carSprite.velocity.y  = this.speed;

      if(this.myLaneIndex != -1)
          this.isCollidedWithCars(carList, gateList);

      if(this.angle > 260 && this.carSprite.position.x >= gateList[this.myLaneIndex].xLoc && this.waitingAtGate == false)
          this.carSprite.setSpeed(this.speed, 90);
      else if(this.angle < 260 && this.carSprite.position.x <= gateList[this.myLaneIndex].xLoc && this.waitingAtGate == false)
          this.carSprite.setSpeed(this.speed, 90);

    }


    this.removeCarsNotRenderedFromLane(gateList);

  }

  this.removeCarsNotRenderedFromLane = function(gateList)
  {
    if(typeof gateList[this.myLaneIndex] != 'undefined')
    {
      for(let i = 0; i < gateList[this.myLaneIndex].carQueue.length; i++)
      {
        if(gateList[this.myLaneIndex].carQueue[i].carSprite.position.y <  35)
        {
            gateList[this.myLaneIndex].carQueue[i].carSprite.remove();
            gateList[this.myLaneIndex].carQueue[i] = null;
            gateList[this.myLaneIndex].carQueue.splice(i, 1);
        }
      }


    }
  }

  this.isCollidedWithCars = function(carList, gateList)
  {
    /*let carQue = gateList[this.myLaneIndex].carQueue;
    let indexInLane  = carQue.indexOf(this);

    if(indexInLane > 0)
    {*/
      /*for(let i = 0; i < carQue.length; i++)
      {
        if(typeof carQue[i] != 'undefined')
        {
          if(this.carSprite.position.y < carQue[i].carSprite.position.y)
          {
            this.carSprite.displace(carQue[i].carSprite);
          }
          else {
            carQue[i].carSprite.displace(this.carSprite);
          }
        }
      }*/

      /*if(typeof carQue[indexInLane - 1] != 'undefined')
      {
        carQue[indexInLane-1].carSprite.displace(this.carSprite);
      }*/
  //  }
  }

  this.findLane = function(carList, gateList, divider)
  {
    let minIndex = 0;
    let minVal = gateList[0].carsInLane;

    for(let i = 0; i < gateList.length; i++)
    {
      if(minVal >= gateList[i].carsInLane && gateList[i].gateOpen)
      {
        minVal = gateList[i].carsInLane;
        minIndex = i;
      }
    }

    //if(!this.isLookingForSpot)
  //  {
//      gateList[minIndex].addCarToLane();
//      this.isLookingForSpot = true;
    //  this.xLoc = gateList[minIndex].findLaneFrontX();
    //  console.log("car added to lane: " + minIndex);
  //  }

    return minIndex;
  }

}
