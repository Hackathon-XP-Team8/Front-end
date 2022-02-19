class Level {
    constructor() {
        this.points;

        this.requirements = getLevelRequirements();

        this.current = this.getCurrentLevel();

        this.progress = this.points / this.requirements[this.current + 1];

        this.rewards = [
            ""
        ];
    }

    getCurrentLevel () {
        let remainingPoints = this.points;
        for (let i = 0; i < 10; i++) {
            remainingPoints -= this.requirements[i];
            if (remainingPoints < 0) {
                return i - 1;
            }
        }
    }

    getCurrentLevelNumber () {
        return this.current + 2;
    }
}

function getLevelRequirements () {
    const factor = 100;
    const result = [];
    for (let i = 0; i < 10; i++) {
        let amount = 500 + (200 * i ** 1.5);
        let mult = Math.round(amount / factor);
        result.push(mult * factor);
    }
    return result;
}
