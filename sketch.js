let b;
function setup() {
    createCanvas(500, 500);
    this.b = new Boundary(300, 300, 300, 450);
}

function draw() {
    background(0);
    this.b.draw();
}
