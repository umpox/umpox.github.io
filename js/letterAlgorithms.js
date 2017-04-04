var seconds;
var user = getQueryVariable('user');

var algorithmA = function(submittedSequence, startTime) {
    var correctSequence = 
    [
        0,0,1,0,0,
        0,1,0,1,0,
        1,0,0,0,1,
        1,1,1,0,1,
        1,0,0,0,1,
    ];

    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'A');
    }
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

    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'B');
    }
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

    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'C');
    }
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

    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'D');
    }
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

    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'E');
    }
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

    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'F');
    }
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

    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'G');
    }
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

    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'H');
    }
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

    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'I');
    }
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

    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'J');
    }
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

    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'K');
    }
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

    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'L');
    }
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

    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'M');
    }
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

    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'N');
    }
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

    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'O');
    }
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

    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'P');
    }
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

    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'Q');
    }
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

    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'R');
    }
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

    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'S');
    }
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

    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'T');
    }
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

    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'U');
    }
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

    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'V');
    }
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

    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'W');
    }
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

    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'X');
    }
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

    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'Y');
    }
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

    if ( submittedSequence.join() === correctSequence.join() )
    {
        showSuccessArea();
        submitStatsToDb(startTime, 'Z');
    }
    else 
    {
         submitBtn.setAttribute('color', 'red');
         setTimeout(function(){submitBtn.setAttribute('color', 'white')}, 750);
    }
};

var showSuccessArea = function() {
    $('#success').attr('visible', 'true');
    $('#successTitle').attr('visible', 'true');
    $('#successText').attr('visible', 'true');
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
    var newTime = new Date();

    seconds = (newTime.getTime() - oldTime.getTime()) / 1000;

    firebase.database().ref('stats/' + char + '/' + user + '@' + Math.round(newTime/1000)).set({
        time: seconds
    });
};
