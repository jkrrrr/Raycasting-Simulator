let g;
let particle;
let edgeBoundaries = [];
function setup() {
    let width = 500;
    let height = 500;
    createCanvas(width, height);
    edgeBoundaries.push(new Boundary(0, 0, width, 0));
    edgeBoundaries.push(new Boundary(width, 0, width, height));
    edgeBoundaries.push(new Boundary(width, height, 0, height));
    edgeBoundaries.push(new Boundary(0, height, 0, 0));

    g = new TerrainGen(width, height);
    particle = new Particle();
    frameRate(15);
}

function keyPressed() {
    if (key === "ArrowUp") {
        particle.up();
    } else if (key === "ArrowDown") {
        particle.down();
    } else if (key === "ArrowLeft") {
        particle.left();
    } else if (key === "ArrowRight") {
        particle.right();
    }
}

function draw() {
    background(0);
    for (let edge of edgeBoundaries) {
        edge.draw();
    }

    let path = g.draw();
    let allEdges = path.concat(edgeBoundaries);
    particle.look(allEdges);
    particle.show();
    g.generatePath();
}
