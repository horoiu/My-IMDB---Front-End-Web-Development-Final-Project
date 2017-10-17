window.addEventListener("load", function(){
    var movie = new Movie();
    var movieReq = movie.getMovie();
    
    movieReq.then(renderMovie);
    
    function renderMovie() {
        var container = document.getElementsByTagName("body")[0];
        var movieTitle = document.createElement("h1");
        movieTitle.innerHTML = movie.Title;
        var moviePoster = document.createElement("img");
        moviePoster.src = movie.Poster;
        var movieGenre = document.getElementById("genre");
        movieGenre.innerHTML = "Genre: " + movie.Genre;
        var movieLanguage = document.getElementById("language");
        movieLanguage.innerHTML = movie.Language;
        var movieCountry = document.getElementById("country");
        movieCountry.innerHTML = movie.Country;
        var movieYear = document.getElementById("year");
        movieYear.innerHTML = movie.Year;
        var movieRuntime = document.getElementById("runtime");
        movieRuntime.innerHTML = movie.Runtime;
        var movieReleased = document.getElementById("released");
        movieReleased.innerHTML = movie.Released;
        var movieDirector = document.getElementById("director");
        movieDirector.innerHTML = movie.Director;
        var movieWriter = document.getElementById("writer");
        movieWriter.innerHTML = movie.Writer;
        var movieActors = document.getElementById("actors");
        movieActors.innerHTML = movie.Actors;
        var moviePlot = document.getElementById("plot");
        moviePlot.innerHTML = movie.Plot;
        var movieAwards = document.getElementById("awards");
        movieAwards.innerHTML = movie.Awards;
        var movieProduction = document.getElementById("production");
        movieProduction.innerHTML = movie.Production;
        var movieWebsite = document.getElementById("website");
        movieWebsite.innerHTML = movie.Website;
        

        container.appendChild(movieTitle);
        container.appendChild(moviePoster);
        container.appendChild(movieGenre);
        container.appendChild(movieLanguage);
        container.appendChild(movieCountry);
        container.appendChild(movieYear);
        container.appendChild(movieRuntime);
        container.appendChild(movieReleased);
        container.appendChild(movieDirector);
        container.appendChild(movieWriter);
        container.appendChild(movieActors);
        container.appendChild(moviePlot);
        container.appendChild(movieAwards);
        container.appendChild(movieProduction);
        container.appendChild(movieWebsite);
        
        
    }
});
