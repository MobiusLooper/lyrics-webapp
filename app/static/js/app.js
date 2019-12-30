  
let dylanButton = document.getElementById('dylan-button');
let fitzgeraldButton = document.getElementById('fitzgerald-button');
let johnButton = document.getElementById('john-button');
let partonButton = document.getElementById('parton-button');
let bowieButton = document.getElementById('bowie-button');
let startButton = document.getElementById('start-button')
let title = document.getElementById('title');
let scores = document.getElementById('scores');
let intro = document.getElementById('intro');
let quizElement = document.getElementById('quiz');

let lyricElement = document.getElementById('lyric');
let progressButton = document.getElementById('progress-button');
let scoreElementHuman = document.getElementById('score-human');
let scoreElementModel = document.getElementById('score-model');
let questionNumber = document.getElementById('question-number');
let winnerElement = document.getElementById('winner');
let lyricSection = document.getElementById('lyric-section');

var guessHuman;
var guessModel;
var scoreHuman = 0;
var scoreModel = 0;
var question = 0;
var answer;
var probaDict;
var pointLoaded;
var nextQuestionReady = true;
const green = '#34B358';
const red = '#C46060'; 
const resetColor = '#696969';
var buttonDict = {
    'Bob Dylan': dylanButton,
    'Ella Fitzgerald': fitzgeraldButton,
    'Elton John': johnButton,
    'Dolly Parton': partonButton,
    'David Bowie': bowieButton
};
var fullNameDict = {
    'dylan': 'Bob Dylan',
    'fitzgerald': 'Ella Fitzgerald',
    'john': 'Elton John',
    'parton': 'Dolly Parton',
    'bowie': 'David Bowie',
};
var quizStarted = false;
var quizGlobal;

startButton.style.opacity = 0; // debug
quizElement.style.display = 'none';

questionNumber.style.visibility = 'hidden';
winnerElement.style.visibility = 'hidden';
lyricSection.style.visibility = 'hidden';

dylanButton.addEventListener('click', function (event) {
    guessHuman = 'Bob Dylan';
    assessAnswer(guessHuman);
});
fitzgeraldButton.addEventListener('click', function (event) {
    guessHuman = 'Ella Fitzgerald';
    assessAnswer(guessHuman);
});
johnButton.addEventListener('click', function (event) {
    guessHuman = 'Elton John';
    assessAnswer(guessHuman);
});
partonButton.addEventListener('click', function (event) {
    guessHuman = 'Dolly Parton';
    assessAnswer(guessHuman);
});
bowieButton.addEventListener('click', function (event) {
    guessHuman = 'David Bowie';
    assessAnswer(guessHuman);
});
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

var blurb = document.getElementById('blurb');

var typewriter = new Typewriter(blurb, {
    delay: 30,
    // delay: 1, // debug
    cursor: "&#9608;"
});

var welcomeStringArrows = ">>> "
var welcomeStringDiv = "<p> </p>"
var welcomeString1 = "You're going to see some lyrics."
var welcomeString2 = "You're going to see some artists."
var welcomeString3 = "You're going to match lyrics with artists."
var welcomeString4 = "I'm a machine learning model."
var welcomeString5 = "I'm also going to match lyrics with artists."
var welcomeString6 = "It's what I've been trained to do."
var welcomeString7 = "We're going to do this for ten songs."
var welcomeString8 = "Our answers will be assessed."
var welcomeString9 = "Our scores, calculated, totalled, and compared."
var welcomeString10 = "You're going to lose."
var welcomeString11 = ", probably."

var pauseFor = 800;
// var pauseFor = 1; // debug

