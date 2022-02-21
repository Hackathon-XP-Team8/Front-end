import { Donut } from "../charts/donut.mjs";

class Level {
    constructor(points) {
        this.points = points;

        this.requirements = getLevelRequirements();
        console.log(this.requirements)

        this.current = this.getCurrentLevel();
        console.log(this.current)

        this.donut = new Donut(document.getElementById("donut"), this.remaining, this.requirements[this.current + 1]);

        this.showLevel();

        this.rewards = [
            [
                "E-book - Como sair das dívidas",
                "E-book - Como fazer renda extra",
                "Isenção Serasa Premium p/ monitoramento do CPF"
            ],
            [
                "Revisão do limite de crédito",
                "E-book - Controle de gastos",
                "1 semana de Finclass"
            ]
        ];
    }

    showLevel () {
        this.donut.draw()
        const currLvl = document.getElementById("current-lvl");
        if (currLvl) {
            currLvl.textContent = this.getCurrentLevelNumber();

            const currentXp = document.getElementById("current-xp");
            currentXp.textContent = this.remaining;

            const nextXp = document.getElementById("next-xp");
            nextXp.textContent = this.requirements[this.current + 1];
        } else {
            return;
        }
    };

    getCurrentLevel () {
        let remainingPoints = this.points;
        for (let i = 0; i < 10; i++) {
            remainingPoints -= this.requirements[i];
            if (remainingPoints < 0) {
                this.remaining = remainingPoints + this.requirements[i];
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
        let amount = 1000 + i * 1000;
        let mult = Math.round(amount / factor);
        result.push(mult * factor);
    }
    return result;
}

export { Level };