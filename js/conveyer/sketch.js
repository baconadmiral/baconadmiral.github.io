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

  sketch.setup = function() {
    sketch.frameRate(30);
    can = sketch.createCanvas(400, 500);
    const canvasElt = can.elt;
    canvasElt.style.width = '100%', canvasElt.style.height="100%";

    tSlider = sketch.createSlider(0.1, 1, defaultTPTimeSec, 0.1);
    tSlider.position(sketch.width/8, sketch.height/4);
    tSlider.size(sketch.width/2);
    fSlider = sketch.createSlider(3, sliderMax, 5, 0.1);
    fSlider.position(sketch.width/8, sketch.height/4 + 60);
    fSlider.size(sketch.width/2);


  }

  sketch.draw = function() {
    sketch.background(this.bgImg);

    sketch.textFont(proFontWindows);
    sketch.textSize(12);

    sketch.text("Throughput(T): " + tSlider.value() + " per sec", tSlider.x - 20, 27);
    sketch.text("Flowtime(F):   " + fSlider.value() + " sec", fSlider.x - 20, 58);

    sketch.text("Littles Law: T * F = WIP", tSlider.x + 125, 100 );
    sketch.text(tSlider.value() + " * " + fSlider.value() + " = " + (tSlider.value() * fSlider.value()).toFixed(2), tSlider.x + 200, 120);


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

  }

  function addWidget()
  {
    this.widgetList.push(new Widget(sketch));

    crateTimeout = setTimeout(addWidget, 1000/tSlider.value() );
  }

}
