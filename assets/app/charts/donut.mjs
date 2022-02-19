class Donut {
    constructor(HTMLElement, current, max) {
        this.el = HTMLElement

        this.width = this.el.offsetWidth;

        this.el.style.height = this.width + "px";

        this.radius = this.width / 2 - 30;

        this.ctx = this.el.getContext("2d");
        this.ctx.imageSmoothingEnabled = true;

        this.ctx.width = this.width;
        this.ctx.height = this.width;

        this.setup();

        this.size = 20;

        this.current = current;
        this.max = max;
        this.ratio = current / max;

        this.delay = 30;
        this.frame = 0;
        this.duration = 60;
    }

    setup () {
        this.ctx.translate(this.width / 2, this.width / 2);
        this.ctx.rotate(Math.PI);
        this.ctx.scale(-1, 1);
        this.ctx.fillStyle = "white";
    }


    draw () {
        this.outside();
        this.progress();
    }

    outside () {
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.arc(0, 0, this.radius + this.size, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fillStyle = "#4f4f4f";
        this.ctx.fill();
    }

    inside () {
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.arc(0, 0, this.radius - this.size + 1, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fillStyle = "#212529";
        this.ctx.fill();
    }

    progress () {
        if (this.frame > this.delay && this.frame < this.duration + this.delay) {
            const index = (this.frame - this.delay) * this.ratio / this.duration
            const x = Math.cos(index * Math.PI * 2 - Math.PI / 2) * this.radius;
            const y = -Math.sin(index * Math.PI * 2 - Math.PI / 2) * this.radius;
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.arc(x, y, this.size, 0, Math.PI * 2);
            this.ctx.closePath();
            this.ctx.fillStyle = "#fec434";
            this.ctx.fill();

            this.inside();
        }

        this.frame++;
        requestAnimationFrame(() => this.progress());
    }
}

export { Donut };