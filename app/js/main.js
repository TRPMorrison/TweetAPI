;(function() {

  'use strict';

  // Page Elements (Constants)
  var tweetInput = $('#tweetInput'),
    tweetForm = $('#addTweet'),
    url = 'http://tiy-515.herokuapp.com/collections/trini',
    tweetsHolder = $('#tweets');

  // Tweet Constructor (Blueprint)
  var Tweet = function(message) {
    this.message = message;
    this.timestamp = Date.now();
  };

  // Add Tweet Function
  var addTweet = function(e) {

    e.preventDefault(); // Prevent Default Handler

    var message = tweetInput.val();

    // Create a Tweet Instance
    var tweet = new Tweet(message);

    // Save the message to the database
    $.post(url, tweet)
      .done(displayTweet);

    // Clear our form
    this.reset();

  };

  // Displaying Tweet
  var displayTweet = function(data) {
    var tweetMessage = "<div class='tweet' id='" + data._id + "''>";
    tweetMessage += data.message;
    tweetMessage += "<span>X</span>";
    tweetMessage += "</div>";

    tweetsHolder.prepend(tweetMessage);
  };
  // GET ALL TWEETS

  var getTweets = function() {
    // GET TWEETS FROM SERVER
    $.getJSON(url)
      .done(function(data) {

        // Reverse data in array
        var reversedData = data.reverse();

        // DISPLAY THEM ON OUR PAGE
        reversedData.forEach(function(tweet) {
          displayTweet(tweet);
        });
      });
  };

  // DELETE OUR TWEET (WRITTEN AS "ID2DEL (i.d. to delete)
  var deleteTweet = function(e) {
    e.preventDefault();

    var tweet2Del = $(this).parent(),
    id2Del = tweet2Del.attr('id');

    $.ajax({
      url: url + '/' + id2Del,
      type: 'DELETE'
    }).done( function () {
      tweet2Del.fadeOut();
    });



  };
  // Submit Handler
  tweetForm.on('submit', addTweet);

  // DELETE HANDLER
  tweetsHolder.on('click', 'span', deleteTweet);

  // START OUR APP
  getTweets();

}());
