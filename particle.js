class Particle {
    constructor(brain) {
        this.score = 0;
        this.pos = createVector(width / 2, height / 2);
        this.rays = [];
        this.distances = [];
        for (let a = 0; a < 360; a += 45) {
            this.rays.push(new Ray(this.pos, radians(a)));
        }
        if (brain) {
            this.brain = brain.copy();
        } else {
            this.brain = new NeuralNetwork(this.rays.length, 8, 4);
        }
        this.speed = 20;
    }

    // update(x, y) {
    //     this.pos.set(x, y);
    // }

    right() {
        this.pos.x += this.speed;
    }

    left() {
        this.pos.x -= this.speed;
    }

    up() {
        this.pos.y -= this.speed;
    }

    down() {
        this.pos.y += this.speed;
    }

    mutate() {
        this.brain.mutate(0.1);
    }

    look(walls) {
        let visibleWalls = [];
        this.distances = [];
        for (let ray of this.rays) {
            let closest = null;
            let record = Infinity;
            let w;
            for (let wall of walls) {
                const pt = ray.cast(wall);
                if (pt) {
                    const d = p5.Vector.dist(this.pos, pt);
                    if (d < record) {
                        record = d;
                        closest = pt;
                        w = wall;
                    }
                }
            }
            if (closest) {
                visibleWalls.push(w);
                line(this.pos.x, this.pos.y, closest.x, closest.y);
            }
            this.distances.push(record);
        }
        return visibleWalls;
    }

    dispose() {
        this.brain.dispose();
    }

    setPos(x, y) {
        this.pos = createVector(x, y);
    }
    getPos() {
        return this.pos;
    }

    getRays() {
        return this.rays;
    }

    think() {
        let output = this.brain.predict(this.distances);
        if (Math.round(output[0]) == 1) {
            this.right();
        } else if (Math.round(output[1]) == 1) {
            this.left();
        } else if (Math.round(output[2]) == 1) {
            this.up();
        } else if (Math.round(output[3]) == 1) {
            this.down();
        }
    }

    update() {
        this.score++;
    }

    show() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 4);
        for (let ray of this.rays) {
            ray.show();
        }
    }
}
