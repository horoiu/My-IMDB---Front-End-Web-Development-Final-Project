/*global MovieDetails Movie Changeling */
window.addEventListener("load", function() {

var url = window.location.href;
/* get id from url */
var index = url.indexOf("=")+1;
var id = url.substr(index);
console.log(id);


/* GET movie based on it's id */
var movie = new MovieDetails;
movie.getDetails(id).then(renderMovie);

/*      Render Edit Page with DB info       */
function renderMovie(response) {
    var movieObject = response.reqMovie;
    var pArr = document.getElementsByTagName("p");
    var inputArr = document.getElementsByTagName("input");
    /* Rendering all fields but Ratings */
    for (var i=0;i<pArr.length; i++) {
        pArr[i].innerHTML = movieObject[pArr[i].title];
    }
    
    /* adding event listeners on Edit buttons and preventing form submission */
    var editBtn = document.getElementsByClassName("edit-btn-js");
    for (var i=0; i<editBtn.length; i++) {
        editBtn[i].addEventListener("click", function(e){
            e.preventDefault();
            var pToEdit = e.target.previousElementSibling;
            // pToEdit.setAttribute("contenteditable", true);
            pToEdit.setAttribute("class", "editable");
         });
    }
    
    /* adding submit button functionality  --- RATINGS not sorted       */          
    var submitBtn = document.getElementById("submit-changes-js");
    submitBtn.addEventListener("click", function(e) {
        e.preventDefault();
        var newMovieDetails = movieObject;
        for (var i=0;i<pArr.length; i++) {
            if (!(pArr[i].innerHTML === inputArr[i].innerHTML) && (inputArr[i].value !== "")) {
                newMovieDetails[inputArr[i].name] = inputArr[i].value;
                console.log(inputArr[i].value);
            }
        }
        
        /* send changes to the API */
        var apiCall = new Changeling();
        apiCall.submitChanges(newMovieDetails);
    });
    
    
    /* rendering Ratings[] list */
    /* hardcoded HTML, 3x Rating divs; some movies only have 2 => undefined values, fix if time  */
    var ratingsList = document.getElementById("ratings");
    var pRatings = ratingsList.getElementsByTagName("p");
    // console.log(pRatings);
    var j=0;
    for (var i=0; movieObject.Ratings.length; i++) {
        pRatings[j].innerHTML = movieObject.Ratings[i].Source;
        j++;
        pRatings[j].innerHTML = movieObject.Ratings[i].Value;
        j++;
    }
    
    
}
});

