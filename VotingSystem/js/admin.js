document.addEventListener("DOMContentLoaded", () => {

    console.log("VoteSphere Admin Dashboard loaded.");


    /* =========================================================
       ELEMENTS
    ========================================================= */

    const sidebar =
        document.getElementById("adminSidebar");

    const overlay =
        document.getElementById("adminOverlay");

    const menuButton =
        document.getElementById("menuButton");

    const logoutButton =
        document.getElementById("logoutButton");

    const adminEmail =
        document.getElementById("adminEmail");

    const currentDate =
        document.getElementById("currentDate");

    const footerYear =
        document.getElementById("footerYear");


    /* =========================================================
       DEMO AUTH CHECK
    ========================================================= */

    const loggedIn =
        sessionStorage.getItem(
            "voteSphereAdminLoggedIn"
        );

    /*
     * For the frontend development phase, we allow
     * the dashboard to load even if the session value
     * is missing. Real protection will be implemented
     * with Java authentication later.
     */

    if (loggedIn === "true") {

        const storedEmail =
            sessionStorage.getItem(
                "voteSphereAdminEmail"
            );

        if (storedEmail && adminEmail) {
            adminEmail.textContent =
                storedEmail;
        }

    }


    /* =========================================================
       DATE
    ========================================================= */

    if (currentDate) {

        const today =
            new Date();

        currentDate.textContent =
            today.toLocaleDateString(
                "en-US",
                {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                }
            );

    }


    if (footerYear) {

        footerYear.textContent =
            new Date().getFullYear();

    }


    /* =========================================================
       MOBILE SIDEBAR
    ========================================================= */

    function openSidebar() {

        if (sidebar) {
            sidebar.classList.add("open");
        }

        if (overlay) {
            overlay.classList.add("active");
        }

    }


    function closeSidebar() {

        if (sidebar) {
            sidebar.classList.remove("open");
        }

        if (overlay) {
            overlay.classList.remove("active");
        }

    }


    if (menuButton) {

        menuButton.addEventListener(
            "click",
            openSidebar
        );

    }


    if (overlay) {

        overlay.addEventListener(
            "click",
            closeSidebar
        );

    }


    /* =========================================================
       CLOSE MOBILE MENU AFTER NAVIGATION
    ========================================================= */

    document
        .querySelectorAll(".admin-nav-link")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeSidebar
            );

        });


    /* =========================================================
       LOGOUT
    ========================================================= */

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            () => {

                const confirmed =
                    window.confirm(
                        "Are you sure you want to sign out of the administration panel?"
                    );

                if (!confirmed) {
                    return;
                }


                sessionStorage.removeItem(
                    "voteSphereAdminLoggedIn"
                );

                sessionStorage.removeItem(
                    "voteSphereAdminEmail"
                );


                window.location.href =
                    "admin-login.html";

            }
        );

    }


    /* =========================================================
       NOTIFICATION DEMO
    ========================================================= */

    const notificationButton =
        document.querySelector(
            ".notification-button"
        );

    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            () => {

                alert(
                    "You have 3 new system notifications."
                );

            }
        );

    }


    /* =========================================================
       CHART ACCESSIBILITY
    ========================================================= */

    document
        .querySelectorAll(".chart-column span")
        .forEach((bar, index) => {

            bar.setAttribute(
                "role",
                "img"
            );

            bar.setAttribute(
                "aria-label",
                `Voting activity hour ${index + 1}`
            );

        });

});
