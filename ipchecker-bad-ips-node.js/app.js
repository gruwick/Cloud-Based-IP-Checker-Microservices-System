const express = require("express");
const app = express();

const bad_ips = [
    "100.200.300.400",
    "101.201.301.401",
    "102.202.302.402",
    "103.203.303.403"
];

function checkBadIp(ip) {
    ip = ip.trim();

    if (bad_ips.includes(ip)) {
        return "Bad IP";
    }
    return "Good IP";
}

app.get("/badip", (req, res) => {
    const ipParam = req.query.ip;

    if (!ipParam) {
        return res.json({ error: "ip parameter is missing" });
    }

    const ips = ipParam.split(",").map(ip => ip.trim());

    const results = ips.map(ip => ({
        ip: ip,
        status: checkBadIp(ip)
    }));

    return res.json({ bad_ip_results: results });
});

if (require.main === module) {
    app.listen(8080, () => {
        console.log("Bad IP service running on port 8080");
    });
}

module.exports = { checkBadIp, app };
