require('dotenv').config();
const http = require("http");

// API server class to handle incoming HTTP requests and route them to the appropriate patient service functions
class ApiServer {

    // initialize API server with patient service and config for allowed CORS origin and port to listen on
    constructor(patientService, config) {

        this.patientService = patientService;
        this.allowedOrigin = config.allowedOrigin;
        this.port = config.port;

        // create HTTP server and set up request handler
        this.server = http.createServer((req, res) => {
            this.handleRequest(req, res).catch((err) => this.sendError(res, err));
        });
    }

    // start API server and listen on the configured port
    start() {
        this.server.listen(this.port, () => {
            console.log(`Server2 running on port ${this.port}`);
        });
    }

    // function to set CORS headers on the response to allow cross-origin requests from the configured allowed origin
    setCors(res) {
        res.setHeader("Access-Control-Allow-Origin", this.allowedOrigin);
        res.setHeader("Vary", "Origin");
        res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    }

    // helper function to send a JSON response with the given status code and object as the response body
    sendJson(res, statusCode, obj) {
        res.writeHead(statusCode, { "Content-Type": "application/json" });
        res.end(JSON.stringify(obj));
    }

    sendError(res, err) {
        const status = err.statusCode || 500;
        this.sendJson(res, status, { ok: false, error: err.message });
    }

    async handleRequest(req, res) {
        this.setCors(res);

        // Preflight (browser sends this for cross-origin)
        if (req.method === "OPTIONS") {
            res.writeHead(204);
            res.end();
            return;
        }

        const parsed = new URL(req.url, `http://${req.headers.host}`);
        const path = parsed.pathname;

        // POST insert endpoint
        if (req.method === "POST" && path === "/lab4/api/insert") {
            const inserted = await this.patientService.insertPatients();
            this.sendJson(res, 200, { ok: true, inserted });
            return;
        }

        // GET SQL endpoint
        if (req.method === "GET" && path.startsWith("/lab4/api/sql/")) {
            const encoded = path.replace("/lab4/api/sql/", "");
            const sql = decodeURIComponent(encoded);

            const rows = await this.patientService.runSelectQuery(sql);
            this.sendJson(res, 200, { ok: true, rows });
            return;
        }

        this.sendJson(res, 404, { ok: false, error: "Not found" });
    }
}

module.exports = ApiServer;