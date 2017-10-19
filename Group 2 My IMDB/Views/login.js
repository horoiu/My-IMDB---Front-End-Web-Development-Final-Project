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
        
        const errorDiv = document.getElementById('error-message');
        const editMovieButton = document.getElementById('edit-movie-btn');
        const deleteMovieButton = document.getElementById('delete-movie-btn');
        const addMovieButton = document.getElementById('add-movie-btn');
        
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
                        //console.log(response.accessToken);
                        
                        // set cookie with 'accessToken' value
                        document.cookie = 'accessToken=' + response.accessToken;
             
                        hideElements();
    
                        // - do whatever you want to do after you are LOGGED-IN
                        // - activate ADD, EDIT & DELETE movie buttons
                        
                    },
                    error: function(response) {
                        console.log('LogIn -ERROR response: ', response);
                        // show error message
                        errorDiv.classList.remove('hide');
                        errorDiv.innerHTML = "Ooopsss... Something went wrong !!! Please check your 'Username' and 'Password' and try again.";
                        
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
                        
                        // - do whatever you want to do after you are LOGGED-OUT
                        // - deactivate ADD, EDIT & DELETE movie buttons
                        
                    },
                    error: function(response) {
                        console.log('LogOut -ERROR response: ', response);
                        // show error message
                        errorDiv.classList.remove('hide');
                        errorDiv.innerHTML = "OOOOps. Something went wrong !!! Please try again.";
                        //alert("OOOOps. Something went wrong !!! Please try again.");
                    },
                }); // end of AJAX call
            });  // end of jQuerry function
            
            /////////////////////////////////// - end of API call for 'LOGOUT'
        }
        
        
        function register() {
            console.log("Register button clicked");

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
                        
                        // - do whatever you want to do after you are REGISTERED
                        // - activate ADD, EDIT & DELETE movie buttons
                        
                    },
                    error: function(response) {
                        console.log('Register -ERROR response: ', response);
                        //alert("OOOOps. 'Username' already assigned !!! Please try another 'Username'.");
                        errorDiv.classList.remove('hide');
                        errorDiv.innerHTML = "Ooopsss... 'Username' already assigned !!! Please try another 'Username'.";
                        
                        
                        
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
            editMovieButton.classList.remove('hide');
            deleteMovieButton.classList.remove('hide');
            addMovieButton.classList.remove('hide');
            // show LogOut button
            logOutButton.classList.remove('hide');

            
            //hide error message DIV and reset HTML content
            errorDiv.classList.add('hide');
            errorDiv.innerHTML = "";
            
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
            
            editMovieButton.classList.add('hide');
            deleteMovieButton.classList.add('hide');
            addMovieButton.classList.add('hide');
            // hide LogOut button
            logOutButton.classList.add('hide');

            return;
        }
    
        
        function cookieCheck() {
            if (readCookies() ==="" || readCookies() === undefined) {
                //console.log('accessToken: ', readCookies());
                return;
            }
            else { 
                hideElements();
            }
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
            
            
    }); //- end of load eventListener function
    