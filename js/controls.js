$(document).ready(function(){
    //Call the main code on page load
    onPageLoad();
});

//Function used through the program to grab data from the URL
var getQueryVariable = function(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
    }
    return(false);
};

var onPageLoad = function() {
    //Save all blocks in the puzzle in box variable
    var box = document.getElementsByClassName('tyBlock');

    //Default values for grid blocks
    //Sets grey block as the top left block
    //Sets default grid size as 5x5
    var y_cord, x_cord = 1;
    var max_x = '5', max_y = '5';
    var min_x = '1', min_y = '1';
    var gridY = 5;
    var gridX = 5;

    //Save A-Frame elements as variables to use throughout code 
    var cursor = document.getElementById('cursor');
    var camera = document.getElementById('3DCam');
    var submitBtn = document.getElementById('submitBtn');
    var submitTxt = document.getElementById('submitTxt');
    var saveBtn = document.getElementById('saveBtn');
    var saveTxt = document.getElementById('saveTxt');
    var playAgainBtn = document.getElementById('playAgainBtn');
    var exitBtn = document.getElementById('exitBtn');
    var socialBtn = document.getElementById('socialBtn');
    var letterImage = document.getElementById('letter');
    var leaderboardSpace = document.getElementById('leaderboard');
    var instructionSpace = document.getElementById('instructions');
    var successArea = document.getElementById('success');

    //Variables to store data about blocks on the grid
    var nearbyBlocks = {};
    var totalBlocks;
    var aboveBox, belowBox, leftBox, rightBox;
    var currentBlockColor;
    var currentBlockStatus;

    //Variables to store data about the state of the game
    var char;
    var mode = 'normal';
    var gridState = "";
    var startTime = null;
    
    //Initalise variables from URL to set game state
    gridY = Number(getQueryVariable('gridY'));
    gridX = Number(getQueryVariable('gridX'));
    mode = getQueryVariable('mode');
    //Grid state used to read in a grid state from the URL - used for admin mode
    gridState = JSON.parse("[" + getQueryVariable('gridState') + "]");

    var reCursor = function() {
        //Fix for A-Frames cursor problem
        //Recreates the cursor to update click handlers
        cursor.removeAttribute('raycaster');
        cursor.setAttribute('raycaster', 'objects: .clickable, .submitClick');
    };

    //Function used to generate a random array of a defined length
    //Used to generate a random grid
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

    //Function generates the grid
    var generateBlocks = function(height, width) {

        /*
        Use height and width parameters to calculate
        number of blocks needed
        */
        totalBlocks = height * width;
        var y = height;
        var x = width;

        //Variables used to store the positioning of the block
        var verticalDistance = -0.7;
        var originalVerticalDistance = -0.7;
        var horizontalDistance = 2.4;
        var originalHorizontalDistance = 2.4;

        //Variables used to differentiate between empty blocks and black boxs
        var attributeEmpty = true;
        var attributeActive = false;

        /*
        Generate random array of 11 numbers to assign to 
        the black blocks in the grid
        */
        var randomActiveBlocks = generateRandomArray(11, totalBlocks);

        //If the grid is 5x7 then adjust the UI to recenter the blocks
        if (height === 5 && width === 7) {
            max_x = '7';
            max_y = '5';
            originalVerticalDistance = -1.05;
            verticalDistance = originalVerticalDistance;
        }
        //If the grid is 10x10 then adjust the UI to recenter the blocks
        else if (height === 10 && width === 10) {
            max_x = '10';
            max_y = '10';
            originalVerticalDistance = -1.57;
            verticalDistance = originalVerticalDistance;
            originalHorizontalDistance = 3.4;
            horizontalDistance = originalHorizontalDistance;
        }

        //If in normal mode then adjust the user interface
        if (mode === 'normal') {
            letterImage.setAttribute('visible', false);
            leaderboardSpace.setAttribute('visible', false);
            submitBtn.setAttribute('visible', false);
            submitTxt.setAttribute('visible', false);
            saveBtn.setAttribute('visible', true);
            saveTxt.setAttribute('visible', true);
            $('#instructionGoal').attr('value', 'Goal: Rearrange the blocks behind you\n to create a letter.');
            $('#instructionPointTwo').attr('value', "2. When you are satisfied with your newly\n created letter, place the red cursor\n over the 'Save' button.");
            $('#leaderboardTitle').attr('visible', 'false');
            $('#leaderboardColumns').attr('visible', 'false');
            $('#leaderboardName').attr('visible', 'false');
            $('#leaderboardTime').attr('visible', 'false');  
        }

        //If in admin mode then adjust the user interface
        if (mode === 'admin' && gridState.length > 0) {
            letterImage.setAttribute('visible', false);
            leaderboardSpace.setAttribute('visible', false);
            submitBtn.setAttribute('visible', false);
            submitTxt.setAttribute('visible', false);
            saveBtn.setAttribute('visible', false);
            saveTxt.setAttribute('visible', false); 

            $('#instructions').attr('visible', 'false');
            $('#instructionTitle').attr('visible', 'false');
            $('#instructionGoal').attr('visible', 'false');
            $('#instructionPointOne').attr('visible', 'false');
            $('#instructionPointTwo').attr('visible', 'false');
            $('#instructionPointThree').attr('visible', 'false');

            $('#leaderboardTitle').attr('visible', 'false');
            $('#leaderboardColumns').attr('visible', 'false');
            $('#leaderboardName').attr('visible', 'false');
            $('#leaderboardTime').attr('visible', 'false');                  

            //Loop through the provided grid and display on the canvas
            for (var blockCount = 0; blockCount < totalBlocks; blockCount++) {
                //If the array provides a [1], paint a black block
                if (gridState[blockCount] === 1) {
                    $('#grid').append('<a-box position="' + verticalDistance + ' ' + horizontalDistance  + ' -1.5"  rotation="0" width="0.3" height="0.3" depth="0.05" color="#1c1c1f"></a-box>');
                }
                //Else paint a white block
                else {
                    $('#grid').append('<a-box position="' + verticalDistance + ' ' + horizontalDistance  + ' -1.5"  rotation="0" width="0.3" height="0.3" depth="0.05" color="#dfe0e6"></a-box>');                   
                }

                /*
                If the grid reaches the end of a row,
                move to the next line of the grid and,
                restart on the first block in X coord
                */ 
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
            
            //Hide cursor as not needed in admin mode
            cursor.setAttribute('visible', 'false');
            camera.setAttribute('rotation', '0');

            //End program execution
            return;
        }
        /* END OF ADMIN MODE CODE */


        //Loop through until totalBlocks number is met
        for (var blockCount = 0; blockCount < totalBlocks; blockCount++) {

            /*
            If current blocknumber is specified to be black
            in the randomly generated array, set the attribute
            'active' of the element to true
            */
            if($.inArray(blockCount, randomActiveBlocks) > -1) {
                attributeActive = true;
            }

            //Add a block element to the grid
            $('#grid').append('<a-box class="tyBlock" active="' + attributeActive + '" empty="' + attributeEmpty + '" y="' + y + '" x="' + x + '" position="' + verticalDistance + ' ' + horizontalDistance  + ' -1.5" rotation="0" width="0.3" height="0.3" depth="0.05"></a-box>');
            
            //Reset values for next iteration
            attributeEmpty = false;
            attributeActive = false;   

            /*
            If the grid reaches the end of a row,
            move to the next line of the grid and,
            restart on the first block in X coord
            */             
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
    //Immediately generate blocks using grids coords from URL
    generateBlocks(gridY, gridX);

    //Function used to remove all block elements when called
    var removeAllBlocks = function() {
        $('.tyBlock').remove();
    };

    //Function called whenever a flashing block is clicked
    var moveBlock = function(currentBlock) {
        //First check that the current block has 'clickable'
        //Used for bugs in FireFox and Safari
        if (!currentBlock.target.classList.contains('clickable')) {
            return;
        }

        //Start the timer if it is not already started
        if (startTime === null) {
            startTime = new Date();
        }
        
        //Increment total moves statistc
        totalMoves++;

        //Get current block color used later to change the empty block color
        currentBlockColor = this.getAttribute("color");
        currentBlockStatus = this.getAttribute("active");

        //Set the selected block to empty
        this.setAttribute('color', '#88898c');

        //Function to animate nearby blocks that can be clicked
        highlightBlocks(nearbyBlocks, false);
        //Recalculate nearby blocks using the new empty block
        calculateNearbyBlocks(this);

        /*
        Set the selected block 'empty' to true,
        keep this below calculateNearbyBlocks as the empty attribute
        is used to locate the empty block
        */
        this.setAttribute('empty', 'true');
        this.setAttribute('active', 'false');
    };

    /*
    Generate a random letter goal for challenge mode
    */
    var generateLetterAssignment = function() {
        var availableChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        char = availableChars.charAt(Math.floor(Math.random() * availableChars.length));

        //Calculate image path
        document.getElementById("currentLetter").src = "resources/completeLetters/" + char + ".png";
    };
    //Immediately generate and display the letter for challenge mode
    generateLetterAssignment();


    /*
    Function used to calculate available blocks 
    that can move into the empty block
    */
    var calculateNearbyBlocks = function(currentBlock) {
        //Get current block coordinates
        y_cord = currentBlock.getAttribute('y');
        x_cord = currentBlock.getAttribute('x');  

        //Ensure no nearbyBlocks 
        nearbyBlocks = {};

        //Calculate the nearby blocks based on HTML coordinates
        if (y_cord !== max_y && y_cord !== 5) {
            nearbyBlocks.aboveBox = document.querySelectorAll('[y="' + ( parseInt(y_cord)+1 ) + '"][x="' + x_cord + '"]');
        }
        if (y_cord !== min_y && y_cord !== 1) {
            nearbyBlocks.belowBox = document.querySelectorAll('[y="' + ( parseInt(y_cord) - 1 ) + '"][x="' + x_cord + '"]');
        }   
        if (x_cord !== min_x && x_cord !== 1) {
            nearbyBlocks.rightBox = document.querySelectorAll('[y="' + y_cord + '"][x="' + ( parseInt(x_cord) - 1 ) + '"]');
        }
        if (x_cord !== max_x && x_cord !== 5) {
            nearbyBlocks.leftBox = document.querySelectorAll('[y="' + y_cord + '"][x="' + ( parseInt(x_cord) + 1 ) + '"]');
        }

        /*
        Animate the nearbyblocks so that the user knows 
        which ones they can interact with
        */
        highlightBlocks(nearbyBlocks, true);                   
     };

    /*
    Function to take in an object and 
    either begin animation or disable animation
    */
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

        nearbyBlocks = {};
        //Reload cursor
        reCursor();
    };

    //Function to query created letter in challenge mode
    var submitCreatedLetter = function() {
        var submittedSequence = [];
        var functionString;
        var letterFunction;
        var listOfBlocks = document.getElementsByClassName('tyBlock');

        /*Loop through grid and create array, 
        1 in array = black,
        0 in array = white or empty
        */
        for (countedBlocks = 0; countedBlocks < totalBlocks; countedBlocks++) {
            if (listOfBlocks[countedBlocks].getAttribute('active') === 'true') {
                submittedSequence.push('1');
            }
            else if (listOfBlocks[countedBlocks].getAttribute('active') === 'false') {
                submittedSequence.push('0');
            }
        }

        /*
        Create custom function and call it
        function are available to view in letterAlgorithms.js
        Pass in created array to function
        */
        functionString = "algorithm" + char;      
        window[functionString](submittedSequence, startTime);

        //Reload the leaderboard
        clearLeaderboard();
        loadLeaderboard();
    };

    //Function used to submit a new design for a letter in normal mode
    var saveCreatedLetter = function() {
        var createdSequence  = [];
        var listOfBlocks = document.getElementsByClassName('tyBlock');
        var currentDate = new Date();
        var currentTime = currentDate.getTime().toString();

        /*Loop through grid and create array, 
        1 in array = black,
        0 in array = white or empty
        */        
        for (countedBlocks = 0; countedBlocks < totalBlocks; countedBlocks++) {
            if (listOfBlocks[countedBlocks].getAttribute('active') === 'true') {
                createdSequence.push('1');
            }
            else if (listOfBlocks[countedBlocks].getAttribute('active') === 'false') {
                createdSequence.push('0');
            }
        }

        //Submit letter array to database path 'submissions'
        firebase.database().ref('submissions/' + currentTime).set({
            grid: createdSequence
        });

        //Change Save button colour for 750ms
        /*
        Used to signify to the user that they successfully submited
        Their design
        */
        saveBtn.setAttribute('color', 'green');
        saveTxt.setAttribute('value', 'Saved!');
        saveTxt.setAttribute('position', '2.3 1.6 -0.85');
        setTimeout(
            function(){
                saveBtn.setAttribute('color', 'white');
                saveTxt.setAttribute('value', 'Save');
                saveTxt.setAttribute('position', '2.3 1.6 -0.70');
            }, 750);
    };

    //Function to reset leaderboard values
    var clearLeaderboard = function() {
        $('#leaderboardName').attr("value", '');
        $('#leaderboardTime').attr("value", '');        
    };

    //Function to query database and return leaderboard values
    var loadLeaderboard = function() {

        //Get stats data from database and display in VR
        firebase.database().ref('/stats/' + char).once('value').then(function(snapshot) {

            //Sort the data from the database by time
            var sortedData = [];
            for (var stat in snapshot.val() ) {
                sortedData.push([stat, snapshot.val()[stat].time]);
            }

            sortedData.sort(function(a, b) {
                return a[1] - b[1];
            });

            //Print data to leaderboard
            for (var data in sortedData){
                $('#leaderboardName').attr("value", function() { return $(this).attr("value") + sortedData[data][0].split('@')[0] + '\n'; });
                $('#leaderboardTime').attr("value", function() { return $(this).attr("value") + sortedData[data][1] + '\n'; });                
            }
        });
    };
    //Immediately load the leaderboard
    loadLeaderboard();


    //Function used to regenerate the grid if a user wants to play again
    var playAgain = function() {
        //Hide success area
        $('#success').attr('visible', 'false');
        $('#successTitle').attr('visible', 'false');
        $('#successText').attr('visible', 'false');
        $('#successStatsTitle').attr('visible', 'false');
        $('#successStatsTime').attr('visible', 'false');
        $('#successStatsMoves').attr('visible', 'false');        
        $('#playAgainBtn').attr('visible', 'false');
        $('#playAgainTxt').attr('visible', 'false');
        $('#socialBtn').attr('visible', 'false');
        $('#socialBtnTxt').attr('visible', 'false');
        $('#socialBtnWarn').attr('visible', 'false');
        $('#exitBtn').attr('visible', 'false');
        $('#exitBtnText').attr('visible', 'false');
        $('#exitBtnWarn').attr('visible', 'false');

        //Rescramble blocks     
        removeAllBlocks(); 

        //Rerun the entire script  
        onPageLoad();
    };

    //Exit program - defined as return to main menu
    var exitProgram = function() {
        window.location.href = "https://umpox.github.io";
    };

    //Loads a tweet page with a preset tweet
    //Tweet contains letter in challenge mode and the users time
    var shareToTwitter = function() {
        window.location.href = 'https://twitter.com/intent/tweet?hashtags=TyBlocks&url=umpox.github.io&text=I just completed the letter ' + char + ' with a time of ' + seconds + ' seconds. Check it out at https://umpox.github.io #TyBlocks';
    };

    //Code runs after grid has been initialised
    //Loop through the created blocks in grid
    for (var i = 0; i < box.length; i++) {
        //Add click listeners to all blocks
        box[i].addEventListener('click', moveBlock, false);        

        //If current block is 'empty'
        //Set colour to grey
        //Calculate nearbyblocks that can move into empty block
        if ( box[i].getAttribute('empty') === "true" ) {
            box[i].setAttribute('color', '#88898c');
            calculateNearbyBlocks(box[i]);
        }
        //Else if current block is 'active'
        //Set colour to black
        else if ( box[i].getAttribute('active') === "true" ) {
            box[i].setAttribute('color', '#1c1c1f');
        }
        //Else set block colour to white
        else if (box[i].className === 'tyBlock'){
            box[i].setAttribute('color', '#dfe0e6');
        }
    }

    //Add event listeners to buttons in the VR inteface
    submitBtn.addEventListener('click', submitCreatedLetter, false);
    saveBtn.addEventListener('click', saveCreatedLetter, false);
    playAgainBtn.addEventListener('click', playAgain, false);    
    exitBtn.addEventListener('click', exitProgram, false);
    socialBtn.addEventListener('click', shareToTwitter, false);
};
