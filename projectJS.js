function generateMealPlan() {
    // Get user input from the form
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var goal = document.getElementById('goal').value;

    // Get meal inputs for each day
    var daysOfWeek = ['Monday', 'Tuesday', ' Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var mealPlan = {};
    daysOfWeek,forEach(function (day) {
        mealPlan[day] = getMeals(day);
    });

    // Creat a new page with the meal plan
    var newPageContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meal Plan</title>
</head>
<body>
    <h1>Meal Plan for the Week</h1>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Goal for the Week:</strong> ${goal}</p>
`;
daysOfWeek.forEach(function (day) {
    newPageContent += `<h2>${day}</h2><ul>`;
    mealPlan[day].forEach(function (meal) {
        newPageContent += `<li>${meal}</li>`;
    });
    newPageContent += '</ul>';
});
newPageContent += `
<button onclick="clearPlanner()">Clear Planner</button>
<button onclick="printPlanner()">Print/Download Planner</button>
</body>
</html>
`;

document.body.innerHTML = newPageContent;
}

function getMeals(day) {
// Implement logic to retrieve meal inputs for the specified day
var meals = [];
for (var i = 1; i <= 5; i++) {
var meal = document.getElementById(day + 'Meal' + i).value;
meals.push(meal);
}
return meals;
}

function clearPlanner() {
// Implement logic to clear the planner (reset form fields, etc.)
}

function printPlanner() {
// Implement logic to print or download the planner
// You may want to use window.print() for printing
// For downloading, you can create a downloadable file or open a new window/  

    
}