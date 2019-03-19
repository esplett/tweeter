$(document).ready(function() {

  $("textarea").on("keyup", function() {
    //sets the number on the counter
    var counter = (140 - ($(this).val().length))
    $("form").find(".counter").text(counter)
    console.log(140 - ($(this).val().length))

    if (counter < 0) {
      $(".counter").addClass("red")
    } else {
      $(".counter").removeClass("red")
    }
  });
});


