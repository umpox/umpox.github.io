$(document).ready(function(){
    onPageLoad();
});

//Function used to grab data from the URL
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
    var box = document.getElementsByClassName('tyBlock');
    var y_cord, x_cord = 1;
    var max_x = '5', max_y = '5';
    var min_x = '1', min_y = '1';
    var aboveBox, belowBox, leftBox, rightBox;
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
    var nearbyBlocks = {};
    var currentBlockColor;
    var currentBlockStatus;
    var char;
    var totalBlocks;
    var gridY = 5;
    var gridX = 5;
    var mode = 'normal';
    var gridState = "";
    var startTime = null;
    
    gridY = Number(getQueryVariable('gridY'));
    gridX = Number(getQueryVariable('gridX'));
    mode = getQueryVariable('mode');
    gridState = JSON.parse("[" + getQueryVariable('gridState') + "]");

    var reCursor = function() {
        //Fix for A-Frames cursor problem
        //Recreates the cursor to update click handlers
        cursor.removeAttribute('raycaster');
        cursor.setAttribute('raycaster', 'objects: .clickable, .submitClick');
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

        if (height === 5 && width === 7) {
            max_x = '7';
            max_y = '5';
            originalVerticalDistance = -1.05;
            verticalDistance = originalVerticalDistance;
        }
        else if (height === 10 && width === 10) {
            max_x = '10';
            max_y = '10';
            originalVerticalDistance = -1.57;
            verticalDistance = originalVerticalDistance;
            originalHorizontalDistance = 3.4;
            horizontalDistance = originalHorizontalDistance;
        }

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

            for (var blockCount = 0; blockCount < totalBlocks; blockCount++) {
                if (gridState[blockCount] === 1) {
                    $('#grid').append('<a-box position="' + verticalDistance + ' ' + horizontalDistance  + ' -1.5"  rotation="0" width="0.3" height="0.3" depth="0.05" color="#1c1c1f"></a-box>');
                }
                else {
                    $('#grid').append('<a-box position="' + verticalDistance + ' ' + horizontalDistance  + ' -1.5"  rotation="0" width="0.3" height="0.3" depth="0.05" color="#dfe0e6"></a-box>');                   
                }

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
            cursor.setAttribute('visible', 'false');
            camera.setAttribute('rotation', '0');
            return;
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

    var removeAllBlocks = function() {
        $('.tyBlock').remove();
    };

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
        
        //Increment total moves stat
        totalMoves++;

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

        nearbyBlocks = {};
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
        window[functionString](submittedSequence, startTime);
        clearLeaderboard();
        loadLeaderboard();
    };

    var saveCreatedLetter = function() {
        var createdSequence  = [];
        var listOfBlocks = document.getElementsByClassName('tyBlock');
        var currentDate = new Date();
        var currentTime = currentDate.getTime().toString();

        for (countedBlocks = 0; countedBlocks < totalBlocks; countedBlocks++) {
            if (listOfBlocks[countedBlocks].getAttribute('active') === 'true') {
                createdSequence.push('1');
            }
            else if (listOfBlocks[countedBlocks].getAttribute('active') === 'false') {
                createdSequence.push('0');
            }
        }

        firebase.database().ref('submissions/' + currentTime).set({
            grid: createdSequence
        });

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

    var clearLeaderboard = function() {
        $('#leaderboardName').attr("value", '');
        $('#leaderboardTime').attr("value", '');        
    };

    var loadLeaderboard = function() {
        //Get data from database and display grids
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

    loadLeaderboard();

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

    var exitProgram = function() {
        window.location.href = "https://umpox.github.io";
    };

    var shareToTwitter = function() {
        window.location.href = 'https://twitter.com/intent/tweet?hashtags=TyBlocks&url=umpox.github.io&text=I just completed the letter ' + char + ' with a time of ' + seconds + ' seconds. Check it out at https://umpox.github.io #TyBlocks';
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
        else if (box[i].className === 'tyBlock'){
            box[i].setAttribute('color', '#dfe0e6');
        }
    }

    submitBtn.addEventListener('click', submitCreatedLetter, false);
    saveBtn.addEventListener('click', saveCreatedLetter, false);
    playAgainBtn.addEventListener('click', playAgain, false);    
    exitBtn.addEventListener('click', exitProgram, false);
    socialBtn.addEventListener('click', shareToTwitter, false);
};
