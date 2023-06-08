class Boundary {
    constructor(x1, y1, x2, y2) {
        this.update(x1, y1, x2, y2);
    }

    update(x1, y1, x2, y2) {
        this.a = createVector(x1, y1);
        this.b = createVector(x2, y2);

        this.center = createVector(Math.round((x1 + x2) / 2), Math.round((y1 + y2) / 2));
        this.length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

        let opp = x1 - x2;
        let adj = y1 - y2;
        let ang = Math.atan(opp / adj);

        this.angle = Math.abs((ang * 180) / Math.PI);
    }

    draw() {
        stroke(255);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
}
