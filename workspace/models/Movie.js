/*global $*/
/*global newMovie*/

function Movie(defaultData){
    defaultData = defaultData||{};
    this._id = defaultData._id;
    this.Title = defaultData.Title;
    this.Year = defaultData.Year;
    this.Runtime = defaultData.Runtime;
    this.Genre = defaultData.Genre;
    this.Language = defaultData.Language;
    this.Country = defaultData.Country;
    this.Poster = defaultData.Poster;
    this.imdbRating = defaultData.imdbRating;
    this.imdbVotes = defaultData.imdbVotes;
    this.imdbID = defaultData.imdbID;
    this.Type = defaultData.Type;
}
Movie.prototype.getMovies = function(){
    const moviesUrl = "https://ancient-caverns-16784.herokuapp.com/movies";
    return $.ajax({
        url:moviesUrl + "?take=400",
        method:'GET'
    }).then(function(apiResp){
        console.log(apiResp);
    }).catch(function(error){
        console.log(error);
    });
}

Movie.prototype.postNewMovie = function(newMovie){
    let that = this;
    const moviesUrl = "https://ancient-caverns-16784.herokuapp.com/movies";
    
    $.ajax({
        url: moviesUrl,
        method:'POST',
        headers:{
            
            'x-auth-token':'aWKaR_QY8GExg8S52YUHkfF3ELe0aLdu',
        },
        data:{
            _id : newMovie._id,
            Title : newMovie.Title,
            Year : newMovie.Year,
            Runtime : newMovie.Runtime,
            Genre : newMovie.Genre,
            Language : newMovie.Language,
            Country : newMovie.Country,
            Poster : newMovie.Poster,
            imdbRating : newMovie.imdbRating,
            imdbVotes : newMovie.imdbVotes,
            imdbID : newMovie.imdbID,
            Type : newMovie.Type
        }
    }).then(function(){
        alert("New movie added");
    }).catch(function(error){
        console.log(error);
        alert("You need to be authenticated to be able to create a movie")
    });
}