let g;
function setup() {
    let width = 500;
    let height = 500;
    createCanvas(width, height);
    g = new TerrainGen(width, height);
    frameRate(20);
}

function draw() {
    background(0);
    g.draw();
}