typewriter.pauseFor(2000)
// typewriter //debug
    .typeString(welcomeStringArrows)
    .typeString(welcomeString1)
    .typeString(welcomeStringDiv)
    .typeString(welcomeStringArrows)
    .pauseFor(pauseFor)
    .typeString(welcomeString2)
    .typeString(welcomeStringDiv)
    .typeString(welcomeStringArrows)
    .pauseFor(pauseFor)
    .typeString(welcomeString3)
    .typeString(welcomeStringDiv)
    .typeString(welcomeStringArrows)
    .pauseFor(pauseFor)
    .typeString(welcomeString4)
    .typeString(welcomeStringDiv)
    .typeString(welcomeStringArrows)
    .pauseFor(pauseFor)
    .typeString(welcomeString5)
    .typeString(welcomeStringDiv)
    .typeString(welcomeStringArrows)
    .pauseFor(pauseFor)
    .typeString(welcomeString6)
    .typeString(welcomeStringDiv)
    .typeString(welcomeStringArrows)
    .pauseFor(pauseFor)
    .typeString(welcomeString7)
    .typeString(welcomeStringDiv)
    .typeString(welcomeStringArrows)
    .pauseFor(pauseFor)
    .typeString(welcomeString8)
    .typeString(welcomeStringDiv)
    .typeString(welcomeStringArrows)
    .pauseFor(pauseFor)
    .typeString(welcomeString9)
    .typeString(welcomeStringDiv)
    .typeString(welcomeStringArrows)
    .pauseFor(pauseFor)
    .typeString(welcomeString10)
    .pauseFor(2000)
    .deleteChars(1)
    .typeString(welcomeString11)
    .pauseFor(2000)
    .callFunction(() => {startButton.style.opacity = 1.0;})
    .start();


// function resetColors () {
//     var buttonsArray = [
//         dylanButton,
//         fitzgeraldButton,
//         johnButton,
//         partonButton,
//         bowieButton
//     ];
//     var arrayLength = buttonsArray.length;
//     for (var i = 0; i < arrayLength; i++) {
//         buttonsArray[i].style.background = resetColor;
//     };
// };

// function resetBars () {
//     $(".progress-bar").animate({
//         width: "100%"
//     }, 300);
// };

title.addEventListener('mouseenter', function(event) {
    // title.setAttribute('data-text', 'you are going to lose.');
    title.innerHTML = 'you are going to lose.'
});
title.addEventListener('mouseleave', function(event) {
    // title.setAttribute('data-text', 'this quiz is about lyrics.');
    title.innerHTML = 'this quiz is about lyrics.'
});


function loadQuiz () {
  $.getJSON('generate_quiz', function (json) {
    sessionStorage.setItem("quizGlobal", json);
  });
};

loadQuiz();

function quizTransition () {
    var times = 0;
    let switch_times = [60, 56, 52, 48, 44, 40, 38, 36, 34, 32, 30, 28, 26, 24, 22, 20, 16, 12, 8, 4, 0];
    next_switch = switch_times.pop();
    console.log(next_switch);
    var intervalID = setInterval(function() {
        if (times == next_switch) {
            quiz.style.display = (quiz.style.display == '' ? 'none' : '');
            intro.style.display = (intro.style.display == '' ? 'none' : '');
            next_switch = switch_times.pop();
        }
        if (times == 61) {
            window.clearInterval(intervalID);
        };
        times++;
    }, 50);
};

startButton.addEventListener('click', function (event) {
    quizTransition();
});

progressButton.addEventListener('click', function (event) {
    if (question == 10) {
        // resetQuiz();
    };
    if (nextQuestionReady) {
        progressButton.firstElementChild.firstElementChild.classList.add("disabled");
        bowieButton.firstElementChild.firstElementChild.classList.remove("disabled");
        fitzgeraldButton.firstElementChild.firstElementChild.classList.remove("disabled");
        partonButton.firstElementChild.firstElementChild.classList.remove("disabled");
        johnButton.firstElementChild.firstElementChild.classList.remove("disabled");
        dylanButton.firstElementChild.firstElementChild.classList.remove("disabled");
        

        quizGlobal = JSON.parse(sessionStorage.getItem("quizGlobal"));
        updateLyric(quizGlobal[question].lyrics);
        answer = quizGlobal[question].artist;
        guessModel = quizGlobal[question].prediction;
        probaDict = quizGlobal[question].proba_dict;
        // wordImportances = quizGlobal[question].word_importances;
        question++;
        // questionNumber.innerHTML = "Q".concat(question.toString());
        // questionNumber.style.visibility = 'visible';
        // resetBars();
        pointLoaded = true;
        nextQuestionReady = false;
        progressButton.disabled = true;
        // progressButton.innerHTML = 'Choose an artist';
    } else {
        // alert('Choose an artist before continuing with the next song.');
    };
});

function resetQuiz () {
    scoreHuman = -1;
    scoreModel = -1;
    updateScoreHuman();
    updateScoreModel();
    question = 0;
    winnerElement.style.visibility = 'hidden';
}

