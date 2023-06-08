class Ray {
    constructor(pos, angle) {
        this.pos = pos;
        this.dir = p5.Vector.fromAngle(angle);
    }

    show() {
        stroke(255);
        push();
        translate(this.pos.x, this.pos.y);
        line(0, 0, this.dir.x * 10, this.dir.y * 10);
        pop();
    }

    lookAt(x, y) {
        this.dir.x = x - this.pos.x;
        this.dir.y = y - this.pos.y;
        this.dir.normalize();
    }

    cast(wall) {
        const center = wall.center;
        // console.log("center: " + center);
        const length = wall.length;
        // console.log("length: " + length);
        const angle = wall.angle;
        // console.log("angle: " + angle);
        const xLen = Math.round(Math.sin(radians(angle)) * (length / 2 + 1));
        const yLen = Math.round(Math.cos(radians(angle)) * (length / 2 + 1));
        // console.log("xLen: " + xLen);
        // console.log("yLen: " + yLen);
        const x1 = wall.a.x + (xLen - Math.abs(center.x - wall.a.x)) * (Math.abs(wall.a.x - center.x + 1) / (wall.a.x - center.x + 1.5));
        // console.log("x1: " + x1);
        const y1 = wall.a.y + (yLen - Math.abs(center.y - wall.a.y)) * (Math.abs(wall.a.y - center.y + 1) / (wall.a.y - center.y + 1.5));
        // console.log("y1: " + y1);
        const x2 = wall.b.x + (xLen - Math.abs(center.x - wall.b.x)) * (Math.abs(wall.b.x - center.x + 1) / (wall.b.x - center.x + 1.5));
        // console.log("x2: " + x2);
        const y2 = wall.b.y + (yLen - Math.abs(center.y - wall.b.y)) * (Math.abs(wall.b.y - center.y + 1) / (wall.b.y - center.y + 1.5));
        // console.log("y2: " + y2);

        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.dir.x;
        const y4 = this.pos.y + this.dir.y;

        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (den == 0) {
            return;
        }

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

        if (t > 0 && t < 1 && u > 0) {
            const pt = createVector();
            pt.x = x1 + t * (x2 - x1);
            pt.y = y1 + t * (y2 - y1);
            return pt;
        }
        return false;
    }
}
