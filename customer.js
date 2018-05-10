
function Customer(id)
{
  this.imageNameList = [];
  this.imageNameList.push('carRed.png');
  this.imageNameList.push('carYellow.png');
  this.imageNameList.push('carGreen.png');
  this.imageNameList.push('carPurple.png');
  this.imageNameList.push('carBlue.png');

  this.image = loadImage(random(this.imageNameList));
  this.customerId = id;
  this.waiting = false;
  this.xLoc =  -10;
  this.yLoc =  200;
  this.waitTimer = 500;
  this.waited = false;
  this.speed = 1.4;
  this.colorRed = random(0, 255);
  this.colorGreen = random(0, 255);
  this.colorBlue = random(0, 255);

  this.collisionFinished = false;
  this.annealCollide = 20;

  this.showCustomer = function()
  {
    fill(this.colorRed, this.colorGreen, this.colorBlue);
    image(this.image, this.xLoc-20, this.yLoc);

  }

  this.update = function(throughPut, customerList)
  {

    if(this.xLoc >= width / 2 && !this.waited)
    {
      this.speed = 0;
      this.waiting = true;

      if(frameCount % 100)
      {
        this.waitTimer -= throughPut;
      }

      if(this.waitTimer <= 0)
      {
        this.waited = true;
        this.waiting = false;
        this.speed = 1.4;
      }


      this.isCollided(customerList);

    }

    this.xLoc += this.speed;
  }

  this.isCollided = function(customerList)
  {
    for(let i = 0; i < customerList.length-1; i++)
    {
      if(this.collisionFinished == false && this.customerId != customerList[i].customerId && this.yLoc + 10 >= customerList[i].yLoc && this.yLoc - 10 <= customerList[i].yLoc
        && this.waited == false)
      {
        this.yLoc+=random(-20, 20);
        this.annealCollide--;

        if(this.annealCollide < 0)
        {
          this.collisionFinished = true;
        }
      }
    }
  }

}
