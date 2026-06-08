const express = require("express");
const http = require("http");
const https = require("https");
const fs = require("fs");

const app = express();
app.use(express.json());

function loadConfig() {
    return JSON.parse(fs.readFileSync("route.json"));
}

app.use((req, res) => {
    const route = loadConfig();
    const parts = req.path.split("/").filter(p => p !== "");
    const service = parts[1];
    const config = route[service];

    if (!config || !config.target) {
        return res.status(404).json({ error: "This Service is not in the proxy config" });
    }

    let forwardPath = "";
    const rest = parts.slice(2).join("/");
    if (rest.length > 0) {
        forwardPath = "/" + rest;
    }

    const query = req.url.includes("?") ? "?" + req.url.split("?")[1] : "";
    const target = config.target + forwardPath + query;

    const client = target.startsWith("https") ? https : http;

    const options = {
        method: req.method,
        headers: req.headers,
        rejectUnauthorized: false
    };

    const proxyReq = client.request(target, options, (result) => {
        let data = "";
        result.on("data", chunk => data += chunk);
        result.on("end", () => {
            try { res.send(JSON.parse(data)); }
            catch { res.send(data); }
        });
    });

    if (req.method === "POST") {
        proxyReq.write(JSON.stringify(req.body));
    }

    proxyReq.end();

    proxyReq.on("error", () => {
        res.status(500).json({ error: "Proxy has failed" });
    });
});

app.listen(8080, () => console.log("Proxy running on port 8080"));
