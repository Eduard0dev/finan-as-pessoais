const form = {
    email: document.getElementById('email'),
    emailRequiredError: document.getElementById('emailRequiredError'),
    invalidEmailError: document.getElementById('invalidEmailError'),
    password: document.getElementById('password'),
    passwordRequiredError: document.getElementById('passwordRequiredError'),
    passwordMinLengthError: document.getElementById('passwordMinLengthError'),
    confirmPassword: document.getElementById('confirmPassword'),
    passwordDoesntMatchLengthError: document.getElementById('passwordDoesntMatchLengthError'),
    registerButton: document.getElementById('registerButton'),
}

function register() {
    showloading();

    const email = form.email.value;
    const password = form.password.value;
    firebase.auth().createUserWithEmailAndPassword(email, password) 
    .then(() => {
        hideLoading();
        window.location.href = '../../pages/home/home.html'
    })
    .catch(error =>{
        hideLoading();
        alert(getErrorMessage(error));
    })
}

function getErrorMessage(error) {
    if (error.code == "auth/email-already-in-use") {
        return ' e-mail já esta em uso.'
    }
    return error.message;
}

function onChangeEmail() {
    const email = form.email.value;
    form.emailRequiredError.style.display = email ? "none" : "block";
    form.invalidEmailError.style.display = validateEmail(email) ? "none" : "block";

    toggleRegisterButtonDisable();
}

function onChangePassword() {
    const password = form.password.value;
    form.passwordRequiredError.style.display = password ? 'none' : 'block';

    form.passwordMinLengthError.style.display = password.length >= 6 ? 'none' : 'block';

    validatePasswordsMatch();
    toggleRegisterButtonDisable();
} 

function onChangeConfirmPassword() {
    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

function validatePasswordsMatch() {
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    form.passwordDoesntMatchLengthError.style.display =
        password == confirmPassword ? "none" : "block";
}

function toggleRegisterButtonDisable() {
    form.registerButton.disabled = !isFormValid();
}

function isFormValid() {
    const email = form.email.value;
    if (!email || !validateEmail(email)) {
        return false;
    }

    const password = form.password.value;
    if (!password || password.length < 6) {
        return false;
    }

    const confirmPassword = form.confirmPassword.value;
    if (password != confirmPassword) {
        return false;
    }

    return true;
}
