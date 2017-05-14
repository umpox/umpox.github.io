/*
This code has specific grid arrays in each function,
controls.js queries these functions when a user attempts
to solve a grid in challenge mode.
DO NOT EDIT OR DELETE
*/

var seconds;
var user = getQueryVariable('user');
var totalMoves = 0;

var algorithmA = function(submittedSequence, startTime) {
    var correctSequence = 
    [
        0,0,1,0,0,
        0,1,0,1,0,
        1,0,0,0,1,
        1,1,1,0,1,
        1,0,0,0,1,
    ];

    //If the submitted grid is correct
    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'A');
    }
    //Else signal to the user that they were wrong
    else 
    {
         submitBtn.setAttribute('color', 'red');
         setTimeout(function(){submitBtn.setAttribute('color', 'white')}, 750);
    }
};

var algorithmB = function(submittedSequence, startTime) {
    var correctSequence = 
    [
        1,1,1,0,0,
        1,0,0,1,0,
        1,0,1,0,0,
        1,0,0,1,0,
        1,0,1,0,0,
    ];

    //If the submitted grid is correct
    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'B');
    }
    //Else signal to the user that they were wrong
    else 
    {
         submitBtn.setAttribute('color', 'red');
         setTimeout(function(){submitBtn.setAttribute('color', 'white')}, 750);
    }
};

var algorithmC = function(submittedSequence, startTime) {
    var correctSequence = 
    [
        0,1,1,1,0,
        1,0,0,0,1,
        1,0,0,0,0,
        1,0,0,0,1,
        0,1,1,1,0,
    ];

    //If the submitted grid is correct
    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'C');
    }
    //Else signal to the user that they were wrong
    else 
    {
         submitBtn.setAttribute('color', 'red');
         setTimeout(function(){submitBtn.setAttribute('color', 'white')}, 750);
    }
};

var algorithmD = function(submittedSequence, startTime) {
    var correctSequence = 
    [
        1,1,1,0,0,
        1,0,0,1,0,
        1,0,0,1,0,
        1,0,0,1,0,
        1,0,1,0,0,
    ];

    //If the submitted grid is correct
    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'D');
    }
    //Else signal to the user that they were wrong
    else 
    {
         submitBtn.setAttribute('color', 'red');
         setTimeout(function(){submitBtn.setAttribute('color', 'white')}, 750);
    }
};

var algorithmE = function(submittedSequence, startTime) {
    var correctSequence = 
    [
        0,1,1,1,0,
        0,1,0,0,0,
        0,1,1,1,0,
        0,1,0,0,0,
        0,1,1,1,0,
    ];

    //If the submitted grid is correct
    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'E');
    }
    //Else signal to the user that they were wrong
    else 
    {
         submitBtn.setAttribute('color', 'red');
         setTimeout(function(){submitBtn.setAttribute('color', 'white')}, 750);
    }
};

var algorithmF = function(submittedSequence, startTime) {
    var correctSequence = 
    [
        1,1,1,1,0,
        1,0,0,0,0,
        1,1,1,1,0,
        1,0,0,0,0,
        1,0,0,0,0,
    ];

    //If the submitted grid is correct
    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'F');
    }
    //Else signal to the user that they were wrong
    else 
    {
         submitBtn.setAttribute('color', 'red');
         setTimeout(function(){submitBtn.setAttribute('color', 'white')}, 750);
    }
};

var algorithmG = function(submittedSequence, startTime) {
    var correctSequence = 
    [
        0,1,1,1,0,
        1,0,0,0,0,
        1,0,1,1,0,
        1,0,0,1,0,
        0,1,1,0,0,
    ];

    //If the submitted grid is correct
    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'G');
    }
    //Else signal to the user that they were wrong
    else 
    {
         submitBtn.setAttribute('color', 'red');
         setTimeout(function(){submitBtn.setAttribute('color', 'white')}, 750);
    }
};

var algorithmH = function(submittedSequence, startTime) {
    var correctSequence = 
    [
        1,0,0,0,0,
        1,0,0,0,0,
        1,1,1,1,1,
        1,0,0,0,1,
        1,0,0,0,1,
    ];

    //If the submitted grid is correct
    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'H');
    }
    //Else signal to the user that they were wrong
    else 
    {
         submitBtn.setAttribute('color', 'red');
         setTimeout(function(){submitBtn.setAttribute('color', 'white')}, 750);
    }
};

var algorithmI = function(submittedSequence, startTime) {
    var correctSequence = 
    [
        0,1,1,1,0,
        0,0,1,0,0,
        0,0,1,0,0,
        0,0,1,0,0,
        1,1,1,1,1,
    ];

    //If the submitted grid is correct
    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'I');
    }
    //Else signal to the user that they were wrong
    else 
    {
         submitBtn.setAttribute('color', 'red');
         setTimeout(function(){submitBtn.setAttribute('color', 'white')}, 750);
    }
};

