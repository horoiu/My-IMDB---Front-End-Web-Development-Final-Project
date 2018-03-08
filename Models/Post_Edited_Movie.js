/* global location $ */
function Changeling () {
}


Changeling.prototype.submitChanges = function (editedMovie) {
    var root = "https://ancient-caverns-16784.herokuapp.com/movies/" + editedMovie._id;
    //console.log(editedMovie);
    //console.log(root);
    var copyMovie = Object.assign({}, editedMovie);
    delete copyMovie['_id'];

    $(function() {
        $.ajax({
            url : root,
            headers: {'x-auth-token': readCookies()}, 
            type: "PUT",
            data: copyMovie,
            contentType : "application/x-www-form-urlencoded", 
            success : function (response) {
                console.log("Your edit has been saved, response: ", response);
                let text = "Your edit has been saved !!!";
                showMessage(text);
                // reload index.html after moviDetails was successefully edited
                // location.replace("https://preview.c9users.io/horoiu/homework1/Homework's/11-Team-Project-IMDB/scola-informala-imdb/Group%202%20My%20IMDB/Pages/index.html");
                location.replace("https://rawgit.com/horoiu/My-IMDB--Final-Project/master/Pages/index.html");
                
            },
            error : function(response) {
                console.log("Edit movie error - ", response);
                let text = "OOoopsss ... Something went wrong and no changes were done !!!";
                showMessage(text);
            }
        });  // end of AJAX call
    });  // end of jQuerry function    
};


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
        
    }, 5000);
}