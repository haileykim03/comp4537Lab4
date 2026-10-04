const messages = require("../lang/en/en");

class Utils {
    getDate(name) {
        const greeting = messages.GREETING.replace("%1", name);
        return `${greeting} ${new Date()}`;
    }
}

module.exports = Utils;