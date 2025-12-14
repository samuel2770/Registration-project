
// Array of field IDs to be validated
const ALL_FIELDS = ['fullName', 'email', 'password', 'confirmPassword', 'age'];

// Helper function to manage visual feedback (for Bonus Feature)
function displayVisualError(fieldId, message) {
    const inputElement = document.getElementById(fieldId);
    const errorElement = document.getElementById(error-${fieldId});
    
    if (message) {
        // Show error message and apply invalid class
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        inputElement.classList.add('is-invalid');
    } else {
        // Hide error message and remove invalid class
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        inputElement.classList.remove('is-invalid');
    }
}


/**
 * Core function for validating individual fields based on assignment rules.
 * @param {string} fieldId - The ID of the input field.
 * @param {string} value - The current value of the input field.
 * @returns {string} - Returns an empty string if valid, or an error message if invalid.
 */
function checkValidationRule(fieldId, value) {
    let errorMessage = '';

    // --- Validation Logic (4 Marks) ---
    
    switch (fieldId) {
        
        // Rule: Full Name (Not empty, at least 2 words)
        case 'fullName':
            const words = value.trim().split(/\s+/).filter(word => word.length > 0);
            if (value.trim() === '') {
                errorMessage = 'Full Name cannot be empty.';
            } else if (words.length < 2) {
                errorMessage = 'Full Name must contain at least two words (First and Last).';
            }
            break;

        // Rule: Email Address (Valid email format)
        case 'email':
            // Simple regex for email format
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; 
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address (e.g., user@domain.com).';
            }
            break;

        // Rule: Password (Min 8 chars, 1 uppercase, 1 number, 1 special char)
        case 'password':
            if (value.length < 8) {
                errorMessage = 'Password must be at least 8 characters long.';
            } else if (!/[A-Z]/.test(value)) {
                errorMessage = 'Password requires at least one uppercase letter.';
            } else if (!/[0-9]/.test(value)) {
                errorMessage = 'Password requires at least one number.';
            } else if (!/[^a-zA-Z0-9\s]/.test(value)) {
                errorMessage = 'Password requires at least one special character.';
            }
            break;
            
        // Rule: Confirm Password (Must match Password field)
        case 'confirmPassword':
            const passwordValue = document.getElementById('password').value;
            if (value !== passwordValue) {
                errorMessage = 'Confirmation password must exactly match the password.';
            }
            break;

        // Rule: Age (Must be 18 or older)
        case 'age':
            const ageNum = parseInt(value, 10);
            if (isNaN(ageNum) || ageNum < 18) {
                errorMessage = 'You must be 18 years or older to register.';
            }
            break;
    }

    return errorMessage;
}

// --- Main Form Submission Handler ---

/**
 * Handles the form submission event, runs all validation, and provides feedback via alert().
 */
function validateForm(event) {
    // Prevent form submission if there are validation errors (Functional Requirement)
    event.preventDefault(); 
    
    const form = document.getElementById('registrationForm');
    let formIsValid = true;
    let errorMessages = []; // Collects all errors for the final alert

    // 1. Run validation on all fields
    ALL_FIELDS.forEach(fieldId => {
        const input = form.elements[fieldId];
        const value = input.value;
        const error = checkValidationRule(fieldId, value);
        
        // Update visual feedback (Bonus Feature)
        displayVisualError(fieldId, error);
        
        if (error) {
            formIsValid = false;
            errorMessages.push(- ${input.getAttribute('placeholder')}: ${error});
        }
    });

    // 2. Handle overall result (Error/Success Feedback Requirement - 2 Marks)
    if (formIsValid) {
        // Show a success message if all inputs are valid (Functional Requirement)
        alert('SUCCESS! Registration Complete. Welcome aboard!');
        form.reset(); 
    } else {
        // Alert error messages when an input is invalid (Functional Requirement)
        const fullAlertMessage = REGISTRATION FAILED. Please correct the following issues:\n\n${errorMessages.join('\n')};
        alert(fullAlertMessage); 
        
        // Find the first invalid element and focus on it for a good user experience
        const firstInvalid = document.querySelector('.is-invalid');
        if (firstInvalid) {
            firstInvalid.focus();
        }
    }

    // Returns true/false implicitly based on event.preventDefault() handling the submission control
    return formIsValid; 
}


// --- Real-Time Validation Setup (Bonus Feature) ---
document.addEventListener('DOMContentLoaded', () => {
    ALL_FIELDS.forEach(fieldId => {
        const element = document.getElementById(fieldId);
        // Use 'blur' to validate when the user leaves a field
        element.addEventListener('blur', (e) => {
            const error = checkValidationRule(fieldId, e.target.value);
            displayVisualError(fieldId, error);
        });
    });
});