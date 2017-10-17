/* global $ Movie */
function DataBase() {
    this.moviesList = []; 
}
DataBase.prototype.getMovies = function(input, selectedGenre){
    var self = this;
    var root;
    function initDatabase(response) {
        console.log(response);
        for (var i=0; i<response.results.length; i++) {  
            var newMovie = new Movie(response.results[i]);
            if (newMovie.Title !== undefined && newMovie.Title !== "") {  
                self.moviesList.push(newMovie);
            }
        }
        return self;
    }
    /* see documentation for proper GET links, hence the following parameters check and root values*/
    if (input === "" && selectedGenre === "All") {
        console.log("No specific search parameters. Here's the first 10 movies : ");
        root = "https://ancient-caverns-16784.herokuapp.com/movies";
        return $.get(root).then(initDatabase);
    }
    if (input === "") {
        root = "https://ancient-caverns-16784.herokuapp.com/movies?Genre=" + selectedGenre;
    } else if (!(selectedGenre === "All")) {
        root = "https://ancient-caverns-16784.herokuapp.com/movies?Title=" + input + "&Genre=" + selectedGenre;
           } else {
               root = "https://ancient-caverns-16784.herokuapp.com/movies?Title=" + input;
             }
    console.log(root);
    return $.get(root).then(initDatabase);
};



/*  multiple genre selection search; discard at the end only, we might decide to keep it after all */

// genreList = checkbox menu array of selected items, param instead of selectedGenre
// var queryVal;
// for (var i=0; i<genreList.length; i++) {
    //     if (input === "" && i===0) {
    //         queryVal = "Genre=" + genreList[i];
    //         } else {
    //             queryVal = "&Genre=" + genreList[i];
    //         }
    //     root += queryVal;
    // }
