/* global send me the ID and render */
/*global MovieDetails */

var url = window.location.href;
var idString = (url.replace(/[^0-9]/g,''));
var id = Number(idString.slice(1)); 
console.log(id);

var movie = new MovieDetails;
movie.getDetails(id).then(renderMovie);

function renderMovie(response) {
    console.log(response);
}



 /* get movie details - API call */