function assessAnswer (guessHuman) {
    if (pointLoaded) {
        // buttonDict[answer].style.background = green;
        // progressButton.disabled = false;
        progressButton.firstElementChild.firstElementChild.classList.remove("disabled");
        bowieButton.firstElementChild.firstElementChild.classList.add("disabled");
        fitzgeraldButton.firstElementChild.firstElementChild.classList.add("disabled");
        partonButton.firstElementChild.firstElementChild.classList.add("disabled");
        johnButton.firstElementChild.firstElementChild.classList.add("disabled");
        dylanButton.firstElementChild.firstElementChild.classList.add("disabled");
        // fillBars();
//         padLyrics();
        if (guessHuman == answer) {
            updateScoreHuman();
        } else {
            // buttonDict[guessHuman].style.background = red;
            var nothing = 23;
        };
        if (guessModel == answer) {
            updateScoreModel();
        } else {
            var nothing = 252;
        };
    } else {
        // alert('Go to the next question, you answered this one already!');
    };
    pointLoaded = false;
    nextQuestionReady = true;
    if (question == 10) {
        updateWinner();
    }
};


function updateScoreHuman () {
    scoreHuman++;
    scoreElementHuman.innerHTML = scoreHuman.toString();
    var times = 0;
    var intervalID = setInterval(function() {
        times++;
        scoreElementHuman.style.visibility = (scoreElementHuman.style.visibility == 'hidden' ? 'visible' : 'hidden');
        if (times == 10) {
            window.clearInterval(intervalID);
        };
    }, 90);
};
function updateScoreModel () {
    scoreModel++;
    scoreElementModel.innerHTML = scoreModel.toString();
    var times = 0;
    var intervalID = setInterval(function() {
        times++;
        scoreElementModel.style.visibility = (scoreElementModel.style.visibility == 'hidden' ? 'visible' : 'hidden');
        if (times == 10) {
            window.clearInterval(intervalID);
        };
    }, 90);
};

function updateLyric (lyricText) {
    lyricSection.style.visibility = 'visible';
    lyricElement.innerHTML = lyricText.replace(/(?:\r\n|\r|\n)/g, ',<br>');;
};

function updateWinner () {
    var winnerText;
    if (scoreModel > scoreHuman) {
        winnerText = "We have created a musical superintelligence.<br>The model won!";
    } else if (scoreModel < scoreHuman) {
        winnerText = "Humanity is safe for now.<br>You won!";
    } else {
        winnerText = "We have a tie - time for...<br>SUDDEN DEATH";
    };
    winnerElement.innerHTML = winnerText;
    winnerElement.style.visibility = 'visible';
    var colorIndex = 0;
    var times = 0;
    var intervalID = setInterval(function() {
        times++;
        winnerElement.style.visibility = (winnerElement.style.visibility == 'hidden' ? 'visible' : 'hidden');
        winnerElement.style.color = winnerColors[colorIndex % 5];
        colorIndex++;
        if (times == 30) {
            window.clearInterval(intervalID);
        };
    }, 90);
}









//
// ---Retro Button---
//
var buttons = document.querySelectorAll('.btn');

for(var i = 0; i < buttons.length; i++) {
  // Click
  buttons[i].addEventListener('mousedown', function() {
    this.classList.add('btn-active');
  });
  buttons[i].addEventListener('mouseup', function() {
    this.classList.remove('btn-active');
  });

  // Hover
  buttons[i].addEventListener('mouseleave', function() {
    this.classList.remove('btn-center', 'btn-right', 'btn-left', 'btn-active');
  });

  buttons[i].addEventListener("mousemove", function(e) {
    var leftOffset = this.getBoundingClientRect().left;
    var btnWidth = this.offsetWidth;
    var myPosX = e.pageX;
    var newClass = "";
    // if on left 1/3 width of btn
    if(myPosX < (leftOffset + .3 * btnWidth) ) {
      newClass = 'btn-left'
    } else {
      // if on right 1/3 width of btn
      if(myPosX > (leftOffset + .65 * btnWidth) ) {
        newClass = 'btn-right';
      } else {
        newClass = 'btn-center';
      }
    }
    // remove prev class
    var clearedClassList = this.className.replace(/btn-center|btn-right|btn-left/gi, "").trim();
    this.className = clearedClassList + " " + newClass;
  });
}



// Classie Helper Functions
// https://github.com/desandro/classie

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}


