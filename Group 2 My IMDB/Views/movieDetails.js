/*global MovieDetails editMe */
window.addEventListener("load", function() {

    const deleteMovieBtn = document.getElementById("delete-movie");
    const editMovieBtn = document.getElementById("edit-movie");
    editMovieBtn.addEventListener("click", editFunction);

     // check the user status (loggedIn or loggedOut) 
    cookieCheck();
    

    var url = window.location.href;
    /* get id from url */
    var index = url.indexOf("=")+1;
    var id = url.substr(index);
    //console.log(id);
    
    /* GET movie based on it's id */
    //var movie = new MovieDetails;
    //movie.getDetails(id).then(renderMovie);
    
    // function renderMovie(response) {
    //     console.log('inside renderMovie');
    //     var movieObject = response.reqMovie;
    //     var containerDivs = document.getElementsByClassName("details-description");
    //     for (var j=0; j<containerDivs.length; j++) {
    //         console.log('inside renderMovie for');
    //         var elements = containerDivs[j].children;
    //         for (var i=0; i<elements.length; i++) {
    //             if (elements[i].title === "Poster") {
    //                 //if there is no movie image, set a default image;
    //                 if (movieObject.Poster === undefined || movieObject.Poster === "" ) {
    //                     //console.log('inside');
    //                     let imgUrl = "https://www.traveldailymedia.com/usa/wp-content/themes/woohoo/images/noimg.png";
    //                     elements[i].setAttribute("src", imgUrl);
    //                     //console.log('if movieObject.Poster: ', movieObject.Poster);
    //                 } else {
    //                     elements[i].setAttribute("src", movieObject[elements[i].title]);
    //                     //console.log('else movieObject.Poster: ', movieObject.Poster);
    //                 }
    //             }
    //             elements[i].innerHTML += movieObject[elements[i].title];
    //         }
    //     }
      
    // } // end of renderMovie function
    
    
    function cookieCheck() {
        // if cookie 'accessToken' is empty or undefined, then hideButtons
        // if cookie 'accessToken' has value, then go to 'Administrator' mode and reveal Edit & Delete buttons

        if (readCookies() ==="" || readCookies() === undefined) {
            hideButtons();
        }
        else { 
            showButtons;
        }
    }
    

    function readCookies() {
        // get the cookies string and split them by ';' into a new array
        let cookiesString = document.cookie;
        const cookiesArray = cookiesString.split('; ');
        var cookies = {};
        
        // itterate each array element and split them by '='
        cookiesArray.forEach(function(c) {
            let cookie = c.split('=');
            cookies[cookie[0]] = cookie[1];
        });
        
        // assign the 'cookie.accessToken' value to 'accessToken' 
        let accessToken = cookies.accessToken;
        
        // return the accessToken value to 
        return accessToken;
    }


    function hideButtons() {
        // add class 'hide' to hide buttons
        editMovieBtn.classList.add('hide');
        deleteMovieBtn.classList.add('hide');
        return;
    }
        
        
    function showButtons() {
        // remove class 'hide' to show hidden form elements
        editMovieBtn.classList.remove('hide');
        deleteMovieBtn.classList.remove('hide');
        return;
    }
    
    
    function editFunction() {
        window.open("./editMovie.html?id="+id, "_blank");    // edit movie - temporary
    }
        
    
}); // end of onload function







