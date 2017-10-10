function Movie(defaultData) {
    defaultData = defaultData || {};
    this._id = defaultData._id;
    this.Title = defaultData.Title;
    this.Year = defaultData.Year;
    this.Runtime = defaultData.Runtime;
    this.Genre = defaultData.Genre;
    this.Language = defaultData.Language;
    this.Country = defaultData.Country;
    this.Poster = defaultData.Poster;
    this.imdbRating - defaultData.imdbRating;
    this.imdbVotes = defaultData.imdbVotes;
    this.imdbID = defaultData.imdbID;
    this.Type = defaultData.Type;
}






