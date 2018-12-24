var trafficSim = function(sketch) {
    // Lane config
    var numberOfLanes = 3;
    var numberOfOpenLanes = 3;

    // Run stats
    var finishedCarCount = 0;
    var spawnedCarCount = 0;
    var startTime;
    var timePassedMs = 0.0;

    // Run Speed config
    var timeGranularityMs = 100;
    var completionCount = 25;
    var velocity = 15;
    var intervalTime = 1000;

    // Assets and graphical properties
    var complete = false;
    var frameRate = 30;
    var carWidth = 50;
    var carHeight = 100;
    var canvasWidth = 360;
    var canvasHeight = 640;
    var ySpawnWindowHeight = Math.max(0,(velocity * frameRate * (intervalTime / 1000) - carHeight));
    var carImgs = [];
    var carLaneXs = [];
    this.carList = [];




  startCars = function(numLanes, compCount, velo, inter) {
    numberOfOpenLanes = numLanes;
    completionCount = compCount;
    velocity = velo;
    intervalTime = inter;
    for (let i = 1; i <= numberOfOpenLanes; i++) {
      addCar(i);
    }
    sketch.frameRate(frameRate);
    $("#startOptions").hide();
    $("#runInfo").show();
  }

  sketch.setup = function()
  {
    loadImages();
    sketch.frameRate(1);
    can = sketch.createCanvas(canvasWidth, canvasHeight);
    const canvasElt = can.elt;
    canvasElt.style.width = '100%', canvasElt.style.height = "100%";
    carLaneXs = calcLaneSpawnPosition(numberOfLanes);
  }

  sketch.draw = function()
  {
    sketch.background(this.empty_road);

    for (let laneNumber = 3; laneNumber > numberOfOpenLanes; laneNumber--)
    {
      sketch.image(gate, (can.width / numberOfLanes) * (laneNumber - 1), 0, (can.width / numberOfLanes), 10);
    }

    sketch.image(this.tower, (can.width / numberOfLanes) - 15, -15, 30, 30);
    sketch.image(this.tower, (can.width / numberOfLanes) * 2 - 15, -15, 30, 30);

    if (!complete)
    {
      if (timePassedMs == 0)
      {
        var furthstCarYpos = canvasHeight;
      }
      for (let i = 0; i < carList.length; i++)
      {
        // Find the furthest car to start timer
        if (timePassedMs == 0 && carList[i].posY < furthstCarYpos)
        {
          furthstCarYpos = carList[i].posY;
        }

        // Update car position and remove completed ones.
        if (this.carList[i].update(velocity) == false) {
          carList.splice(i, 1);
          finishedCarCount++;
          i--;
        }
      }

      // Start timer once we have a "stableish" system
      if (timePassedMs == 0 && furthstCarYpos <= ((-1*carHeight) + ySpawnWindowHeight/2) )
      {
        console.log("starting timer when the furthest car reched yPos " + ((-1*carHeight) + ySpawnWindowHeight/2) );
        runTimer();
      }
    }
    if (finishedCarCount >= completionCount)
    {
      complete = true;
      $("#questionResult").show();
    }
    $("#spawnedCarCount").text(spawnedCarCount);
    $("#finishedCarCount").text(finishedCarCount);
    $("#avgThroughput").text(calcAvgThroughput());
    $("#simThroughput").text(calcSimThroughput());
    $("#timer").text(Math.round(timePassedMs)/1000);
  }

  function calcAvgThroughput()
  {
    return Math.round( (numberOfOpenLanes/(intervalTime/1000)) * 100) / 100;
  }

  function calcSimThroughput()
  {
    return Math.round((finishedCarCount/(timePassedMs/1000))*100)/100;
  }

  function setTimePassedMs()
  {
    timePassedMs = (new Date().getTime() - startTime);
  }

  function runTimer()
  {
    if (timePassedMs == 0)
    {
      startTime = new Date().getTime()-1;
    }
    setTimePassedMs();
    if (!complete) {
      crateTimeout = setTimeout(function() {
        runTimer();
      }, timeGranularityMs);
    }
  }

  function addCar(lane) {
    var laneWidth = can.width / numberOfLanes;
    var yStart = Math.random() * ySpawnWindowHeight;
    var carImg = carImgs[Math.floor(Math.random() * (carImgs.length))];
    this.carList.push(
      new Car(sketch, carImg, carLaneXs[lane],
        can.height + yStart, carWidth, carHeight));
    spawnedCarCount++;

    if (!complete) {
      crateTimeout = setTimeout(function() {
        addCar(lane);
      }, intervalTime);
    }
  }

  function calcLaneSpawnPosition(numberOfLanes) {
    xpos = [];
    var laneWidth = can.width / numberOfLanes;
    for (let i = 1; i <= numberOfLanes; i++) {
      xpos[i] = (i - 1) * laneWidth + ((laneWidth - carWidth) / 2);
    }
    return xpos;
  }

  function loadImages() {
    this.empty_road = sketch.loadImage("images/game/trafficSim/road/empty_road.png");
    this.tower = sketch.loadImage("images/game/trafficSim/road/tower.png");
    this.gate = sketch.loadImage("images/game/trafficSim/road/gate.png");
    carImgs[0] = sketch.loadImage("images/game/trafficSim/cars/1.png");
    carImgs[1] = sketch.loadImage("images/game/trafficSim/cars/2.png");
    carImgs[2] = sketch.loadImage("images/game/trafficSim/cars/3.png");
    carImgs[3] = sketch.loadImage("images/game/trafficSim/cars/4.png");
    carImgs[4] = sketch.loadImage("images/game/trafficSim/cars/5.png");
    carImgs[5] = sketch.loadImage("images/game/trafficSim/cars/6.png");
    carImgs[6] = sketch.loadImage("images/game/trafficSim/cars/7.png");
  }
}
