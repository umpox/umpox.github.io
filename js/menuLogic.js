"use strict";
var navigateLogin = function() {
    $("#mainMenu").hide();
    $("#mainMenu-loginMenu").show();
};

var navigateRegister = function() {
    $("#mainMenu").hide();
    $("#mainMenu-registerMenu").show();  
};

var navigateFreePlay = function() {
    $("#mainMenu").hide(); 
    $("#controls").show();
};

var navigateModes = function() {
    $("#controls").hide();
    $("#modes").show();
};

var navigateGrids = function() {
    $("#modes").hide();
    $("#mainLogo").hide();
    $("#grids").show();
};

var navigateMenu = function() {
    $("#mainMenu").show();
    $("#mainMenu-registerMenu").hide();
    $("#mainMenu-loginMenu").hide();  
    $("#controls").hide();  

};

var navigateType = function() {
    $("#modes").hide();
    $("#controls").show();
}

var loginUser = function() {
    $("#mainMenu-loginMenu").hide();
    $("#controls").show();
};

var loadGame = function(x, y) {
    var text = encodeURI('VRgame.html#gridY=' + y + '&gridX=' + x);
    window.location.href = text;
}