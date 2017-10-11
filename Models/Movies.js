/* global $ Movie */
function DataBase() {
    this.moviesList = []; 
}
DataBase.prototype.getMovies = function(input, genreList){
    var self = this;
    var root, queryVal;
     if (input === "" && genreList.length===0) {
         console.log("No search parameters. Here's the first 10 movies: ");
         root = "https://ancient-caverns-16784.herokuapp.com/movies";
    }
    if (input === "") {
        root = "https://ancient-caverns-16784.herokuapp.com/movies?";
    } else {
        root = "https://ancient-caverns-16784.herokuapp.com/movies?Title=" + input;
    }
    for (var i=0; i<genreList.length; i++) {
        if (input === "" && i===0) {
            queryVal = "Genre=" + genreList[i];
            } else {
                queryVal = "&Genre=" + genreList[i];
            }
        root += queryVal;
    }
    
    console.log(root);
    return $.get(root).then(initDatabase);
    
    function initDatabase(response) {
        for (var i=0; i<response.results.length; i++) {  
            var newMovie = new Movie(response.results[i]);
            if (newMovie.Title !== undefined ) {  
                self.moviesList.push(newMovie);
            }
        }
        return self;
    }
    
};



