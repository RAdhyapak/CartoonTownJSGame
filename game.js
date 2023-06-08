const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

document.getElementById("fishingDashboard").style.display = "none";
let fishingGame = {
    goal: 5,
    score: 0,
    initiated: false, // flag for when fishing game is on screen
    inProgress: true, // flag for when fishing game is in progress
    fishes: [],
    initFishing: () => {
        fishingGame.score = 0
        fishingGame.fishes = []
        fishingGame.initiated = true
        fishingGame.inProgress = true
        document.getElementById("fishingDashboard").style.display = "block";
    },
    onRestart: () => {
        fishingGame.score = 0
        fishingGame.fishes = []
        fishingGame.inProgress = true
        document.getElementById("fishing-score").innerHTML = "0"

    }, 
    onWin: () => {
        fishingGame.inProgress = false
        document.getElementById("fishing-score").innerHTML = fishingGame.score + " Won!!"
        fishingGame.fishes.forEach( (fish, i) => {
            gsap.to(fish, {
                opacity: 0,
                repeat: 3,
                yoyo: true,
                duration: 0.08,
                onComplete: (i) => {
                    fishingGame.fishes.splice(i, 1)
                }
            })
        })
    },
    onExit: () => {
        fishingGame.initiated = false
        document.getElementById("fishingDashboard").style.display = "none";
        window.cancelAnimationFrame(fishingAnimationFrame)
        animate()
        player.position.x = 500
        player.position.y = 200
        gsap.to('#overlappingDiv', {
            opacity: 0,
            duration: 0.04
        })
    }, 
    fishGenerator: (fishTimer) => {
        if (fishTimer % 50 == 0) {
            fish = fishpool[getRandomInt(fishpool.length)]
            const newFishImage = new Image()
            newFishImage.src = fish.src
            const newFish = new Fish({
                position: {
                    x: fish.spawnLocation.x,
                    y: Math.random() * (400 - 0) + 0
                },
                velocity: Math.random() * (7 - 3) + 3,
                direction: fish.direction,
                image:  newFishImage,
                animate: true,
                opacity: 0.5,
                type: fish.type
            }) 
            fishingGame.fishes.push(newFish)
            // console.log("fishingGame.fishes: " + fishingGame.fishes.length);
            fishTimer = 0
        }
    
    }
}

const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, i + 70))
}

const fishingZonesMap = []
for (let i = 0; i < fishingZonesData.length; i += 70) {
    fishingZonesMap.push(fishingZonesData.slice(i, i + 70))
}

console.log(fishingZonesMap)

const boundaries = []
const fishingZones = []
const offset = {
    x: -400,
    y: -500
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
        }
    })
})


fishingZonesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {
            fishingZones.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
        }
    })
})


const map = new Image()
map.src = "./img/rohanmap.png"

const foregroundImage = new Image()
foregroundImage.src = "./img/foreground.png"

const playerDownImage = new Image()
playerDownImage.src = "./img/playerDown.png"

const playerUpImage = new Image()
playerUpImage.src = "./img/playerUp.png"

const playerLeftImage = new Image()
playerLeftImage.src = "./img/playerLeft.png"

const playerRightImage = new Image()
playerRightImage.src = "./img/playerRight.png"

const fishImages = ["./img/fish_yellow.png", "./img/fish_red.png", "./img/fish_white.png"]

const fishpool = [
    {
        spawnLocation: {
            x: 1024,
            y: Math.random() * (400 - 0) + 0, // this is not used
        },
        velocity: Math.random() * (7 - 3) + 3,
        direction: -1,
        src: "./img/fish/yellowFishLeft.png",
        type: "yellow"
    }, 
    {
        spawnLocation: {
            x: 1024,
            y: Math.random() * (400 - 0) + 0, // this is not used
        },
        velocity: Math.random() * (7 - 3) + 3,
        direction: -1,
        src: "./img/fish/redFishLeft.png",
        type: "red"
        
    },
    {
        spawnLocation: {
            x: 1024,
            y: Math.random() * (400 - 0) + 0, // this is not used
        },
        velocity: Math.random() * (7 - 3) + 3,
        direction: -1,
        src: "./img/fish/whiteFishLeft.png",
        type: "white"
    },
    {
        spawnLocation: {
            x: -50,
            y: Math.random() * (400 - 0) + 0,
        },
        y: Math.random() * (400 - 0) + 0,
        velocity: Math.random() * (7 - 3) + 3,
        direction: 1,
        src: "./img/fish/yellowFishRight.png",
        type: "yellow"
    },
    {
        spawnLocation: {
            x: -50,
            y: Math.random() * (400 - 0) + 0,
        },
        y: Math.random() * (400 - 0) + 0,
        velocity: Math.random() * (7 - 3) + 3,
        direction: 1,
        src: "./img/fish/redFishRight.png",
        type: "red"
    },
    {
        spawnLocation: {
            x: -50,
            y: Math.random() * (400 - 0) + 0,
        },
        y: Math.random() * (400 - 0) + 0,
        velocity: Math.random() * (7 - 3) + 3,
        direction: 1,
        src: "./img/fish/whiteFishRight.png",
        type: "white"
    }
]

const player = new Sprite( {
    position: {
        x: canvas.width / 2 - 192 / 2,
        y: canvas.height / 2 - 68 / 2
    },
    image: playerDownImage,
    frames: {
        max: 4,
        hold: 10
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage
    }
})

const background = new Sprite({
    position : {
        x: offset.x,
        y: offset.y
    }, 
    image: map
})