var algorithmJ = function(submittedSequence, startTime) {
    var correctSequence = 
    [
        1,1,1,1,1,
        0,0,0,1,0,
        0,0,0,1,0,
        1,0,0,1,0,
        0,1,1,0,0,
    ];

    //If the submitted grid is correct
    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'J');
    }
    //Else signal to the user that they were wrong
    else 
    {
         submitBtn.setAttribute('color', 'red');
         setTimeout(function(){submitBtn.setAttribute('color', 'white')}, 750);
    }
};

var algorithmK = function(submittedSequence, startTime) {
    var correctSequence = 
    [
        1,0,0,0,1,
        1,0,0,1,0,
        1,1,1,0,0,
        1,0,0,1,0,
        1,0,0,0,1,
    ];

    //If the submitted grid is correct
    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'K');
    }
    //Else signal to the user that they were wrong
    else 
    {
         submitBtn.setAttribute('color', 'red');
         setTimeout(function(){submitBtn.setAttribute('color', 'white')}, 750);
    }
};

var algorithmL = function(submittedSequence, startTime) {
    var correctSequence = 
    [
        1,1,1,0,0,
        0,1,0,0,0,
        0,1,0,0,0,
        0,1,0,0,1,
        0,1,1,1,1,
    ];

    //If the submitted grid is correct
    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'L');
    }
    //Else signal to the user that they were wrong
    else 
    {
         submitBtn.setAttribute('color', 'red');
         setTimeout(function(){submitBtn.setAttribute('color', 'white')}, 750);
    }
};

var algorithmM = function(submittedSequence, startTime) {
    var correctSequence = 
    [
        0,0,0,0,0,
        1,1,0,1,1,
        1,0,1,0,1,
        1,0,0,0,1,
        1,0,0,0,1,
    ];

    //If the submitted grid is correct
    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'M');
    }
    //Else signal to the user that they were wrong
    else 
    {
         submitBtn.setAttribute('color', 'red');
         setTimeout(function(){submitBtn.setAttribute('color', 'white')}, 750);
    }
};

var algorithmN = function(submittedSequence, startTime) {
    var correctSequence = 
    [
        0,1,1,1,0,
        1,0,0,0,1,
        1,0,0,0,1,
        1,0,0,0,1,
        1,0,0,0,1,
    ];

    //If the submitted grid is correct
    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'N');
    }
    //Else signal to the user that they were wrong
    else 
    {
         submitBtn.setAttribute('color', 'red');
         setTimeout(function(){submitBtn.setAttribute('color', 'white')}, 750);
    }
};

var algorithmO = function(submittedSequence, startTime) {
    var correctSequence = 
    [
        0,1,1,0,0,
        1,0,0,0,1,
        1,0,0,0,1,
        1,0,0,0,1,
        0,1,1,1,0,
    ];

    //If the submitted grid is correct
    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'O');
    }
    //Else signal to the user that they were wrong
    else 
    {
         submitBtn.setAttribute('color', 'red');
         setTimeout(function(){submitBtn.setAttribute('color', 'white')}, 750);
    }
};

var algorithmP = function(submittedSequence, startTime) {
    var correctSequence = 
    [
        1,1,1,1,0,
        1,0,0,1,0,
        1,0,1,1,0,
        1,0,0,0,0,
        1,0,0,0,0,
    ];

    //If the submitted grid is correct
    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'P');
    }
    //Else signal to the user that they were wrong
    else 
    {
         submitBtn.setAttribute('color', 'red');
         setTimeout(function(){submitBtn.setAttribute('color', 'white')}, 750);
    }
};

var algorithmQ = function(submittedSequence, startTime) {
    var correctSequence = 
    [
        0,1,1,1,0,
        0,1,0,1,0,
        0,1,0,1,0,
        0,1,1,1,0,
        0,0,0,0,1,
    ];

    //If the submitted grid is correct
    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'Q');
    }
    //Else signal to the user that they were wrong
    else 
    {
         submitBtn.setAttribute('color', 'red');
         setTimeout(function(){submitBtn.setAttribute('color', 'white')}, 750);
    }
};

var algorithmR = function(submittedSequence, startTime) {
    var correctSequence = 
    [
        1,1,1,0,0,
        1,0,0,1,0,
        1,0,1,0,0,
        1,0,0,1,0,
        1,0,0,0,1,
    ];

    //If the submitted grid is correct
    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'R');
    }
    //Else signal to the user that they were wrong
    else 
    {
         submitBtn.setAttribute('color', 'red');
         setTimeout(function(){submitBtn.setAttribute('color', 'white')}, 750);
    }
};

var algorithmS = function(submittedSequence, startTime) {
    var correctSequence = 
    [
        0,1,1,1,0,
        0,1,0,0,1,
        0,0,1,0,0,
        1,0,0,1,0,
        0,1,1,1,0,
    ];

    //If the submitted grid is correct
    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'S');
    }
    //Else signal to the user that they were wrong
    else 
    {
         submitBtn.setAttribute('color', 'red');
         setTimeout(function(){submitBtn.setAttribute('color', 'white')}, 750);
    }
};

