function renderStartGameMenu() {
  $("#factory_modal_content").load("content/planeBuilder/startLevel1.html");
}

function startGame(){
  $("#app_cont").empty();
      plane_S = new p5(planeBuilderSim,'app_cont');
}

function closeModal(){
  modal.style.display = "none";
}

function loadInstructions1(){
  $("#factory_modal_content").load("content/planeBuilder/planeBuilderTutorial1.html");
}

function loadInstructions2(){
  $("#factory_modal_content").load("content/planeBuilder/planeBuilderTutorial2.html");
}

function loadInstructions3(){
  $("#factory_modal_content").load("content/planeBuilder/planeBuilderTutorial3.html");
}

function openModal(){
  modal.style.display = "block";
}

function displayWinLevel1(){
  openModal();
  $("#factory_modal_content").load("content/planeBuilder/winLevel1Modal.html");
}

function displayWinLevel2(){
  openModal();
  $("#factory_modal_content").load("content/planeBuilder/winLevel2Modal.html");
}

function displayWinLevel3(){
  openModal();
  $("#factory_modal_content").load("content/planeBuilder/winLevel3Modal.html");
}

function displayLoseLevel1(){
  openModal();
  $("#factory_modal_content").load("content/planeBuilder/loseLevel1Modal.html");
}

function displayLoseLevel2(){
  openModal();
  $("#factory_modal_content").load("content/planeBuilder/loseLevel2Modal.html");
}

function displayLoseLevel3(){
  openModal();
  $("#factory_modal_content").load("content/planeBuilder/loseLevel3Modal.html");
}
