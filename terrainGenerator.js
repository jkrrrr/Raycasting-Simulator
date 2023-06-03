class TerrainGen {
    constructor(screenWidth, screenHeight) {
        this.start = screenHeight;
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.segmentLength = 20;
        this.pathWidth = screenWidth - 200;
        this.path = [];
    }

    generatePath() {
        let x = this.screenWidth / 2 - this.pathWidth / 2;
        let y = this.start;
        while (y > 0) {
            let angle = this.degreesToRadians(this.generateAngle(40, 140));
            let x2 = x + Math.round(Math.cos(angle) * this.segmentLength);
            let y2 = y - Math.round(Math.sin(angle) * this.segmentLength);
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

    degreesToRadians(degrees) {
        return (degrees * Math.PI) / 180;
    }

    draw() {
        stroke(255);
        for (var i = 0; i < this.path.length; i++) {
            line(this.path[i].a.x, this.path[i].a.y, this.path[i].b.x, this.path[i].b.y);
        }
    }
}
