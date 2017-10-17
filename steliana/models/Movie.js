function Movie(defaultData) {
    defaultData = defaultData || {};
    this.Title = defaultData.Title;
    this.Genre = defaultData.Genre;
    this.Language = defaultData.Language;
    this.Country = defaultData.Country;
    this.Year = defaultData.Year;
    this.Runtime = defaultData.Runtime;
    this.Type = defaultData.Type;
    this.Poster = defaultData.Poster;
    this.imdbID = defaultData.imdbID;
    this.imdbRating - defaultData.imdbRating;
    this.imdbVotes = defaultData.imdbVotes;
    this._id = defaultData._id;
}

Movie.prototype.getMovie = function(id)  {
    var that = this; 

    var responseObj = {};
    var handeErros = function(response) {
        if(response.ok) {
            return response.json();
        }
        throw new Error(response.status);
    }

    var url = "https://ancient-caverns-16784.herokuapp.com/movies/59d79f05b0b596040599aaca";
    return fetch(url, {
        method:"GET"
    })
    .then(handeErros)
    .then(function(response) {
        that.Title = response.Title;
        that.Genre = response.Genre;
        that.Language = response.Language;
        that.Country = response.Country;
        that.Year = response.Year;
        that.Runtime = response.Runtime;
        that.Type = response.Type;
        that.Poster = response.Poster;
        that.imdbID = response.imdbID;
        that.imdbRating - response.imdbRating;
        that.imdbVotes = response.imdbVotes;
        that._id = response._id;
    })
    .catch(function(error) {
        console.log(error);
    })
}
