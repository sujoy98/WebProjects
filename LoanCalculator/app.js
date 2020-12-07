// Listen for submit
document.querySelector('#loan-form').addEventListener('submit', function(e) {
    // Hide Results, we need to enable it into calculateResult function in 'DISPLAY values' in ui 
    document.getElementById('results').style.display = 'none';

    // Show Loading gif, we need to disable it into calculateResult function in 'DISPLAY values' in ui 
    document.getElementById('loading').style.display = 'block';

    // set timeout for the results to show afer the gif
    setTimeout(calculateResults, 1500);

    e.preventDefault();
});

// Calculate Results
function calculateResults() {
    // console.log('calculating');
    
    // UI variables
    const amount = document.querySelector('#amount');
    const interest = document.querySelector('#interest');
    const years = document.querySelector('#years');
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');
    
    // Calculations
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value)/100/12;
    const calculatedPayments = parseFloat(years.value)*12;

    // Compute Monthly Payments
    const x = Math.pow(1+calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    // Check for finite value and set the 'DISPLAY values' for the html output
    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly*calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly*calculatedPayments)-principal).toFixed(2);

        // Show Results
        document.getElementById('results').style.display = 'block';

        // Hide Loading
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please Check Your Numbers')
    }
}

// Show Error
function showError(error) {
    // Hide Results
    document.getElementById('results').style.display = 'none';

    // Hide Loading
    document.getElementById('loading').style.display = 'none';
    
    // Create a div
    const errorDiv = document.createElement('div');
    
    // Get Elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    
    // Add Class, alert and alert-danger are bootstrap class to make a red background
    errorDiv.className = 'alert alert-danger';

    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert errorDiv above heading
    card.insertBefore(errorDiv, heading);

    // Clear error msg after 2sec, takes in two parameter time in miliseconds and a function 
    setTimeout(clearError, 2000);
}

// Clear Error
function clearError() {
    // selecting errorDiv className alert
    document.querySelector('.alert').remove();
}