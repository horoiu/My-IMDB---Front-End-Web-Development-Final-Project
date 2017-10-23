/*global MovieDetails */
window.addEventListener("load", function() {

var url = window.location.href;
/* get id from url */
var index = url.indexOf("=")+1;
var id = url.substr(index);
console.log(id);

/* GET movie based on it's id */
var movie = new MovieDetails;
movie.getDetails(id).then(renderMovie);

function renderMovie(response) {
    var movieObject = response.reqMovie;
    console.log(movieObject);
}


});