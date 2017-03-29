$(document).ready(function(){
    var box = document.getElementsByTagName('a-box');
    var y_cord, x_cord = 1;
    var max_x = '5', max_y = '5';
    var min_x = '1', min_y = '1';
    var aboveBox, belowBox, leftBox, rightBox;
    var cursor = document.getElementById('cursor');
    var submitBtn = document.getElementById('submitBtn');
    var submitTxt = document.getElementById('submitTxt');
    var letterImage = document.getElementById('letter');
    var leaderboardSpace = document.getElementById('leaderboard');
    var nearbyBlocks = {};
    var currentBlockColor;
    var currentBlockStatus;
    var char;
    var totalBlocks;

    var getQueryVariable = function(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
                var pair = vars[i].split("=");
                if(pair[0] == variable){return pair[1];}
        }
        return(false);
    };

    var gridY = Number(getQueryVariable('gridY'));
    var gridX = Number(getQueryVariable('gridX'));

    var reCursor = function() {
        //Hacky fix for A-Frames cursor problem
        //Recreates the cursor to update click handlers
        cursor.removeAttribute('raycaster');
        cursor.setAttribute('raycaster', 'objects: .clickable');
    };

    var generateRandomArray = function(length, totalBlocks) {
        var arr = [];
        while(arr.length < length){
            var randomnumber = Math.floor(Math.random()*totalBlocks);
            if (randomnumber === 0) {
                randomnumber++;
            }
            if(arr.indexOf(randomnumber) > -1) continue;
            arr[arr.length] = randomnumber;
        }
        return arr;
    };

    var generateBlocks = function(height, width) {
        totalBlocks = height * width;
        var y = height;
        var x = width;

        var verticalDistance = -0.7;
        var originalVerticalDistance = -0.7;

        var horizontalDistance = 2.4;
        var originalHorizontalDistance = 2.4;

        var emptyBlockNum = parseInt( Math.random() * totalBlocks );
        var attributeEmpty = true;
        var attributeActive = false;
        var activeBlockNum = 11;

        //Generate random array of 11 numbers to assign to the black boxes
        var randomActiveBlocks = generateRandomArray(11, totalBlocks);

        if (height === 5 && width === 7) {
            max_x = '7';
            max_y = '5';
            originalVerticalDistance = -1.05;
            verticalDistance = originalVerticalDistance;
            letterImage.setAttribute('visible', false);
            leaderboardSpace.setAttribute('visible', false);
            submitBtn.setAttribute('visible', false);
            submitTxt.setAttribute('visible', false);
        }
        else if (height === 10 && width === 10) {
            max_x = '10';
            max_y = '10';
            originalVerticalDistance = -1.57;
            verticalDistance = originalVerticalDistance;
            originalHorizontalDistance = 3.4;
            horizontalDistance = originalHorizontalDistance;
            letterImage.setAttribute('visible', false);
            leaderboardSpace.setAttribute('visible', false);
            submitBtn.setAttribute('visible', false);
            submitTxt.setAttribute('visible', false);
        }

        for (var blockCount = 0; blockCount < totalBlocks; blockCount++) {

            if($.inArray(blockCount, randomActiveBlocks) > -1) {
                attributeActive = true;
            }

            $('#grid').append('<a-box class="tyBlock" active="' + attributeActive + '" empty="' + attributeEmpty + '" y="' + y + '" x="' + x + '" position="' + verticalDistance + ' ' + horizontalDistance  + ' -1.5" rotation="0" width="0.3" height="0.3" depth="0.05"></a-box>');
            attributeEmpty = false;
            attributeActive = false;   

            if (x === 1) {
                x = width;
                y = y-1;
                horizontalDistance = parseFloat( (horizontalDistance - 0.4).toFixed(2) );
                verticalDistance = originalVerticalDistance;
            }
            else {
                x = x-1;
                verticalDistance = parseFloat( (verticalDistance + 0.35).toFixed(2) );
            }

        } 

    };

    generateBlocks(gridY, gridX);

    var moveBlock = function(currentBlock) {
        //Get current block color used later to change the empty block color
        currentBlockColor = this.getAttribute("color");
        currentBlockStatus = this.getAttribute("active");

        //Set the selected block to empty
        this.setAttribute('color', '#88898c');

        highlightBlocks(nearbyBlocks, false);
        calculateNearbyBlocks(this);

        /*Set the selected block 'empty' to true,
        keep this below calculateNearbyBlocks as the empty attribute
        is used to locate the empty block*/
        this.setAttribute('empty', 'true');
        this.setAttribute('active', 'false');
    };

    var generateLetterAssignment = function() {
        var availableChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        char = availableChars.charAt(Math.floor(Math.random() * availableChars.length));
        document.getElementById("currentLetter").src = "resources/completeLetters/" + char + ".png";
    };

     generateLetterAssignment();


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
            nearbyBlocks.rightBox = document.querySelectorAll('[y="' + y_cord + '"][x="' + ( parseInt(x_cord) - 1 ) + '"]');
        }
        if (x_cord !== max_x) {
            nearbyBlocks.leftBox = document.querySelectorAll('[y="' + y_cord + '"][x="' + ( parseInt(x_cord) + 1 ) + '"]');
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
            if ( nearbyBlocks[block][0].getAttribute("empty") === "true" ) {
                nearbyBlocks[block][0].setAttribute('color', currentBlockColor);
                nearbyBlocks[block][0].setAttribute('active', currentBlockStatus);
                nearbyBlocks[block][0].removeAttribute("empty");
            }
        }  
        reCursor();
    };

    var submitCreatedLetter = function() {
        var submittedSequence = [];
        var functionString;
        var letterFunction;
        var listOfBlocks = document.getElementsByClassName('tyBlock');

        for (countedBlocks = 0; countedBlocks < totalBlocks; countedBlocks++) {
            if (listOfBlocks[countedBlocks].getAttribute('active') === 'true') {
                submittedSequence.push('1');
            }
            else if (listOfBlocks[countedBlocks].getAttribute('active') === 'false') {
                submittedSequence.push('0');
            }
        }

        functionString = "algorithm" + char;
        letterFunction = window[functionString](submittedSequence);

        if (typeof letterFunction === "function") {
            letterFunction();
        }
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

    submitBtn.addEventListener('click', submitCreatedLetter, false);

});

