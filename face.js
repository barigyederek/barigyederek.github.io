// DOM Elements
const button = document.getElementById("button-div");
const withoutRecordsBox = document.getElementById("withoutrecords");
const withRecordsBox = document.getElementById("withrecords");
const assessmentInput = document.getElementById("assesment");
const turnoverOutput = document.getElementById("turnover");

// Format number with commas (e.g., 1000000 → "1,000,000")
function formatCurrency(amount) {
    return amount.toLocaleString("en-US");
}

// Calculate turnover from assessment amount (reverse tax calculation)
function calculateTurnover() {
    const inputNumber = parseFloat(assessmentInput.value) || 0; // Default to 0 if invalid

    if (inputNumber < 0) {
        return 0;
    } else if (inputNumber <= 80000) {
        return (100 * inputNumber) / 0.4 + 10000000;
    } else if (inputNumber <= 180000) {
        return (100 * (inputNumber - 80000)) / 0.5 + 30000000;
    } else if (inputNumber <= 360000) {
        return (100 * (inputNumber - 180000)) / 0.6 + 50000000;
    } else if (inputNumber <= 850000) {
        return (100 * (inputNumber - 360000)) / 0.7 + 80000000;
    } else {
        return 0; // Exceeds maximum bracket
    }
}

// Calculate tax WITH records (progressive rates)
function calculateWithRecords(turnover) {
    if (turnover <= 10000000) return 0;
    else if (turnover <= 30000000) return 0.004 * (turnover - 10000000);
    else if (turnover <= 50000000) return 80000 + 0.005 * (turnover - 30000000);
    else if (turnover <= 80000000) return 180000 + 0.006 * (turnover - 50000000);
    else if (turnover <= 150000000) return 360000 + 0.007 * (turnover - 80000000);
    else return 0;
}

// Calculate tax WITHOUT records (fixed amounts)
function calculateWithoutRecords(turnover) {
    if (turnover <= 10000000) return 0;
    else if (turnover <= 30000000) return 80000;
    else if (turnover <= 50000000) return 200000;
    else if (turnover <= 80000000) return 400000;
    else if (turnover <= 150000000) return 900000;
    else return 0;
}

// Main calculation function triggered by button click
function calcClick() {
    // 1. Calculate turnover from assessment input
    const turnover = calculateTurnover();
    const formattedTurnover = formatCurrency(turnover);
    turnoverOutput.value = formattedTurnover;

    // 2. Calculate tax based on selected radio button
    let tax;
    if (withRecordsBox.checked) {
        tax = calculateWithRecords(turnover);
    } else if (withoutRecordsBox.checked) {
        tax = calculateWithoutRecords(turnover);
    } else {
        alert("Please select a tax method!");
        return;
    }

    // 3. Display tax result (assuming a field with ID 'result' exists)
    const resultElement = document.getElementById("result");
    if (resultElement) {
        resultElement.value = formatCurrency(tax);
    } else {
        console.log("Tax Due:", formatCurrency(tax)); // Fallback for debugging
    }
}

// Initialize default radio selection (optional)
withRecordsBox.checked = true;