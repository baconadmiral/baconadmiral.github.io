var bgcolor;
var throughputSlider;
var arrivalRateSlider;
var divider;

//Littles Law , numCustomers = arrivalRate * throughPut
let numCustomers; //Average Number of Customers
let arrivalRate; //Rate at which people arrive
let throughPut; //Time they spend at the business

let customerList;
let customersWaiting;
let idCtr;

function setup() {
  
  idCtr = 0;
  divider = new Divider();
  
  customerList = [];
  customersWaiting = 0;
  
  canvas = createCanvas(500, 400);
  bgcolor = 200;
  createP(" ");  
  
  arrivalRateSlider = select("#arrival");
  throughputSlider = select("#throughPut");
  
}

function changeColor()
{
    bgcolor = color(random(255));
}

function addCustomer()
{
    let cust = new Customer(idCtr);
    idCtr++;
    customerList.push(cust);
}

function draw() {
  background(bgcolor);
  
  divider.showDivider();
  text("Arrival Rate: " + arrivalRateSlider.value(), 10, 20);
  text("Throughput: " + throughputSlider.value(), 10, 50);
  text("Number of Customers: " + arrivalRateSlider.value() * throughputSlider.value(), 10, 80);
  text("Customers Waiting: " + customersWaiting, 10, 110);
  

  if(frameCount % (60 - arrivalRateSlider.value()) == 0)
  {
    addCustomer();
  }
    
  
  
  let howManyWaitingThisCycle = 0;
  for(var i = 0; i < customerList.length-1; i++)
  {
    customerList[i].update(throughputSlider.value(), customerList);
    if(customerList[i].waiting)
    {
      howManyWaitingThisCycle++;
    }
    customerList[i].showCustomer();
  }
  
  customersWaiting = howManyWaitingThisCycle;
  
}
