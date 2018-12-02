var trafficSim = function(sketch) {
  var carImgs = [];
  var complete = false;
  var numberOfLanes = 3;
  var frameRate = 30;
  var carWidth = 50;
  var carHeight = 100;
  var velocity = 30;
  var intervalTime = 400;
  var ySpawnWindowHeight = velocity*frameRate*(intervalTime/1000)-carHeight;
  var carLaneXs = [];
  var finishedCarCount = 0;
  this.carList = [];

  startCars = function(numberOfOpenLanes)
  {
    for(let i=1; i<=numberOfOpenLanes; i++)
    {
      addCar(i);
    }
  }

  sketch.setup = function() {

    loadImages();

    sketch.frameRate(frameRate);
    can = sketch.createCanvas(360, 640);
    const canvasElt = can.elt;
          canvasElt.style.width = '100%', canvasElt.style.height="100%";
    carLaneXs = calcLanes(numberOfLanes);
  }

  sketch.draw = function() {
    sketch.background(0);

    for (let i=0; i<carList.length; i++)
    {
      if (carList[i])
      {
        if (this.carList[i].update(velocity) == false)
        {
          // remove car maintaining index
          carList.splice(i,1);
          finishedCarCount++;
          // console.log("Removing index: " + i);
          // console.log("COUNT: " + finishedCarCount);
          // decriment index so that the car after the
          // one we deleted still gets rendered
          i--;
        }
      }
    }
    $("#completionCount").text(finishedCarCount);
  }

  function addCar(lane)
  {
    var laneWidth = can.width/3;
    var yStart = Math.random() * ySpawnWindowHeight;
    var carImg = carImgs[Math.floor(Math.random()*(carImgs.length))];
    this.carList.push(
      new Car(sketch, carImg, carLaneXs[lane],
      can.height+yStart, carWidth, carHeight));

    if (!complete)
    {
      crateTimeout = setTimeout(function(){addCar(lane);}, intervalTime);
    }
  }

function calcLanes(numberOfLanes)
{
  xpos = [];
  var laneWidth = can.width/numberOfLanes;
  for(let i=1; i<=numberOfLanes; i++)
  {
    xpos[i] = (i-1)*laneWidth + ((laneWidth-carWidth)/2);
  }
  return xpos;
}

  function loadImages()
  {
      carImgs[0] = sketch.loadImage("images/game/cars/1.png");
      carImgs[1] = sketch.loadImage("images/game/cars/2.png");
      carImgs[2] = sketch.loadImage("images/game/cars/3.png");
      carImgs[3] = sketch.loadImage("images/game/cars/4.png");
      carImgs[4] = sketch.loadImage("images/game/cars/5.png");
      carImgs[5] = sketch.loadImage("images/game/cars/6.png");
      carImgs[6] = sketch.loadImage("images/game/cars/7.png");
      carImgs[7] = sketch.loadImage("images/game/cars/8.png");
      carImgs[8] = sketch.loadImage("images/game/cars/9.png");
      carImgs[9] = sketch.loadImage("images/game/cars/10.png");
      carImgs[10] = sketch.loadImage("images/game/cars/11.png");
      carImgs[11] = sketch.loadImage("images/game/cars/12.png");
  }
}

function loadTrafficModal(){
  console.log("loadTrafficModal()");
  var defaultColor= "#424242";
  var pageTitle = $("#pageTitle").text();
  console.log(pageTitle);
  if(pageTitle === "Traffic Simulator"){
    console.log("populating modal");
    $("#traffic_modal_content").load("content/trafficModal.html");

    $(document).ready(function(){
      $('#traffic_modal_content').modal();
    });

    $('#traffic_modal_content').modal({
      dismissible:false
    });

    $('#traffic_modal_content').modal('open');

  }
}
