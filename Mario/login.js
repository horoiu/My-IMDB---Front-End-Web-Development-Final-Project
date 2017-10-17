/*global $*/

window.addEventListener('load', function() {

    const logInButton = document.getElementById('log-in');
    logInButton.addEventListener('click', logInCheck);
    
    const registerButton = document.getElementById('register');
    registerButton.addEventListener('click', registerCheck);

    const user = document.getElementById('user-field');
    const pass = document.getElementById('pass-field');
    const formElements = document.getElementsByClassName('form-element');


    function logInCheck() {
        event.preventDefault();
    
        //get values of username and password fields
        const username = user.value;
        const password = pass.value;
        
        // chech if the input fields are not empty
        fieldsCheck(username, password);
    
        //if username and password fields are not empty, run 'checkButton' function
        if (username != "" && password != "") {
            checkButton();
        }
        return;
    }
 
    
    function registerCheck() {
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


    function checkButton() {

        // take the value of the button
        let logInButtonValue = logInButton.getAttribute('value');
        
        // check the value of the button that was pressed: 'logIn' or 'logOut', and run the appropiate function
        if (logInButtonValue === 'log-in') {
            logIn();
        } else if (logInButtonValue === 'log-out') {
            logOut();
        }
    }
    
    
    function logIn() {
        console.log("LogIn button clicked");
        
        const usernameValue = user.value;
        const passwordValue = pass.value;
    
    
        /////////////////////////////////// - API call for 'LOGIN'
    
        $(function() {
            $.ajax({
                url: 'https://ancient-caverns-16784.herokuapp.com/auth/login',
                type: "POST",
                data: {
                    username: usernameValue,
                    password: passwordValue,
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
                    alert("OOOOps. Something went wrong !!! Please check your 'Username' and 'Password' and try again.");
                    
                    // empty 'Username' and 'Password' fields
                    user.value = '';
                    pass.value = '';
                },
            });  // end of AJAX call
        });  // end of jQuerry function
    
        /////////////////////////////////// - end of API call for 'LOGIN'

    
        // console.log("username: ", usernameValue);
        // console.log("password: ", passwordValue);  
    }
    
    
    function logOut() {
        console.log("LogOut button clicked");
        
        //////////////////////////////////// -  read cookies and get 'accessToken' value 
        
        let cookiesString = document.cookie;
        const cookiesArray = cookiesString.split('; ');
        let cookies = {};
        
        cookiesArray.forEach(function(c) {
            let cookie = c.split('=');
            cookies[cookie[0]] = cookie[1];
        });
        
        let accessToken = cookies.accessToken;
        //console.log('accessToken: ', accessToken);
        
        /////////////////////////////////// - end of reading cookies
        
        
        /////////////////////////////////// - API call for 'LOGOUT'
        
        $(function() {
            $.ajax({
                url: 'https://ancient-caverns-16784.herokuapp.com/auth/logout',
                headers: {'x-auth-token': accessToken},
                type: "GET",
                success: function(response) {
                    console.log('LogOUT -OK response: ', response);
                    
                    showElements();

                    // - do whatever you want to do after you are LOGGED-OUT
                    // - deactivate ADD, EDIT & DELETE movie buttons
                    
                },
                error: function(response) {
                    console.log('LogOut -ERROR response: ', response);
                    alert("OOOOps. Something went wrong !!! Please try again.");
                },
            }); // end of AJAX call
        });  // end of jQuerry function
        
        /////////////////////////////////// - end of API call for 'LOGOUT'
    }
    
    
    function register() {
        console.log("Register button clicked");
        
        const usernameValue = user.value;
        const passwordValue = pass.value;
    
    
        /////////////////////////////////// - API call for 'REGISTER'    
        
        $(function() {
            $.ajax({
                url: 'https://ancient-caverns-16784.herokuapp.com/auth/register',
                type: "POST",
                data: {
                    username: usernameValue,
                    password: passwordValue
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
                    alert("OOOOps. 'Username' already assigned !!! Please try another 'Username'.");
                    
                    // empty 'Username' and 'Password' fields
                    user.value = '';
                    pass.value = '';
                },
            }); // end of AJAX call
        });  // end of jQuerry function
    
        /////////////////////////////////// - end of API call for 'REGISTER'
    
    
        //console.log("username: ", usernameValue);
        //console.log("password: ", passwordValue);   
    }
    
    
    function hideElements() {
        logInButton.innerHTML = "LogOut";
        logInButton.setAttribute('value', 'log-out');

        for (let i=0; i<formElements.length; i++) {
            formElements[i].style.display = 'none';
        }
        return;
    }
    
    
    function showElements() {
        logInButton.innerHTML = "LogIn";
        logInButton.setAttribute('value', 'log-in');
        user.value = '';
        pass.value = '';
        
        for (let i=0; i<formElements.length; i++) {
            formElements[i].style.display = 'initial';
        }
        return;
    }


}); //- end of load eventListener function






//////////////



// /*global $*/

// window.addEventListener('load', function() {

//     const logInButton = document.getElementById('logIn');
//     logInButton.addEventListener('click', logInCheck);
    
//     const registerButton = document.getElementById('register');
//     registerButton.addEventListener('click', registerCheck);

//     const user = document.getElementById('userField');
//     const pass = document.getElementById('passField');
//     const formElements = document.getElementsByClassName('formElement');


//     function logInCheck() {
//         event.preventDefault();
    
//         //get values of username and password fields
//         const username = user.value;
//         const password = pass.value;
        
//         // chech if the input fields are not empty
//         fieldsCheck(username, password);
    
//         //if username and password fields are not empty, run 'checkButton' function
//         if (username != "" && password != "") {
//             checkButton();
//         }
//         return;
//     }
 
    
//     function registerCheck() {
//         event.preventDefault();
        
//         //get values of username and password fields
//         const username = user.value;
//         const password = pass.value;
        
//         fieldsCheck(username, password);
    
//         //if username and password fields are not empty, run 'register' function
//         if (username != "" && password != "") {
//             register();
//         }
//         return;
//     }
    

//     function fieldsCheck(username, password) {

//         // check if username field is empty then add or remove 'red' background
//         if (username == "") {
//             user.style.background = 'rgb(241, 172, 172)';
//         } else {
//             user.style.background = 'white';
//         }
    
//         // check if password field is empty then add or remove 'red' background
//         if (password == "") {
//             pass.style.background = 'rgb(241, 172, 172)';
//         } else {
//              pass.style.background = 'white';
//         }
//         return;
//     }


//     function checkButton() {

//         // take the value of the button
//         let logInButtonValue = logInButton.getAttribute('value');
        
//         // check the value of the button that was pressed: 'logIn' or 'logOut', and run the appropiate function
//         if (logInButtonValue === 'logIn') {
//             logIn();
//         } else if (logInButtonValue === 'logOut') {
//             logOut();
//         }
//     }
    
    
//     function logIn() {
//         console.log("LogIn button clicked");
        
//         const usernameValue = user.value;
//         const passwordValue = pass.value;
    
    
//         /////////////////////////////////// - API call for 'LOGIN'
    
//         $(function() {
//             $.ajax({
//                 url: 'https://ancient-caverns-16784.herokuapp.com/auth/login',
//                 type: "POST",
//                 data: {
//                     username: usernameValue,
//                     password: passwordValue,
//                 },
//                 contentType: 'application/x-www-form-urlencoded',
//                 success: function(response) {
//                     console.log('LogIn -OK response: ', response);
//                     //console.log(response.accessToken);
                    
//                     // set cookie with 'accessToken' value
//                     document.cookie = 'accessToken=' + response.accessToken;
                    
//                     hideElements();

//                     // - do whatever you want to do after you are LOGGED-IN
//                     // - activate ADD, EDIT & DELETE movie buttons
                    
//                 },
//                 error: function(response) {
//                     console.log('LogIn -ERROR response: ', response);
//                     alert("OOOOps. Something went wrong !!! Please check your 'Username' and 'Password' and try again.");
                    
//                     // empty 'Username' and 'Password' fields
//                     user.value = '';
//                     pass.value = '';
//                 },
//             });  // end of AJAX call
//         });  // end of jQuerry function
    
//         /////////////////////////////////// - end of API call for 'LOGIN'

    
//         // console.log("username: ", usernameValue);
//         // console.log("password: ", passwordValue);  
//     }
    
    
//     function logOut() {
//         console.log("LogOut button clicked");
        
//         //////////////////////////////////// -  read cookies and get 'accessToken' value 
        
//         let cookiesString = document.cookie;
//         const cookiesArray = cookiesString.split('; ');
//         let cookies = {};
        
//         cookiesArray.forEach(function(c) {
//             let cookie = c.split('=');
//             cookies[cookie[0]] = cookie[1];
//         });
        
//         let accessToken = cookies.accessToken;
//         //console.log('accessToken: ', accessToken);
        
//         /////////////////////////////////// - end of reading cookies
        
        
//         /////////////////////////////////// - API call for 'LOGOUT'
        
//         $(function() {
//             $.ajax({
//                 url: 'https://ancient-caverns-16784.herokuapp.com/auth/logout',
//                 headers: {'x-auth-token': accessToken},
//                 type: "GET",
//                 success: function(response) {
//                     console.log('LogOUT -OK response: ', response);
                    
//                     showElements();

//                     // - do whatever you want to do after you are LOGGED-OUT
//                     // - deactivate ADD, EDIT & DELETE movie buttons
                    
//                 },
//                 error: function(response) {
//                     console.log('LogOut -ERROR response: ', response);
//                     alert("OOOOps. Something went wrong !!! Please try again.");
//                 },
//             }); // end of AJAX call
//         });  // end of jQuerry function
        
//         /////////////////////////////////// - end of API call for 'LOGOUT'
//     }
    
    
//     function register() {
//         console.log("Register button clicked");
        
//         const usernameValue = user.value;
//         const passwordValue = pass.value;
    
    
//         /////////////////////////////////// - API call for 'REGISTER'    
        
//         $(function() {
//             $.ajax({
//                 url: 'https://ancient-caverns-16784.herokuapp.com/auth/register',
//                 type: "POST",
//                 data: {
//                     username: usernameValue,
//                     password: passwordValue
//                 },
//                 contentType: 'application/x-www-form-urlencoded',
//                 success: function(response) {
//                     console.log('Register -OK response: ', response);
                    
//                     // set cookie with 'accessToken' value
//                     document.cookie = 'accessToken=' + response.accessToken;
                    
//                     hideElements();
                    
//                     // - do whatever you want to do after you are REGISTERED
//                     // - activate ADD, EDIT & DELETE movie buttons
                    
//                 },
//                 error: function(response) {
//                     console.log('Register -ERROR response: ', response);
//                     alert("OOOOps. 'Username' already assigned !!! Please try another 'Username'.");
                    
//                     // empty 'Username' and 'Password' fields
//                     user.value = '';
//                     pass.value = '';
//                 },
//             }); // end of AJAX call
//         });  // end of jQuerry function
    
//         /////////////////////////////////// - end of API call for 'REGISTER'
    
    
//         //console.log("username: ", usernameValue);
//         //console.log("password: ", passwordValue);   
//     }
    
    
//     function hideElements() {
//         logInButton.innerHTML = "LogOut";
//         logInButton.setAttribute('value', 'logOut');

//         for (let i=0; i<formElements.length; i++) {
//             formElements[i].style.display = 'none';
//         }
//         return;
//     }
    
    
//     function showElements() {
//         logInButton.innerHTML = "LogIn";
//         logInButton.setAttribute('value', 'logIn');
//         user.value = '';
//         pass.value = '';
        
//         for (let i=0; i<formElements.length; i++) {
//             formElements[i].style.display = 'initial';
//         }
//         return;
//     }


// }); //- end of load eventListener function




