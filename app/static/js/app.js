  
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

var winCounts = {
    'humanWin': 0,
    'modelWin': 0,
    'bothWin': 0,
    'neitherWin': 0
}

startButton.style.opacity = 0; // debug
quizElement.style.display = 'none';

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
            bowieButton.firstElementChild.firstElementChild.classList.add("disabled");
            fitzgeraldButton.firstElementChild.firstElementChild.classList.add("disabled");
            partonButton.firstElementChild.firstElementChild.classList.add("disabled");
            johnButton.firstElementChild.firstElementChild.classList.add("disabled");
            dylanButton.firstElementChild.firstElementChild.classList.add("disabled");
            window.scrollTo(0, document.body.scrollHeight);
        };
        if (times == 80) {
            typewriterTerminal
            .typeString('go on.')
            .pauseFor(1000)
            .typeString(' take a guess.')
            .callFunction(enableArtistButtons)
            .start();
            terminalLen = 'go on. take a guess.'.length;
            window.clearInterval(intervalID);
        };
        times++;
    }, 50);
};

function enableArtistButtons() {
    bowieButton.firstElementChild.firstElementChild.classList.remove("disabled");
    fitzgeraldButton.firstElementChild.firstElementChild.classList.remove("disabled");
    partonButton.firstElementChild.firstElementChild.classList.remove("disabled");
    johnButton.firstElementChild.firstElementChild.classList.remove("disabled");
    dylanButton.firstElementChild.firstElementChild.classList.remove("disabled");
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
};

function loadNewQuestion() {
    typewriterTerminal.deleteChars(terminalLen).start();
    bowieButton.firstElementChild.firstElementChild.classList.remove("disabled");
    fitzgeraldButton.firstElementChild.firstElementChild.classList.remove("disabled");
    partonButton.firstElementChild.firstElementChild.classList.remove("disabled");
    johnButton.firstElementChild.firstElementChild.classList.remove("disabled");
    dylanButton.firstElementChild.firstElementChild.classList.remove("disabled");
    quizGlobal = JSON.parse(sessionStorage.getItem("quizGlobal"));
    var lyricText = '>>> ' + quizGlobal[questionNumber].lyrics.replace(/(?:\r\n|\r|\n)/g, '<br>>>> ');
    setTimeout(function(){ questionFadeIn(lyricText); }, 500);
    answer = quizGlobal[questionNumber].artist;
    guessModel = quizGlobal[questionNumber].prediction;
    probaDict = quizGlobal[questionNumber].proba_dict;
    pointLoaded = true;
    window.scrollTo(0, document.body.scrollHeight);
 };


function questionFadeIn (lyricText) {
    var times = 0;
    let opacity = 0;
    lyricElement.style.filter = `opacity(${opacity})`;
    lyricElement.innerHTML = lyricText;
    var intervalID = setInterval(function() {
        lyricElement.style.filter = `opacity(${++opacity / 3})`;
        if (times == 4) {
            window.clearInterval(intervalID);
        };
        times++;
    }, 200);
};

function questionFadeOut () {
    var times = 0;
    let opacity = 3;
    var intervalID = setInterval(function() {
        lyricElement.style.filter = `opacity(${--opacity / 3})`;
        if (times == 4) {
            window.clearInterval(intervalID);
        };
        times++;
    }, 200);
};

function assessAnswer (guessHuman) {
    if (pointLoaded) {
        if (questionNumber == 0) {
            typewriterTerminal.deleteChars(terminalLen).start();
        }
        window.scrollTo(0, 0);
        questionFadeOut();
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
                .pauseFor(1000).callFunction(loadNewQuestion)
                .start();
            terminalLen = 'one point each. well done.'.length;
        };
        if (guessHuman == answer && guessModel != answer) {
            updateScoreHuman();
            typewriterTerminal
                .typeString('wow. you beat me on that one. do not get used to it.')
                .pauseFor(1000).callFunction(loadNewQuestion)
                .start();
            terminalLen = 'wow. you beat me on that one. do not get used to it.'.length;
        };
        if (guessHuman != answer && guessModel == answer) {
            updateScoreModel();
            typewriterTerminal
                .typeString('that was [artist]. i got it. better luck next time.')
                .pauseFor(1000).callFunction(loadNewQuestion)
                .start();
            terminalLen = 'that was [artist]. i got it. better luck next time.'.length;
        };
        if (guessHuman != answer && guessModel != answer) {
            typewriterTerminal
                .typeString('that was [artist]. i did not get it either. so it was probably impossible for you.')
                .pauseFor(1000).callFunction(loadNewQuestion)
                .start();
            terminalLen = 'that was [artist]. i did not get it either. so it was probably impossible for you.'.length;
        };
    };
    pointLoaded = false;
    questionNumber++;
    if (questionNumber == 10) {
        // updateWinner();
    }
};

function getResponse(scenario, correctAnswer) {
    var responses = {
        'humanWin': [
            'wow. you beat me on that one. do not get used to it',
            'well done. my trainer must have been inadequate.',
            'you might as well quit on this high. you will get another right.',
            'i am just lulling you into a false sense of security',
            `you got lucky there.`
        ],
        'modelWin': [
            `that was ${correctAnswer.toLowerCase()}. you need to up your game.`,
            `${correctAnswer.toLowerCase()} there. and that was meant to be an easy one.`,
            `${correctAnswer.toLowerCase()}. this is not going to be much fun if you do not take this seriously`,
            `even my sysadmin knew that that was ${correctAnswer.toLowerCase()}.`,
            `this is pretty one sided. that was ${correctAnswer.toLowerCase()}.`
        ],
        'bothWin': [
            'nicely chosen.',
            'maybe i have met my match',
            'together we could conquer the world',
            'do not get too smug. i got that one too.'
        ],
        'neitherWin': [
            `apparently that was ${correctAnswer.toLowerCase()}.`,
            `i don't have lungs. what is your excuse for getting that wrong. it was ${correctAnswer.toLowerCase()}`,
            `${correctAnswer.toLowerCase()}? never heard of them. this quiz is rubbish.`,
            `who even made this quiz?! it is disastrous. ${correctAnswer.toLowerCase()} made that song.`
        ]
    };
    return responses[scenario][winCounts[scenario]++] 
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


