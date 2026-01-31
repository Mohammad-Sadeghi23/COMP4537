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
        http.createServer((req, res) => {

            // Parse the request URL and query parameters
            const q = url.parse(req.url, true);

            // get the pathname
            const path = q.pathname;

            // if accessing writeFile page
            if (path.startsWith("/writeFile/")) {

                this.handleWriteFile(q, res);
            }
            // if accessing readFile page
            else if (path.startsWith("/readFile/")) {

                this.handleReadFile(path, res);
            }
            // if accessing getDate page
            else if (path.startsWith("/getDate/")) {

                this.handleGetDate(q, res);
            }
            // else the entered page does not exist
            else {

                // Send response as text/HTML
                res.writeHead(404, { 'Content-Type': 'text/html' });

                // Print that page was not found
                res.write("<p style='color:red'> 404 Error Page not Found! </p>");

                // Signal end of response
                res.end();
            }

        }).listen(this.port);
    }

    handleWriteFile(q, res) {
        const text = (q.query.text || "").trim();

        // if text is undefined send 400 error
        if (!text) {
            res.writeHead(400, { 'Content-Type': 'text/html' });
            return res.end("<p style='color:red'> 400 Error, user did not enter a text! </p>");
        }

        // get the text contents to write in to the file
        const content = text + "\n";

        // append the given text to file.txt
        fs.appendFile("file.txt", content, (err) => {
            if (err) {
                res.writeHead(500);
                return res.end("Error writing to file.");
            }

            // if no errors return 200 with success message
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write("<p><i>Content written to file </i></p>");
            return res.end();

        });
    }

    handleReadFile(path, res) {

        // get the name of the file to read from the pathname
        const fileName = path.replace("/readFile/", "");

        // read the file
        fs.readFile(fileName, function (err, data) {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                return res.end(`<p style='color:red'>404 error file: ${fileName} not found! </p>`);
            }

            // if no errors return 200 with data in the file
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write(data);
            return res.end();
        })
    }

    handleGetDate(q, res) {
        // get the name from the url
        const name = (q.query.name || "").trim();

        // if the name is not given, return a 400 error
        if (!name) {
            res.writeHead(400, { 'Content-Type': 'text/html' });
            return res.end("<p style='color:red'> 400 Error, missing ?name= </p>");
        }

        // Replace %1 with the name from the query string
        const message = STRINGS.MESSAGE.replace("%1", name);

        // Send response as text/HTML
        res.writeHead(200, { 'Content-Type': 'text/html' });

        // Return blue message with server date
        res.write("<p style='color:blue'>" + message + util.getDate() + " </p>");

        // Signal end of response
        res.end();
    }
}

const server = new Server(8000);
server.run();