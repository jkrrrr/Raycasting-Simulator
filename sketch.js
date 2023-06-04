let g;
let particle;
function setup() {
    let width = 500;
    let height = 500;
    createCanvas(width, height);
    g = new TerrainGen(width, height);
    particle = new Particle();
    frameRate(20);
}

function draw() {
    background(0);
    let path = g.draw();
    particle.update(mouseX, mouseY);
    particle.show();
    particle.look(path);
    // ray.show();
    // ray.lookAt(mouseX, mouseY);

    //   let pt = ray.cast(b);
    //   if (pt) {
    //       fill(255);
    //       ellipse(pt.x, pt.y, 8, 8);
}
