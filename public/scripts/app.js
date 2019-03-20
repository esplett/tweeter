/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  function renderTweets(tweets) {
    $('#tweets-container').empty();
      tweets.forEach(function(tweet){
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
            ${tweetData.content.text}
        </div>
        <footer>
          <div class="footer-text">
             ${tweetData.created_at}
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

  //AJAX POST request

  $( "form" ).on( "submit", function( event ) {
    event.preventDefault();
    $.ajax('/tweets', { method: 'POST', data: $( this ).serialize() })
    .then(function (){
      loadTweets()
    });
  });

  //AJAX GET request
  function loadTweets() {
   $.ajax('/tweets', { method: 'GET' })
    .then(function (tweets) {
     renderTweets(tweets);
     console.log(tweets);
    });
  }

  loadTweets();
  renderTweets(data);

});




    // var tweetText = $("textarea").val()
    // if  (tweetText === "") {
    //   alert("ERROR!!!!!!!!! Please enter text.")
    // } else if (tweetText.length >= 140) {
    //   alert("ERROR!!!!!! Please enter less than 140 characters")
    // } else {
    //   //serializes tweets
    // });