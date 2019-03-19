/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

const tweetData = {
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


  var $tweet = createTweetElement(tweetData)

  // Test / driver code (temporary)
  // to see what it looks like
  console.log($tweet);
  // to add it to the page so we can make sure it's got all the right
  // elements, classes, etc.
  $('#tweets-container').append($tweet);


});