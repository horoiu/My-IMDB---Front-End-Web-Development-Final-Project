/* global DataBase MovieDetails */
window.addEventListener("load", function() {
    var searchBtn = document.getElementsByClassName("js_search_btn")[0];
    var searchInput = document.getElementsByClassName("js_search_input")[0];
    var genreArr = ["Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "Film-Noir", "History", "Horror", "Music", "Musical", "Mystery", "Romance", "Sci-Fi", "Sport", "Thriller", "Western",];
    searchBtn.addEventListener("click", startSearch);
    searchInput.addEventListener("keydown", inputSearch);
    function inputSearch(event){
        if (event.key === "Enter") { 
            startSearch();
        }
    }
    function startSearch() {
        var searchMovie=searchInput.value;
        /* check to see which genre has been selected, if any */
        var genreList = document.getElementById("genre-list-js");
        var selectedGenre = genreList.options[genreList.selectedIndex].text;
        var allMovies = new DataBase();
        /* get the results according to search params : title and/or genre */
        allMovies.getMovies(searchMovie, selectedGenre).then(showResults).catch(function(error){console.log("Data base error: " + error)});
        
        
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
                    let renderMovie = document.createElement("p");
                    renderMovie.innerHTML = arr[i].Title;
                    renderMovie.setAttribute("id", arr[i]._id);
                    renderMovie.addEventListener("click", goToMovieDetails);
                    parent.appendChild(renderMovie);
                }
               
            }
            
            
            /* *************************************MOVIE DETAILS PART************************************************************************** */
            function goToMovieDetails(e) {
                var wantedMovieId = e.target.id;
                // window.open("../movieDetails.html?id="+wantedMovieId, "_blank");
               
                window.open("./movieDetails.html", "_blank");
                var movie = new MovieDetails;
                movie.getDetails(wantedMovieId).then(renderMovie);
                function renderMovie(response) {
                    console.log(response.reqMovie);
                }
               
            }
            
            
            
            
        }    
    }
});




/* implement intuitive search if time */
// function intuitiveSearch(e){
//             var suggest = document.getElementById("placeholder");
//             suggest.addEventListener("click", suggestedResult);
//             if (event.key === "Enter") { 
//                 startSearch();
//                  /*not working for mouse select/overwrite */
//             } else if (event.key === "Backspace") {
//                 precog = precog.slice(0, precog.length-1);
//               } else {
//                   precog +=event.key;
//                 }
//             if (precog.length > 2) {
//                 for (var i=0; i<responseList.length; i++) {
//                     if (responseList[i].Title.toLowerCase().includes(precog)) {    
//                         suggest.innerHTML = responseList[i].Title;
//                         i=responseList.length;   
//                     }
//                     else {
//                         suggest.innerHTML = "";
//                     }
//                 }
//             } else { suggest.innerHTML = "";}
//             function suggestedResult(e) {
//                 var title = suggest.innerHTML;    /* 1.wtf tripled; 2.add pointer class to cursor */
//                 for (var j=0; j<responseList.length; j++) {
//                     if (title === responseList[j].Title) {
//                         console.log(responseList[j]);
//                     }
//                 }
//             }
//             console.log("***" + precog + "****");
//             // console.log(searchInput.value);  /* why is it one keypress behind? -> want to use this to check is user deleted with mouse */
//       }

/*  multiple genre selection search; discard at the end only, we might decide to keep it after all */
    // var chosenGenre = [];
        // var genreList =document.getElementsByClassName("genre");
        // for (var i=0; i<genreList.length; i++){
        //     if (genreList[i].checked) {
        //         chosenGenre.push(genreList[i].value);
        //     }
        // }
        // console.log(chosenGenre);