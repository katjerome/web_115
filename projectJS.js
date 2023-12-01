// Event listner , wait for dom to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    //Get button by  ID 
    var generateButton = document.getElementById('generateButton');

    //  reset button to clear the form & print button 
    var resetButton = document.getElementById('resetButton');
    var printButton = document.getElementById('printButton');

    // Added an eventlistner  to the generate, reset and print button
    generateButton.addEventListener('click', generateMealPlan);
    resetButton.addEventListener('click', resetPlanner);
    printButton.addEventListener('click', printPlanner);



});
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

// Added eventListner for the page
document.getElementById('clearButton').addEventListener('click', resetPlanner);
document.getElementById('printButton').addEventListener('click', printPlanner);

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

function resetPlanner() {
// Implement logic to clear the planner (reset form fields, etc.)
document.getElementById('name').value = '';
document.getElementById('email').value = '';
document.getElementById('goal').value = '';

// Reset meal input fields
var daysOfWeek = ['Monday','Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
daysOfWeek.forEach(function (day) {
    for (var i = 1; i <= 5; i++) {
        document.getElementById(day + 'Meal' + i).value = '';
    }
})
}

function printPlanner() {
window.print();  

    
}