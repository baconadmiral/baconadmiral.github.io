var convSim = function(sketch) {

  let sliderMax = 7;
  var tSlider, fSlider;
  let defaultTPTimeSec = 0.4;
  let can;
  this.widgetList = [];
  this.conveyer = null;
  this.bgImg = sketch.loadImage("images/game/conveyerImgs/bakground.jpg");
  this.building = sketch.loadImage("images/game/conveyerImgs/hangar.svg");
  let proFontWindows = sketch.loadFont("../font/ProFontWindows.ttf");
  let crateTimeout = setTimeout(addWidget, defaultTPTimeSec * 1000);

  let sliderPosX;
  let sliderPosY;

  let ftSliderPosX;
  let ftSliderPosY;

  let xFactor;
  let yFactor;

  let spacing;
  let textSpacing;

  let headerOffset = $("#topNav").outerHeight();

  sketch.setup = function() {
    sketch.frameRate(30);
    can = sketch.createCanvas(400, 500);
    const canvasElt = can.elt;
    canvasElt.style.width = '100%', canvasElt.style.height="100%";

    xFactor = canvasElt.clientWidth/sketch.width;
    yFactor = canvasElt.clientHeight/sketch.height;

    sliderPosX  = (sketch.width/8) * xFactor;
    sliderPosY = (sketch.height/6) * yFactor;

    ftSliderPosX = (sketch.width/2.5) * xFactor;
    ftSliderPosY  = (sketch.height/2) * yFactor;

    spacing = (sketch.height/18) * yFactor;

    tSlider = sketch.createSlider(0.1, 1, defaultTPTimeSec, 0.1);
    tSlider.position(sliderPosX, sliderPosY);
    tSlider.size(sliderPosX * 3);
    fSlider = sketch.createSlider(3, sliderMax, 5, 0.1);
    fSlider.position(ftSliderPosX, ftSliderPosY + spacing);
    fSlider.size(sliderPosX * 3);


  }

  sketch.draw = function() {
    sketch.background(this.bgImg);

    sketch.textFont(proFontWindows);
    sketch.textSize(12);


    sketch.text("Throughput(T): " + tSlider.value() + " per sec", sliderPosX / xFactor, (sliderPosY / yFactor) - (spacing/yFactor) - 5);

    sketch.text("Littles Law: T * F = WIP", sliderPosX + 125, 100 );
    sketch.text(tSlider.value() + " * " + fSlider.value() + " = " + (tSlider.value() * fSlider.value()).toFixed(2), sliderPosX + 200, 120);


    if(this.conveyer1 == null && typeof sketch.width != 'undefined')
    {
      this.conveyer1  = new ConveyerBelt(sketch, 0);
      this.conveyer2  = new ConveyerBelt(sketch, (sketch.width/4) * 1);
      this.conveyer3  = new ConveyerBelt(sketch, (sketch.width/4) * 2);
      this.conveyer4  = new ConveyerBelt(sketch, (sketch.width/4) * 3);
    }

    if(typeof this.widgetList != 'undefined')
    {

      this.conveyer1.update();
      this.conveyer2.update();
      this.conveyer3.update();
      this.conveyer4.update();


      for(let i = 0; i < this.widgetList.length; i ++)
      {

        let velocity = 1;

        this.widgetList[i].update(velocity);

      }
    }

    let buildingShift = this.building.width - this.building.width * (1/5 * fSlider.value())
    sketch.image(this.building, sketch.width/2 - this.building.width/2 + (buildingShift/2), sketch.height/2 + sketch.height/5 - this.building.height + 30, this.building.width * (1/5 * fSlider.value()), this.building.height);
    sketch.textSize(20);
    sketch.text("WIP: ", sketch.width/2 - 25, sketch.height/2 + sketch.height/5+10)
    sketch.text((tSlider.value() * fSlider.value()).toFixed(2), sketch.width/2 - 25, sketch.height/2 + sketch.height/5 + 28)

    sketch.textSize(12);
    fSlider.position((this.conveyer2.posX + 25) * xFactor, (425 * yFactor) + headerOffset);
    sketch.text(fSlider.value() + " sec", sketch.width/2 - 20, (this.conveyer2.posY + 50));
    sketch.text("Flowtime(F)", sketch.width/2 - 35, (this.conveyer2.posY + 70));
    sketch.line(sketch.width/2 - this.building.width/2 + (buildingShift/2), sketch.height/2 + sketch.height/5 - this.building.height + 200, sketch.width/2 - this.building.width/2 + (buildingShift/2), sketch.height/2 + sketch.height/5 - this.building.height + 185);
    sketch.line(this.building.width + 105 * (1/5 * fSlider.value()), sketch.height/2 + sketch.height/5 - this.building.height + 200, this.building.width + 105 * (1/5 * fSlider.value()), sketch.height/2 + sketch.height/5 - this.building.height + 185);
    sketch.line(sketch.width/2 - this.building.width/2 + (buildingShift/2), sketch.height/2 + sketch.height/5 - this.building.height + 200, this.building.width + 105 * (1/5 * fSlider.value()), sketch.height/2 + sketch.height/5 - this.building.height + 200);
  }

  function addWidget()
  {
    this.widgetList.push(new Widget(sketch));

    crateTimeout = setTimeout(addWidget, 1000/tSlider.value() );
  }

}
