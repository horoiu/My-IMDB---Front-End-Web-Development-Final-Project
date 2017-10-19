function delMov() {};
delMov.prototype.deleteMovie = function(id) {

var root = "https://ancient-caverns-16784.herokuapp.com/movies/" + id;
$(function() {
        $.ajax({
            url : root,
            headers: {'x-auth-token': readCookies()}, 
            type: "DELETE",
            contentType : "application/x-www-form-urlencoded", 
            success : function (response) {
                
                console.log("The movie has been deleted, response: ", response);
                 
            },
            error : function(response) {
                console.log("Delete movie error - ", response);                
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