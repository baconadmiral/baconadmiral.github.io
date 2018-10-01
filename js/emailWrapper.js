
function setUpEmail() {
  // open up the userInformation DB.
  openUserInfoDB();
  // open up the calculator DB.
  openCalculationsDB();
  // open up the activity DB.
  
}

function setP2ToS2To() {
  let pEmail = getPrimaryEmail();
  let sEmail = getSecondaryEmail();

  return pEmail + ";" + sEmail;
}

function setP2ToS2CC() {
  let pEmail = getPrimaryEmail();
  let sEmail = getSecondaryEmail();

  return pEmail + "?cc=" + sEmail;
}

function setP2CCS2To() {
  let pEmail = getPrimaryEmail();
  let sEmail = getSecondaryEmail();

  return sEmail + "?cc=" + pEmail;
}

function setP2CCS2CC() {
  let pEmail = getPrimaryEmail();
  let sEmail = getSecondaryEmail();

  return "?cc=" + pEmail + ";" + sEmail;
}

function setSubjectCalc() {
  // set the email subject to the group name.

  // grab the group name.

  // return the string name of the group with mailto specifics.
  // return "?subject=" + groupName;
}

function setSubjectActivity() {
  // set the email subject to the activity name.

  // return "?subject=" + activityName;
}

function setBodyCalc() {
  // add all of the calculations in the group to the email body.

  // let calculations = "";

  // loop through the calculations in the group. append each item to the body.

  // return "?body=" + calculations;
}

function setBodyActivity() {
  // add the records of the activity to the email body.

  // return "?body=" + record;
}
