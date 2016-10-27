$(document).ready(function(){
    var box = document.getElementsByTagName('a-box');
    var y_cord, x_cord = 1;
    var max_x = '5';
    var max_y = '5';
    var min_x = '1';
    var min_y = '1';
    var aboveBox, belowBox, leftBox, rightBox;

    /*Auto execute function to set intial cube colours
    (function() {
        
    }) ();*/

    var changeColor = function() {
        //this.setAttribute('color', 'green');
        y_cord = this.getAttribute('y');
        x_cord = this.getAttribute('x');    

        //Determine if there is a box alongside current box, if so change its colour
        if (y_cord !== max_y) {
            aboveBox = document.querySelectorAll('[y="' + ( parseInt(y_cord)+1 ) + '"][x="' + x_cord + '"]');
            aboveBox[0].setAttribute('depth', '0.20');
        }
        if (y_cord !== min_y) {
            belowBox = document.querySelectorAll('[y="' + ( parseInt(y_cord) - 1 ) + '"][x="' + x_cord + '"]');
            belowBox[0].setAttribute('depth', '0.20');
        }
        if (x_cord !== min_x) {
            leftBox = document.querySelectorAll('[y="' + y_cord + '"][x="' + ( parseInt(x_cord) - 1 ) + '"]');
            leftBox[0].setAttribute('depth', '0.20');
        }
        if (x_cord !== max_x) {
            rightBox = document.querySelectorAll('[y="' + y_cord + '"][x="' + ( parseInt(x_cord) + 1 ) + '"]');
            rightBox[0].setAttribute('depth', '0.20');   
        }
    };

    var returnColor = function() {
        //this.setAttribute('color', '#4CC3D9');  

        //RESET SURROUNDING BOX VALUES
        aboveBox[0].setAttribute('depth', '0.05');
        belowBox[0].setAttribute('depth', '0.05');
        leftBox[0].setAttribute('depth', '0.05');
        rightBox[0].setAttribute('depth', '0.05');

        aboveBox, belowBox, leftBox, rightBox = null;
    };

    var highlightBlocks =  function(emptyBox) {
        y_cord = emptyBox.getAttribute('y');
        x_cord = emptyBox.getAttribute('x');    

        //Determine if there is a box alongside current box, if so change its colour
        if (y_cord !== max_y) {
            aboveBox = document.querySelectorAll('[y="' + ( parseInt(y_cord)+1 ) + '"][x="' + x_cord + '"]');
            aboveBox[0].innerHTML = '<a-animation dur="500" attribute="scale" direction="alternate-reverse" repeat="indefinite" to="1.1 1.1 1.1"></a-animation>';
        }
        if (y_cord !== min_y) {
            belowBox = document.querySelectorAll('[y="' + ( parseInt(y_cord) - 1 ) + '"][x="' + x_cord + '"]');
            belowBox[0].innerHTML = '<a-animation dur="500" attribute="scale" direction="alternate-reverse" repeat="indefinite" to="1.1 1.1 1.1"></a-animation>';
        }
        if (x_cord !== min_x) {
            leftBox = document.querySelectorAll('[y="' + y_cord + '"][x="' + ( parseInt(x_cord) - 1 ) + '"]');
            leftBox[0].innerHTML = '<a-animation dur="500" attribute="scale" direction="alternate-reverse" repeat="indefinite" to="1.1 1.1 1.1"></a-animation>';
        }
        if (x_cord !== max_x) {
            rightBox = document.querySelectorAll('[y="' + y_cord + '"][x="' + ( parseInt(x_cord) + 1 ) + '"]');
            rightBox[0].innerHTML = '<a-animation dur="500" attribute="scale" direction="alternate-reverse" repeat="indefinite" to="1.1 1.1 1.1"></a-animation>';
        }
    };

    //SET BLOCK STATES
    for (var i = 0; i < box.length; i++) {
        //Add mouse listeners
        //box[i].addEventListener('mouseenter', changeColor, false);
        //box[i].addEventListener('mouseleave', returnColor, false);

        if ( box[i].getAttribute('empty') === "true" ) {
            box[i].setAttribute('color', '#F1F7ED');
            highlightBlocks(box[i]);
        }
        else if ( box[i].getAttribute('active') === "true" ) {
            box[i].setAttribute('color', '#C05746');
        }
        else {
            box[i].setAttribute('color', '#747572');
        }
    }

});