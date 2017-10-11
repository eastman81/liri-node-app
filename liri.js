// Packages
var keys = require("./keys.js");
var request = require("request");


// Find out what code to run
var selectorArg = process.argv[2];

if (selectorArg === "movie-this") {

	// OMDB Code
	var movieArgs = process.argv;
	var movieName = "";

	for (var m = 3; m < movieArgs.length; m++) {
		if (m > 3 && m < movieArgs.length) {
			movieName += "+" + movieArgs[m];
		} else {
			movieName += movieArgs[m];
		}
	}

	// Run a request to the OMDB API with the movie specified
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

	request(queryUrl, function(error, response, body) {

	  // If the request is successful
	  if (!error && response.statusCode === 200) {

	  	console.log("Title: " + JSON.parse(body).Title);
	    console.log("Release Year: " + JSON.parse(body).Year);
	    console.log("IMDB Raiting: " + JSON.parse(body).Ratings[0].Value);
	    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
	    console.log("Produced in: " + JSON.parse(body).Country);
	    console.log("Language: " + JSON.parse(body).Language);
	    console.log("Plot: " + JSON.parse(body).Plot);
	    console.log("Actors: " + JSON.parse(body).Actors);

	  }
	});
} else if (selectorArg === "my-tweets") {
	// Twitter
	var Twitter = require("twitter");

	// Use my keys
	var clientT = new Twitter(
		keys.twitterKeys
	);

	// Preform get call
	var params = {screen_name: 'hunteastland'};
	clientT.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    for (var i = 0; i < tweets.length; i++) {
	    	console.log(tweets[i].created_at);
	    	console.log(tweets[i].text);
	    }
	  }
	});
} else if (selectorArg === "spotify-this-song") {
	// Spotify
	var Spotify = require('node-spotify-api');

	// Use keys
	var clientS = new Spotify(
		keys.spotifyKeys
	);

	// Get string
	var songArg = process.argv;
	var songName = "";

	for (var m = 3; m < songArg.length; m++) {
		if (m > 3 && m < songArg.length) {
			songName += "+" + songArg[m];
		} else {
			songName += songArg[m];
		}
	}

	// Call the song
	clientS.search({ type: 'track', query: songName, limit: 1 }, function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}
		
		console.log("");
		console.log("Artist: " + data.tracks.items[0].artists[0].name);
		console.log("Album: " + data.tracks.items[0].album.name);
		console.log("Song Name: " + data.tracks.items[0].name)
		console.log("Preview the song here: " + data.tracks.href);
		console.log("") 
	});

} else {
	console.log("cannot read text, try again")
}


