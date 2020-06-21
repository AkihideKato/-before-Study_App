$(function(){
  // mouseover時の値
  var mouse_on = {
      fontSize: 30
  }
  //mouseout時の値
  var mouse_off = {
      fontSize: 25
    }
   
  $('.message-text').hover(function(){
      $(this).animate(mouse_on, 50);
  }, function(){
      $(this).animate(mouse_off, 50);
  });
});