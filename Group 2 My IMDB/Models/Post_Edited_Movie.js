/* global $ */
function Changeling () {
}

Changeling.prototype.submitChanges = function (editedMovie) {
    var root = "https://ancient-caverns-16784.herokuapp.com/movies/" + editedMovie._id;
    console.log(editedMovie);
    console.log(root);
    // const errorDiv = document.getElementById('error-message');

    $(function() {
        $.ajax({
            url : root,
            headers: {'x-auth-token': readCookies()}, 
            method: "PUT",
            data: editedMovie,
            success : function (response) {
                console.log("Your edit has been saved, response: ", response);
                //hide the errorMessage DIV and emtpty HTML message, if any
                // errorDiv.classList.add('hide');
                // errorDiv.innerHTML = ""; 
            },
            error : function(response) {
                console.log("Edit movie error - ", response);
                // show errorMessage DIV and print the error message
                // errorDiv.classList.remove('hide');
                // errorDiv.innerHTML = "You shouldn't be able to see me! Only auth users can edit and see edit option / No-changes should not be submitted";
                //alert("You shouldn't be able to see me! Only auth users can edit and see edit option / No-changes should not be submitted");
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