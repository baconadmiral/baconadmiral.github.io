var trafficSim = function(sketch) {
    // Lane config
    var numberOfLanes = 3;
    var numberOfOpenLanes = 3;

    // Run stats
    var finishedCarCount = 0;
    var spawnedCarCount = 0;
    var startTime;
    var timePassedMs = 0.0;
    var targetThroughput;
    var targetTime;
    var wip;
    var numberOfCarsOnScreen = 0;

    // Run Speed config
    var timeGranularityMs = 100;
    var completionCount = 25;
    var flowtime = 1;
    var velocity = 15;
    var intervalTime = 1000;

    // Assets and graphical properties
    var complete = false;
    var frameRate = 30;
    var carWidth = 50;
    var carHeight = 100;
    var canvasWidth = 360;
    var canvasHeight = 640;
    var ySpawnWindowHeight = 0;
    var carImgs = [];
    var carLaneXs = [];
    this.carList = [];

    var correct = false;
    var llQuestionType;


function resetGame(correctIn)
{
    spawnedCarCount = 0;
    complete = false;
    correct = correctIn;
    finishedCarCount = 0;
    timePassedMs = 0;
    carList = [];
}

  startCars = function(numLanes, compCount, flowTimeSeconds, intervalTimeSeconds, correctIn, llQuestionTypeIn) {
    console.log('Starting simulation');
    resetGame(correctIn);

    llQuestionType = llQuestionTypeIn;
    numberOfOpenLanes = numLanes;
    completionCount = compCount;
    flowtime = flowTimeSeconds;
    velocity = (canvasHeight + carHeight)/(flowtime * 2)/frameRate;
    console.log("velocity" + velocity + "    fps: " + frameRate);
    intervalTime = intervalTimeSeconds * 1000;

    // Null variables so they calculate based on this run configuration
    targetThroughput = null;
    targetTime = null;
    wip = null;
    ySpawnWindowHeight = Math.max(0,(velocity * frameRate * (intervalTime / 1000) - carHeight));

    // Start cars for each open lane
    for (let i = 1; i <= numberOfOpenLanes; i++) {
      addCar(i);
    }

    $("[id*=trafficQuestion]").hide();
    $("#runInfo").show();

    $("#wip").removeClass('blink_me');
    $("#flowtime").removeClass('blink_me');
    $("#throughput").removeClass('blink_me');
    $("#"+llQuestionType).addClass('blink_me');
  }

  sketch.setup = function()
  {
    loadImages();
    can = sketch.createCanvas(canvasWidth, canvasHeight);
    const canvasElt = can.elt;
    canvasElt.style.width = '100%', canvasElt.style.height = "100%";
    carLaneXs = calcLaneSpawnPosition(numberOfLanes);
    sketch.frameRate(frameRate);
  }

  sketch.draw = function()
  {
    // Draw background dynamically based on the number of open lanes
    sketch.background(this.empty_road);
    for (let laneNumber = 3; laneNumber > numberOfOpenLanes; laneNumber--)
    {
      sketch.image(gate, (can.width / numberOfLanes) * (laneNumber - 1), 0, (can.width / numberOfLanes), 10);
    }
    sketch.image(this.tower, (can.width / numberOfLanes) - 15, -15, 30, 30);
    sketch.image(this.tower, (can.width / numberOfLanes) * 2 - 15, -15, 30, 30);

    // Sim run
    if (!complete)
    {
      // Set furthest car height as the bottom of the canvas.
      // This gets updated during render until we start the timer.
      if (timePassedMs == 0)
      {
        var furthstCarYpos = canvasHeight;
      }

      for (let i = 0; i < carList.length; i++)
      {
        // Update car position and remove completed ones.
        var carComplete = this.carList[i].update(velocity);
        if (this.carList[i].update(velocity) == false) {
          carList.splice(i, 1);
          finishedCarCount++;
          i--;
        }

        // Find the furthest car to start timer
        if (timePassedMs == 0 && carList[i].posY < furthstCarYpos)
        {
          furthstCarYpos = carList[i].posY;
        }
      }

      // Start timer once we have a "stableish" system
      if (timePassedMs == 0 && furthstCarYpos <= ((-1*(carHeight/2)) + ySpawnWindowHeight/2) )
      {
        console.log("starting timer when the furthest car reched yPos " + ((-1*carHeight) + ySpawnWindowHeight/2) );
        runTimer();
      }
    }

    // Show results once finished car count has been reached.
    if (!complete && finishedCarCount >= completionCount)
    {
      complete = true;
      if(correct)
        renderQuestionCorrect();
      else
        renderQuestionIncorrect();
    }

    // Update output
    if (!complete)
    {
      switch (llQuestionType)
      {
        case 'wip':
          // Ilistrate Wip
          $("#wip").text(calcNumberOfCarsOnScreen());
          $("#flowtime").text(flowtime);
          $("#throughput").text(calcTargetThroughput());
          break;
        case 'ft':
          // Ilistrate flowtime
          $("#wip").text(calcWip());
          // TODO show increasing timer of cars as the pass
          $("#throughput").text(calcTargetThroughput());
          break;
        case 'throughput':
          // Simulated throughput
          $("#wip").text(calcWip());
          $("#flowtime").text(flowtime);
          $("#throughput").text(calcSimThroughput());
          break;
      }
    }
    else
    {      
          $("#wip").text(calcWip());
          $("#flowtime").text(flowtime);
          $("#throughput").text(calcTargetThroughput());
    }

    // Update debug output
    $("#spawnedCarCount").text(spawnedCarCount);
    $("#finishedCarCount").text(finishedCarCount);
    $("#targetThroughput").text(calcTargetThroughput());
    $("#targetTime").text(calcTargetTime());
    $("#simTimer").text(Math.round(timePassedMs/100)/10);
  }

  function calcNumberOfCarsOnScreen()
  {

      numberOfCarsOnScreen = carList.length;
      for (let i = 0; i < carList.length; i++)
      {
        // update numberOfCarsOnScreen to account for cars off screen
        if (carList[i].posY >= canvasHeight)
        {
          numberOfCarsOnScreen--;
        }
      }
      return numberOfCarsOnScreen;
  }

  function calcTargetThroughput()
  {
    if (!targetThroughput)
    {
      targetThroughput = Math.round( (numberOfOpenLanes/(intervalTime/1000)) * 100) / 100;
    }
    return targetThroughput;
  }

  function calcTargetTime()
  {
    if (!targetTime)
    {
      targetTime = completionCount / targetThroughput;
    }
    return targetTime;
  }

  function calcWip()
  {
    if (!wip)
    {
      wip = Math.round(flowtime * targetThroughput * 10) / 10;
    }
    return wip;
  }

  function calcSimThroughput()
  {
    return Math.round((finishedCarCount/(timePassedMs/1000))*10)/10;
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

    // Only continue to spawn cars for as long as nessesary to meet the desired count
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
