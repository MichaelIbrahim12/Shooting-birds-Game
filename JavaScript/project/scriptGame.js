let urlParams = window.location.search;
let userName = urlParams.split("=")[2].toLowerCase().replace("+", " ");
let body = document.querySelector("body");
let bodyWidth = body.clientWidth;
let bodyheigth = body.clientHeight;
let startButton = document.querySelector(".btn");
let introduction = document.querySelector(".introduction");
let images = ["./images/bird1.gif", "./images/bird2.gif", "./images/bird3.gif"];
let bomb1 = document.querySelector(".bomb1");
let bomb2 = document.querySelector(".bomb2");
let bomb3 = document.querySelector(".bomb3");
let allbombs = document.querySelectorAll(".bomb");
let birdsKilled = document.querySelector(".killed");
let score = document.querySelector(".score");
let time = document.querySelector(".time");
let soundKill = new Audio("./sound/kill.mp3");
let bombSound = new Audio("./sound/explosion-5981.mp3");
let birdsArray = [];
let scoreCounter = 0;
let birdsKilledCounter = 0;

class Bird {
  constructor(path, index, topp) {
    let img = document.createElement("img");
    img.setAttribute("src", path);
    this.bird = img;
    this.bird.style.top = topp + "px";
    this.bird.style.left = "0px";
    if (index == 0) {
      this.bird.classList.add("bird1");
    } else if (index == 1) {
      this.bird.classList.add("bird2");
    } else {
      this.bird.classList.add("bird3");
    }
    let parent = document.querySelector("body");
    parent.appendChild(this.bird);
  }
  moveToRight() {
    if (parseInt(this.bird.style.left) < bodyWidth - this.bird.width) {
      this.bird.style.left = parseInt(this.bird.style.left) + 5 + "px";
    } else {
      this.bird.remove();
    }
  }
}

//moving bomb function
movingBomb = (bomb, speed) => {
  let down = 0;
  let leftt = Math.floor(Math.random() * (bodyWidth - 40));
  let id3 = setInterval(() => {
    down += 5;
    if (down < bodyheigth + 30) {
      bomb.style.top = down + "px";
      bomb.style.left = leftt + "px";
    } else {
      bomb.classList.add(".invisible");
      clearInterval(id3);
      bomb.classList.add("visible");
      movingBomb(bomb, speed);
    }
  }, speed);
};


