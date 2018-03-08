/* global location $*/
window.addEventListener("load", function() {

    

    const deleteMovieBtn = document.getElementById("delete-movie");
    deleteMovieBtn.addEventListener("click", confirmDeletion);

    
    function confirmDeletion() {
        // need to continue with deleteMovie function on confirmation;
        let confirmed = confirm('Are you sure that you want to delete this movie ?');
        if (confirmed) {
            // get movie 'id. from url
            const url = window.location.href;
            const index = url.indexOf("=")+1;
            const id = url.substr(index);
            console.log('deleteMovie id: ',id);
            
            const root = "https://ancient-caverns-16784.herokuapp.com/movies/" + id;
            deleteMovie(root, id);
        }
    }


    function deleteMovie(root, id) {
        $(function() {
            $.ajax({
                url : root,
                headers: {'x-auth-token': readCookies()}, 
                type: "DELETE",
                data: id,
                contentType : "application/x-www-form-urlencoded", 
                success : function (response) {
                    console.log("Movie deleted, response: ", response);
                    let text = "Movie deleted !!!";
                    showMessage(text);
                    
                },
                error : function(response) {
                    console.log("Delete movie error - ", response);
                    let text = "OOOoooppsss .... Delete movie error !!!";
                    showMessage(text);
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
        
    
    function showMessage(text) {
        const errorDivFull = document.getElementById('error-message-full');
        const errorDivMini = document.getElementById('error-message-mini');
        
         //show the errorMessage DIV and display message
        errorDivFull.classList.remove('hide');
        errorDivMini.classList.remove('hide');
        errorDivFull.innerHTML = text; 
        errorDivMini.innerHTML = text; 
        
        //emtpty HTML message and hide errorMessage DIV
        setTimeout(function() {
            errorDivFull.innerHTML = ""; 
            errorDivMini.innerHTML = ""; 
            errorDivFull.classList.add('hide');
            errorDivMini.classList.add('hide');
             // reload index.html
            // location.replace("https://preview.c9users.io/horoiu/homework1/Homework's/11-Team-Project-IMDB/scola-informala-imdb/Group%202%20My%20IMDB/Pages/index.html");
            location.replace("https://rawgit.com/horoiu/My-IMDB--Final-Project/master/Pages/index.html");            
                
        }, 5000);
    }  
    
    

}); /* window on load function end*/

