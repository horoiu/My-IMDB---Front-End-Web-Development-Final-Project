window.addEventListener("load", function() {
   
   let newMovie = new Movie();
   newMovie.getMovies();
   const addMovieBtn = document.getElementById("submit");
   addMovieBtn.onclick = function (){
        createNewMovie();
        newMovie.postNewMovie(newMovie);
        document.getElementById("my-form").reset();
   }        
   
   function createNewMovie(){
       newMovie._id = Date.now() * Math.random;
       newMovie.Title = document.getElementById("title").value;
       newMovie.Year = document.getElementById("year").value;
       newMovie.Runtime = document.getElementById("runtime").value;
       newMovie.Genre = document.getElementById("genre").value;
       newMovie.Language = document.getElementById("language").value;
       newMovie.Country = document.getElementById("country").value;
       newMovie.Poster = document.getElementById("poster").value;
       newMovie.imdbRating = document.getElementById("imdbRating").value;
       newMovie.imdbVotes = document.getElementById("imdbVotes").value;
       newMovie.imdbID = document.getElementById("imdbId").value;
       newMovie.Type = document.getElementById("type").value;
   }
   
});