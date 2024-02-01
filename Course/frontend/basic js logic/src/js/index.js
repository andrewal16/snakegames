const board = document.querySelector(".board")

console.log(board);

const randomPosition = () => ~~(Math.random()*15) +1
let currentTitle;
let count = 0;



let config = {
    speed: 150,
    level:1,
    player:{
        x:randomPosition(),
        y:randomPosition(),
    },
    food:{
        x:randomPosition(),
        y: randomPosition(),
    },
    velocity:{
        x:0,
        y:0,
    },
    showTitle(){
        if (currentTitle) {
            currentTitle.style.opacity = "0";
            currentTitle.style.visibility = "hidden";
            currentTitle.style.zIndex = "-1";
        }
    
        switch (config.level) {
            case 1:
                currentTitle = document.getElementById("title_1");
                break;
            case 2:
                currentTitle = document.getElementById("title_2");
                break;
            case 3:
                currentTitle = document.getElementById("title_3");
                break;
            case 4:
                currentTitle = document.getElementById("title_4");
                break;
            case 5:
                currentTitle = document.getElementById("title_5");
                break;
            default:
                break;
        }
    
        if (currentTitle) {
            currentTitle.style.opacity = "1";
            currentTitle.style.visibility = "visible";
            currentTitle.style.zIndex = "1";
        }
    }
}
let lastPosition = {x: config.player.x, y: config.player.y};

const games = {
    createFood(){
        board.innerHTML = `<div class = "food" style="grid-area: ${config.food.y} / ${config.food.x}"></div>`
    },
    createPlayer(){
        board.innerHTML += `<div class = "player" id="player" style = "grid-area: ${config.player.y} / ${config.player.x}"></div>`
    },
    movePlayer(){
        lastPosition.x = config.player.x;
        lastPosition.y = config.player.y;

        config.player.x += config.velocity.x
        config.player.y += config.velocity.y


    },
    resetPlayer(){
        if(config.player.x <= 0 || config.player.x > 15 || config.player.y <=0 || config.player.y > 15){
            console.log("Kalah");
            config.player.x = lastPosition.x;
            config.player.y = lastPosition.y;
    
            
            const playerEl = document.getElementById("player");
            playerEl.style.gridArea = `${config.player.y} / ${config.player.x}`;
        }
    },
    levelUp(){
        config.level += 1;
        console.log(config.level);
    },
    isWin(){

        if(config.player.x == config.food.x && config.player.y == config.food.y){
            config.showTitle()
            // this.levelUp()
            return true;
        }
        return false
    },
    randomFoodPosition(){
        config.food.x = randomPosition()
        config.food.y = randomPosition()
    }
}

function movement(listen){
    // console.log(listen.key);
    switch(listen.key){
        case "ArrowUp":
            config.velocity.y = -1;
            config.velocity.x = 0;
        break;
        case "ArrowDown":
            config.velocity.y = 1;
            config.velocity.x = 0;
        break;
        case "ArrowLeft":
            config.velocity.y = 0;
            config.velocity.x = -1;
        break;
        case "ArrowRight":
            config.velocity.y = 0;
            config.velocity.x = 1;
        break;
        default:
            break;
    }
    
    
}

function headMovement(){
    const playerEl = document.getElementById("player")
    if(config.velocity.x ==-1){
        playerEl.style.transform = "scaleX(-1)";
    }
    if(config.velocity.y == 1){
        playerEl.style.transform = "rotate(90deg)";
    }
    if(config.velocity.y == -1){
        playerEl.style.transform = "rotate(-90deg)";
    }
}

function start(){
    games.createFood()
    games.createPlayer()
    games.movePlayer();
    headMovement()
    games.resetPlayer()
    
    const win = games.isWin();
    if(win) {
        count+=1;
        games.randomFoodPosition();
        if(count == 5){
            games.levelUp()
            count=0;
        }
    }
}


setInterval(start, config.speed)


document.addEventListener("keydown", movement)