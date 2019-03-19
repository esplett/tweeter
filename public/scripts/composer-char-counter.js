$(document).ready(function() {

  $("textarea").on("keyup", function() {
    //sets the number on the counter
    $("form").find(".counter").text((140 - ($(this).val().length)))
    console.log(140 - ($(this).val().length))
  });


});


// parent method jQuery
// use .find(.counter)
// toggle class method for red counter