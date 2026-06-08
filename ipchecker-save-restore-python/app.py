from flask import Flask, request, jsonify
import json
import os

app= Flask(__name__)

Storage_file ="./storage.json"

if not os.path.exists(Storage_file):
    with open (Storage_file, "w") as f:
        f.write("{}")
        
def loadData():
    if not os.path.exists(Storage_file):
        return {}
    
    with open(Storage_file, "r") as f:
        content = f.read().strip()
        if content == "":
            return {} 
        
        return json.loads(content)


def saveData(data):
    with open(Storage_file, "w") as f:
        json.dump(data, f)
        
@app.route("/saverestore/save", methods=["POST"])
def save():
    inputData = request.get_json()
    text = inputData.get("text")
    
    if not text or text.strip() == "":
        return jsonify({"error":"no text sent"}), 400
    
    db = loadData()
    
    newId = len(db) + 1
    db[str(newId)] = text
    saveData(db)
    
    print("Saved a new entry with id: ",newId)
    
    return jsonify({"id": newId})

@app.route("/saverestore/load", methods=["GET"])
def load():
    id = request.args.get("id")
    db = loadData()
    
    if id not in db:
        return jsonify({"error": "id has not been found"}), 404
    
    return jsonify({"text": db[id]})

if __name__ == "__main__":
    
    print(" App has started on port 5000")
    app.run(host ="0.0.0.0", port = 8080)
