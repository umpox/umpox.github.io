"use strict";
//Initialise user
var user = undefined;

//Called after a user has logged in via Google
firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
        // This gives you a Google Access Token.
        var token = result.credential.accessToken;
    }

    //Set user to the users email address
    user = result.user.email;

    //If the user was correctly found, display the logged in menu
    if (user !== null) {
        $("#mainMenu").hide();
        $("#modes").show();
        $("#logoutBtn").show();
        $("#adminLogin").hide();
    }
});

//Initial function called when user attempts to login with Google
var loginUserGoogle = function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
};

//Open login page
var navigateLogin = function() {
    $("#mainMenu").hide();
    $("#mainMenu-loginMenu").show();
    $("#adminLogin").hide();
};

//Open register page
var navigateRegister = function() {
    $("#mainMenu").hide();
    $("#mainMenu-registerMenu").show();
    $("#adminLogin").hide();
};

//Open freeplay page
var navigateFreePlay = function() {
    $("#mainMenu").hide(); 
    $("#controls").show();
    $("#adminLogin").hide();
};

//Open modes page
var navigateModes = function() {
    $("#controls").hide();
    $("#modes").show();
};

//Open grid selection page
var navigateGrids = function() {
    $("#modes").hide();
    $("#mainLogo").hide();
    $("#mainMenu").hide(); 
    $("#grids").show();
    $("#adminLogin").hide();
    $("#logoutBtn").hide();
};

//Open menu - used to navigate backwards
var navigateMenu = function() {
    $("#mainMenu").show();
    $("#mainMenu-registerMenu").hide();
    $("#mainMenu-loginMenu").hide();  
    $("#mainMenu-accountRecovery").hide();
    $("#modes").hide();
    $("#logoutBtn").hide();
    $("#adminLogin").show();
    $("#adminMenu-loginMenu").hide();
    $("#admin-Results").hide();
    $("#mainLogo").show();
    $("#grids").hide();
};

//Open controls page
var navigateType = function() {
    $("#modes").hide();
    $("#controls").show();
};

//Open admin page
var navigateAdmin = function() {
    $("#adminMenu-loginMenu").show();
    $("#adminLogin").hide();    
    $("#mainMenu").hide();
};

//Open forgot credentials page
var loadForgotCredential = function() {
    $("#mainMenu-loginMenu").hide();
    $("#mainMenu-accountRecovery").show();
};

//Function calls the firebase password reset API
//Uses the email that the user enters
var attemptAccountRecovery = function() {
    var emailInput = $("#accountRecovery-email").val();
    firebase.auth().sendPasswordResetEmail(emailInput);
};

//Function called to attempt manual login
var loginUser = function() {
    var loginEmail = document.getElementById('loginEmail');
    var loginPassword = document.getElementById('loginPassword');
    var loginError = document.getElementById('loginError');

    //Call firebase API using values entered in input fields
   firebase.auth().signInWithEmailAndPassword(loginEmail.value, loginPassword.value).then(function() {
        //If success:
        //Display logged in menu
        $("#mainMenu-loginMenu").hide();
        $("#modes").show();
        $("#adminLogin").hide();
        $("#logoutBtn").show();
        user = loginEmail.value;
    }).catch(function(error) {
        //If failure:
        //Display error
        loginError.innerHTML = error;
    });
};

//Function called to attempt admin login
var loginAdmin = function() {
    var adminPassword = document.getElementById('adminPassword');
    var adminError = document.getElementById('adminError');

   firebase.auth().signInWithEmailAndPassword('I.Mitchell@ljmu.ac.uk', adminPassword.value).then(function() {
        //If password is correct:
        //Display admin area
        var adminSpace = $('#adminSpace');
        $("#adminMenu-loginMenu").hide();
        $("#admin-Results").show();
        $("#adminLogin").hide();
        $("#mainLogo").hide();
        $("#mainMenu").hide(); 

        //Get data from database and display grids as buttons in admin space
        firebase.database().ref('/submissions/').once('value').then(function(snapshot) {
            for (var gridSpace in snapshot.val()) {
                //When a button is clicked, the VRGame is loaded in admin mode, using the submitted grid
                adminSpace.append('<button onclick="loadAdminGrid(' + gridSpace + ')" class="btn btn-default btn-lg btn-block">' + gridSpace + '</button><br>');
            }
        });
    }).catch(function(error) {
        //If password is incorrect:
        //Display error
        adminError.innerHTML = error;
    });       
};

//Function called when an admin clicks on a grid in the admin area
var loadAdminGrid = function(gridKey) {
    //Get grid array from database
    firebase.database().ref('/submissions/' + gridKey).once('value').then(function(snapshot) {

        //Calculate grid size and determine how the grid should be initialised
        /*
        Pass the created array to the function to generate the grid exactly as the 
        user submitted it
        */
        if (snapshot.val().grid.length === 25) {
            loadGame(5, 5, 'admin', snapshot.val().grid);
        }
        else if (snapshot.val().grid.length === 35) {
            loadGame(7, 5, 'admin', snapshot.val().grid);
        }
        else {
            loadGame(10, 10, 'admin', snapshot.val().grid);
        }

    });
};

//Function used to load the VRGame using specific values
var loadGame = function(x, y, mode, storedGrid) {
    //If no grid has been passed to recreate (i.e. admin mode)
    //Set it to empty
    if (storedGrid === undefined) {
        storedGrid = '';
    }

    //If a user has accessed this function without being logged in
    //Set username to anonymous for database interaction
    if (user === undefined) {
        user = 'anonymous';
    }
    else {
        //Else strip the domain from the email address and save as username
        //E.g user34@email1.com becomes user34
        //Store username as lowercase for database consistency
        user = user.split('@')[0].toLowerCase();
    }

    //Create a custom URL using the passed in values
    var text = encodeURI('VRgame.html?gridY=' + y + '&gridX=' + x + '&mode=' + mode + '&user=' + user + '&gridState=' + storedGrid);
    
    //Load the created URL
    window.location.href = text;
};

//Called when a user attempts to create a new account
var registerUser = function() {
    var registerEmail = document.getElementById('registerEmail');
    var registerPassword = document.getElementById('registerPassword');
    var registerError = document.getElementById('registerError');
    var registerSuccess = document.getElementById('registerSuccess');

    //Query firebase to create a new account using inputted values
   firebase.auth().createUserWithEmailAndPassword(registerEmail.value, registerPassword.value).then(function() {
        //If success:
        //Display success message
        $("#registerError").hide();
        $("#registerSuccess").show();
        registerSuccess.innerHTML = 'You have successfully created a new account. Please attempt to login.';
    }).catch(function(error) {
        //If error:
        //Display error message
        $("#registerSuccess").hide();
        $("#registerError").show();
        registerError.innerHTML = error;
    });
};

//Called when a user clicks the 'logout' button
var signOut = function() {
    firebase.auth().signOut().then(function() {
        location.reload();
    }, function(error) {

    });
};