$(document).ready(function(){
    var box = document.getElementsByTagName('a-box');

    var changeColor = function() {
        this.setAttribute('color', 'green');
    };
    var returnColor = function() {
        this.setAttribute('color', '#4CC3D9');  
    };

    for (var i = 0; i < box.length; i++) {
        box[i].addEventListener('mouseenter', changeColor, false);
        box[i].addEventListener('mouseleave', returnColor, false);
    }
});