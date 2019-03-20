/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {


// Fake data taken from tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];


function renderTweets(tweets) {
  tweets.forEach(function(tweet){
   // loop through and append
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

  //   $(function() {
  //   var $button = $('#submit');
  //   $button.on('click', function () {
  //     $.ajax('/tweets', { method: 'POST' })
  //     //serialize method needs to serialize on form not button
  //     $( "form" ).on( "submit", function( event ) {
  //       event.preventDefault();
  //       console.log( $( this ).serialize() );
  //     });
  //   });
  // });


  $(function() {
    $( "form" ).on( "submit", function( event ) {
        event.preventDefault();
        console.log($( this ).serialize())
        $.ajax('/tweets', { method: 'POST', data: $( this ).serialize() })
      });

  });

  renderTweets(data);

});

