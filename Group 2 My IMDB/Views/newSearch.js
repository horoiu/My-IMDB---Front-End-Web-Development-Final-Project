/* global DataBase MovieDetails */
window.addEventListener("load", function() {
    var searchBtn = document.getElementsByClassName("js_search_btn")[0];
    var searchInput = document.getElementsByClassName("js_search_input")[0];
    searchBtn.addEventListener("click", startSearch);
    searchInput.addEventListener("keydown", inputSearch);
    /* start search if user pushes Enter also */
    function inputSearch(event){
        if (event.key === "Enter") { 
            startSearch(event);
        }
    }
    /* search function */
    function startSearch(e) {
        e.preventDefault();
        var searchMovie=searchInput.value;
        /* check to see which genre has been selected, if any */
        var genreList = document.getElementById("genre-list-js");
        var selectedGenre = genreList.options[genreList.selectedIndex].text;
        var allMovies = new DataBase();
        /* get the results according to search params : title and/or genre */
        allMovies.getMovies(searchMovie, selectedGenre).then(showResults).catch(function(error){console.log("Data base error: " + error)});
        
        /* results check and render function */
        function showResults(response) {
            var parent = document.getElementById("search-results");
            
            /* initialise search results array */
            var resultsArr = [];
            for (var i=0; i<response.moviesList.length; i++) {
                resultsArr.push(response.moviesList[i]);
            }
            
            /* purge doubles from response */
            for (var j=0; j<resultsArr.length; j++) {
                for (var k=j+1; k<resultsArr.length; k++) {
                  if (resultsArr[j].Title === resultsArr[k].Title && resultsArr[j].Year === resultsArr[k].Year) {
                      resultsArr.splice(k,1);
                      k=j;
                    } 
                }
                
            }
            
            /* check whether we found or not movies according to search and render them */
            if (resultsArr.length >0) {
                console.log(resultsArr);
                renderResults(resultsArr);
            } else {
                console.log("No movies match your search");
              }
           
            /* render search results - clear previous search*/ 
            function renderResults(arr) {
                while (parent.firstChild) {
                    parent.removeChild(parent.firstChild);
                }
                for (var i=0; i<arr.length;i++) {
                    let renderMovie = document.createElement("div");
                    let movieTitle = document.createElement("div");
                    let moviePoster = document.createElement("img");
                    
                    movieTitle.innerHTML = arr[i].Title;
                    renderMovie.setAttribute("id", arr[i]._id);
                    moviePoster.src = arr[i].Poster;
                    renderMovie.classList.add("search-results-container");
                    moviePoster.classList.add("search-results-img")
                    movieTitle.classList.add("movie-title-js")
                    renderMovie.addEventListener("click", goToMovieDetails);
                    parent.appendChild(renderMovie);
                    renderMovie.appendChild(moviePoster);
                    renderMovie.appendChild(movieTitle);
                }
               
            }
            /* *************************************MOVIE DETAILS PART************************************************************************** */
            function goToMovieDetails(e) {
                console.log(e);
                var wantedMovieId = e.target.parentElement.id;
                // window.open("./movieDetails.html?id="+wantedMovieId, "_blank");   MOVIE DETAILS NEW PAGE
                 window.open("./editMovie.html?id="+wantedMovieId, "_blank");    /* edit movie - temporary */
                var movie = new MovieDetails;
                movie.getDetails(wantedMovieId).then(renderMovie);
                function renderMovie(response) {
                    console.log(response.reqMovie);
                }
               
            }
        }    
    }
});



