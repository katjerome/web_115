document.addEventListener('DOMContentLoaded', function () {
    // Get buttons by ID
    var generateButton = document.getElementById('generateButton');
    var resetButton = document.getElementById('resetButton');
    var printButton = document.getElementById('printButton');

    // Add event listeners to the buttons
    generateButton.addEventListener('click', generateMealPlan);
    resetButton.addEventListener('click', resetPlanner);
    printButton.addEventListener('click', downloadPlanner);
});

function isValidEmail(email) {
    // Simple regex for basic email validation
    return /\S+@\S+\.\S+/.test(email);
}

function generateMealPlan() {
    var email = document.getElementById('email').value;
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    var name = document.getElementById('name').value;
    var goal = document.getElementById('goal').value;

    // Implement the getMeals function to gather meal data
    var daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var mealPlan = {};
    daysOfWeek.forEach(function (day) {
        mealPlan[day] = getMeals(day);
    });

    // Use document.write() to create a new page
    document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Meal Plan</title>
            <style>
                body { font-family: monospace; /* Other styling as needed */ }
                .banner { /* Styling for the banner */ }
            </style>
        </head>
        <body>
            <div class="banner">
                <h1>Build Your Meal Plan</h1>
                <p>Your Name, WEB-115 Section</p>
            </div>
            <h2>Meal Plan for ${name}</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Goal for the Week:</strong> ${goal}</p>
            ${generateMealPlanContent(mealPlan)}
            <button onclick="window.print();">Print Planner</button>
        </body>
        </html>
    `);
}

function getMeals(day) {
    var meals = [];
    for (var i = 1; i <= 5; i++) {
        var mealInput = document.getElementById(day + 'Meal' + i);
        if (mealInput && mealInput.value) {
            meals.push(mealInput.value);
        }
    }
    return meals;
}

function generateMealPlanContent(mealPlan) {
    var content = '';
    for (var day in mealPlan) {
        content += `<h3>${day}</h3><ul>`;
        mealPlan[day].forEach(function (meal) {
            content += `<li>${meal}</li>`;
        });
        content += '</ul>';
    }
    return content;
}

function resetPlanner() {
    // Implement logic to clear the planner (reset form fields, etc.)
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('goal').value = '';

    // Reset meal input fields
    var daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    daysOfWeek.forEach(function (day) {
        for (var i = 1; i <= 5; i++) {
            document.getElementById(day + 'Meal' + i).value = '';
        }
    });
}

function downloadPlanner() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var goal = document.getElementById('goal').value;

    var daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var mealPlan = {};

    daysOfWeek.forEach(function (day) {
        mealPlan[day] = getMeals(day);
    });

    var plannerContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Meal Plan</title>
            </head>
                <h1 style="background-color: rgb(32,178,170); padding: 10px;"> Weekly Meal Plan</h1>
            <body>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Goal for the Week:</strong> ${goal}</p>`;

    daysOfWeek.forEach(function (day) {
        plannerContent += `<h2>${day}</h2><ul>`;
        mealPlan[day].forEach(function (meal) {
            plannerContent += `<li>${meal}</li>`;
        });
        plannerContent += '</ul>';
    });

    plannerContent += `
        <button id="clearButton">Clear Planner</button>
        <button id="downloadButton">Print/Download Planner</button>
        </body>
        </html>`;

    // Create a Blob with the planner content
    var blob = new Blob([plannerContent], { type: 'text/html' });

    // Create a temporary URL for the Blob
    var plannerURL = URL.createObjectURL(blob);

    // Create a link element for downloading
    var downloadLink = document.createElement('a');
    downloadLink.href = plannerURL;
    downloadLink.download = 'meal_plan.html';

    // Append the link to the document and trigger a click
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Clean up: remove the link and revoke the URL
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(plannerURL)
}
