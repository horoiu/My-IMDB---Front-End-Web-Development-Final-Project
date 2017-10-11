/* global DataBase */
window.addEventListener("load", function() {
    var searchBtn = document.getElementsByClassName("js_search_btn")[0];
    var searchInput = document.getElementsByClassName("js_search_input")[0];
    var genreArr = ["Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "Film-Noir", "History", "Horror", "Music", "Musical", "Mystery", "Romance", "Sci-Fi", "Sport", "Thriller", "Western",];
    // console.log(genreArr);
    searchBtn.addEventListener("click", startSearch);
    searchInput.addEventListener("keydown", intuitiveSearch);
    
    function intuitiveSearch(e){
        var precog ="";
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
                } else {
                    suggest.innerHTML = "";
                  }
            }
        } else { suggest.innerHTML = "";}
        
        function suggestedResult(e) {
            var title = suggest.innerHTML;    /* 1.wtf tripled; 2.add pointer class to cursor */
            for (var j=0; j<responseList.length; j++) {
                if (title === responseList[j].Title) {
                    // console.log(responseList[j]);
                }
            }
        }
        // console.log("***" + precog + "****");
        // console.log(searchInput.value);  /* why is it one keypress behind? -> want to use this to check is user deleted with mouse */
    }
       
    function startSearch() {
        var searchMovie=searchInput.value;
        var chosenGenre = [];
        var genreList =document.getElementsByClassName("genre");
        for (var i=0; i<genreList.length; i++){
            if (genreList[i].checked) {
                chosenGenre.push(genreList[i].value);
            }
        }
        console.log(chosenGenre);


        var allMovies = new DataBase();
        /* after implementing Genre, add a genreArr param to get*/
        allMovies.getMovies(searchMovie, chosenGenre).then(doStuff).catch(function(error){console.log("Data base error: " + error)});
        function doStuff(response) {
            var resultsArr = [];
            for (var i=0; i<response.moviesList.length; i++) {
                resultsArr.push(response.moviesList[i]);
            }
            for (var j=0; j<resultsArr.length; j++) {
                for (var k=j+1; k<resultsArr.length; k++) {
                   if (resultsArr[j].Title === resultsArr[k].Title && resultsArr[j].Year === resultsArr[k].Year) {
                       resultsArr.splice(k,1);
                       k=j;
                    } 
                }
                
            }
            if (resultsArr.length >0) {
                console.log(resultsArr);
            } else {
                console.log("No movies match your search");
              }
        }    
    }
    
       
       
       
    
    
})