window.addEventListener("load", function () {
  
  //introduction window
  document.querySelector(".name").innerHTML = `welcome ${userName}.`;
  document.querySelector(".nameup").innerHTML = `${userName}`;

  let prevUser=JSON.parse(this.localStorage.getItem(userName))
  if(prevUser!=null ||prevUser==0){
    document.querySelector(".lastscore").innerHTML = `${prevUser.score}`;
    document.querySelector(".lastvisit").innerHTML = `${prevUser.date}`;
  }else{
    document.querySelector(".lastscore").innerHTML = `0`
    document.querySelector(".lastvisit").innerHTML = `First Time`;
  }

  //start of the game
  startButton.addEventListener("click", function () {
    introduction.classList.add("display");

    //pushing bird in array
    let id1 = setInterval(() => {
      let randomBird = Math.floor(Math.random() * 3);
      let randomTop = Math.floor(Math.random() * (bodyheigth - 20));
      let bird = new Bird(images[randomBird], randomBird, randomTop);
      birdsArray.push(bird);
    }, 800);

    //moving birds
    let id2 = setInterval(() => {
      birdsArray.forEach(function (bird) {
        bird.moveToRight();
      });
    }, 50);

    //killing birds with click
    let killingBirds = function () {
      body.addEventListener("click", function (ele) {
        if (ele.target.classList.contains("bird1")) {
          ele.target.setAttribute("src", "./images/killed bird.png");
          setTimeout(function () {
            ele.target.remove();
          }, 500);
          birdsKilledCounter++;
          scoreCounter -= 10;
          soundKill.play();
        } else if (ele.target.classList.contains("bird2")) {
          ele.target.setAttribute("src", "./images/killed bird.png");
          setTimeout(function () {
            ele.target.remove();
          }, 500);
          birdsKilledCounter++;
          scoreCounter += 5;
          soundKill.play();
        } else if (ele.target.classList.contains("bird3")) {
          ele.target.setAttribute("src", "./images/killed bird.png");
          setTimeout(function () {
            ele.target.remove();
          }, 500);
          birdsKilledCounter++;
          scoreCounter += 10;
          soundKill.play();
        }
        birdsKilled.innerHTML = `${birdsKilledCounter}`;
        score.innerHTML = `${scoreCounter}`;
      });
    };

    killingBirds();

    //moving bomb1 immediatly
    movingBomb(bomb1, 80);
    setTimeout(function () {
      bomb1.classList.remove("invisible");
    }, 100);

    //moving bomb2 after 11sec
    setTimeout(function () {
      movingBomb(bomb2, 80);
    }, 11000);
    setTimeout(function () {
      bomb2.classList.remove("invisible");
    }, 11100);

    //moving bomb3 after 14sec
    setTimeout(function () {
      movingBomb(bomb3, 80);
    }, 14000);
    setTimeout(function () {
      bomb3.classList.remove("invisible");
    }, 14100);

    // killing birds with bomb
    allbombs.forEach(function (bomb) {
      bomb.addEventListener("click", function () {
        let allBirds1 = document.querySelectorAll(".bird1");
        let allBirds2 = document.querySelectorAll(".bird2");
        let allBirds3 = document.querySelectorAll(".bird3");
        let bombLeft = bomb.offsetLeft - 100;
        let bombRight = bomb.offsetLeft + bomb.width + 100;
        let bombTop = bomb.offsetTop - 100;
        let bombBottom = bomb.offsetTop + bomb.height + 100;
        bombSound.play();

        allBirds1.forEach(function (ele) {
          if (
            ele.offsetLeft + ele.width > bombLeft &&
            ele.offsetLeft + ele.width < bombRight+50 &&
            ele.offsetTop + ele.height > bombTop &&
            ele.offsetTop + ele.height < bombBottom+50
          ) {
            scoreCounter -= 10;
            birdsKilledCounter++;
            score.innerHTML = `${scoreCounter}`;
            birdsKilled.innerHTML = `${birdsKilledCounter}`;
            ele.setAttribute("src", "./images/explosion.gif");
            setTimeout(function () {
              ele.remove();
            }, 500);
          }
        });
        allBirds2.forEach(function (ele) {
          if (
            ele.offsetLeft + ele.width > bombLeft &&
            ele.offsetLeft + ele.width < bombRight &&
            ele.offsetTop + ele.height > bombTop &&
            ele.offsetTop + ele.height < bombBottom
          ) {
            scoreCounter += 5;
            birdsKilledCounter++;
            score.innerHTML = `${scoreCounter}`;
            birdsKilled.innerHTML = `${birdsKilledCounter}`;
            ele.setAttribute("src", "./images/explosion.gif");
            setTimeout(function () {
              ele.remove();
            }, 500);
          }
        });
        allBirds3.forEach(function (ele) {
          if (
            ele.offsetLeft + ele.width > bombLeft &&
            ele.offsetLeft + ele.width < bombRight &&
            ele.offsetTop + ele.height > bombTop &&
            ele.offsetTop + ele.height < bombBottom
          ) {
            ele.setAttribute("src", "./images/explosion.gif");
            setTimeout(function () {
              ele.remove();
            }, 500);
            scoreCounter += 10;
            birdsKilledCounter++;
            score.innerHTML = `${scoreCounter}`;
            birdsKilled.innerHTML = `${count}`;
          }
        });
      });
    });

    //end of the game
    let endOfGame = function (gameTime) {
      //content of final window
      let finalWindow = document.querySelector(".final");
      let finalScore = document.querySelector(".final--score");
      let finalWord = document.querySelector(".final--word");
      let finalBird = document.createElement("img");
      finalBird.classList.add("final--bird");

      let timerId = setInterval(function () {
        gameTime -= 1;
        time.innerHTML = `${gameTime}`;

        //what will happed when the game finish
        if (gameTime === 0) {
          clearInterval(timerId);
          clearInterval(id1);
          clearInterval(id2);
          let Content = document.querySelectorAll("img");
          Content.forEach(function (ele) {
            ele.remove();
          });

          if (scoreCounter >= 50) {
            finalWindow.prepend(finalBird);
            finalBird.setAttribute("src", "./images/happybird.png");
            finalBird.style.width = "120px";
            finalWord.innerHTML = `You Win`;
            finalScore.innerHTML = `your score:${scoreCounter}`;
          } else {
            finalWindow.prepend(finalBird);
            finalBird.setAttribute("src", "./images/sadbird.png");
            finalWord.innerHTML = `You Lose.`;
            finalScore.innerHTML = `your score:${scoreCounter}`;
          }
          finalWindow.classList.remove("display");
          // sending user data to local storage
          let user={
            score:scoreCounter,
            date:new Date().toLocaleString("en-US")
          }
          localStorage.setItem(userName,JSON.stringify(user))
          let playAgainButton=document.querySelector(".again");
          playAgainButton.addEventListener("click",function(){
            window.location.reload();
          })
        }
      }, 1000);
    };
    endOfGame(60);
  });
});


