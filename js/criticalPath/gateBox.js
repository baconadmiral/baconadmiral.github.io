function GateBox(sketch, posX, posY, description, flow, imageOnList, imageOff, imgScaleWidth, imageScaleHeight, afterBoxList, waitForBoxList)
{
  this.hasPower = false;
  this.waitForBoxList;
    
  this.posX = posX;
  this.posY = posY;

  this.description = description;
  this.flow = flow;

  this.h = 60;
  this.w = 60;
  var roundedCorner = 10;
  
  this.imageOnList = imageOnList;
  this.imageOff = imageOff;
  
  this.animIndex = 0;
  
  this.imageScaleY = 45;
  this.imageScaleY = 25;

  this.update = function()
  {

    
    sketch.textSize(12);
    sketch.text("Flow: " + this.flow + " s", this.posX + 5, this.posY + this.h-4);
    //sketch.rect(this.posX, this.posY, this.w, this.h, roundedCorner);
    
    if(sketch.frameCount % 5 == 0)
    {
      this.animIndex++;
      
      if(this.animIndex > 2)
        this.animIndex = 0;
    }
    
    if(this.hasPower)
    {
      sketch.image(this.imageOnList[this.animIndex], this.posX + 14, this.posY, imgScaleWidth, imageScaleHeight);
    }
    else
      sketch.image(this.imageOff, this.posX + 14, this.posY, imgScaleWidth, imageScaleHeight);

    if(typeof afterBoxList != 'undefined' && afterBoxList != null)
    if($.isArray(afterBoxList))
    {
      for(let i = 0; i < afterBoxList.length; i++)
      {
        if(afterBoxList[i] != this)
          this.drawLines(afterBoxList[i]);
      }
    }
    else {
      this.drawLines(afterBoxList);
    }
  }
  
  this.powerOn = function()
  {    
    var refThis = this;
    let startPower = true;
    
    if(this.waitForBoxList != null) 
    {
      for(let i = 0; i < this.waitForBoxList.length; i++)
      {
        if(this.waitForBoxList[i].hasPower)
        {
          startPower = false;
        }
      }
    }
  
    if(startPower)
    {
      this.hasPower = true;

      setTimeout(function(){
        refThis.powerOff(refThis, afterBoxList);
      }, this.flow * 1000);
    }
  }
  
  this.powerOff = function(refThis, afterBoxList)
  {
    refThis.hasPower = false;
    
    if(typeof afterBoxList != 'undefined')
    if($.isArray(afterBoxList))
    {
      for(let i = 0; i < afterBoxList.length; i++)
      {
        afterBoxList[i].powerOn();
      }
    }
    else if(afterBoxList != null) {
      afterBoxList.powerOn();
    }
  }
  
  this.setWaitForBoxList = function(waitForBoxList)
  {
    this.waitForBoxList = waitForBoxList;
  }

  this.drawLines = function(afterBox)
  {
    sketch.line(this.posX+this.w/2, this.posY+this.h, afterBox.posX+this.w/2, afterBox.posY);
  }
}
