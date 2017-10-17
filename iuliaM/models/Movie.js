/*global $*/
/*global newMovie*/

function Movie(defaultData){
    defaultData = defaultData||{};
    this._id = defaultData._id;
    this.Title = defaultData.Title;
    this.Year = defaultData.Year;
    this.Rated = defaultData.Rated;
    this.Released = defaultData.Released;
    this.Runtime = defaultData.Runtime;
    this.Genre = defaultData.Genre;
    this.Director = defaultData.Director;
    this.Writer = defaultData.Writer;
    this.Actors = defaultData.Actors;
    this.Plot = defaultData.Plot;
    this.Language = defaultData.Language;
    this.Country = defaultData.Country;
    this.Awards = defaultData.Awards;
    this.Poster = defaultData.Poster;
    this.Source = defaultData.Source;
    this.Value = defaultData.Value;
    this.Metascore = defaultData.Metascore;
    this.imdbRating = defaultData.imdbRating;
    this.imdbVotes = defaultData.imdbVotes;
    this.imdbID = defaultData.imdbID;
    this.Type = defaultData.Type;
    this.DVD = defaultData.DVD;
    this.BoxOffice = defaultData.BoxOffice;
    this.Production = defaultData.Production;
    this.Webiste = defaultData.Website;
}
// 

Movie.prototype.postNewMovie = function(newMovie){
 
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
        alert("New movie added");
    }).catch(function(error){
        console.log(error);
        alert("You need to be authenticated to be able to create a movie")
    });
}