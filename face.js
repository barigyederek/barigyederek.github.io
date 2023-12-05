// VARIABLES
var button = document.getElementById("button-div");


//function that calculates the value entered in the assesment amount 
function getNumber() {
    var inputNumber = document.getElementById('assesment').value;
    var number = parseFloat(inputNumber);

    if (number < 0) {
        return 0;
    } else if (number >= 0 && number <= 80000) {
        return (100 * number) / 0.4 + 10000000;
    } else if (number >= 80000 && number <= 180000) {
        return (100 * number - 800000) / 0.5 + 30000000;
    } else if (number >= 180000 && number <= 360000) {
        return (100 * number - 18000000) / 0.6 + 50000000;
    } else if (number >= 360000 && number <= 850000) {
        return (100 * number - 36000000) / 0.7 + 80000000;
    } else {
        return 0;
    }
}
// Function to change the assesment amount to xx,xxx format
function formatCurrency(amount) {
    return amount.toLocaleString();
    }

button.addEventListener("click", calcClick);


// function that operates the button
function calcClick() {
    var result = getNumber();
    var formattedResult = formatCurrency(result);
    console.log(result);
    
    console.log("Button clicked!");
    // document.getElementById("turnover").value =result;
    document.getElementById("turnover").value =formattedResult;
}

    
