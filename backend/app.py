# ----- 1. Imports -----
import os
from flask import Flask, request, jsonify  # <-- Import request and jsonify
from dotenv import load_dotenv
import google.generativeai as genai
from flask_cors import CORS # We will need this in the next module

# ----- 2. Load Environment Variables -----
load_dotenv() 

# ----- 3. Configure the AI -----
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY') 
genai.configure(api_key=GOOGLE_API_KEY)

#    Create our AI model (using your new, working model name)
model = genai.GenerativeModel('gemini-pro-latest') # <-- Your correct, fast model

# ----- 4. Create our Flask App -----
app = Flask(__name__)
CORS(app) # Allow our frontend to call our backend

# ----- 5. Create our 5 API Endpoints -----

# This is a "health check" route to see if the server is on
@app.route("/")
def hello_world():
    return "Backend server is running!"

# === FEATURE 1: GET APPROACH ===
@app.route("/api/approach", methods=['POST']) # 'POST' means we are receiving data
def get_approach():
    # 1. Get the problem description from the frontend's JSON
    data = request.json
    problem = data.get('problem')

    if not problem:
        return jsonify({"error": "No problem description provided"}), 400

    # 2. Craft the AI Prompt
    prompt = f"""
    You are an expert LeetCode tutor. A student is asking for an approach to solve this problem:
    '{problem}'

    Do NOT give the full code. 
    Just provide a clear, step-by-step approach on how to think about and solve the problem.
    """

    # 3. Call the AI
    try:
        response = model.generate_content(prompt)
        # 4. Send the AI's text back as JSON
        return jsonify({"response_text": response.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# === FEATURE 2: FIND MY BUG ===
@app.route("/api/debug", methods=['POST'])
def find_bug():
    data = request.json
    problem = data.get('problem')
    code = data.get('code')

    if not problem or not code:
        return jsonify({"error": "Missing problem or code"}), 400

    prompt = f"""
    You are an expert LeetCode debugger. A student has this problem:
    '{problem}'

    And this is their code:
    '{code}'

    Find the bug in their code. 
    Explain the bug clearly and suggest a fix, but do not rewrite the entire solution.
    """

    try:
        response = model.generate_content(prompt)
        return jsonify({"response_text": response.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# === FEATURE 3: ANALYZE MY CODE ===
@app.route("/api/analyze", methods=['POST'])
def analyze_code():
    data = request.json
    code = data.get('code')

    if not code:
        return jsonify({"error": "No code provided"}), 400

    prompt = f"""
    Analyze the Time and Space Complexity of this code:
    '{code}'

    Explain your answer clearly in simple terms.
    - Time Complexity: O(...)
    - Space Complexity: O(...)
    - Explanation: ...
    """

    try:
        response = model.generate_content(prompt)
        return jsonify({"response_text": response.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# === FEATURE 4: GENERATE TEST CASES ===
@app.route("/api/testcase", methods=['POST'])
def generate_test_cases():
    data = request.json
    problem = data.get('problem')

    if not problem:
        return jsonify({"error": "No problem provided"}), 400

    prompt = f"""
    Given this problem:
    '{problem}'

    Generate 5 tricky or edge-case test cases.
    Format them clearly (e.g., Input: [...], Output: [...] or list of inputs).
    """

    try:
        response = model.generate_content(prompt)
        return jsonify({"response_text": response.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# === FEATURE 5: SHOW SOLUTION ===
@app.route("/api/solution", methods=['POST'])
def show_solution():
    data = request.json
    problem = data.get('problem')

    if not problem:
        return jsonify({"error": "No problem provided"}), 400

    prompt = f"""
    Provide the optimal, complete solution (in Python) for this problem:
    '{problem}'

    Include comments in the code to explain the logic.
    """

    try:
        response = model.generate_content(prompt)
        return jsonify({"response_text": response.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ----- 6. Run the App -----
if __name__ == "__main__":
    app.run(debug=True)