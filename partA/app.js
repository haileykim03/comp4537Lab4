const MathUtils = require("./modules/math");

class App {
    constructor() {
        this.math = new MathUtils();
    }

    run() {
        console.log(`Hello Hailey. The sum is ${this.math.add(5, 3)} and the difference is ${this.math.subtract(5, 3)}`);
    }
}

new App().run();