const foreground = new Sprite({
    position : {
        x: offset.x,
        y: offset.y
    }, 
    image: foregroundImage
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}


const movables = [background, ...boundaries, foreground, ...fishingZones]

function rectangularCollision({rectangle1, rectangle2}) {
    return (rectangle1.position.x + rectangle1.width > rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y)
}


function animate() {
    const animationId = window.requestAnimationFrame(animate)
    console.log(fishingGame.score)
    background.draw()
    boundaries.forEach(boundary => {
        boundary.draw()
        
    })

    fishingZones.forEach( fishingZone => {
        fishingZone.draw()
    })

    player.draw()
    foreground.draw()

    let moving = true
    player.animate = false
    if (fishingGame.initiated) return

    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
        for (let i = 0; i < fishingZones.length; i++) {
            const fishingZone = fishingZones[i]
            if (rectangularCollision({rectangle1: player, rectangle2: fishingZone})) {
                console.log("fishing zone touched. Activate fishing game")
                
                // deactivate current animation loop
                window.cancelAnimationFrame(animationId)

                fishingGame.initiated = true
                gsap.to('#overlappingDiv', {
                    opacity: 1,
                    repeat: 1,
                    yoyo: true,
                    duration: 0.4,
                    onComplete() {
                        gsap.to('#overlappingDiv', {
                            opacity: 1,
                            duration: 0.4,
                            onComplete() {
                                // activate new animation loop
                                fishingGame.initFishing()
                                animateFishing()
                                gsap.to('#overlappingDiv', {
                                    opacity: 0,
                                    duration: 0.4
                                })
                            }
                        })
                    }
                })
                break
            }
        }
    }


    if (keys.w.pressed && lastKey === 'w') {
        player.animate = true
        player.image = player.sprites.up
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({ 
                rectangle1 : player, 
                rectangle2: { 
                    ...boundary, 
                    position: { 
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }
                } 
            })) {
                moving = false
                break
            }
        }
        if (moving)
            movables.forEach(movable => {
                movable.position.y += 3
            })
    }
    else if (keys.a.pressed && lastKey === 'a') {
        player.animate = true
        player.image = player.sprites.left
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({ 
                rectangle1 : player, 
                rectangle2: { 
                    ...boundary, 
                    position: { 
                        x: boundary.position.x + 3,
                        y: boundary.position.y
                    }
                } 
            })) {
                moving = false
                break
            }
        }
        if (moving)
            movables.forEach(movable => {
                movable.position.x += 3
            })
    }
    else if (keys.s.pressed && lastKey === 's') {
        player.animate = true
        player.image = player.sprites.down
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({ 
                rectangle1 : player, 
                rectangle2: { 
                    ...boundary, 
                    position: { 
                        x: boundary.position.x,
                        y: boundary.position.y - 3
                    }
                } 
            })) {
                moving = false
                break
            }
        }
        if (moving)
            movables.forEach(movable => {
                movable.position.y -= 3
            })
    }
    else if (keys.d.pressed && lastKey === 'd') {
        player.animate = true
        player.image = player.sprites.right
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({ 
                rectangle1 : player, 
                rectangle2: { 
                    ...boundary, 
                    position: { 
                        x: boundary.position.x - 3,
                        y: boundary.position.y
                    }
                } 
            })) {
                moving = false
                break
            }
        }
        if (moving)
            movables.forEach(movable => {
                movable.position.x -= 3
            })
    }
}


const fishingBackgroundImage = new Image()
fishingBackgroundImage.src = "./img/fish/fishingBackground.png"

const fishingBackground = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: fishingBackgroundImage
})

let fishTimer = 1

function animateFishing() {
    fishingAnimationFrame = window.requestAnimationFrame(animateFishing)
    console.log("Animating fishing")
    fishingBackground.draw()

    if (fishingGame.inProgress) {
        if (fishingGame.goal === fishingGame.score) {
            fishingGame.onWin()
        }
        fishingGame.fishes.forEach((fish, i) => {
            if (fish.position.x < -100 || fish.position.x > 1024) {
                fishingGame.fishes.splice(i, 1)
            } else {
                fish.draw()
                fish.move()
            }
        })
        fishingGame.fishGenerator(fishTimer)
        fishTimer += 1
    }

}

animate()
// animateFishing()


let lastKey = ''
window.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break

        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break

        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break

        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch(event.key) {
        case 'w':
            keys.w.pressed = false
            break

        case 'a':
            keys.a.pressed = false
            break

        case 's':
            keys.s.pressed = false
            break

        case 'd':
            keys.d.pressed = false
            break
    }
})

// TODO: Fish test
function isWithin(point, fish) {
    // console.log(fish.position.x + ">=" + point.x + "<=" + (fish.position.x + fish.width))
    // console.log(fish.position.y + ">=" + point.y + "<=" + (fish.position.y + fish.height))
    
    let result = (point.x >= fish.position.x) && (point.x <= (fish.position.x + fish.width)) && 
    (point.y >= fish.position.y) && (point.y <= (fish.position.y + fish.height)) 
    // console.log("result: " + result)
    return result
  }
  
  canvas.addEventListener('click', (e) => {
    const mousePoint = {
      x: e.clientX,
      y: e.clientY
    };
    fishingGame.fishes.forEach((fish, i) => {
      if (isWithin(mousePoint, fish)) {
        // console.log('clicked on fish at index: ' + i);
        if (fish.type === "red") {
            gsap.to(fish, {
                opacity: 0,
                repeat: 5,
                yoyo: true,
                duration: 0.08,
                onComplete: (i) => {
                    console.log("game over. ")
                    document.getElementById("fishing-score").innerHTML = "Game Over"
                    fishingGame.onStop()
                }
            })
        } else {
            fishingGame.fishes.splice(i, 1);
            fishingGame.score += 1
            document.getElementById("fishing-score").innerHTML = fishingGame.score
        }
        
      }
    });
})

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
