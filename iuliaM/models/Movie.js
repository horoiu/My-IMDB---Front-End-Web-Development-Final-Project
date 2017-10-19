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


