var successArea = document.getElementById('success');
var successTitle = document.getElementById('successTitle');
var successText = document.getElementById('successText');
var playAgainBtn = document.getElementById('playAgainBtn');
var playAgainTxt = document.getElementById('playAgainTxt');
var socialBtn = document.getElementById('socialBtn');
var socialBtnTxt = document.getElementById('socialBtnTxt');
var exitBtn = document.getElementById('exitBtn');
var exitBtnText = document.getElementById('exitBtnText');

var algorithmA = function(submittedSequence) {
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
        successArea.setAttribute('visible', true);
        successTitle.setAttribute('visible', true);
        successText.setAttribute('visible', true);
        playAgainBtn.setAttribute('visible', true);
        playAgainTxt.setAttribute('visible', true);
        socialBtn.setAttribute('visible', true);
        socialBtnTxt.setAttribute('visible', true);
        exitBtn.setAttribute('visible', true);
        exitBtnText.setAttribute('visible', true);
    }
};

var algorithmB = function(submittedSequence) {
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
        successArea.setAttribute('visible', true);
        successTitle.setAttribute('visible', true);
        successText.setAttribute('visible', true);
        playAgainBtn.setAttribute('visible', true);
        playAgainTxt.setAttribute('visible', true);
        socialBtn.setAttribute('visible', true);
        socialBtnTxt.setAttribute('visible', true);
        exitBtn.setAttribute('visible', true);
        exitBtnText.setAttribute('visible', true);
    }
};

var algorithmC = function(submittedSequence) {
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
        successArea.setAttribute('visible', true);
        successTitle.setAttribute('visible', true);
        successText.setAttribute('visible', true);
        playAgainBtn.setAttribute('visible', true);
        playAgainTxt.setAttribute('visible', true);
        socialBtn.setAttribute('visible', true);
        socialBtnTxt.setAttribute('visible', true);
        exitBtn.setAttribute('visible', true);
        exitBtnText.setAttribute('visible', true);
    }
};

var algorithmD = function(submittedSequence) {
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
        successArea.setAttribute('visible', true);
        successTitle.setAttribute('visible', true);
        successText.setAttribute('visible', true);
        playAgainBtn.setAttribute('visible', true);
        playAgainTxt.setAttribute('visible', true);
        socialBtn.setAttribute('visible', true);
        socialBtnTxt.setAttribute('visible', true);
        exitBtn.setAttribute('visible', true);
        exitBtnText.setAttribute('visible', true);
    }
};

var algorithmE = function(submittedSequence) {
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
        successArea.setAttribute('visible', true);
        successTitle.setAttribute('visible', true);
        successText.setAttribute('visible', true);
        playAgainBtn.setAttribute('visible', true);
        playAgainTxt.setAttribute('visible', true);
        socialBtn.setAttribute('visible', true);
        socialBtnTxt.setAttribute('visible', true);
        exitBtn.setAttribute('visible', true);
        exitBtnText.setAttribute('visible', true);
    }
};

var algorithmF = function(submittedSequence) {
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
        successArea.setAttribute('visible', true);
        successTitle.setAttribute('visible', true);
        successText.setAttribute('visible', true);
        playAgainBtn.setAttribute('visible', true);
        playAgainTxt.setAttribute('visible', true);
        socialBtn.setAttribute('visible', true);
        socialBtnTxt.setAttribute('visible', true);
        exitBtn.setAttribute('visible', true);
        exitBtnText.setAttribute('visible', true);
    }
};

var algorithmG = function(submittedSequence) {
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
        successArea.setAttribute('visible', true);
        successTitle.setAttribute('visible', true);
        successText.setAttribute('visible', true);
        playAgainBtn.setAttribute('visible', true);
        playAgainTxt.setAttribute('visible', true);
        socialBtn.setAttribute('visible', true);
        socialBtnTxt.setAttribute('visible', true);
        exitBtn.setAttribute('visible', true);
        exitBtnText.setAttribute('visible', true);
    }
};

var algorithmH = function(submittedSequence) {
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
        successArea.setAttribute('visible', true);
        successTitle.setAttribute('visible', true);
        successText.setAttribute('visible', true);
        playAgainBtn.setAttribute('visible', true);
        playAgainTxt.setAttribute('visible', true);
        socialBtn.setAttribute('visible', true);
        socialBtnTxt.setAttribute('visible', true);
        exitBtn.setAttribute('visible', true);
        exitBtnText.setAttribute('visible', true);
    }
};

