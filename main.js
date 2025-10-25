// --- 1. SELECT ALL OF OUR HTML ELEMENTS ---
const problemInput = document.getElementById("problem-input");
const userCodeInput = document.getElementById("user-code-input");
const approachBtn = document.getElementById("btn-approach");
const debugBtn = document.getElementById("btn-debug");
const analyzeBtn = document.getElementById("btn-analyze");
const testcaseBtn = document.getElementById("btn-testcase");
const solutionBtn = document.getElementById("btn-solution");
const responseDisplay = document.getElementById("response-display");

// Make the callback function 'async'
// --- 2. ADD EVENT LISTENERS ---

// === 1. "Get Approach" Button ===
approachBtn.addEventListener("click", async () => {
    const problem = problemInput.value;
    if (!problem) {
        alert("Please paste a problem description first.");
        return;
    }

    responseDisplay.innerText = "Thinking... please wait.";

    try {
        const response = await fetch("http://1227.0.0.1:5000/api/approach", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "problem": problem }),
        });
        const data = await response.json();
        responseDisplay.innerText = data.error ? `Error: ${data.error}` : data.response_text;

    } catch (error) {
        console.error("Error fetching:", error);
        responseDisplay.innerText = "Error: Could not connect to the backend. Is it running?";
    }
});

// === 2. "Find My Bug" Button ===
debugBtn.addEventListener("click", async () => {
    const problem = problemInput.value;
    const code = userCodeInput.value; // <-- We also get the user's code

    if (!problem || !code) { // <-- Check for BOTH
        alert("Please paste both a problem and your code.");
        return;
    }

    responseDisplay.innerText = "Debugging... please wait.";

    try {
        const response = await fetch("http://127.0.0.1:5000/api/debug", { // <-- New URL
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ // <-- New body with 2 items
                "problem": problem,
                "code": code 
            }),
        });
        const data = await response.json();
        responseDisplay.innerText = data.error ? `Error: ${data.error}` : data.response_text;

    } catch (error) {
        console.error("Error fetching:", error);
        responseDisplay.innerText = "Error: Could not connect to the backend. Is it running?";
    }
});

// === 3. "Analyze My Code" Button ===
analyzeBtn.addEventListener("click", async () => {
    const code = userCodeInput.value; // <-- Only need the code

    if (!code) { // <-- Only check for code
        alert("Please paste your code to analyze.");
        return;
    }

    responseDisplay.innerText = "Analyzing... please wait.";

    try {
        const response = await fetch("http://127.0.0.1:5000/api/analyze", { // <-- New URL
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "code": code }), // <-- New body
        });
        const data = await response.json();
        responseDisplay.innerText = data.error ? `Error: ${data.error}` : data.response_text;

    } catch (error) {
        console.error("Error fetching:", error);
        responseDisplay.innerText = "Error: Could not connect to the backend. Is it running?";
    }
});

// === 4. "Generate Test Cases" Button ===
testcaseBtn.addEventListener("click", async () => {
    const problem = problemInput.value; // <-- Only need the problem

    if (!problem) { // <-- Only check for problem
        alert("Please paste a problem to generate test cases.");
        return;
    }

    responseDisplay.innerText = "Generating test cases... please wait.";

    try {
        const response = await fetch("http://127.0.0.1:5000/api/testcase", { // <-- New URL
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "problem": problem }), // <-- New body
        });
        const data = await response.json();
        responseDisplay.innerText = data.error ? `Error: ${data.error}` : data.response_text;

    } catch (error) {
        console.error("Error fetching:", error);
        responseDisplay.innerText = "Error: Could not connect to the backend. Is it running?";
    }
});

// === 5. "Show Solution" Button ===
solutionBtn.addEventListener("click", async () => {
    const problem = problemInput.value; // <-- Only need the problem

    if (!problem) { // <-- Only check for problem
        alert("Please paste a problem to get the solution.");
        return;
    }

    responseDisplay.innerText = "Generating solution... please wait.";

    try {
        const response = await fetch("http://127.0.0.1:5000/api/solution", { // <-- New URL
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "problem": problem }), // <-- New body
        });
        const data = await response.json();
        responseDisplay.innerText = data.error ? `Error: ${data.error}` : data.response_text;

    } catch (error) {
        console.error("Error fetching:", error);
        responseDisplay.innerText = "Error: Could not connect to the backend. Is it running?";
    }
});