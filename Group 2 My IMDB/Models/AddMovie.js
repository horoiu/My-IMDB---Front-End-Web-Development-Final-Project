/*global Movie*/
/*global $*/

function MoviesAdded(){
    this.moviesAdded = [];
}

MoviesAdded.prototype.getMovies = function(newMovie){
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

Movie.prototype.postNewMovie = function(newMovie,accTokenCookie){
 
    const moviesUrl = "https://ancient-caverns-16784.herokuapp.com/movies";
    
    $.ajax({
        url: moviesUrl,
        method:'POST',
        headers:{
            'x-auth-token':getAccesToken(),
        },
        data:{
            _id : newMovie._id,
            Title : newMovie.Title,
            Year : newMovie.Year,
            Rated: newMovie.Rated,
            Released:newMovie.Released,
            Runtime : newMovie.Runtime,
            Genre : newMovie.Genre,
            Director: newMovie.Director,
            Writer: newMovie.Writer,
            Actors: newMovie.Actors,
            Plot:newMovie.Plot,
            Language : newMovie.Language,
            Country : newMovie.Country,
            Awards:newMovie.Awards,
            Poster : newMovie.Poster,
            Source:newMovie.Source,
            Value:newMovie.Value,
            Metascore:newMovie.Metascore,
            imdbRating : newMovie.imdbRating,
            imdbVotes : newMovie.imdbVotes,
            imdbID : newMovie.imdbID,
            Type : newMovie.Type,
            DVD: newMovie.DVD,
            BoxOffice:newMovie.BoxOffice,
            Production:newMovie.Production,
            Website:newMovie.Website
        }
    }).then(function(){
        console.log("New movie added");
    }).catch(function(error){
        console.log(error);
        alert("You need to be authenticated to be able to create a movie")
    });
    
     function getAccesToken(){
            let imdbCookies = document.cookie;
            const imdbCookiesArray = imdbCookies.split("; ");
            let cookies = {};
            imdbCookiesArray.forEach(function(c){
                let cookie = c.split("=");
                cookies[cookie[0]] = cookie[1];
            });
            let accessToken = cookies.accessToken;
            return accessToken;
               
        }
}
