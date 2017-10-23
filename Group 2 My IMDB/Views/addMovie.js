/*global Movie*/
/*global MoviesAdded*/

window.addEventListener("load", function() {

   const message = document.querySelector(".message-js");
   const newMovie = new Movie();
   const movieList = new MoviesAdded();
  
   const addMovieBtn = document.querySelector(".submit");
   addMovieBtn.onclick = function (){
       /*message should be empty after every script execution*/
       message.innerHTML = "";
       //read user's input
       createNewMovie();
       
       //get all required fields
       const inputError = document.querySelectorAll(".required-js");
       /*if required fields are empty, alert the user, else reset form and remove 
       error color and message*/
       if(checkRequired()){
        for (let i = 0; i<inputError.length; i++){
            inputError[i].style.backgroundColor = "#FF6347";
            message.innerHTML = "Please complete all the required fields!";
        }
   }else{
        document.querySelector(".my-form-js").reset();
        for (let i = 0; i<inputError.length; i++){
            inputError[i].style.backgroundColor = null;
        }
        //wait response from API to check if the movie to be added exists in DB
        const moviesRequest = movieList.getMovies(newMovie);
        moviesRequest.then(checkMovieExistInDB);
   }
}
    //if the movie to be added exists in DB, throw informational message
    //if not, post new movie in DB
   function checkMovieExistInDB(moviesRequest){
        if (movieList.moviesAdded.length>0){
            message.innerHTML = "This movie exits in database.";
        }
        else{
            newMovie.postNewMovie(newMovie);
            message.innerHTML = "New movie added!"
            message.style.backgroundColor = "#7FFFD4";
        }
   }
   
   //get the input from the user
   function createNewMovie(){
       newMovie.Title =document.querySelector(".title").value;
       newMovie.Year = document.querySelector(".year").value;
       newMovie.Rated = document.querySelector(".rated").value;
       newMovie.Released =document.querySelector(".released").value;
       newMovie.Runtime = document.querySelector(".runtime").value;
       newMovie.Genre = document.querySelector(".genre").value;
       newMovie.Director = document.querySelector(".director").value;
       newMovie.Writer = document.querySelector(".writer").value;
       newMovie.Actors = document.querySelector(".actors").value;
       newMovie.Plot = document.querySelector(".plot").value;
       newMovie.Language = document.querySelector(".language").value;
       newMovie.Country = document.querySelector(".country").value;
       newMovie.Awards = document.querySelector(".awards").value;
       newMovie.Poster = document.querySelector(".poster").value;
       newMovie.Source = document.querySelector(".source").value;
       newMovie.Value = document.querySelector(".value").value;
       newMovie.Metascore = document.querySelector(".metascore").value;
       newMovie.imdbRating = document.querySelector(".imdbRating").value;
       newMovie.imdbVotes = document.querySelector(".imdbVotes").value;
       newMovie.imdbID = document.querySelector(".imdbId").value;
       newMovie.Type = document.querySelector(".type").value;
       newMovie.DVD = document.querySelector(".dvd").value;
       newMovie.BoxOffice = document.querySelector(".box_office").value;
       newMovie.Production = document.querySelector(".production").value;
       newMovie.Webiste = document.querySelector(".website").value;
       
       if ((newMovie.Rated === "")||(newMovie.Released === "")||(newMovie.Director === "")
            ||(newMovie.Actors === "")||(newMovie.Writer === "")||(newMovie.Plot==="")
            ||(newMovie.Awards==="")||(newMovie.Poster==="")||(newMovie.Source==="")||
            (newMovie.Value==="")||(newMovie.Metascore==="")||(newMovie.imdbRating==="")
            ||(newMovie.imdbVotes==="")||(newMovie.imdbID==="")||(newMovie.DVD==="")
            ||(newMovie.BoxOffice==="")||(newMovie.Production==="")||(newMovie.Webiste
            ==="")){
               let undef = "";
               undef.replace("",null);
            }
   }
   
   //form validation
   function checkRequired(){
       if ((newMovie.title === "")||(newMovie.Year === "")||(newMovie.Runtime ==="")||
   (newMovie.Language === "")||(newMovie.Country === "")||(newMovie.Type === "")||
   (newMovie.Genre === ""))
   {    
        return true;
   }
   }
   
  

});