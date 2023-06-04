class TerrainGen {
    constructor(screenWidth, screenHeight) {
        this.start = screenHeight;
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.segmentLength = 20;
        this.pathWidth = screenWidth - 200;
        this.path = [];
        this.generatePath();
    }

    generatePath() {
        let x = this.screenWidth / 2 - this.pathWidth / 2;
        let y = this.start;
        if (this.path.length == 0) {
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
        } else {
            // console.log("moving path with: " + this.path.length + " length");
            let firstSeg = this.path.shift();
            this.path.shift();
            // console.log("new length: " + this.path.length);
            let xDiff = firstSeg.b.x - firstSeg.a.x;
            let yDiff = firstSeg.b.y - firstSeg.a.y;
            let initialLength = this.path.length;
            let i = 0;
            while (y > 0) {
                if (i < initialLength) {
                    // console.log("updating path: " + i);
                    let x1 = this.path[i].a.x;
                    let y1 = this.path[i].a.y;
                    let x2 = this.path[i].b.x;
                    let y2 = this.path[i].b.y;
                    this.path[i].update(x1 - xDiff, y1 - yDiff, x2 - xDiff, y2 - yDiff);
                    this.path[i + 1].update(x1 - xDiff + this.pathWidth, y1 - yDiff, x2 - xDiff + this.pathWidth, y2 - yDiff);
                    x = this.path[i].b.x;
                    y = this.path[i].b.y;
                    // console.log("updated y to: " + y);
                } else {
                    // console.log("creating new path: " + i);
                    let angle = this.degreesToRadians(this.generateAngle(40, 140));
                    let x2 = x + Math.round(Math.cos(angle) * this.segmentLength);
                    let y2 = y - Math.round(Math.sin(angle) * this.segmentLength);
                    let b1 = new Boundary(x, y, x2, y2);
                    let b2 = new Boundary(x + this.pathWidth, y, x2 + this.pathWidth, y2);
                    this.path.push(b1);
                    this.path.push(b2);
                    x = x2;
                    y = y2;
                    // console.log("created y at: " + y);
                }
                i += 2;
            }
        }
        // console.log("done generating, path length: " + this.path.length);
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
        this.generatePath();
        return this.getPath();
    }
    getPath() {
        return this.path;
    }
}
