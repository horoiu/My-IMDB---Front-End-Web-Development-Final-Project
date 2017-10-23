/* global $*/
window.addEventListener("load", function() {

    // get movie 'id. from url
    const url = window.location.href;
    const index = url.indexOf("=")+1;
    const id = url.substr(index);
    //console.log(id);
    
    const root = "https://ancient-caverns-16784.herokuapp.com/movies/" + id;

    const deleteMovieBtn = document.getElementById("delete-movie");
    deleteMovieBtn.addEventListener("click", confirmDeletion);

    
    function confirmDeletion() {
        // need to continue with deleteMovie function on confirmation;
        let confirmed = confirm('Are you sure that you want to delete this movie ?');
        if (confirmed) {
            deleteMovie();
        }
    }


    function deleteMovie() {
        $(function() {
            $.ajax({
                url : root,
                headers: {'x-auth-token': readCookies()}, 
                type: "DELETE",
                data: id,
                contentType : "application/x-www-form-urlencoded", 
                success : function (response) {
                    console.log("Movie deleted, response: ", response);
                },
                error : function(response) {
                    console.log("Delete movie error - ", response);
                }
            });  // end of AJAX call
        });  // end of jQuerry function    
    }


    function readCookies() {
        let cookiesString = document.cookie;
        const cookiesArray = cookiesString.split('; ');
        var cookies = {};
    
        cookiesArray.forEach(function(c) {
            let cookie = c.split('=');
            cookies[cookie[0]] = cookie[1];
        });
        
        let accessToken = cookies.accessToken;
        return accessToken;
    }        
        
        

}); /* window on load function end*/

