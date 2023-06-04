class MyEnvironment extends BaseEnvironment {
    constructor() {
        super();
        this.state = {
            // Initialize the state of the environment.
        };
    }

    step(action) {
        // Update the state of the environment based on the action taken by the agent.

        // Return a new episode object.
        return new Episode(this.state, reward, isDone);
    }

    reset() {
        // Reset the state of the environment.

        // Return a new episode object.
        return new Episode(this.state, reward, isDone);
    }
}
