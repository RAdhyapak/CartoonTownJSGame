class Sprite {
    constructor({ position, velocity = 0, image, frames = { max : 1, hold: 10 }, sprites, animate = false }) {
        this.position = position
        this.image = image
        this.frames = { ...frames, val: 0, elasped: 0 }
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.animate = animate
        this.sprites = sprites
        this.opacity = 1
        this.velocity = velocity
    }

    draw() {
        c.save()
        c.globalAlpha = this.opacity;
        c.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height,
        )
        c.restore
        if (!this.animate) return
        if (this.frames.max > 1) {
            this.frames.elasped++ 
        }
        if (this.frames.elasped % this.frames.hold == 0) {
            if (this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0
        }
    }

    
    move() {
        console.log(this.velocity)
        this.position.x += this.velocity
    }

    // attack( {attack, recipient}) {
    //     const tl = gsap.timeline()
    //     tl.to(this.position, {
    //         x: this.position.x - 20
    //     }).to(this.position, {
    //         x: this.position.x + 50,
    //         duration: 0.1,
    //         onComplete: () => {

    //             gsap.to('#draggleHealthBar', {
    //                 width: this.health - attack.damage + '%'
    //             })

    //             gsap.to(recipient.position, {
    //                 x: recipient.position.x + 10,
    //                 yoyo: true,
    //                 repeat: 5,
    //                 duration: 0.08
    //             })

    //             gsap.to(recipient, {
    //                 opacity: 0,
    //                 repeat: 5,
    //                 yoyo: true,
    //                 duration: 0.08
    //             })
    //         }
    //     }).to(this.position, {
    //         x: this.position.x
    //     })
    // }
}


class Boundary {
    static width = 48
    static height = 48
    constructor({ position }) {
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw() {
        // console.log("drawing boundary")
        c.fillStyle = 'rgba(255, 0, 0, 0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}


class AnimatedSprite {
    constructor({ position, destination, direction, velocity, image, frames = { max : 1, hold: 10 }, sprites, opacity = 1 }) {
        this.position = position
        this.destination = destination
        this.image = image
        this.frames = { ...frames, val: 0, elasped: 0 }
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.sprites = sprites
        this.opacity = opacity
        this.direction = direction
        this.velocity = this.direction *  velocity
    }

    draw() {
        c.save()
        c.globalAlpha = this.opacity;
        c.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height,
        )
        c.restore
        if (!this.animate) return
        if (this.frames.max > 1) {
            this.frames.elasped++ 
        }
        if (this.frames.elasped % this.frames.hold == 0) {
            if (this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0
        }
    }

    move() {
        this.position.x += this.velocity
    }
}


class Fish extends AnimatedSprite {

    constructor ( { position, 
        destination, 
        direction, 
        velocity, 
        image, 
        frames = { max : 1, hold: 10 }, 
        sprites, 
        opacity = 1,
        type = "white"} ) {

            super ({ position, 
                destination, 
                direction, 
                velocity, 
                image, 
                frames , 
                sprites, 
                opacity })
            
            this.type = type
            
        }
}