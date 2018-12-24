function renderStartGameMenu() {
  console.log("startFactoryGame()");
  $("#factory_modal_content").load("content/planeBuilder/startLevel1.html");
}

function closeModal(){
  modal.style.display = "none";
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
