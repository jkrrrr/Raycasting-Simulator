function nextGeneration() {
    console.log("next generation");
    calculateFitness();
    for (let i = 0; i < TOTAL; i++) {
        particles[i] = pickOne();
    }
    for (let i = 0; i < TOTAL; i++) {
        savedParticles[i].dispose();
    }
    savedParticles = [];
}

function pickOne() {
    let index = 0;
    let r = random(1);
    while (r > 0) {
        r = r - savedParticles[index].fitness;
        index++;
    }
    index--;
    let particle = savedParticles[index];
    let centerOfPath = g.getCenterOfPath();
    let child = new Particle({ brain: particle.brain, pos: createVector(centerOfPath.x, centerOfPath.y) });
    child.mutate();
    return child;
}

function calculateFitness() {
    let sum = 0;
    for (let particle of savedParticles) {
        sum += particle.score;
    }
    for (let particle of savedParticles) {
        particle.fitness = particle.score / sum;
    }
}
