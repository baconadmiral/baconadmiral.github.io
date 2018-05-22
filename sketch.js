var bgcolor;
var throughputSlider;
var arrivalRateSlider;
var divider;

//Littles Law , numcars = arrivalRate * throughPut
let numCars; //Average Number of cars
let arrivalRate; //Rate at which people arrive
let throughPut; //Time they spend at the business

let gateList;
let carList;
let carsWaiting;
let idCtr;
let roadBackground;
let createdWindowWidth;

let lane0X;
let lane1X;
let lane2X;
let lane3X;
let laneShiftX;
let laneXVals = [];

let can, btn;

let maxCarsRendered = 15;


let imageNameList = [];
imageNameList.push('imgs/batmobile.png');
imageNameList.push('imgs/cop car.png');
imageNameList.push('imgs/truck2.png');
imageNameList.push('imgs/yellow car.png');
imageNameList.push('imgs/blue car.png');
  let carCt = 0;

  let billboard;
  let popup;

function setup() {

  laneStart = (windowWidth / 30);
  laneWidth = (windowWidth / 10);
  lane0X = 80;
  lane1X = 160;
  lane2X = 240;
  lane3X = 320;

  popup = new Popup();
  setupPopupEvents();

  laneXVals.push(lane0X);
  laneXVals.push(lane1X);
  laneXVals.push(lane2X);
  laneXVals.push(lane3X);

  this.roadBackground = loadImage('road_background.png');
  idCtr = 0;

  carList = [];
  carsWaiting = 0;

  if(displayWidth > 1024){
    can = createCanvas(400, 600);
  }
  else {

    can = createCanvas(400, 600);
    const canvasElt = can.elt;
    canvasElt.style.width = '100%', canvasElt.style.height="100%";
  }

  createdWindowWidth = displayWidth;

  //arrivalRateSlider = select("#arrival");
  //throughputSlider = select("#throughPut");

  divider = new Divider();

  gateList = [];
  gateList.push(new Lane(80, divider));
  gateList.push(new Lane(160, divider));
  gateList.push(new Lane(240, divider));
  gateList.push(new Lane(320, divider));


  gateList[0].tollBoothSprite.onMousePressed = function(){
    //not sure why I cant bind directly but...ok
    gateList[0].openCloseGate();
  }

  gateList[1].tollBoothSprite.onMousePressed = function(){
    //not sure why I cant bind directly but...
    gateList[1].openCloseGate();
  }

  gateList[2].tollBoothSprite.onMousePressed = function(){
    //not sure why I cant bind directly but...
    gateList[2].openCloseGate();
  }

  gateList[3].tollBoothSprite.onMousePressed = function(){
    //not sure why I cant bind directly but...
    gateList[3].openCloseGate();
  }

  billboard = new Billboard();
//windowResized();
}

function addCar()
{
    let cust = new Car(idCtr);
    idCtr++;
    carList.push(cust);
}

window.onresize = function()
{
    if(displayWidth > 1024){
      can = resizeCanvas(400, 600);
    }
    else
    {
      can = resizeCanvas(400, 600);
      const canvasElt = can.elt;
      canvasElt.style.width = '100%', canvasElt.style.height="100%";
    }
}

function draw() {
  background(this.roadBackground);
  //background(50, 50, 275);

  //divider.showDivider();
  //text("Arrival Rate: " + arrivalRateSlider.value(), 10, 20);
  //text("Throughput: " + throughputSlider.value(), 10, 50);
  //text("Number of Cars: " + arrivalRateSlider.value() * throughputSlider.value(), 10, 80);


  if(frameCount % (80) == 0 && carList.length < maxCarsRendered)
  {
    addCar();
    //carCt++;
    //console.log("Car List Sz: " + carList.length);
    //console.log("Lane 0 Sz: " +   gateList[0].carQueue.length);
    //console.log("Lane 1 Sz: " +   gateList[1].carQueue.length);
    //console.log("Lane 2 Sz: " +   gateList[2].carQueue.length);
    //console.log("Lane 3 Sz: " +   gateList[3].carQueue.length);
    //console.log("Gate List Sz: " + gateList.length);

  }


  let howManyWaitingThisCycle = 0;
  for(var i = 0; i < carList.length; i++)
  {

    carList[i].update(50, carList, gateList, divider);
    if(carList[i].carSprite.velocity.y <= 0)
    {
      howManyWaitingThisCycle++;
    }


    if(carList[i].carSprite.position.y < 35)
    {
        carList[i].carSprite.remove();
        carList[i] = null;
        carList.splice(i, 1);
    }
  }

  carsWaiting = howManyWaitingThisCycle;

  drawSprites();
  billboard.showLittlesLaw(5, 6, 30);
  popup.showPopup();

}

function setupPopupEvents()
{
  popup.okBtnSprite.onMousePressed = function()
  {
    popup.clickClose();
  }

  popup.value1UpSprite.onMousePressed = function()
  {
    popup.clickUpValue1();
  }

  popup.value1DownSprite.onMousePressed = function()
  {
    popup.clickDownValue1();
  }

  popup.value2UpSprite.onMousePressed = function()
  {
    popup.clickUpValue2();
  }

  popup.value2DownSprite.onMousePressed = function()
  {
    popup.clickDownValue2();
  }

  popup.value3UpSprite.onMousePressed = function()
  {
    popup.clickUpValue3();
  }

  popup.value3DownSprite.onMousePressed = function()
  {
    popup.clickDownValue3();
  }
}

/*function windowResized() {
  can.position(windowWidth - width >> 1, windowHeight - height >> 1);

  const btnX = (width  - btn.width  >> 1) + can.x,
        btnY = (height - btn.height >> 1) + can.y;

  btn.position(btnX, btnY);
}*/
