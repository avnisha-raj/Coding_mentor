import pytest
from app import app as flask_app # Import the 'app' object from your app.py file

@pytest.fixture
def client():
    """This creates a "test client" that can pretend to be a browser."""
    with flask_app.test_client() as client:
        yield client

def test_health_check(client):
    """
    Test 1: Check if the main homepage ('/') is running.
    We just 'get' the page and check for a '200 OK' status.
    """
    response = client.get('/')
    assert response.status_code == 200 # 'assert' means "I demand this is true"
    assert b"Backend server is running!" in response.data # Check if the text is in the response

def test_analyze_api(client):
    """
    Test 2: Check if the /api/analyze endpoint is working.
    """
    # This is our fake "JSON note card" we're sending
    test_data = {
        "code": "for i in range(10): print(i)"
    }

    # We 'post' our fake data to the API endpoint
    response = client.post('/api/analyze', json=test_data)

    # 1. We demand a '200 OK' status
    assert response.status_code == 200

    # 2. We demand that the response we get back is valid JSON
    json_data = response.get_json()

    # 3. We demand that the JSON response has our 'response_text' key
    assert "response_text" in json_data

    # 4. We demand that the response text contains the word 'Complexity'
    assert "Complexity" in json_data['response_text']