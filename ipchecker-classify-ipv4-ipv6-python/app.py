from flask import Flask, jsonify, request

app = Flask(__name__)

class ClassifyIp:
    def classify(self, ip):
        ip = ip.strip()

        if "." in ip:
            parts = ip.split(".")
            if len(parts) == 4:
                return "IPv4"

        if ":" in ip:
            parts = ip.split(":")
            if 2 <= len(parts) <= 8:
                return "IPv6"

        return "Invalid"


classifier = ClassifyIp()


@app.get("/")
@app.get("/classifyip")
def classify_ip():
    items = request.args.get("ip", "") or request.args.get("items", "")

    if items == "":
        return jsonify({"error": "ip parameter is missing"}), 400
    
    ip = items.split(",")[0].strip()
    
    result = classifier.classify(ip)

    return jsonify({"ip":ip,"type": result})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