var algorithmI = function(submittedSequence) {
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
        successArea.setAttribute('visible', true);
        successTitle.setAttribute('visible', true);
        successText.setAttribute('visible', true);
        playAgainBtn.setAttribute('visible', true);
        playAgainTxt.setAttribute('visible', true);
        socialBtn.setAttribute('visible', true);
        socialBtnTxt.setAttribute('visible', true);
        exitBtn.setAttribute('visible', true);
        exitBtnText.setAttribute('visible', true);
    }
};

var algorithmJ = function(submittedSequence) {
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
        successArea.setAttribute('visible', true);
        successTitle.setAttribute('visible', true);
        successText.setAttribute('visible', true);
        playAgainBtn.setAttribute('visible', true);
        playAgainTxt.setAttribute('visible', true);
        socialBtn.setAttribute('visible', true);
        socialBtnTxt.setAttribute('visible', true);
        exitBtn.setAttribute('visible', true);
        exitBtnText.setAttribute('visible', true);
    }
};

var algorithmK = function(submittedSequence) {
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
        successArea.setAttribute('visible', true);
        successTitle.setAttribute('visible', true);
        successText.setAttribute('visible', true);
        playAgainBtn.setAttribute('visible', true);
        playAgainTxt.setAttribute('visible', true);
        socialBtn.setAttribute('visible', true);
        socialBtnTxt.setAttribute('visible', true);
        exitBtn.setAttribute('visible', true);
        exitBtnText.setAttribute('visible', true);
    }
};

var algorithmL = function(submittedSequence) {
    var correctSequence = 
    [
        1,1,1,0,0,
        0,1,0,0,0,
        0,1,0,0,0,
        0,1,0,0,0,
        0,1,1,1,1,
    ];

    if ( submittedSequence.join() === correctSequence.join() )
    {
        successArea.setAttribute('visible', true);
        successTitle.setAttribute('visible', true);
        successText.setAttribute('visible', true);
        playAgainBtn.setAttribute('visible', true);
        playAgainTxt.setAttribute('visible', true);
        socialBtn.setAttribute('visible', true);
        socialBtnTxt.setAttribute('visible', true);
        exitBtn.setAttribute('visible', true);
        exitBtnText.setAttribute('visible', true);
    }
};

var algorithmM = function(submittedSequence) {
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
        successArea.setAttribute('visible', true);
        successTitle.setAttribute('visible', true);
        successText.setAttribute('visible', true);
        playAgainBtn.setAttribute('visible', true);
        playAgainTxt.setAttribute('visible', true);
        socialBtn.setAttribute('visible', true);
        socialBtnTxt.setAttribute('visible', true);
        exitBtn.setAttribute('visible', true);
        exitBtnText.setAttribute('visible', true);
    }
};

var algorithmN = function(submittedSequence) {
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
        successArea.setAttribute('visible', true);
        successTitle.setAttribute('visible', true);
        successText.setAttribute('visible', true);
        playAgainBtn.setAttribute('visible', true);
        playAgainTxt.setAttribute('visible', true);
        socialBtn.setAttribute('visible', true);
        socialBtnTxt.setAttribute('visible', true);
        exitBtn.setAttribute('visible', true);
        exitBtnText.setAttribute('visible', true);
    }
};

var algorithmO = function(submittedSequence) {
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
        successArea.setAttribute('visible', true);
        successTitle.setAttribute('visible', true);
        successText.setAttribute('visible', true);
        playAgainBtn.setAttribute('visible', true);
        playAgainTxt.setAttribute('visible', true);
        socialBtn.setAttribute('visible', true);
        socialBtnTxt.setAttribute('visible', true);
        exitBtn.setAttribute('visible', true);
        exitBtnText.setAttribute('visible', true);
    }
};

var algorithmP = function(submittedSequence) {
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
        successArea.setAttribute('visible', true);
        successTitle.setAttribute('visible', true);
        successText.setAttribute('visible', true);
        playAgainBtn.setAttribute('visible', true);
        playAgainTxt.setAttribute('visible', true);
        socialBtn.setAttribute('visible', true);
        socialBtnTxt.setAttribute('visible', true);
        exitBtn.setAttribute('visible', true);
        exitBtnText.setAttribute('visible', true);
    }
};

var algorithmQ = function(submittedSequence) {
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
        successArea.setAttribute('visible', true);
        successTitle.setAttribute('visible', true);
        successText.setAttribute('visible', true);
        playAgainBtn.setAttribute('visible', true);
        playAgainTxt.setAttribute('visible', true);
        socialBtn.setAttribute('visible', true);
        socialBtnTxt.setAttribute('visible', true);
        exitBtn.setAttribute('visible', true);
        exitBtnText.setAttribute('visible', true);
    }
};