var algorithmT = function(submittedSequence, startTime) {
    var correctSequence = 
    [
        1,1,1,1,1,
        1,0,1,0,1,
        0,0,1,0,0,
        0,0,1,0,0,
        0,0,1,0,0,
    ];

    //If the submitted grid is correct
    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'T');
    }
    //Else signal to the user that they were wrong
    else 
    {
         submitBtn.setAttribute('color', 'red');
         setTimeout(function(){submitBtn.setAttribute('color', 'white')}, 750);
    }
};

var algorithmU = function(submittedSequence, startTime) {
    var correctSequence = 
    [
        1,0,0,0,1,
        1,0,0,0,1,
        1,0,0,0,1,
        1,0,0,0,1,
        0,1,1,1,0,
    ];

    //If the submitted grid is correct
    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'U');
    }
    //Else signal to the user that they were wrong
    else 
    {
         submitBtn.setAttribute('color', 'red');
         setTimeout(function(){submitBtn.setAttribute('color', 'white')}, 750);
    }
};

var algorithmV = function(submittedSequence, startTime) {
    var correctSequence = 
    [
        1,0,0,0,1,
        1,0,0,0,1,
        1,1,0,1,1,
        0,1,0,1,0,
        0,0,1,0,0,
    ];

    //If the submitted grid is correct
    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'V');
    }
    //Else signal to the user that they were wrong
    else 
    {
         submitBtn.setAttribute('color', 'red');
         setTimeout(function(){submitBtn.setAttribute('color', 'white')}, 750);
    }
};

var algorithmW = function(submittedSequence, startTime) {
    var correctSequence = 
    [
        1,0,0,0,1,
        1,0,0,0,1,
        1,0,0,0,1,
        1,0,1,0,1,
        0,1,0,1,0,
    ];

    //If the submitted grid is correct
    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'W');
    }
    //Else signal to the user that they were wrong
    else 
    {
         submitBtn.setAttribute('color', 'red');
         setTimeout(function(){submitBtn.setAttribute('color', 'white')}, 750);
    }
};

var algorithmX = function(submittedSequence, startTime) {
    var correctSequence = 
    [
        1,0,0,0,1,
        0,1,0,1,1,
        0,0,1,0,0,
        1,1,0,1,0,
        1,0,0,0,1,
    ];

    //If the submitted grid is correct
    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'X');
    }
    //Else signal to the user that they were wrong
    else 
    {
         submitBtn.setAttribute('color', 'red');
         setTimeout(function(){submitBtn.setAttribute('color', 'white')}, 750);
    }
};

var algorithmY = function(submittedSequence, startTime) {
    var correctSequence = 
    [
        1,0,0,1,0,
        1,0,0,1,0,
        0,1,1,1,0,
        0,0,0,1,0,
        1,1,1,0,0,
    ];

    //If the submitted grid is correct
    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'Y');
    }
    //Else signal to the user that they were wrong
    else 
    {
         submitBtn.setAttribute('color', 'red');
         setTimeout(function(){submitBtn.setAttribute('color', 'white')}, 750);
    }
};

var algorithmZ = function(submittedSequence, startTime) {
    var correctSequence = 
    [
        1,1,1,1,0,
        0,0,0,1,0,
        0,0,1,0,0,
        0,1,0,0,0,
        1,1,1,1,0,
    ];

    //If the submitted grid is correct
    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'Z');
    }
    //Else signal to the user that they were wrong
    else 
    {
         submitBtn.setAttribute('color', 'red');
         setTimeout(function(){submitBtn.setAttribute('color', 'white')}, 750);
    }
};

//Display success area in VR
var showSuccessArea = function() {
    $('#success').attr('visible', 'true');
    $('#successTitle').attr('visible', 'true');
    $('#successText').attr('visible', 'true');
    $('#successStatsTitle').attr('visible', 'true');
    $('#successStatsTime').attr('visible', 'true');
    $('#successStatsMoves').attr('visible', 'true');
    $('#playAgainBtn').attr('visible', 'true');
    $('#playAgainTxt').attr('visible', 'true');
    $('#socialBtn').attr('visible', 'true');
    $('#socialBtnTxt').attr('visible', 'true');
    $('#socialBtnWarn').attr('visible', 'true');
    $('#exitBtn').attr('visible', 'true');
    $('#exitBtnText').attr('visible', 'true');
    $('#exitBtnWarn').attr('visible', 'true');
};

var submitStatsToDb = function(oldTime, char) {
    //Get current UNIX time
    var newTime = new Date();

    //Calculate difference in seconds between:
    //Time the user began the puzzle
    //And time that the user finished
    seconds = (newTime.getTime() - oldTime.getTime()) / 1000;

    //Push total time to database using the current challenge letter and the username
    firebase.database().ref('stats/' + char + '/' + user + '@' + Math.round(newTime/1000)).set({
        time: seconds
    });

    //Update stats page with total time and moves
    $('#successStatsTime').attr('value', 'Time: ' + seconds);
    $('#successStatsMoves').attr('value', 'Moves: ' + totalMoves);
};
