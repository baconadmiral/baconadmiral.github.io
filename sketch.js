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

function setup() {

  this.roadBackground = loadImage('road_background.png');
  idCtr = 0;

  carList = [];
  carsWaiting = 0;

  canvas = createCanvas(400, 500);
  createP(" ");

  arrivalRateSlider = select("#arrival");
  throughputSlider = select("#throughPut");

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


}

function changeColor()
{
    bgcolor = color(random(255));
}

function addCar()
{
    let cust = new Car(idCtr);
    idCtr++;
    carList.push(cust);
}

function draw() {
  background(this.roadBackground);

  //divider.showDivider();
  text("Arrival Rate: " + arrivalRateSlider.value(), 10, 20);
  text("Throughput: " + throughputSlider.value(), 10, 50);
  text("Number of Cars: " + arrivalRateSlider.value() * throughputSlider.value(), 10, 80);
  text("Cars Waiting: " + carsWaiting, 10, 110);


  if(frameCount % (60 - arrivalRateSlider.value()) == 0)
  {
    addCar();
  }



  let howManyWaitingThisCycle = 0;
  for(var i = 0; i < carList.length-1; i++)
  {
    carList[i].update(throughputSlider.value(), carList, gateList, divider);
    if(carList[i].carSprite.velocity.y == 0)
    {
      howManyWaitingThisCycle++;
    }    


    if(carList[i].carSprite.position.y < -20)
        carList.splice(i, 1);
  }

  carsWaiting = howManyWaitingThisCycle;
  
  drawSprites();
}
