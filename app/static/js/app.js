  
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
let pageTitle = document.getElementById('page-title');

let lyricElement = document.getElementById('lyric');
// let progressButton = document.getElementById('progress-button');
let scoreElementHuman = document.getElementById('score-human');
let scoreElementModel = document.getElementById('score-model');
// let questionNumber = document.getElementById('question-number');
// let winnerElement = document.getElementById('winner');
let lyricSection = document.getElementById('lyric-section');

var guessHuman;
var guessModel;
var scoreHuman = 0;
var scoreModel = 0;
var questionNumber = 0;
var answer;
var probaDict;
var pointLoaded;
var terminalLen;
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

dylanButton.addEventListener('click', function (event) {
    runAnswerAndLoad('Bob Dylan');
});
fitzgeraldButton.addEventListener('click', function (event) {
    runAnswerAndLoad('Ella Fitzgerald');
});
johnButton.addEventListener('click', function (event) {
    runAnswerAndLoad('Elton John');
});
partonButton.addEventListener('click', function (event) {
    runAnswerAndLoad('Dolly Parton');
});
bowieButton.addEventListener('click', function (event) {
    runAnswerAndLoad('David Bowie');
});

var blurb = document.getElementById('blurb');

var typewriter = new Typewriter(blurb, {
    delay: 30,
    cursor: "&#9608;"
});

var welcomeStringArrows = ">>> "
var welcomeStringDiv = "<p> </p>"
var welcomeString1 = "you are going to see some lyrics."
var welcomeString2 = "you are going to see some artists."
var welcomeString3 = "you are going to match lyrics with artists."
var welcomeString4 = "i am a machine learning model."
var welcomeString5 = "i am also going to match lyrics with artists."
var welcomeString6 = "it is what i have been trained to do."
var welcomeString7 = "we are going to do this for ten songs."
var welcomeString8 = "our answers will be assessed."
var welcomeString9 = "our scores, calculated, totalled, and compared."
var welcomeString10 = "you are going to lose."
var welcomeString11 = ", probably."

var pauseFor = 800;

typewriter.typeString(welcomeStringArrows)
    .pauseFor(2000)
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

// var typewriterLyric = new Typewriter(lyricElement, {
//     delay: 20,
//     // delay: 1, // debug
//     cursor: "&#9608;",
//     devMode: true
// });

function quizTransition () {
    var times = 0;
    let switch_times = [40, 36, 32, 29, 26, 23, 20, 18, 16, 14, 12, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    next_switch = switch_times.pop();
    console.log(next_switch);
    var intervalID = setInterval(function() {
        if (times == next_switch) {
            quiz.style.display = (quiz.style.display == '' ? 'none' : '');
            intro.style.display = (intro.style.display == '' ? 'none' : '');
            next_switch = switch_times.pop();
        };
        if (times == 41) {
            loadNewQuestion();
            window.scrollTo(0, document.body.scrollHeight);
        };
        if (times == 80) {
            typewriterTerminal.typeString('go on.').pauseFor(1000).typeString(' take a guess.').start();
            terminalLen = 'go on. take a guess.'.length;
            window.clearInterval(intervalID);
        };
        times++;
    }, 50);
};

startButton.addEventListener('click', function (event) {
    quizTransition();
});

title.addEventListener('mouseenter', function(event) {
    title.innerHTML = '>>> you are going to lose.';
    pageTitle.innerHTML = 'you are going to lose.'
});
title.addEventListener('mouseleave', function(event) {
    title.innerHTML = '>>> this quiz is about lyrics.';
    pageTitle.innerHTML = 'this quiz is about lyrics.'
});


var typewriterTerminal = new Typewriter(document.getElementById('terminal'), {
    delay: 30,
    cursor: "&#9608;"
});
typewriterTerminal.typeString('>>> ').start();

function loadQuiz () {
  $.getJSON('generate_quiz', function (json) {
    sessionStorage.setItem("quizGlobal", json);
  });
};

loadQuiz();

function runAnswerAndLoad (guess) {
    assessAnswer(guess);
    resetTerminal();
    setTimeout(loadNewQuestion(), 3000);
};

function loadNewQuestion() {
    bowieButton.firstElementChild.firstElementChild.classList.remove("disabled");
    fitzgeraldButton.firstElementChild.firstElementChild.classList.remove("disabled");
    partonButton.firstElementChild.firstElementChild.classList.remove("disabled");
    johnButton.firstElementChild.firstElementChild.classList.remove("disabled");
    dylanButton.firstElementChild.firstElementChild.classList.remove("disabled");
    quizGlobal = JSON.parse(sessionStorage.getItem("quizGlobal"));
    var lyricText = '>>> ' + quizGlobal[questionNumber].lyrics.replace(/(?:\r\n|\r|\n)/g, '<br>>>> ');
    questionTransition(lyricText)
    answer = quizGlobal[questionNumber].artist;
    guessModel = quizGlobal[questionNumber].prediction;
    probaDict = quizGlobal[questionNumber].proba_dict;
    pointLoaded = true;
    window.scrollTo(0, document.body.scrollHeight);
 };

function resetTerminal() {
    typewriterTerminal.pauseFor(3000).deleteChars(terminalLen).start();
}

function questionTransition (lyricText) {
    var times = 0;
    let switch_times = [22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2];
    next_switch = switch_times.pop();
    console.log(next_switch);
    var old = lyricElement.innerHTML;
    var version = 'old';
    var intervalID = setInterval(function() {
        if (times == next_switch) {
            lyricElement.innerHTML = (version == 'old' ? lyricText : old);
            version = (version == 'old' ? 'new' : 'old');
            next_switch = switch_times.pop();
        };
        if (times == 23) {
            window.clearInterval(intervalID);
        };
        times++;
    }, 50);
};


function assessAnswer (guessHuman) {
    if (pointLoaded) {
        if (questionNumber == 0) {
            typewriterTerminal.deleteChars(terminalLen).start();
        }
        window.scrollTo(0, 0);
        bowieButton.firstElementChild.firstElementChild.classList.add("disabled");
        fitzgeraldButton.firstElementChild.firstElementChild.classList.add("disabled");
        partonButton.firstElementChild.firstElementChild.classList.add("disabled");
        johnButton.firstElementChild.firstElementChild.classList.add("disabled");
        dylanButton.firstElementChild.firstElementChild.classList.add("disabled");
        if (guessHuman == answer && guessModel == answer) {
            updateScoreHuman();
            updateScoreModel();
            typewriterTerminal
                .typeString('one point each. well done.')
                .start();
            terminalLen = 'one point each. well done.'.length;
        };
        if (guessHuman == answer && guessModel != answer) {
            updateScoreHuman();
            typewriterTerminal
                .typeString('wow. you beat me on that one. do not get used to it.')
                .start();
            terminalLen = 'wow. you beat me on that one. do not get used to it.'.length;
        };
        if (guessHuman != answer && guessModel == answer) {
            updateScoreModel();
            typewriterTerminal
                .typeString('that was [artist]. better luck next time.')
                .start();
            terminalLen = 'that was [artist]. better luck next time.'.length;
        };
        if (guessHuman != answer && guessModel != answer) {
            typewriterTerminal
                .typeString('that was [artist]. i did not get it either. so it was probably impossible for you.')
                .start();
            terminalLen = 'that was [artist]. i did not get it either. so it was probably impossible for you.'.length;
        };
    };
    pointLoaded = false;
    if (questionNumber == 10) {
        // updateWinner();
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


