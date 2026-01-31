const util = require("./modules/utils");
const http = require("http");
const url = require("url");
const fs = require("fs");
const STRINGS = require("../lang/en/en");

class Server {

    // constructor to set the port number
    constructor(port) {
        this.port = port;
    }

    // run func to create and run the server
    run() {
        http.createServer(function (req, res) {

            // Parse the request URL and query parameters
            const q = url.parse(req.url, true);

            // get the pathname
            const path = q.pathname;

            // 
            if (path === "/writeFile") {

                // get the text contents to write in to the file
                const content = q.query["text"] + "\n";
                console.log(content);

                fs.appendFile("file.txt", content, (err) => {
                    if (err) {
                        res.writeHead(500);
                        return res.end("Error writing to file.");
                    }

                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write("<p><i>Content written to file <i></p>");
                    return res.end();

                });
            }
            else {

                // Replace %1 with the name from the query string
                const message = STRINGS.MESSAGE.replace("%1", q.query["name"]);

                // Send response as text/HTML
                res.writeHead(200, { 'Content-Type': 'text/html' });

                // Return blue message with server date
                res.write("<p style='color:blue'>" + message + util.getDate() + " </p>");

                // Signal end of response
                res.end();
            }

        }).listen(this.port);
    }
}

const server = new Server(8000);
server.run();