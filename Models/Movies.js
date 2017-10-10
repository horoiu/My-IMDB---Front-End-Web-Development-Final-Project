/* global $ Movie */
function DataBase() {
    this.moviesList = []; 
}
DataBase.prototype.getMovies = function(){
    var self = this;
    var root = "https://ancient-caverns-16784.herokuapp.com/movies?take=200";
    function initDatabase(response) {
        console.log(response);
        for (var i=0; i<response.results.length; i++) {  
            var newMovie = new Movie(response.results[i]);
            if (newMovie.Title !== undefined ) {  /* i =0,1 -> undefined Movie obj -> bug? */
                self.moviesList.push(newMovie);
            }
        }
        return self;
    }
    return $.get(root).then(initDatabase);
    
};



