$(document).ready(function(){
    var letters = $('p').text();
    var nHTML = '';
    for(var letter of letters) {
      nHTML+="<span class='x'>"+letter+"</span>";
    }
    $('p').html(nHTML);
  })