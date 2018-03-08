// window.addEventListener("load", function() {

//     const deleteMovieBtn = document.getElementById("delete-movie");
//     const editMovieBtn = document.getElementById("edit-movie");
//     editMovieBtn.addEventListener("click", editFunction);

//      // check the user status (loggedIn or loggedOut) 
//     cookieCheck();
    

//     var url = window.location.href;
//     /* get id from url */
//     var index = url.indexOf("=")+1;
//     var id = url.substr(index);
    
    
//     function cookieCheck() {
//         // if cookie 'accessToken' is empty or undefined, then hideButtons
//         // if cookie 'accessToken' has value, then go to 'Administrator' mode and reveal Edit & Delete buttons

//         if (readCookies() ==="" || readCookies() === undefined) {
//             hideButtons();
//         }
//         else { 
//             showButtons;
//         }
//     }
    

//     function readCookies() {
//         // get the cookies string and split them by ';' into a new array
//         let cookiesString = document.cookie;
//         const cookiesArray = cookiesString.split('; ');
//         var cookies = {};
        
//         // itterate each array element and split them by '='
//         cookiesArray.forEach(function(c) {
//             let cookie = c.split('=');
//             cookies[cookie[0]] = cookie[1];
//         });
        
//         // assign the 'cookie.accessToken' value to 'accessToken' 
//         let accessToken = cookies.accessToken;
        
//         // return the accessToken value to 
//         return accessToken;
//     }


//     function hideButtons() {
//         // add class 'hide' to hide buttons
//         console.log('hide editMovieBtn: ',editMovieBtn);
//         console.log('hide deleteMovieBtn: ',deleteMovieBtn);
//         editMovieBtn.classList.add('hide');
//         deleteMovieBtn.classList.add('hide');
//         return;
//     }
        
        
//     function showButtons() {
//         // remove class 'hide' to show hidden form elements
//         console.log('show editMovieBtn: ',editMovieBtn);
//         console.log('show deleteMovieBtn: ',deleteMovieBtn);
//         editMovieBtn.classList.remove('hide');
//         deleteMovieBtn.classList.remove('hide');
//         return;
//     }
    
    
//     function editFunction() {
//         window.open("./editMovie.html?id="+id, "_blank");    // edit movie - temporary
//     }
        
    
// }); // end of onload function







