/*global Movie*/
/*global $*/

function MoviesAdded(){
    this.moviesAdded = [];
}

/*check if the movie to be added already exists in database*/
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
    
    /*if the response brought a movie, add it to the movies array, else movie
    array will be empty*/
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
};

/*call API to add the user's movie*/
Movie.prototype.postNewMovie = function(newMovie,accTokenCookie){
 
    const moviesUrl = "https://ancient-caverns-16784.herokuapp.com/movies";
    
    $.ajax({
        url: moviesUrl,
        method:'POST',
        /*acces token need it because this is a functionality for logged users*/
        headers:{
            'x-auth-token':getAccesToken(),
        },
        data:{
            //_id : newMovie._id,
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
        renderLandingPage();
    }).catch(function(error){
        console.log(error);
        alert("You need to be authenticated to be able to create a movie");
    });
    
    /*read the acces token cookie*/
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
        
    function renderLandingPage() {
            //event.preventDefault();
            
            const landingPageDiv = document.getElementById('landing-page');
            const searchResultsDiv = document.getElementById('search-results');
            const movieDetailsDiv = document.getElementById('movie-details');
            const addMovieDiv = document.getElementById('add-movie');
            const editMovieDiv = document.getElementById('edit-movie');
            
            landingPageDiv.classList.remove('hide');
            
            searchResultsDiv.classList.add('hide');
            addMovieDiv.classList.add('hide');
            movieDetailsDiv.classList.add('hide');
            editMovieDiv.classList.add('hide');
        }
};
