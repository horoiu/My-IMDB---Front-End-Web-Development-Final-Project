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
        let text = "New movie added";
        console.log(text);
        showMessage(text);
        // reload index.html after successefully adding a movie
        location.replace("https://preview.c9users.io/horoiu/homework1/Homework's/11-Team-Project-IMDB/scola-informala-imdb/Group%202%20My%20IMDB/Pages/index.html");
        
    }).catch(function(error){
        console.log(error);
        let text = "You need to be authenticated to be able to create a movie";
        showMessage(text);
        // reload index.html after getting an error on adding a movie
        location.replace("https://preview.c9users.io/horoiu/homework1/Homework's/11-Team-Project-IMDB/scola-informala-imdb/Group%202%20My%20IMDB/Pages/index.html");
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
        
    // function renderLandingPage() {
    //         //event.preventDefault();
            
    //         const landingPageDiv = document.getElementById('landing-page');
    //         const searchResultsDiv = document.getElementById('search-results');
    //         const movieDetailsDiv = document.getElementById('movie-details');
    //         const addMovieDiv = document.getElementById('add-movie-div');
    //         const editMovieDiv = document.getElementById('edit-movie-div');
            
    //         landingPageDiv.classList.remove('hide');
            
    //         searchResultsDiv.classList.add('hide');
    //         addMovieDiv.classList.add('hide');
    //         movieDetailsDiv.classList.add('hide');
    //         editMovieDiv.classList.add('hide');
    //     }
        
        
    function showMessage(text) {
        const errorDivFull = document.getElementById('error-message-full');
        const errorDivMini = document.getElementById('error-message-mini');
        
         //show the errorMessage DIV and display message
        errorDivFull.classList.remove('hide');
        errorDivMini.classList.remove('hide');
        errorDivFull.innerHTML = text; 
        errorDivMini.innerHTML = text; 
        
        //emtpty HTML message and hide errorMessage DIV
        setTimeout(function() {
            errorDivFull.innerHTML = ""; 
            errorDivMini.innerHTML = ""; 
            errorDivFull.classList.add('hide');
            errorDivMini.classList.add('hide');
        }, 5000);
    }  
    
    
    
};
