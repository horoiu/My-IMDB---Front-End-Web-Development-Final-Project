let logInCheck = () => {
    event.preventDefault();

    //get values of username and password fields
    const user = document.getElementById('user-field');
    const username = user.value;
    const pass = document.getElementById('pass-field');
    const password = pass.value;
    
    // check if username field is emppty and add or remove 'error' class
    if (username == "") {
        user.classList.add('error');
    } else {
        user.classList.remove('error');
    }

    // check if password field is emppty and add or remove 'error' class
    if (password == "") {
        pass.classList.add('error');
    } else {
        pass.classList.remove('error');
    }

    //if username and password fields are not empty, run 'logIn' function
    if (username != "" && password != "") {
        logIn();
    }
    return;
};


let registerCheck = () => {
    event.preventDefault();

    //get values of username and password fields
    const user = document.getElementById('user-field');
    const username = user.value;
    const pass = document.getElementById('pass-field');
    const password = pass.value;
    
    // check if username field is emppty and add or remove 'error' class
    if (username == "") {
        user.classList.add('error');
    } else {
        user.classList.remove('error');
    }

    // check if password field is emppty and add or remove 'error' class
    if (password == "") {
        pass.classList.add('error');
    } else {
        pass.classList.remove('error');
    }

    //if username and password fields are not empty, run 'register' function
    if (username != "" && password != "") {
        register();
    }
    return;
};


let logIn = () => {
    console.log("LogIn button clicked");
    
    const user = document.getElementById('user-field');
    const usernameValue = user.value;
    const pass = document.getElementById('pass-field');
    const passwordValue = pass.value;
    const logInButton = document.getElementById('logIn');
    const registerButton = document.getElementById('register');

///////////////////////////////////

    $(function() {
        
        $.ajax({
            url: 'https://ancient-caverns-16784.herokuapp.com/auth/login',
            type: "POST",
            data: {
                username: usernameValue,
                password: passwordValue
            },
            contentType: 'application/x-www-form-urlencoded',
            success: function(response) {
                console.log(response);
                console.log(response.accessToken);
                logInButton.innerHTML = "LogOut";
                registerButton.classList.add('disabled');
                logOut(response.accessToken);
            },
        });
    });  // end of jQuerry function

///////////////////////////////////


    console.log("username: ", usernameValue);
    console.log("password: ", passwordValue);  
};


let logOut = (id) => {
    
    
    ///////////////////////////////////

    $(function() {
        
        $.ajax({
            url: 'https://ancient-caverns-16784.herokuapp.com/auth/logout',
            type: "GET",
            data: { 
                id
            },
            contentType: 'application/x-www-form-urlencoded',
            success: function(response) {
                console.log(response);
                // logInButton.innerHTML = "LogOut";
                // registerButton.classList.add('disabled');
                // logOut();
            },
        });
    });  // end of jQuerry function
    
    ///////////////////////////////////
    
};


let register = () => {
    console.log("Register button clicked");
    
    const user = document.getElementById('user-field');
    const usernameValue = user.value;
    const pass = document.getElementById('pass-field');
    const passwordValue = pass.value;

///////////////////////////////////    
    
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
                console.log(response);
            },
        });
    });  // end of jQuerry function

///////////////////////////////////

    console.log("username: ", usernameValue);
    console.log("password: ", passwordValue);   
};



















    
    /////////////////////////////////// - pt logIn
    
        // fetch('https://ancient-caverns-16784.herokuapp.com/auth/login', {
        //     method: "POST",
        //     headers: {
        //       'Accept': 'application/json, text/plain, */*',
        //       'Content-Type': 'application/x-www-form-urlencoded',
        //     },
          
        //     //serializing JSON body
        //     body: JSON.stringify({
        //       username: usernameValue,
        //       password: passwordValue,
        //     })
        //   })
        //   .then( (response) => { 
        //      //do something awesome that makes the world a better place
        //      console.log(response);
        //   });
    
    //////////////////////////////////