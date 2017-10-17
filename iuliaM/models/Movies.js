function Movies(){
    this.moviesAdded = [];
}

Movies.prototype.getMovies = function(newMovie){
    let that = this;
    const moviesUrl = "https://ancient-caverns-16784.herokuapp.com/movies" +
    '?Title=' + newMovie.Title + '&Year='+newMovie.Year;
    return $.ajax({
        url:moviesUrl,
        method:'GET'
    }).then(function(response){
        console.log(response);
        searchResults(response);
    }).catch(function(error){
        console.log(error);
    });
    
    function searchResults(response){
        const responseLength = response.results.length; 
        if (responseLength>0){
            for (let i = 0; i < responseLength; i++){
                let movie = new Movie(response[i]);
                that.moviesAdded.push(movie);
            }
        }else{
            that.moviesAdded = [];
        }
    }
}