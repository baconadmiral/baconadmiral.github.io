function Popup()
{
  this.xLoc = 200;
  this.yLoc = 300;

  this.height = 300;
  this.width = 200;
  this.popupVisible = true;

  this.value1 = 5;
  this.value2 = 5;
  this.value3 = 10;

  //this.popupGroup = new Group();

  this.popupSprite = createSprite(this.xLoc, this.yLoc, this.height, this.width);
  this.popupSprite.shapeColor="DarkGray";

  this.okBtnSprite = createSprite(this.xLoc+100, this.yLoc+75);
  this.okBtnSprite.addImage(loadImage("imgs/okBtn.png"));
  this.okBtnSprite.depth = 200;

  this.value1UpSprite = createSprite(this.xLoc-95, this.yLoc-40, 20, 20);
  this.value1UpSprite.addImage(loadImage("imgs/roadChevronUp.png"));

  this.value1DownSprite = createSprite(this.xLoc-95, this.yLoc+30, 20, 20);
  this.value1DownSprite.addImage(loadImage("imgs/roadChevronDown.png"));

  this.value2UpSprite = createSprite(this.xLoc-40, this.yLoc-40, 20, 20);
  this.value2UpSprite.addImage(loadImage("imgs/roadChevronUp.png"));

  this.value2DownSprite = createSprite(this.xLoc-40, this.yLoc+30, 20, 20);
  this.value2DownSprite.addImage(loadImage("imgs/roadChevronDown.png"));

  this.value3UpSprite = createSprite(this.xLoc + 20, this.yLoc-40, 20, 20);
  this.value3UpSprite.addImage(loadImage("imgs/roadChevronUp.png"));

  this.value3DownSprite = createSprite(this.xLoc + 20, this.yLoc+30, 20, 20);
  this.value3DownSprite.addImage(loadImage("imgs/roadChevronDown.png"));



  //this.popupGroup.addToGroup(this.popupSprite);
  //this.popupGroup.addToGroup(this.okBtnSprite);

  this.showPopup = function()
  {
    if(this.popupVisible == true)
    {
      this.clickOpen();
    }
  }

  this.clickUpValue1 = function()
  {
    this.value1++;
  }

  this.clickDownValue1 = function()
  {
    this.value1--
  }

  this.clickUpValue2 = function()
  {
    this.value2++;
  }

  this.clickDownValue2 = function()
  {
    this.value2--
  }

  this.clickUpValue3 = function()
  {
    this.value3++;
  }

  this.clickDownValue3 = function()
  {
    this.value3--
  }

  this.clickOpen = function()
  {
    this.popupVisible = true;
    this.popupSprite.visible = true;
    this.okBtnSprite.visible = true;

    this.value1UpSprite.visible = true;
    this.value2UpSprite.visible = true;
    this.value3UpSprite.visible = true;

    this.value1DownSprite.visible = true;
    this.value2DownSprite.visible = true;
    this.value3DownSprite.visible = true;

    fill(255, 255, 0);
    textSize(30);
    text(this.value1, this.xLoc - 110, this.yLoc + 5);
    text(this.value2, this.xLoc - 55, this.yLoc + 5);
    text(this.value3, this.xLoc, this.yLoc + 5);
  }

  this.clickClose = function()
  {
    this.popupVisible = false;
    this.popupSprite.visible = false;
    this.okBtnSprite.visible = false;

    this.value1UpSprite.visible = false;
    this.value2UpSprite.visible = false;
    this.value3UpSprite.visible = false;

    this.value1DownSprite.visible = false;
    this.value2DownSprite.visible = false;
    this.value3DownSprite.visible = false;

  }
}
