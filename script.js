function validateForm(event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const age = document.getElementById("age").value;

    if (fullName.split(" ").length < 2) {
        alert("Full Name must contain at least two words");
        return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Invalid email address");
        return false;
    }

    const passwordPattern =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!passwordPattern.test(password)) {
        alert("Password must be at least 8 characters, include an uppercase letter, a number, and a special character");
        return false;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return false;
    }

    if (age < 18) {
        alert("You must be 18 or older");
        return false;
    }

    alert("Registration successful!");
    return true;
}
