require("dotenv").config();
var keys = require("./key.js");
var axios = require("axios");
var action = process.argv[2];
var search = process.argv[3];
var movie = "movie-this"
var moment = require('moment');
var movieAction = function () {
    //If the user didnt give us something to search
    if (search == null) {
        console.log("Give me a movie to search ...")
        search = "Mr.Nobody"
    }

    // We then run the request with axios module on a URL with a JSON
    axios.get("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy").then(

        function (response) {

            console.log("---------------------------------");

            // * Title of the movie.
            console.log("Title: " + response.data.Title);
            //        * Year the movie came out.
            console.log("Year released: " + response.data.Year);
            //        * IMDB Rating of the movie.
            console.log("Movie Rating: " + response.data.imdbRating + "/10");
            //        * Rotten Tomatoes Rating of the movie.
            console.log("Rated: " + response.data.Rated);
            //        * Country where the movie was produced.
            console.log("Production Country: " + response.data.Country);
            //        * Language of the movie.
            console.log("Language: " + response.data.Language);
            //        * Plot of the movie.
            console.log("Plot: " + response.data.Plot);
            //        * Actors in the movie.
            console.log("Main Actors: " + response.data.Actors);



        }

    ).catch(function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("2......" + error.response.data);
            console.log("3......" + error.response.status);
            console.log("4......" + error.response.headers);
        } else if ("5......" + error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log("6......" + error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
        }
        console.log("7......" + error.config);
    });
}
function spotifyAction() {
    var Spotify = require('node-spotify-api');

    var spotify = new Spotify({
        id: "4c762abaaf3c451587438c2b1dee96b7",
        secret: "826258fa67db4589a8395cce6dfda951"
    });
    if (search == null) {
        console.log("Give me something to search for.")
        search = "The Sign by Ace of Base"
    }

    spotify.search({ type: "track", query: search, limit: 3 }).then(function (response) {

        // * Artist(s)
        console.log("Artist: " + response.tracks.items[0].artists[0].name)
        //      * The song's name
        console.log("Song: " + response.tracks.items[0].name)
        //      * A preview link of the song from Spotify
        console.log("Click to Listen-> " + response.tracks.items[0].external_urls.spotify)
        //      * The album that the song is from
        console.log("From the album " + response.tracks.items[0].album.name)
        // console.log(data);	                   
    }).catch(function (error) {
        console.log(error);

    });

}
function concertAction() {
    axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp").then(
        function (response) {
            // * Name of the venue && Venue location
            console.log("Location of event: " + response.data[0].venue.name);
            var concertDate = response.data[0].datetime


            //  * Date of the Event (use moment to format this as "MM/DD/YYYY")
            console.log("Date: " + moment(concertDate).format("MM/DD/YYYY"));
        }
    ).catch(function (error) {
        console.log("Unfortunatly something went wrong");
    })

}
if (action == "do-what-it-says") {
    // fs is a core Node package for reading and writing files
    var fs = require("fs");

    // This block of code will read from the "random.txt" file.
    // The code will store the contents of the reading inside the variable "data"
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
        action = dataArr[0]
        search = dataArr[1]
        spotifyAction()
    });
}

if (action == "movie-this") {
    movieAction()
}
if (action == "spotify-this-song") {
    spotifyAction()
}
if (action == "concert-this") {
    concertAction()
}
