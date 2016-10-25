$(document).ready(function(){
    var box = document.getElementsByTagName('a-box');
    var y_cord, x_cord = 1;
    var max_x = '5';
    var max_y = '5';
    var min_x = '1';
    var min_y = '1';
    var aboveBox, belowBox, leftBox, rightBox;

    var changeColor = function() {
        this.setAttribute('color', 'green');
        y_cord = this.getAttribute('y');
        x_cord = this.getAttribute('x');    

        //Determine if there is a box alongside current box, if so change its colour
        if (y_cord !== max_y) {
            aboveBox = document.querySelectorAll('[y="' + ( parseInt(y_cord)+1 ) + '"][x="' + x_cord + '"]');
            aboveBox[0].setAttribute('color', 'red');
        }
        if (y_cord !== min_y) {
            belowBox = document.querySelectorAll('[y="' + ( parseInt(y_cord) - 1 ) + '"][x="' + x_cord + '"]');
            belowBox[0].setAttribute('color', 'red');
        }
        if (x_cord !== min_x) {
            leftBox = document.querySelectorAll('[y="' + y_cord + '"][x="' + ( parseInt(x_cord) - 1 ) + '"]');
            leftBox[0].setAttribute('color', 'red');
        }
        if (x_cord !== max_x) {
            rightBox = document.querySelectorAll('[y="' + y_cord + '"][x="' + ( parseInt(x_cord) + 1 ) + '"]');
            rightBox[0].setAttribute('color', 'red');   
        }
    };

    var returnColor = function() {
        this.setAttribute('color', '#4CC3D9');  

        //RESET SURROUNDING BOX VALUES
        aboveBox[0].setAttribute('color', '#4CC3D9');
        belowBox[0].setAttribute('color', '#4CC3D9');
        leftBox[0].setAttribute('color', '#4CC3D9');
        rightBox[0].setAttribute('color', '#4CC3D9');

        aboveBox, belowBox, leftBox, rightBox = null;
    };

    for (var i = 0; i < box.length; i++) {
        box[i].addEventListener('mouseenter', changeColor, false);
        box[i].addEventListener('mouseleave', returnColor, false);
    }
});