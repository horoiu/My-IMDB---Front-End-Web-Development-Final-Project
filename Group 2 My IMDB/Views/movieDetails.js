/*global MovieDetails editMe */
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
    var containerDivs = document.getElementsByClassName("details-description");
    for (var j=0; j<containerDivs.length; j++) {
        var elements = containerDivs[j].children;
        for (var i=0; i<elements.length; i++) {
            if (elements[i].title === "Poster") {
                elements[i].setAttribute("src", movieObject[elements[i].title]);
            }
            elements[i].innerHTML += movieObject[elements[i].title];
        }
    }
    var editBtn = document.getElementsByClassName("final-edit")[0];
    editBtn.addEventListener("click", editMe(id));
}
});

