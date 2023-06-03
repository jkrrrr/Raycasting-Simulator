class TerrainGen {
    constructor(start, length, screenWidth) {
        this.start = start;
        this.pathLength = length;
        this.screenWidth = screenWidth;
        this.segmentLength = 10;
        this.pathWidth = 100;
        this.path = [];
    }

    generatePath() {
        let boundarys = [];
        let x = this.start;
        let y = this.screenWidth / 2 - this.pathWidth / 2;
        for (var i = 0; i < this.pathLength; i++) {
            let angle = this.generateAngle(40, 140);
            let x2 = Math.cos(angle) * this.segmentLength;
            let y2 = Math.sin(angle) * this.segmentLength;
            let b1 = new Boundary(x, y, x2, y2);
            let b2 = new Boundary(x + this.pathWidth, y, x2 + this.pathWidth, y2);
            this.path.push(b1);
            this.path.push(b2);
            x = x2;
            y = y2;
        }
    }

    generateAngle(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    draw() {
        stroke(255);
        for (var i = 0; i < this.path.length; i++) {
            line(this.path[i].a.x, this.path[i].a.y, this.path[i].b.x, this.path[i].b.y);
        }
    }
}
