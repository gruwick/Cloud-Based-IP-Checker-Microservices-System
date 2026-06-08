import app

def test_classify_ipv4():
    result = app.classifier.classify("1.2.3.4")
    assert result == "IPv4"

def test_classify_ipv6():
    result = app.classifier.classify("2a00:1450:400e::200e")
    assert result == "IPv6"

def test_classify_invalid():
    result = app.classifier.classify("not_an_ip")
    assert result == "Invalid"

def test_api_ipv4():
    client = app.app.test_client()
    res = client.get("/?items=1.2.3.4")
    data = res.get_json()
    assert data["type"] == "IPv4"

def test_api_no_items():
    client = app.app.test_client()
    res = client.get("/")
    assert res.status_code == 400
