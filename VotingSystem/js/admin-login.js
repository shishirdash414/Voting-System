document.addEventListener("DOMContentLoaded", () => {

    console.log("VoteSphere Admin Login loaded.");


    /* =========================================================
       ELEMENTS
    ========================================================= */

    const form =
        document.getElementById("adminLoginForm");

    const emailInput =
        document.getElementById("adminEmail");

    const passwordInput =
        document.getElementById("adminPassword");

    const passwordToggle =
        document.getElementById("passwordToggle");

    const forgotPassword =
        document.getElementById("forgotPassword");

    const rememberAdmin =
        document.getElementById("rememberAdmin");

    const loginButton =
        document.getElementById("adminLoginButton");

    const loginButtonText =
        document.getElementById("loginButtonText");

    const message =
        document.getElementById("adminLoginMessage");

    const emailError =
        document.getElementById("emailError");

    const passwordError =
        document.getElementById("passwordError");

    const footerYear =
        document.getElementById("footerYear");


    /* =========================================================
       FOOTER
    ========================================================= */

    if (footerYear) {

        footerYear.textContent =
            new Date().getFullYear();

    }


    /* =========================================================
       PASSWORD VISIBILITY
    ========================================================= */

    if (passwordToggle && passwordInput) {

        passwordToggle.addEventListener(
            "click",
            () => {

                const isPassword =
                    passwordInput.type === "password";

                passwordInput.type =
                    isPassword
                        ? "text"
                        : "password";

                passwordToggle.textContent =
                    isPassword
                        ? "🙈"
                        : "👁";

                passwordToggle.setAttribute(
                    "aria-label",
                    isPassword
                        ? "Hide password"
                        : "Show password"
                );

            }
        );

    }


    /* =========================================================
       VALIDATION
    ========================================================= */

    function clearErrors() {

        if (emailError) {
            emailError.textContent = "";
        }

        if (passwordError) {
            passwordError.textContent = "";
        }

        if (emailInput) {
            emailInput.classList.remove(
                "input-error"
            );
        }

        if (passwordInput) {
            passwordInput.classList.remove(
                "input-error"
            );
        }

    }


    function validateEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email);

    }


    function validateForm() {

        clearErrors();

        let valid = true;

        const email =
            emailInput
                ? emailInput.value.trim()
                : "";

        const password =
            passwordInput
                ? passwordInput.value
                : "";


        if (!email) {

            if (emailError) {
                emailError.textContent =
                    "Administrator email is required.";
            }

            if (emailInput) {
                emailInput.classList.add(
                    "input-error"
                );
            }

            valid = false;

        } else if (!validateEmail(email)) {

            if (emailError) {
                emailError.textContent =
                    "Please enter a valid email address.";
            }

            if (emailInput) {
                emailInput.classList.add(
                    "input-error"
                );
            }

            valid = false;

        }


        if (!password) {

            if (passwordError) {
                passwordError.textContent =
                    "Password is required.";
            }

            if (passwordInput) {
                passwordInput.classList.add(
                    "input-error"
                );
            }

            valid = false;

        } else if (password.length < 6) {

            if (passwordError) {
                passwordError.textContent =
                    "Password must contain at least 6 characters.";
            }

            if (passwordInput) {
                passwordInput.classList.add(
                    "input-error"
                );
            }

            valid = false;

        }

        return valid;
    }


    /* =========================================================
       MESSAGE
    ========================================================= */

    function showMessage(text, type) {

        if (!message) {
            return;
        }

        message.textContent = text;

        message.className =
            `admin-login-message ${type}`;

    }


    /* =========================================================
       FORM SUBMIT
    ========================================================= */

    if (form) {

        form.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();

                if (!validateForm()) {
                    return;
                }


                const email =
                    emailInput.value.trim();


                /*
                 * Frontend demo authentication.
                 *
                 * Any valid-looking email/password
                 * combination is accepted for now.
                 *
                 * Real authentication will be handled
                 * by Java + MySQL later.
                 */

                loginButton.disabled = true;

                loginButton.classList.add(
                    "loading"
                );

                loginButtonText.textContent =
                    "Signing In...";


                await new Promise(
                    resolve =>
                        setTimeout(resolve, 900)
                );


                /*
                 * Store demo admin session.
                 */

                sessionStorage.setItem(
                    "voteSphereAdminLoggedIn",
                    "true"
                );

                sessionStorage.setItem(
                    "voteSphereAdminEmail",
                    email
                );


                if (
                    rememberAdmin &&
                    rememberAdmin.checked
                ) {

                    localStorage.setItem(
                        "voteSphereRememberAdmin",
                        "true"
                    );

                }


                showMessage(
                    "Login successful. Opening administrator dashboard...",
                    "success"
                );


                /*
                 * Redirect to dashboard.
                 */

                setTimeout(() => {

                    window.location.href =
                        "admin-dashboard.html";

                }, 700);

            }
        );

    }


    /* =========================================================
       FORGOT PASSWORD
    ========================================================= */

    if (forgotPassword) {

        forgotPassword.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                alert(
                    "Password recovery will be connected to the secure backend authentication system later."
                );

            }
        );

    }


    /* =========================================================
       REMOVE ERROR WHILE TYPING
    ========================================================= */

    if (emailInput) {

        emailInput.addEventListener(
            "input",
            () => {

                emailInput.classList.remove(
                    "input-error"
                );

                if (emailError) {
                    emailError.textContent = "";
                }

            }
        );

    }


    if (passwordInput) {

        passwordInput.addEventListener(
            "input",
            () => {

                passwordInput.classList.remove(
                    "input-error"
                );

                if (passwordError) {
                    passwordError.textContent = "";
                }

            }
        );

    }

});
