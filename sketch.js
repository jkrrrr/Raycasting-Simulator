let b = [];
let ray;
let particle;
function setup() {
    createCanvas(500, 500);
    for (let i = 0; i < 5; i++) {
        let x1 = random(width);
        let y1 = random(height);
        let x2 = random(width);
        let y2 = random(height);
        b[i] = new Boundary(x1, y1, x2, y2);
    }
    particle = new Particle();
}

function draw() {
    background(0);
    for (let wall of b) {
        wall.draw();
    }
    particle.update(mouseX, mouseY);
    particle.show();
    particle.look(b);
    // ray.show();
    // ray.lookAt(mouseX, mouseY);

    //   let pt = ray.cast(b);
    //   if (pt) {
    //       fill(255);
    //       ellipse(pt.x, pt.y, 8, 8);
}



