function StatsDisplay(sketch)
{
  this.smallHeight = 65;
  this.smallWidth = 80;
  
  this.largeHeight = 70;
  this.largeWidth = 140;
  
  this.speedLocX = sketch.width/4 - this.smallWidth/2;
  this.flowtimeClkLocX = sketch.width/2 - this.largeWidth/2;
  this.wipLocX = (sketch.width * 3/4) - this.smallWidth/2;
  
  this.update = function(numComplete)
  {
    //Speed Dialog
    sketch.rect(this.speedLocX, 40, this.smallWidth,this.smallHeight,5);
    sketch.textSize(16);
    sketch.text("Speed", this.speedLocX + 10, 60);
    
    sketch.textSize(12);
    sketch.text("Medium", this.speedLocX + 12, 78);
    
    //FlowTime Clock
    sketch.rect(this.flowtimeClkLocX, 5, this.largeWidth,this.largeHeight,5);
    sketch.textSize(16);
    sketch.text("Flowtime Clock", this.flowtimeClkLocX + 15, 25);
    
    sketch.textSize(26);
    sketch.text("22", this.flowtimeClkLocX + this.largeWidth/2 - 15, 49);
    
    sketch.textSize(16);
    sketch.text("Seconds", this.flowtimeClkLocX + this.largeWidth/2 - 28, 63);

    //Takt timeout
    sketch.rect(this.flowtimeClkLocX, 80, this.largeWidth,this.largeHeight - 20,5);
    
    sketch.textSize(14);
    sketch.text("Takt Time", this.flowtimeClkLocX + 34, 94);
    
    sketch.textSize(22  );
    sketch.text("5", this.flowtimeClkLocX + this.largeWidth/2 - 8, 114);
    
    sketch.textSize(12);
    sketch.text("Seconds", this.flowtimeClkLocX + this.largeWidth/2 - 22, 128);
    
    //Wip and Completed
    sketch.rect(this.wipLocX, 40, this.smallWidth,this.smallHeight,5);
    sketch.textSize(12);
    sketch.text("WIP", this.wipLocX + 15, 60);
    
    sketch.textSize(15);
    sketch.text(numComplete, this.wipLocX + 35, 85);
    sketch.textSize(12);
    sketch.text("Complete", this.wipLocX + 12, 100);
  }
}