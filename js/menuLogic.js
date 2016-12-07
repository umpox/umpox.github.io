"use strict";
var navigateLogin = function() {
    $("#mainMenu").hide();
    $("#mainMenu-loginMenu").show();
};

var navigateRegister = function() {
    $("#mainMenu").hide();
    $("#mainMenu-registerMenu").show();  
};

var navigateMenu = function() {
    $("#mainMenu").show();
    $("#mainMenu-registerMenu").hide();
    $("#mainMenu-loginMenu").hide();  
};

var loginUser = function() {
    $("#mainMenu-loginMenu").hide();
    $("#controls").show();
};