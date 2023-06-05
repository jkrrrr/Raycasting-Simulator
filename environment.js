class MyEnvironment extends BaseEnvironment {
    constructor(screenWidth, screenHeight) {
        super();
        this.width = screenWidth;
        this.height = screenHeight;
        this.edgeBoundaries.push(new Boundary(0, 0, this.width, 0));
        this.edgeBoundaries.push(new Boundary(this.width, 0, this.width, this.height));
        this.edgeBoundaries.push(new Boundary(this.width, this.height, 0, this.height));
        this.edgeBoundaries.push(new Boundary(0, this.height, 0, 0));

        this.g = new TerrainGen(this.width, this.height);
        this.particle = new Particle();
    }

    step(action) {
        // Update the state of the environment based on the action taken by the agent.
        if (action == 0) {
            this.particle.up();
        } else if (action == 1) {
            this.particle.right();
        } else if (action == 2) {
            this.particle.down();
        } else if (action == 3) {
            this.particle.left();
        } else {
            //do nothing
        }

        this.g.generatePath();

        // Return a new episode object.
        return this.isDone();
        // return new Episode(this.state, reward, isDone);
    }

    reset() {
        // Reset the state of the environment.
        this.particle.setPos(this.width / 2, this.height / 2);
        // Return a new episode object.
        // return new Episode(this.state, reward, isDone);
    }

    isDone() {
        let path = this.g.getPath();
        let allEdges = path.concat(this.edgeBoundaries);
        let visibleWalls = this.particle.look(allEdges);
        for (wall of visibleWalls) {
            if (this.edgeBoundaries.includes(wall)) {
                return true;
            }
        }
        return false;
    }
}
