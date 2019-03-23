/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

  function renderTweets(tweets) {
    $('#tweets-container').empty();
      tweets.reverse().forEach(function(tweet){
       // loop through and append each tweet
       var $tweet = createTweetElement(tweet);
        $('#tweets-container').append($tweet);
      });
  }

  function createTweetElement(tweetData) {
    return $(`<section id="tweets-container">
      <article class="tweet">
        <header>
          <div class="logo">
            <a href="http://vanillicon.com"><img src="${tweetData.user.avatars.small}" /></a>
            <h2>${tweetData.user.name} </h2>
          </div>
          <div class="handle">
             ${tweetData.user.handle}
          </div>
        </header>
        <div class="tweet-text">
          ${escape(tweetData.content.text)}
        </div>
        <footer>
          <div class="footer-text">
            ${moment(tweetData.created_at).fromNow()}
          </div>
          <div class="icons">
            <i class="fa fa-flag" aria-hidden="true"></i>
            <i class="fa fa-retweet" aria-hidden="true"></i>
            <i class="fa fa-heart"></i>
          </div>
        </footer>
      </article>
    </section>`)
  }

  //prevents XSS/Cross-Site Scripting
  function escape(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }


  function likeTweet (id, callback) {

  }

  //AJAX GET request for New Tweets
  function loadTweets() {
   $.ajax('/tweets', { method: 'GET' })
    .then(function (tweets) {
      renderTweets(tweets);
      $(".fa fa-heart").on("click", function() {
        $.ajax('/tweets', { method: 'POST', data: $( this ) })
          .then(function (tweet){
          loadTweets();
          var heart = document.createElement(".fa fa-heart");
          $( heart ).data( "tweet", { liked: 0 } );
          liked ++;
          console.log("liked: ", liked)
        });
    });
      console.log(tweets);
    });
  }


//loads after CSS and HTML
$(document).ready(function() {

  //AJAX POST request for Compose Tweet
  $( "form" ).on( "submit", function( event ) {
    event.preventDefault();
    let tweetText = $("textarea").val();
    let errorBox = $(".error-message");
    let errorText = $(".error-text");
    if (tweetText === "") {
      errorText.text(function() {
        return "ERROR!!! Please write your tweet.";
      })
      errorBox.slideDown('slow');
      return null;
    } else if (tweetText.length >= 140) {
      errorText.text(function() {
        return "ERROR!!! Please enter less than 140 characters.";
      })
      errorBox.slideDown('slow');
      return null;
    } else {
      errorBox.slideUp();
      //serializes tweets
      $.ajax('/tweets', { method: 'POST', data: $( this ).serialize() })
      .then(function (){
        loadTweets();
        // //clears text area and resets counter
        $("textarea").val("");
        $(".counter").html(140);
      });
    }
  });


  loadTweets();

  //toggle on compose button
  $("#compose").click(function(){
    $(".new-tweet").slideToggle('slow');
    $(".new-tweet textarea").focus();
  });

});





