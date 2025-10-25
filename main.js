// --- 1. SELECT ALL OF OUR HTML ELEMENTS ---
// (This part was missing, causing the error)
const problemInput = document.getElementById("problem-input");
const userCodeInput = document.getElementById("user-code-input");
const approachBtn = document.getElementById("btn-approach");
const debugBtn = document.getElementById("btn-debug");
const analyzeBtn = document.getElementById("btn-analyze");
const testcaseBtn = document.getElementById("btn-testcase");
const solutionBtn = document.getElementById("btn-solution");
const responseDisplay = document.getElementById("response-display");


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
        const response = await fetch("https://coding-mentor-backend.onrender.com/api/approach", {
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
    const code = userCodeInput.value;
    if (!problem || !code) {
        alert("Please paste both a problem and your code.");
        return;
    }
    responseDisplay.innerText = "Debugging... please wait.";
    try {
        const response = await fetch("https://coding-mentor-backend.onrender.com/api/debug", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
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
    const code = userCodeInput.value;
    if (!code) {
        alert("Please paste your code to analyze.");
        return;
    }
    responseDisplay.innerText = "Analyzing... please wait.";
    try {
        const response = await fetch("https://coding-mentor-backend.onrender.com/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "code": code }),
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
    const problem = problemInput.value;
    if (!problem) {
        alert("Please paste a problem to generate test cases.");
        return;
    }
    responseDisplay.innerText = "Generating test cases... please wait.";
    try {
        const response = await fetch("https://coding-mentor-backend.onrender.com/api/testcase", {
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

// === 5. "Show Solution" Button ===
solutionBtn.addEventListener("click", async () => {
    const problem = problemInput.value;
    if (!problem) {
        alert("Please paste a problem to get the solution.");
        return;
    }
    responseDisplay.innerText = "Generating solution... please wait.";
    try {
        const response = await fetch("https://coding-mentor-backend.onrender.com/api/solution", {
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