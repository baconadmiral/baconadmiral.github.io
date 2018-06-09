 wip_txt = "WIP";
 thruput_txt = "Throughput";
 flowtime_txt = "Flowtime";
 opr1 = " X ";
 opr2 = " / ";

 wip = {"lbl0":wip_txt,"lbl1":thruput_txt,"lbl2":flowtime_txt,"opr":opr1};
 thruput = {"lbl0":thruput_txt,"lbl1":wip_txt,"lbl2":flowtime_txt,"opr":opr2};
 flowtime = {"lbl0":flowtime_txt,"lbl1":wip_txt,"lbl2":thruput_txt,"opr":opr2};

 calc1 = function (v1,v2) {return v1 * v2};
 calc2 = function (v1,v2) {if(v2==0) {return 0} else {return v1 / v2}};
 wip.calculate = calc1;
 thruput.calculate = calc2;
 flowtime.calculate = calc2;

 calcObj = wip;

 function pageLoad() {
 }

 function setFocus() {
 	$("#test").focus();
   $(".inpt_val1").select();
 }

 function clearVals() {
  $("#inpt_val1").val(0);
  $("#inpt_val2").val(0);
  $("#val1").text("0");
  $("#val2").text("0");
  $("#result").text("0");
  $("#result2").text("0");
  setFocus();
}

function resetChoice() {
  clearVals();
  $("#value_choice").removeClass("hidden_toggle");
  $("#calc_sect").addClass("hidden_toggle");
  $("#calc_ttl").addClass("hidden_toggle");

}

function setCalcHTML() {
 clearVals();
 $("#lbl_val1").text(calcObj.lbl1);
 $("#lbl_val2").text(calcObj.lbl2);
 $("#eq_result").text(calcObj.lbl0);
 $("#eq_val1").text(calcObj.lbl1);
 $("#eq_val2").text(calcObj.lbl2);
 $("#eq_opr").text(calcObj.opr);
  $("#opr_val").text(calcObj.opr);
  /* $("#lbl_ttl").text(calcObj.lbl0.toUpperCase());*/
   $("#lbl_ttl").text(calcObj.lbl0);
    $("#app_cont").css('background-color', '#e0e0e0');
     $("#app_cont").css('height','100%');
}

function calcResult() {
  $("#val1").text($("#inpt_val1").val());
  $("#val2").text($("#inpt_val2").val());
  $("#result").text(calcObj.calculate($(".inpt_val1").val(),$("#inpt_val2").val()));
  $("#result2").text(calcObj.calculate($(".inpt_val1").val(),$("#inpt_val2").val()));
  setFocus();
}

function setCalcType(cType) {
  $("#calc_sect").removeClass("hidden_toggle");
  $("#value_choice").addClass("hidden_toggle");
  $("#calc_ttl").removeClass("hidden_toggle");
  switch (cType) {
   case 1:
   calcObj = thruput;
   break;
   case 2:
   calcObj = flowtime;
   break;
   case 0:
   calcObj = wip;
 }
 setCalcHTML();
}
