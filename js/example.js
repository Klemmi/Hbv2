
function prenta(){
  window.print;
}

function print_today() {
 
  var now = new Date();
  var months = new Array('Janúar','Febrúar','Mars','Apríl','Maí','Júní','Júlí','Ágúst','September','Október','Nóvember','Desember');
  var today =  now.getDate() + "." + " " + months[now.getMonth()] + " " + ", " + now.getFullYear();
  return today;

}

function print_today2() {

  var now = new Date();
  var month2 = now.getMonth() + 1;
  var month1 = now.getMonth();
  var date = now.getDate();
  var year = now.getFullYear() - 2000;

  if (date < 10){
    date = "0" + date;
  }

  if (month2 < 10 && month2 != 10){
    month2 = "0" + month2;
    month1 = "0" + month1;
  }

  var period =  date + "." + month1 + "." + year + "-" + " " + date + "." + month2 + "." + year;
  return period;

}

//af vefsiðu
function roundNumber(number,decimals) {
  var newString;
  decimals = Number(decimals);
  if (decimals < 1) {
    newString = (Math.round(number)).toString();
  } else {
    var numString = number.toString();
    if (numString.lastIndexOf(".") == -1) {
      numString += ".";
    }
    var cutoff = numString.lastIndexOf(".") + decimals;
    var d1 = Number(numString.substring(cutoff,cutoff+1));
    var d2 = Number(numString.substring(cutoff+1,cutoff+2));
    if (d2 >= 5) {
      if (d1 == 9 && cutoff > 0) {
        while (cutoff > 0 && (d1 == 9 || isNaN(d1))) {
          if (d1 != ".") {
            cutoff -= 1;
            d1 = Number(numString.substring(cutoff,cutoff+1));
          } else {
            cutoff -= 1;
          }
        }
      }
      d1 += 1;
    } 
    if (d1 == 10) {
      numString = numString.substring(0, numString.lastIndexOf("."));
      var roundedNum = Number(numString) + 1;
      newString = roundedNum.toString() + '.';
    } else {
      newString = numString.substring(0,cutoff) + d1.toString();
    }
  }
  if (newString.lastIndexOf(".") == -1) {
    newString += ".";
  }
  var decs = (newString.substring(newString.lastIndexOf(".")+1)).length;
  for(var i=0;i<decimals-decs;i++) newString += "0";
  
  return newString; 
}

function update_total() {
  var total = Number($("#subtotal").html().replace("kr","")) + Number($("#deduction").html().replace("kr",""));
  total = roundNumber(total,2);
  
  $('#total').html(total + "kr");
}

function update_deduction(total, orlof) {
  var deduction = 0;
  orlof = roundNumber(orlof,2);
  $('.minoprice').html(-orlof);
  deduction -= Number(orlof);

  $('.mincost1').each(function(i){
    g = $(this).html().replace("%","");
    gjold = Number(g) * total/100;
    gjold = roundNumber(gjold,2);
    $('.gjold1').html(-gjold);
    if (!isNaN(g)) deduction -= Number(gjold);
  });

  $('.mincost2').each(function(i){
    g = $(this).html().replace("%","");
    gjold = Number(g) * total/100;
    gjold = roundNumber(gjold,2);
    $('.gjold2').html(-gjold);
    if (!isNaN(g)) deduction -= Number(gjold);
  });

  //ATH: Þegar tala er lækkuð og fer niður fyrir skattþrep
  //þá helst talan áfram í því skattþrepi.
  //Kannski prufa trigger og change

  if(total>739509) {
    g = 0.4622;
    gjold = (total-739509)*g;
    gjold = roundNumber(gjold,2);
    $('#skatt3').html(-gjold);
    if (!isNaN($('#skatt1').html())) deduction -= Number(gjold);
    total = 739509;
  }
  if(total<=739509 && total>241476) {
    g = 0.4022;
    gjold = (total-241476)*g;
    gjold = roundNumber(gjold,2);
    $('#skatt2').html(-gjold);
    if (!isNaN($('#skatt2').html())) deduction -= Number(gjold);
    total = 241475;
  }
  if(total<=241475) {
    g = 0.3732;
    gjold = (total)*g;
    gjold = roundNumber(gjold,2);
    $('#skatt1').html(-gjold);
    if (!isNaN($('#skatt3').html())) deduction -= Number(gjold);
  }

  $('.skatthlut1').each(function(i){
    g = $(this).html();
    g = roundNumber(g,2);
    if (-deduction>=g) {
      $('#personu').html(g);
      if (!isNaN(g)) deduction += Number(g);
    }
    else {
      $('#personu').html(-deduction);
      if (!isNaN(g)) deduction += Number(-deduction);
    }
    
  });

  
  deduction = roundNumber(deduction,2);
  $('#deduction').html(deduction + "kr");

  update_total();
  

}

function update_incomehalf() {
  var total = 0;
  var orlof = 0;
  $('.price').each(function(i){
    price = $(this).html();
    if (!isNaN(price)) total += Number(price);
  });

  $('.ocost').each(function(i){
    or = $(this).html().replace("%","");
    orlof = Number(or) * total/100;
  });
  
  orlof = roundNumber(orlof,2);
  total = Number(total) + Number(orlof);
  total = roundNumber(total,2);

  $('#subtotal').html(total + "kr");
  $('.oprice').html(orlof);

  update_deduction(total,orlof);
}

function update_income() {
  var row = $(this).parents('.item-row');
  var income = row.find('.cost').val() * row.find('.qty').val();
  income = roundNumber(income,2);
  isNaN(income) ? row.find('.price').html("N/A") : row.find('.price').html(income);
  
  update_incomehalf();
}


function bind() {
  $(".cost").blur(update_income);
  $(".qty").blur(update_income);
}

$(document).ready(function() {

  $('input').click(function(){
    $(this).select();
  });
   
  $("#addrow").click(function(){
    $(".item-row:last").after('<tr class="item-row"><td class="item-name"><div class="delete-wpr"><textarea>Nýr liður</textarea><a class="delete" href="javascript:;" title="Remove row">-</a></div></td><td><textarea class="cost">0.00</textarea></td><td><textarea class="qty">0.00</textarea></td><td><span class="price">0.00</span></td></tr>');
    if ($(".delete").length > 0) $(".delete").show();
    bind();
  });
  
  bind();
  
  $(".delete").live('click',function(){
    $(this).parents('.item-row').remove();
    update_total();
    if ($(".delete").length < 2) $(".delete").hide();
  });
  
  $(".delete2").live('click',function(){
    $(this).parents('.item-row2').remove();
    update_total();
    if ($(".delete2").length < 2) $(".delete2").hide();
  });
  
  $("#date").val(print_today());
  $("#date2").val(print_today2());
  
});