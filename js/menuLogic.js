"use strict";
var user = undefined;
// Using a redirect.
firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
        // This gives you a Google Access Token.
        var token = result.credential.accessToken;
    }
    user = result.user;

    if (user !== null) {
        $("#mainMenu").hide();
        $("#modes").show();
        $("#logoutBtn").show();
    }
});

var navigateLogin = function() {
    $("#mainMenu").hide();
    $("#mainMenu-loginMenu").show();
    $("#adminLogin").hide();
};

var navigateRegister = function() {
    $("#mainMenu").hide();
    $("#mainMenu-registerMenu").show();
    $("#adminLogin").hide();
};

var navigateFreePlay = function() {
    $("#mainMenu").hide(); 
    $("#controls").show();
    $("#adminLogin").hide();
};

var navigateModes = function() {
    $("#controls").hide();
    $("#modes").show();
};

var navigateGrids = function() {
    $("#modes").hide();
    $("#mainLogo").hide();
    $("#mainMenu").hide(); 
    $("#grids").show();
};

var navigateMenu = function() {
    $("#mainMenu").show();
    $("#mainMenu-registerMenu").hide();
    $("#mainMenu-loginMenu").hide();  
    $("#mainMenu-accountRecovery").hide();
    $("#modes").hide();
    $("#logoutBtn").hide();
    $("#adminLogin").show();
    $("#adminMenu-loginMenu").hide();
};

var navigateType = function() {
    $("#modes").hide();
    $("#controls").show();
};

var navigateAdmin = function() {
    $("#adminMenu-loginMenu").show();
    $("#mainMenu").hide();
};

var loadForgotCredential = function() {
    $("#mainMenu-loginMenu").hide();
    $("#mainMenu-accountRecovery").show();
};

var attemptAccountRecovery = function() {
    var emailInput = $("#accountRecovery-email").val();
    firebase.auth().sendPasswordResetEmail(emailInput);
};

var loginUser = function() {
    var loginEmail = document.getElementById('loginEmail');
    var loginPassword = document.getElementById('loginPassword');
    var loginError = document.getElementById('loginError');

   firebase.auth().signInWithEmailAndPassword(loginEmail.value, loginPassword.value).then(function() {
        $("#mainMenu-loginMenu").hide();
        $("#modes").show();
        $("#logoutBtn").show();
    }).catch(function(error) {
        loginError.innerHTML = error;
    });
};

var loginAdmin = function() {
    var loginPassword = document.getElementById('adminPassword');
    var loginError = document.getElementById('adminError');

        console.log('test1');


   firebase.auth().signInWithEmailAndPassword('I.Mitchell@ljmu.ac.uk', loginPassword.value).then(function() {
        $("#adminMenu-loginMenu").hide();
        console.log('test');
    }).catch(function(error) {
        loginError.innerHTML = error;
    });       
}

var loginUserGoogle = function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
};

var registerUser = function() {
    var registerEmail = document.getElementById('registerEmail');
    var registerPassword = document.getElementById('registerPassword');
    var registerError = document.getElementById('registerError');
    var registerSuccess = document.getElementById('registerSuccess');

   firebase.auth().createUserWithEmailAndPassword(registerEmail.value, registerPassword.value).then(function() {
        $("#registerError").hide();
        $("#registerSuccess").show();
        registerSuccess.innerHTML = 'You have successfully created a new account. Please attempt to login.';
    }).catch(function(error) {
        $("#registerSuccess").hide();
        $("#registerError").show();
        registerError.innerHTML = error;
    });
};

var loadGame = function(x, y, mode) {
    var text = encodeURI('VRgame.html?gridY=' + y + '&gridX=' + x + '&mode=' + mode);
    window.location.href = text;
};

var signOut = function() {
    firebase.auth().signOut().then(function() {
        location.reload();
    }, function(error) {

    });
};