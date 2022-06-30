const ship = document.querySelector('.sprite')
const playArea = document.querySelector('#playArea')
const enemies = ['./assets/Enemies/enemyRed1.png', './assets/Enemies/enemyGreen2.png', './assets/Enemies/enemyBlue3.png', './assets/Enemies/enemyBlack4.png']
const instructionsText = document.querySelector('.game-instructions');
const startButton = document.querySelector('.start-button');
const gameover = document.querySelector('.game-over');
const score = document.querySelector('#score')
let pontuation = 0
function flyShip(e) {
    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        moveLeft();
    } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        moveRight();
    }
    else if (e.key === ' ') {
        e.preventDefault();
        fireLaser();
    }
}

function fireLaser() {
    let laser = createElementLaser()
    playArea.appendChild(laser)

    moveLaser(laser)
}
function createElementLaser() {
    let positionX = parseInt(getComputedStyle(ship).getPropertyValue('left'));
    let positionY = parseInt(getComputedStyle(ship).getPropertyValue('top'));
    let newLaser = document.createElement('div')
    newLaser.classList.add('laser')
    newLaser.style.left = `${positionX + 22}px`
    newLaser.style.top = `${positionY - 100}px`

    return newLaser;

}
function moveLaser(laser) {

    setInterval(() => {
        let positionY = parseInt(laser.style.top)
        let enemies = document.querySelectorAll('.enemi')
        enemies.forEach((enemie) => {
            if (checkLaserColision(laser, enemie)) {
                enemie.style.backgroundImage = `url("./assets/Explosion/explosion00_s.png")`;
                enemie.classList.remove('enemi');
                enemie.classList.add('dead-enemi')
                pontuation += 50
                score.innerText = pontuation
            }

        })

        if (positionY <= 0) {
            laser.remove()
        } else {
            laser.style.top = `${positionY - 6}px`

        }

    }, 10)
}

function moveLeft() {
    let leftPosition = getComputedStyle(ship).getPropertyValue('left');
    if (leftPosition === "0px") {
        return
    } else {
        let position = parseInt(leftPosition)
        position -= 30;
        ship.style.left = `${position}px`
    }
}

function moveRight() {
    let leftPosition = getComputedStyle(ship).getPropertyValue('left');
    if (leftPosition === "600px") {
        return
    } else {
        let position = parseInt(leftPosition)
        position += 30;
        ship.style.left = `${position}px`
    }
}

function createEnemies() {
    let newEnemi = document.createElement('div');
    let enemiSprite = enemies[Math.floor(Math.random() * enemies.length)]
    newEnemi.classList.add('enemi')
    newEnemi.classList.add('enemi-transition')
    newEnemi.style.backgroundImage = `url(${enemiSprite})`;
    newEnemi.style.left = `${Math.floor(Math.random() * 330) + 30}px`
    newEnemi.style.top = '-20px';
    playArea.appendChild(newEnemi)
    moveEnemi(newEnemi)
}

function remove_heart(num) {
    let hearts = document.querySelectorAll(".heart");
    hearts[num].style.display = 'none'
}
let heart = 5
function moveEnemi(enemi) {

    setInterval(() => {
        let positionY = parseInt(window.getComputedStyle(enemi).getPropertyValue('top'));
        if (Array.from(enemi.classList).includes('dead-enemi')) {
            if (positionY == 490) {
                enemi.remove()
            }
        }
        if (positionY >= 500) {
            heart -= 1
            enemi.remove()
            remove_heart(heart)
        } else if (heart === 0) {
            gameOver()
        } else {
            enemi.style.top = `${positionY + 10}px`

        }

    }, 30)
}


function checkLaserColision(laser, enemi) {
    let laserTop = parseInt(laser.style.top)
    let laserLeft = parseInt(laser.style.left)
    let enemiTop = parseInt(enemi.style.top)
    let enemiLeft = parseInt(enemi.style.left)
    let laserBottom = laserTop - 20;
    let enemiBottom = enemiLeft + 50;

    if (laserTop != 0 && laserTop - 40 <= enemiTop) {
        if (laserLeft >= enemiLeft && laserLeft <= enemiBottom) {
            return true
        } else {

            return false
        }
    } else {

        return false
    }
}

startButton.addEventListener('click', (event) => {
    playGame();
})

function playGame() {
    startButton.style.display = 'none';
    instructionsText.style.display = 'none';
    gameover.classList.remove('activate')

    window.addEventListener('keydown', flyShip);
    enemiInterval = setInterval(() => {
        createEnemies();
    }, 2000);
}

//função de game over
function gameOver() {
    window.removeEventListener('keydown', flyShip);
    clearInterval(enemiInterval);
    let enemies = document.querySelectorAll('.enemi');
    enemies.forEach((enemi) => enemi.remove());
    let lasers = document.querySelectorAll('.laser');
    lasers.forEach((laser) => laser.remove());
    let hearts = document.querySelectorAll(".heart");
    hearts.forEach((heart) => {
        heart.style.display = "block"
    })
    heart = 5
    pontuation = 0
    score.innerText = 000000
    gameover.classList.add("activate")
    gameover.addEventListener('click', () => {
        gameover.classList.remove('activate')
        startButton.style.display = "block";
        instructionsText.style.display = "block";
    })


}