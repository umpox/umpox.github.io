$(document).ready(function(){
    var box = document.getElementsByTagName('a-box');
    var y_cord, x_cord = 1;
    var max_x = '5', max_y = '5';
    var min_x = '1', min_y = '1';
    var aboveBox, belowBox, leftBox, rightBox;
    var cursor = document.getElementById('cursor');
    var nearbyBlocks = {};
    var currentBlockColor;


    var reCursor = function() {
        //Hacky fix for A-Frames cursor problem
        //Recreates the cursor to update click handlers
        cursor.removeAttribute('raycaster');
        cursor.setAttribute('raycaster', 'objects: .clickable');
    };

    var moveBlock = function(currentBlock) {
        //Get current block color used later to change the empty block color
        currentBlockColor = this.getAttribute("color");

        //Set the selected block to empty
        this.setAttribute('color', '#88898c');

        highlightBlocks(nearbyBlocks, false);
        calculateNearbyBlocks(this);

        /*Set the selected block 'empty' to true,
        keep this below calculateNearbyBlocks as the empty attribute
        is used to locate the empty block*/
        this.setAttribute('empty', 'true');
    };

    var calculateNearbyBlocks = function(currentBlock) {
        y_cord = currentBlock.getAttribute('y');
        x_cord = currentBlock.getAttribute('x');  

        //Calculate the nearby blocks based on HTML coordinates
        if (y_cord !== max_y) {
            nearbyBlocks.aboveBox = document.querySelectorAll('[y="' + ( parseInt(y_cord)+1 ) + '"][x="' + x_cord + '"]');
        }
        if (y_cord !== min_y) {
            nearbyBlocks.belowBox = document.querySelectorAll('[y="' + ( parseInt(y_cord) - 1 ) + '"][x="' + x_cord + '"]');
        }   
        if (x_cord !== min_x) {
            nearbyBlocks.leftBox = document.querySelectorAll('[y="' + y_cord + '"][x="' + ( parseInt(x_cord) - 1 ) + '"]');
        }
        if (x_cord !== max_x) {
            nearbyBlocks.rightBox = document.querySelectorAll('[y="' + y_cord + '"][x="' + ( parseInt(x_cord) + 1 ) + '"]');
        }

        highlightBlocks(nearbyBlocks, true);                   
     };

    var highlightBlocks =  function(nearbyBlocks, status) {
        //If status == true highlight blocks, if false unhighlight blocks   
        for (var block in nearbyBlocks){
            if (status === true) {
                nearbyBlocks[block][0].classList.add('clickable');
                nearbyBlocks[block][0].innerHTML = '<a-animation dur="500" attribute="scale" direction="alternate" repeat="indefinite" to="1.15 1.15 1.15"></a-animation>';
            }
            else {
                nearbyBlocks[block][0].classList.remove('clickable');
                //Slow animation smoothly
                nearbyBlocks[block][0].innerHTML = '<a-animation dur="50" attribute="scale" direction="normal" repeat="0" to="1 1 1"></a-animation>';               
            }

            //Change the colour of the empty block to the colour of the moved block
            if ( nearbyBlocks[block][0].hasAttribute("empty") ) {
                nearbyBlocks[block][0].setAttribute('color', currentBlockColor);
                nearbyBlocks[block][0].removeAttribute("empty");
            }
        }  
        reCursor();
    };

    //SET BLOCK STATES
    for (var i = 0; i < box.length; i++) {
        //Add mouse listeners
        box[i].addEventListener('click', moveBlock, false);        

        if ( box[i].getAttribute('empty') === "true" ) {
            box[i].setAttribute('color', '#88898c');
            calculateNearbyBlocks(box[i]);
        }
        else if ( box[i].getAttribute('active') === "true" ) {
            box[i].setAttribute('color', '#1c1c1f');
        }
        else {
            box[i].setAttribute('color', '#dfe0e6');
        }
    }
});


