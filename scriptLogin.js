function onChangeEmail() {
    toggleButtonDisable();
    toggleEmailErrors();
}

function onChangePassword() {
    toggleButtonDisable();
    togglePasswordErrors();
}

const form = {
    email: document.getElementById('email'),
    password: document.getElementById('password'),
    loginButton: document.getElementById('login_b'),
    recoverButton: document.getElementById('recuperarSenha_b'),
    emailRequiredError: document.getElementById('emailRequiredError'),
    invalidEmailError: document.getElementById('invalidEmailError'),
    passwordRequiredError: document.getElementById('passwordRequiredError')
}

function login() {
    showloading();
    firebase.auth().signInWithEmailAndPassword(
        form.email.value, form.password.value
    ).then(response => {
        hideLoading();
        window.location.href = 'pages/home/home.html';
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
}

function recoverPassword () {
    showloading(); 
    firebase.auth().sendPasswordResetEmail(form.email.value).then(() => {
        hideLoading();
        alert('Email enviado com sucesso.');
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error.code));
    });
}

function getErrorMessage(error) {
    if (error.code == "auth/invalid-credential") {
        return "Usuário não encontrado";
    }
    if (error.code == "auth/wrong-password") {
        return "Senha inválida";
    }
    return error.message;
}

function register() {
   window.location.href = 'pages/registro/register.html';
}

function toggleButtonDisable() {
    const emailValid = isEmailValid();
    form.recoverButton.disabled = !emailValid;

    const passwordValid = isPasswordValid();
    form.loginButton.disabled = !emailValid || !passwordValid;
}

function toggleEmailErrors() {
    const email = form.email.value;
    form.emailRequiredError.style.display = !email ? 'block' : 'none';
    form.invalidEmailError.style.display = validateEmail(email) ? 'none' : 'block';
}

function togglePasswordErrors() {
    const password = form.password.value;
    form.passwordRequiredError.style.display = !password ? 'block' : 'none';
}

function isEmailValid() {
    const email = form.email.value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function isPasswordValid() {
    const password = form.password.value;
    if (!password) {
        return false;
    }
    return true;
}