window.addEventListener('load', function() {
    
        const logInButton = document.getElementById('add-movie-btn');
        logInButton.addEventListener('click', renderAddMovie);
        
        // const logInButton = document.getElementById('edit-movie');
        // logInButton.addEventListener('click', renderEditMovie);
        
        // const logInButton = document.getElementById('delete-movie');
        // logInButton.addEventListener('click', renderDeleteMovie);
        
        // const logInButton = document.getElementById('add-movie');
        // logInButton.addEventListener('click', renderAddMovie);
        
        const landingPageDiv = document.getElementById('landing-page');
        const searchResultsDiv = document.getElementById('search-results');
        const movieDetailsDiv = document.getElementById('movie-details');
        const addMovieDiv = document.getElementById('add-movie-div');
        const editMovieDiv = document.getElementById('edit-movie-div');
        

        
        
        function renderAddMovie(e) {
            e.preventDefault();
            addMovieDiv.classList.remove('hide');
            
            landingPageDiv.classList.add('hide');
            searchResultsDiv.classList.add('hide');
            movieDetailsDiv.classList.add('hide');
            editMovieDiv.classList.add('hide');
            
            // delete all movies from search-results DIV when displaying movieDetails
            while (searchResultsDiv.hasChildNodes()) {
                searchResultsDiv.removeChild(searchResultsDiv.lastChild);
            }
        }    
        
        

            
}); //- end of load eventListener function        