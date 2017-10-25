/* global DataBase MovieDetails history */
window.addEventListener("load", function() {
    
    var searchBtn = document.getElementsByClassName("js_search_btn")[0];
    var searchInput = document.getElementsByClassName("js_search_input")[0];
    searchBtn.addEventListener("click", startSearch);
    searchInput.addEventListener("keydown", inputSearch);
    
    const deleteMovieBtn = document.getElementById("delete-movie");
    const editMovieBtn = document.getElementById("edit-movie");
    // editMovieBtn.addEventListener("click", editFunction);

    
    // render first 10 movies on landing page or on refresh
    startSearch();
    // check the user status (loggedIn or loggedOut) 
    cookieCheck();
    
    /* start search if user pushes Enter also */
    function inputSearch(event){
        if (event.key === "Enter") { 
            startSearch(event);
        }
    }
    /* search function */
    function startSearch(e) {
        // hide other html elements from display area
        renderSearchResults();
        // if search button was pressed, prevent default action
        //this 'if' condition is to avoid 'e.preventDefault()' error on rendering first 10 movies on landing page
        if (e) {
            e.preventDefault();
        }
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
                //console.log(resultsArr);
                renderResults(resultsArr);
            } else {
                //console.log("No movies match your search");
                while (parent.firstChild) {
                    parent.removeChild(parent.firstChild);
                }
                let emptyResult = document.createElement("div");
                emptyResult.innerHTML = "Sorry, no movie was found. Please try another title.";
                parent.appendChild(emptyResult);
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
                    //if there is no movie image(Poster), set a default image;
                    if (arr[i].Poster === undefined || arr[i].Poster === "") {
                        moviePoster.src = "https://www.traveldailymedia.com/usa/wp-content/themes/woohoo/images/noimg.png";
                    } else {
                        moviePoster.src = arr[i].Poster;
                    }
                    renderMovie.classList.add("search-results-container");
                    moviePoster.classList.add("search-results-img");
                    movieTitle.classList.add("movie-title-js");
                    renderMovie.addEventListener("click", goToMovieDetails);
                    parent.appendChild(renderMovie);
                    renderMovie.appendChild(moviePoster);
                    renderMovie.appendChild(movieTitle);
                }
            }
            
            /* *************************************MOVIE DETAILS PART************************************************************************** */
            function goToMovieDetails(e) {
                //console.log('inside goToMovieDetails');
                var wantedMovieId = e.target.parentElement.id;
                renderMovieDetails();
                var movie = new MovieDetails;
                movie.getDetails(wantedMovieId).then(renderMovie);
            }
            
            
            function renderMovie(response) {
                    var movieObject = response.reqMovie;
                    var containerDivs = document.getElementsByClassName("details-description");
                    
                    for (var j=0; j<containerDivs.length; j++) {
                        var elements = containerDivs[j].children;
                        for (var i=0; i<elements.length; i++) {
                            if (elements[i].title === "Poster") {
                                //if there is no movie image, set a default image;
                                if (movieObject.Poster === undefined || movieObject.Poster === "" ) {
                                    let imgUrl = "https://www.traveldailymedia.com/usa/wp-content/themes/woohoo/images/noimg.png";
                                    elements[i].setAttribute("src", imgUrl);
                                } else {
                                    elements[i].setAttribute("src", movieObject[elements[i].title]);
                                }
                            }
                            elements[i].innerHTML = "";
                            elements[i].innerHTML += movieObject[elements[i].title];
                        }
                    }
                    history.pushState({}, "movie","movie_details?title:"+ movieObject.Title + "&id=" + movieObject._id);                              
                } // end of renderMovie function
    
   
            function renderMovieDetails() {
                const landingPageDiv = document.getElementById('landing-page');
                const searchResultsDiv = document.getElementById('search-results');
                const movieDetailsDiv = document.getElementById('movie-details');
                const addMovieDiv = document.getElementById('add-movie-div');
                const editMovieDiv = document.getElementById('edit-movie-div');
                
                movieDetailsDiv.classList.remove('hide');
                addMovieDiv.classList.add('hide');
                landingPageDiv.classList.add('hide');
                searchResultsDiv.classList.add('hide');
                editMovieDiv.classList.add('hide');
                
                // delete all movies from search-results DIV when displaying movieDetails
                while (searchResultsDiv.hasChildNodes()) {
                    searchResultsDiv.removeChild(searchResultsDiv.lastChild);
                }
                cookieCheck();
            } 
        }    
        
    }
    
    
    function renderSearchResults(e) {
        //console.log('inside renderSearchResults');        
        const landingPageDiv = document.getElementById('landing-page');
        const searchResultsDiv = document.getElementById('search-results');
        const movieDetailsDiv = document.getElementById('movie-details');
        const addMovieDiv = document.getElementById('add-movie-div');
        const editMovieDiv = document.getElementById('edit-movie-div');
        searchResultsDiv.classList.remove('hide');
        
        landingPageDiv.classList.add('hide');
        addMovieDiv.classList.add('hide');
        movieDetailsDiv.classList.add('hide');
        editMovieDiv.classList.add('hide');
    } 
    
    
    function cookieCheck() {
        // if cookie 'accessToken' is empty or undefined, then hideButtons
        // if cookie 'accessToken' has value, then go to 'Administrator' mode and reveal Edit & Delete buttons

        if (readCookies() ==="" || readCookies() === undefined) {
            hideButtons();
        }
        else { 
            showButtons;
        }
    }
    

    function readCookies() {
        // get the cookies string and split them by ';' into a new array
        let cookiesString = document.cookie;
        const cookiesArray = cookiesString.split('; ');
        var cookies = {};
        
        // itterate each array element and split them by '='
        cookiesArray.forEach(function(c) {
            let cookie = c.split('=');
            cookies[cookie[0]] = cookie[1];
        });
        
        // assign the 'cookie.accessToken' value to 'accessToken' 
        let accessToken = cookies.accessToken;
        
        // return the accessToken value to 
        return accessToken;
    }


    function hideButtons() {
        // add class 'hide' to hide buttons
        //console.log('hide editMovieBtn: ',editMovieBtn);
        //console.log('hide deleteMovieBtn: ',deleteMovieBtn);
        editMovieBtn.classList.add('hide');
        deleteMovieBtn.classList.add('hide');
        return;
    }
        
        
    function showButtons() {
        // remove class 'hide' to show hidden form elements
        //console.log('show editMovieBtn: ',editMovieBtn);
        //console.log('show deleteMovieBtn: ',deleteMovieBtn);
        editMovieBtn.classList.remove('hide');
        deleteMovieBtn.classList.remove('hide');
        return;
    }
    
    


    
    
    
    
    
});



