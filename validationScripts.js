    // JavaScript code for form validation
    document.addEventListener("DOMContentLoaded", function() {
        var form = document.getElementById("myForm");
        var inputField = document.getElementById("inputField");
        var errorMessage = document.getElementById("errorMessage");
    
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent the default form submission
    
            // Retrieve the input field value
            var inputValue = inputField.value;
            var alphanumericPattern = /^[a-zA-Z0-9]+$/;
    
            // Check if the input value matches the pattern
            if (alphanumericPattern.test(inputValue)) {
                // Valid input: display confirmation and submit the form
                errorMessage.textContent = "Valid Entry";
                form.submit(); // Submit the form
                alert ("Valid Entry");
            } else {
                // Invalid input: display error message
                errorMessage.textContent = "Input must be alphanumeric.";
                
            }
        });
    });
    