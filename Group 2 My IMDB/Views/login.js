/*global $*/

window.addEventListener('load', function() {

    const logInButton = document.getElementById('log-in');
    logInButton.addEventListener('click', logInCheck);
    
    const logOutButton = document.getElementById('log-out');
    logOutButton.addEventListener('click', logOut);
    
    const registerButton = document.getElementById('register');
    registerButton.addEventListener('click', registerCheck);
    
    const user = document.getElementById('user-field');
    const pass = document.getElementById('pass-field');
    
    const errorDivFull = document.getElementById('error-message-full');
    const errorDivMini = document.getElementById('error-message-mini');
    const addMovieButton = document.getElementById('add-movie-btn');
    
    // check the user status (loggedIn or loggedOut) 
    cookieCheck();
    
    
    function logInCheck(event) {
        event.preventDefault();
    
        //get values of username and password fields
        const username = user.value;
        const password = pass.value;
        
        // chech if the input fields are not empty
        fieldsCheck(username, password);

        logIn();
    }
 
    
    function registerCheck(event) {
        event.preventDefault();
        
        //get values of username and password fields
        const username = user.value;
        const password = pass.value;
        
        fieldsCheck(username, password);
    
        //if username and password fields are not empty, run 'register' function
        if (username != "" && password != "") {
            register();
        }
        return;
    }
    

    function fieldsCheck(username, password) {

        // check if username field is empty then add or remove 'red' background
        if (username == "") {
            user.style.background = 'rgb(241, 172, 172)';
        } else {
            user.style.background = 'white';
        }
    
        // check if password field is empty then add or remove 'red' background
        if (password == "") {
            pass.style.background = 'rgb(241, 172, 172)';
        } else {
             pass.style.background = 'white';
        }
        return;
    }

    
    function logIn() {
        console.log("LogIn button clicked");
    
        /////////////////////////////////// - API call for 'LOGIN'
    
        $(function() {
            $.ajax({
                url: 'https://ancient-caverns-16784.herokuapp.com/auth/login',
                type: "POST",
                data: {
                    username: user.value,
                    password: pass.value,
                },
                contentType: 'application/x-www-form-urlencoded',
                success: function(response) {
                    console.log('LogIn -OK response: ', response);

                    // set cookie with 'accessToken' value
                    document.cookie = 'accessToken=' + response.accessToken;
         
                    // show welcome message
                    let text = "Welcome "+ user.value +". Nice to have you back.";
                    showMessage(text);
                    
                    // reload index.html after successefully logginIn
                    location.replace("https://preview.c9users.io/horoiu/homework1/Homework's/11-Team-Project-IMDB/scola-informala-imdb/Group%202%20My%20IMDB/Pages/index.html");
                },
                error: function(response) {
                    console.log('LogIn -ERROR response: ', response);
                    
                    // show error message
                    let text =  "Ooopsss... Something went wrong !!! Please check your 'Username' and 'Password' and try again.";
                    showMessage(text);
                    
                    // empty 'Username' and 'Password' fields
                    user.value = '';
                    pass.value = '';
                },
            });  // end of AJAX call
        });  // end of jQuerry function
    
        /////////////////////////////////// - end of API call for 'LOGIN'
    }
    
    
    function logOut(event) {
        event.preventDefault();
        console.log("LogOut button clicked");
        
        /////////////////////////////////// - API call for 'LOGOUT'
        
        $(function() {
            $.ajax({
                url: 'https://ancient-caverns-16784.herokuapp.com/auth/logout',
                headers: {'x-auth-token': readCookies()},
                type: "GET",
                success: function(response) {
                    console.log('LogOUT -OK response: ', response);

                    showElements();
                    // delete cookie
                    document.cookie = 'accessToken=';
                    
                    // show goodbye message
                    let text = "See you later.";
                    showMessage(text);
                    
                    // reload index.html after successefully logginOut
                    location.replace("https://preview.c9users.io/horoiu/homework1/Homework's/11-Team-Project-IMDB/scola-informala-imdb/Group%202%20My%20IMDB/Pages/index.html");

                },
                error: function(response) {
                    console.log('LogOut -ERROR response: ', response);
                    
                    // show error message
                    let text =  "OOOOps. Something went wrong !!! Please try again.";
                    showMessage(text);
                },
            }); // end of AJAX call
        });  // end of jQuerry function
        
        /////////////////////////////////// - end of API call for 'LOGOUT'
    }
    
    
    function register() {
        //console.log("Register button clicked");

        /////////////////////////////////// - API call for 'REGISTER'    
        
        $(function() {
            $.ajax({
                url: 'https://ancient-caverns-16784.herokuapp.com/auth/register',
                type: "POST",
                data: {
                    username: user.value,
                    password: pass.value,
                },
                contentType: 'application/x-www-form-urlencoded',
                success: function(response) {
                    console.log('Register -OK response: ', response);
                    
                    // set cookie with 'accessToken' value
                    document.cookie = 'accessToken=' + response.accessToken;
                    
                    hideElements();
                    
                    // show welcome message
                    let text = "Welcome "+ user.value +". Thank's for registering.";
                    showMessage(text);
                    
                    // reload index.html after successfull Registration
                    location.replace("https://preview.c9users.io/horoiu/homework1/Homework's/11-Team-Project-IMDB/scola-informala-imdb/Group%202%20My%20IMDB/Pages/index.html");
                },
                
                error: function(response) {
                    console.log('Register -ERROR response: ', response);
                    
                    // show error message
                    let text = "Ooopsss... 'Username' already assigned !!! Please try another 'Username'.";
                    showMessage(text);
                    
                    // empty 'Username' and 'Password' fields
                    user.value = '';
                    pass.value = '';
                },
            }); // end of AJAX call
        });  // end of jQuerry function
    
        /////////////////////////////////// - end of API call for 'REGISTER'
    }
    
    
    function hideElements() {
        // add class 'hide' to hide form elements
        user.classList.add('hide');
        pass.classList.add('hide');
        logInButton.classList.add('hide');
        registerButton.classList.add('hide');
        
        // remove class 'hide' to show buttons available only for logged users
        //editMovieButton.classList.remove('hide');
        //deleteMovieButton.classList.remove('hide');
        addMovieButton.classList.remove('hide');
        logOutButton.classList.remove('hide');

        //hide error message DIV and reset HTML content
        // desktop resolution
        errorDivFull.classList.add('hide');
        errorDivFull.innerHTML = "";
        // on mobile resolution
        errorDivMini.classList.add('hide');
        errorDivMini.innerHTML = "";
        
        return;
    }
    
    
    function showElements() {
        //reset input fields value
        user.value = '';
        pass.value = '';
        
        // remove class 'hide' to show hidden form elements
        user.classList.remove('hide');
        pass.classList.remove('hide');
        logInButton.classList.remove('hide');
        registerButton.classList.remove('hide');
        
        // add class 'hide' to buttons as user is loggedOut
        //editMovieButton.classList.add('hide');
        //deleteMovieButton.classList.add('hide');
        addMovieButton.classList.add('hide');
        logOutButton.classList.add('hide');

        return;
    }

    
    function cookieCheck() {
        // if cookie 'accessToken' is empty or undefined, then do nothing, wait for user to LogIn/Register
        // if cookie 'accessToken' has value, then go to 'Administrator' mode: hide input fields and reveal Add/Edit/Delete buttons

        if (readCookies() ==="" || readCookies() === undefined) {
            return;
        }
        else { 
            hideElements();
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
       
            
}); //- end of load eventListener function
    