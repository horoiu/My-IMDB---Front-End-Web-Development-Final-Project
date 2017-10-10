/* global DataBase */
window.addEventListener("load", function() {
    var searchBtn = document.getElementsByClassName("js_search_btn")[0];
    var searchInput = document.getElementsByClassName("js_search_input")[0];
    // searchInput.addEventListener("enter", searchMovie);
    // searchBtn.addEventListener("click", searchMovie);
    var allMovies = new DataBase();
    allMovies.getMovies().then(doStuff);
    function doStuff(response) {
        // console.log(response);
        var responseList = response.moviesList;
        console.log(responseList);
        var precog ="";
        var searchMovie="";
        searchBtn.addEventListener("click", startSearch);
        searchInput.addEventListener("keydown", intuitiveSearch);
        function startSearch() {
            searchMovie = searchInput.value;
            for (var i=0; i<responseList.length; i++) {
                var currentMovie = responseList[i];
                if (currentMovie.Title.toLowerCase().includes(searchMovie)) {
                    console.log(currentMovie);
                }
            }
        }
        function intuitiveSearch(e){
            var suggest = document.getElementById("placeholder");
            if (event.key === "Enter") { /* || searchBtn clicked */
                startSearch();
                 /*not working for mouse select/overwrite */
            } else if (event.key === "Backspace") {
                precog = precog.slice(0, precog.length-1); 
              } else {
                  precog +=event.key;
                }
            if (precog.length > 2) {
                for (var i=0; i<responseList.length; i++) {
                    if (responseList[i].Title.toLowerCase().includes(precog)) {    
                        suggest.innerHTML = responseList[i].Title;
                        i=responseList.length;
                    }
                }
            }
            console.log(precog);
       }
    }
    
})