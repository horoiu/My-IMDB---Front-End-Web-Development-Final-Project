/* global DataBase */
window.addEventListener("load", function() {
    var searchBtn = document.getElementsByClassName("js_search_btn")[0];
    var searchInput = document.getElementsByClassName("js_search_input")[0];
    // searchInput.addEventListener("enter", searchMovie);
    // searchBtn.addEventListener("click", searchMovie);
    var allMovies = new DataBase();
    allMovies.getMovies().then(doStuff).catch(function(error){console.log("Data base error: " + error)});
    function doStuff(response) {
        // console.log(response);
        var responseList = response.moviesList;
        console.log(responseList);
        var precog ="";
        var searchMovie="";
        searchBtn.addEventListener("click", startSearch);
        searchInput.addEventListener("keydown", intuitiveSearch);
        function startSearch() {
            var found = false;
            searchMovie = searchInput.value;
            for (var i=0; i<responseList.length; i++) {
                var currentMovie = responseList[i];
                if (currentMovie.Title.toLowerCase().includes(searchMovie)) {
                    console.log(currentMovie);
                    found = true;
                }
            }
            if (!found) {
                console.log("No movies match your search");
            }
        }
        function intuitiveSearch(e){
            var suggest = document.getElementById("placeholder");
            suggest.addEventListener("click", suggestedResult);
            if (event.key === "Enter") { 
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
                    else {
                        suggest.innerHTML = "";
                    }
                }
            }
            function suggestedResult(e) {
                var title = suggest.innerHTML;    /* 1.wtf tripled; 2.add pointer class to cursor */
                for (var j=0; j<responseList.length; j++) {
                    if (title === responseList[j].Title) {
                        console.log(responseList[j]);
                    }
                }
            }
            // console.log("***" + precog + "****");
            // console.log(searchInput.value);  /* why is it one keypress behind? -> want to use this to check is user deleted with mouse */
       }
    }
    
})