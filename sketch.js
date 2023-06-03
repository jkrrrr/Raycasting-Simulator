let g;
function setup() {
    let width = 500;
    let height = 500;
    createCanvas(width, height);
    this.g = new TerrainGen(width, height);
    this.g.generatePath();
}

function draw() {
    background(0);
    this.g.draw();
}