var algorithmR = function(submittedSequence) {
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
        successArea.setAttribute('visible', true);
        successTitle.setAttribute('visible', true);
        successText.setAttribute('visible', true);
        playAgainBtn.setAttribute('visible', true);
        playAgainTxt.setAttribute('visible', true);
        socialBtn.setAttribute('visible', true);
        socialBtnTxt.setAttribute('visible', true);
        exitBtn.setAttribute('visible', true);
        exitBtnText.setAttribute('visible', true);
    }
};

var algorithmS = function(submittedSequence) {
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
        successArea.setAttribute('visible', true);
        successTitle.setAttribute('visible', true);
        successText.setAttribute('visible', true);
        playAgainBtn.setAttribute('visible', true);
        playAgainTxt.setAttribute('visible', true);
        socialBtn.setAttribute('visible', true);
        socialBtnTxt.setAttribute('visible', true);
        exitBtn.setAttribute('visible', true);
        exitBtnText.setAttribute('visible', true);
    }
};

var algorithmT = function(submittedSequence) {
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
        successArea.setAttribute('visible', true);
        successTitle.setAttribute('visible', true);
        successText.setAttribute('visible', true);
        playAgainBtn.setAttribute('visible', true);
        playAgainTxt.setAttribute('visible', true);
        socialBtn.setAttribute('visible', true);
        socialBtnTxt.setAttribute('visible', true);
        exitBtn.setAttribute('visible', true);
        exitBtnText.setAttribute('visible', true);
    }
};

var algorithmU = function(submittedSequence) {
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
        successArea.setAttribute('visible', true);
        successTitle.setAttribute('visible', true);
        successText.setAttribute('visible', true);
        playAgainBtn.setAttribute('visible', true);
        playAgainTxt.setAttribute('visible', true);
        socialBtn.setAttribute('visible', true);
        socialBtnTxt.setAttribute('visible', true);
        exitBtn.setAttribute('visible', true);
        exitBtnText.setAttribute('visible', true);
    }
};

var algorithmV = function(submittedSequence) {
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
        successArea.setAttribute('visible', true);
        successTitle.setAttribute('visible', true);
        successText.setAttribute('visible', true);
        playAgainBtn.setAttribute('visible', true);
        playAgainTxt.setAttribute('visible', true);
        socialBtn.setAttribute('visible', true);
        socialBtnTxt.setAttribute('visible', true);
        exitBtn.setAttribute('visible', true);
        exitBtnText.setAttribute('visible', true);
    }
};

var algorithmW = function(submittedSequence) {
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
        successArea.setAttribute('visible', true);
        successTitle.setAttribute('visible', true);
        successText.setAttribute('visible', true);
        playAgainBtn.setAttribute('visible', true);
        playAgainTxt.setAttribute('visible', true);
        socialBtn.setAttribute('visible', true);
        socialBtnTxt.setAttribute('visible', true);
        exitBtn.setAttribute('visible', true);
        exitBtnText.setAttribute('visible', true);
    }
};

var algorithmX = function(submittedSequence) {
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
        successArea.setAttribute('visible', true);
        successTitle.setAttribute('visible', true);
        successText.setAttribute('visible', true);
        playAgainBtn.setAttribute('visible', true);
        playAgainTxt.setAttribute('visible', true);
        socialBtn.setAttribute('visible', true);
        socialBtnTxt.setAttribute('visible', true);
        exitBtn.setAttribute('visible', true);
        exitBtnText.setAttribute('visible', true);
    }
};

var algorithmY = function(submittedSequence) {
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
        successArea.setAttribute('visible', true);
        successTitle.setAttribute('visible', true);
        successText.setAttribute('visible', true);
        playAgainBtn.setAttribute('visible', true);
        playAgainTxt.setAttribute('visible', true);
        socialBtn.setAttribute('visible', true);
        socialBtnTxt.setAttribute('visible', true);
        exitBtn.setAttribute('visible', true);
        exitBtnText.setAttribute('visible', true);
    }
};

var algorithmZ = function(submittedSequence) {
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
        successArea.setAttribute('visible', true);
        successTitle.setAttribute('visible', true);
        successText.setAttribute('visible', true);
        playAgainBtn.setAttribute('visible', true);
        playAgainTxt.setAttribute('visible', true);
        socialBtn.setAttribute('visible', true);
        socialBtnTxt.setAttribute('visible', true);
        exitBtn.setAttribute('visible', true);
        exitBtnText.setAttribute('visible', true);
    }
};
