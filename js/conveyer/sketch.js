var convSim = function(sketch) {

  let sliderMax = 10;
  var tSlider, fSlider;
  let can;
  this.widgetList = [];
  this.conveyer = null;
  this.bgImg = sketch.loadImage("images/game/conveyerImgs/bakground.jpg");
  this.building = sketch.loadImage("images/game/conveyerImgs/hangar.svg");


  sketch.setup = function() {
    sketch.frameRate(30);
    can = sketch.createCanvas(400, 500);
    const canvasElt = can.elt;
    canvasElt.style.width = '100%', canvasElt.style.height="100%";

    sketch.textSize(12);

    tSlider = sketch.createSlider(50, 100, 75);
    tSlider.position(sketch.width/8, sketch.height/4);
    tSlider.size(sketch.width/2);
    fSlider = sketch.createSlider(1, sliderMax, 5);
    fSlider.position(sketch.width/8, sketch.height/4 + 60);
    fSlider.size(sketch.width/2);


  }

  sketch.draw = function() {
    sketch.background(this.bgImg);

    sketch.text("Throughput(T): " + tSlider.value() + " per hr", tSlider.x - 20, 27);
    sketch.text("Flowtime(F):   " + fSlider.value(), fSlider.x - 20, 58);

    sketch.text("Littles Law: T * F = WIP", tSlider.x + 125, 20 );
    sketch.text(tSlider.value() + " * " + fSlider.value() + " = " + tSlider.value() * fSlider.value(), tSlider.x + 188, 35);


    if(this.conveyer1 == null && typeof sketch.width != 'undefined')
    {
      this.conveyer1  = new ConveyerBelt(sketch, 0);
      this.conveyer2  = new ConveyerBelt(sketch, (sketch.width/4) * 1);
      this.conveyer3  = new ConveyerBelt(sketch, (sketch.width/4) * 2);
      this.conveyer4  = new ConveyerBelt(sketch, (sketch.width/4) * 3);
    }

    let arrivalRate = 160 - tSlider.value();

    if(sketch.frameCount % arrivalRate == 0)
    {
      //Add widget
      this.widgetList.push(new Widget(sketch));
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

    sketch.image(this.building, sketch.width/2 - this.building.width/2, sketch.height/2 + sketch.height/5 - this.building.height + 30, this.building.width * 1, this.building.height * 1);

  }

  //function stuffAndThings()

}
