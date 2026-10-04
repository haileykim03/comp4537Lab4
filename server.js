const http = require("http");
const url = require("url");
const fs = require("fs");
const Utils = require("./modules/utils");
const messages = require("./lang/en/en");

class Server {
    constructor(port) {
        this.port = port;
        this.utils = new Utils();
    }

    start() {
        http.createServer((req, res) => this.handleRequest(req, res)).listen(this.port);
    }

    handleRequest(req, res) {
        const q = url.parse(req.url, true);

        if (q.pathname.includes("/getDate")) {
            this.getDate(q, res);
        } else if (q.pathname.includes("/writeFile")) {
            this.writeFile(q, res);
        } else if (q.pathname.includes("/readFile")) {
            this.readFile(q, res);
        } else {
            this.send(res, 404, messages.PAGE_NOT_FOUND);
        }
    }

    getDate(q, res) {
        const message = this.utils.getDate(q.query.name);
        this.send(res, 200, `<p style="color: blue;">${message}</p>`);
    }

    writeFile(q, res) {
        const text = q.query.text;
        fs.appendFile("file.txt", text + "\n", () => {
            this.send(res, 200, messages.WRITE_SUCCESS.replace("%1", text));
        });
    }

    readFile(q, res) {
        const fileName = q.pathname.split("/").pop();
        fs.readFile(fileName, "utf8", (err, data) => {
            if (err) {
                this.send(res, 404, messages.FILE_NOT_FOUND.replace("%1", fileName));
            } else {
                this.send(res, 200, `<pre>${data}</pre>`);
            }
        });
    }

    send(res, status, body) {
        res.writeHead(status, { "Content-Type": "text/html; charset=utf-8" });
        res.end(body);
    }
}

new Server(process.env.PORT || 8888).start();