/*global MovieDetails Changeling */
window.addEventListener("load", function() {
    
    const editMovieBtn = document.getElementById("edit-movie");
    editMovieBtn.addEventListener("click", editMovie);


    function editMovie() {
        //console.log('inside editMovie function');
        renderEditMovie();
        
        var url = window.location.href;
         /* get id from url */
        var index = url.indexOf("=")+1;
        var id = url.substr(index);
        //console.log('inside editMovie function from editMovie.js; id: ', id);
        
        /* GET movie based on it's id */
        var movie = new MovieDetails;
        movie.getDetails(id).then(renderMovie);

    } // end of editMovie function
    
    
     /*      Render Edit Page with DB info       */
    function renderMovie(response) {
        //console.log('inside renderMovie function from editMovie.js; id: ', id);
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
                event.preventDefault();
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
                    //console.log(inputArr[i].value);
                }
            }
            /* send changes to the API */
            var apiCall = new Changeling();
            apiCall.submitChanges(newMovieDetails);
        });
        
    } // end of renderMovie function
    
    
    function renderEditMovie() {
        //console.log('inside renderEditMovie of editMovie.js');
        const landingPageDiv = document.getElementById('landing-page');
        const searchResultsDiv = document.getElementById('search-results');
        const movieDetailsDiv = document.getElementById('movie-details');
        const addMovieDiv = document.getElementById('add-movie-div');
        const editMovieDiv = document.getElementById('edit-movie-div');
        
        movieDetailsDiv.classList.add('hide');
        addMovieDiv.classList.add('hide');
        landingPageDiv.classList.add('hide');
        searchResultsDiv.classList.add('hide');
        editMovieDiv.classList.remove('hide');
        
        // // delete all movies from search-results DIV when displaying movieDetails
        // while (searchResultsDiv.hasChildNodes()) {
        //     searchResultsDiv.removeChild(searchResultsDiv.lastChild);
        // }
        // cookieCheck();
    } 
    
    
}); /* window on load function end*/

