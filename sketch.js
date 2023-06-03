let g;
function setup() {
    createCanvas(500, 500);
    this.g = new TerrainGen(500, 300, 500);
    this.g.generatePath();
}

function draw() {
    background(0);
    this.g.draw();
}
