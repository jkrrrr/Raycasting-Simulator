let g;
let edgeBoundaries = [];

const TOTAL = 250;
let particles = [];
let savedParticles = [];
let counter = 0;

function keyPressed() {
    if (key === "s") {
        let particle = particles[0];
        saveJSON(particle.brain, "particle.json");
    }
}

function setup() {
    tf.setBackend("cpu");
    let width = 500;
    let height = 500;
    createCanvas(width, height);
    edgeBoundaries.push(new Boundary(0, 0, width, 0));
    edgeBoundaries.push(new Boundary(width, 0, width, height));
    edgeBoundaries.push(new Boundary(width, height, 0, height));
    edgeBoundaries.push(new Boundary(0, height, 0, 0));

    g = new TerrainGen(width, height);
    for (let i = 0; i < TOTAL; i++) {
        particles[i] = new Particle();
    }
    frameRate(15);
}

function keyPressed() {
    if (key === "ArrowUp") {
        particles[0].up();
    } else if (key === "ArrowDown") {
        particles[0].down();
    } else if (key === "ArrowLeft") {
        particles[0].left();
    } else if (key === "ArrowRight") {
        particles[0].right();
    }
}

function draw() {
    counter++;
    background(0);
    for (let edge of edgeBoundaries) {
        edge.draw();
    }
    let path = g.draw();
    let allEdges = path.concat(edgeBoundaries);

    //check if particle collides
    for (let j = particles.length - 1; j >= 0; j--) {
        particles[j].show();
        let visibleWalls = particles[j].look(allEdges);
        let pos = particles[j].getPos();
        if (pos.y >= height || pos.y <= 0) {
            console.log("out of bounds");
            savedParticles.push(particles.splice(j, 1)[0]);
        } else {
            for (vw of visibleWalls) {
                if (vw == edgeBoundaries[1] || vw == edgeBoundaries[3]) {
                    console.log("out of bounds");
                    savedParticles.push(particles.splice(j, 1)[0]);
                    break;
                }
            }
        }
    }

    for (p of particles) {
        p.think();
        p.update();
    }

    if (particles.length === 0) {
        counter = 0;
        nextGeneration();
    }

    g.generatePath();
}
