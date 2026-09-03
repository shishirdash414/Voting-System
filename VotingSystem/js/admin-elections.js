document.addEventListener("DOMContentLoaded", () => {

    console.log("VoteSphere Elections Management loaded.");


    /* =========================================================
       ELEMENTS
    ========================================================= */

    const searchInput =
        document.getElementById("electionSearch");

    const filterButtons =
        document.querySelectorAll(".election-filter");

    const tableRows =
        document.querySelectorAll(
            "#electionsTableBody tr"
        );

    const recordCount =
        document.getElementById("recordCount");

    const emptyState =
        document.getElementById("electionsEmpty");

    const modal =
        document.getElementById("electionModal");

    const openModalButton =
        document.getElementById("openCreateElection");

    const closeModalButton =
        document.getElementById("closeElectionModal");

    const cancelButton =
        document.getElementById("cancelElection");

    const form =
        document.getElementById("electionForm");

    const modalTitle =
        document.getElementById("modalTitle");

    const submitText =
        document.getElementById("submitElectionText");

    let currentFilter = "all";
    let editingRow = null;


    /* =========================================================
       FILTER + SEARCH
    ========================================================= */

    function filterElections() {

        const searchTerm =
            searchInput
                ? searchInput.value
                    .trim()
                    .toLowerCase()
                : "";

        let visibleCount = 0;


        tableRows.forEach(row => {

            const status =
                row.dataset.status || "";

            const name =
                row.dataset.name || "";

            const matchesFilter =
                currentFilter === "all" ||
                status === currentFilter;

            const matchesSearch =
                !searchTerm ||
                name
                    .toLowerCase()
                    .includes(searchTerm);

            if (
                matchesFilter &&
                matchesSearch
            ) {

                row.style.display = "";
                visibleCount++;

            } else {

                row.style.display = "none";

            }

        });


        if (recordCount) {

            recordCount.textContent =
                `${visibleCount} election${visibleCount === 1 ? "" : "s"}`;

        }


        if (emptyState) {

            emptyState.style.display =
                visibleCount === 0
                    ? "block"
                    : "none";

        }

    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterElections
        );

    }


    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                filterButtons.forEach(
                    item =>
                        item.classList.remove("active")
                );

                button.classList.add("active");

                currentFilter =
                    button.dataset.filter || "all";

                filterElections();

            }
        );

    });


    /* =========================================================
       MODAL
    ========================================================= */

    function openModal(row = null) {

        editingRow = row;

        if (modalTitle) {

            modalTitle.textContent =
                row
                    ? "Edit Election"
                    : "Create Election";

        }


        if (submitText) {

            submitText.textContent =
                row
                    ? "Save Changes"
                    : "Create Election";

        }


        if (row) {

            const name =
                row.dataset.name || "";

            const nameInput =
                document.getElementById(
                    "electionName"
                );

            if (nameInput) {
                nameInput.value = name;
            }

        } else {

            if (form) {
                form.reset();
            }

        }


        if (modal) {

            modal.classList.add("open");

            document.body.style.overflow =
                "hidden";

        }

    }


    function closeModal() {

        if (modal) {
            modal.classList.remove("open");
        }

        document.body.style.overflow = "";

        editingRow = null;

    }


    if (openModalButton) {

        openModalButton.addEventListener(
            "click",
            () => openModal()
        );

    }


    if (closeModalButton) {

        closeModalButton.addEventListener(
            "click",
            closeModal
        );

    }


    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            closeModal
        );

    }


    if (modal) {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    closeModal();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal &&
                modal.classList.contains("open")
            ) {

                closeModal();

            }

        }
    );


    /* =========================================================
       FORM SUBMIT
    ========================================================= */

    if (form) {

        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const nameInput =
                    document.getElementById(
                        "electionName"
                    );

                const name =
                    nameInput
                        ? nameInput.value.trim()
                        : "";


                if (!name) {

                    alert(
                        "Please enter an election name."
                    );

                    return;

                }


                if (editingRow) {

                    editingRow.dataset.name =
                        name;

                    const title =
                        editingRow.querySelector(
                            ".election-record strong"
                        );

                    if (title) {
                        title.textContent = name;
                    }

                    alert(
                        "Election updated successfully."
                    );

                } else {

                    alert(
                        "Election created successfully in demo mode."
                    );

                }


                closeModal();

                filterElections();

            }
        );

    }


    /* =========================================================
       TABLE ACTIONS
    ========================================================= */

    document
        .querySelectorAll(".row-action")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const row =
                        button.closest("tr");

                    if (!row) {
                        return;
                    }


                    const action =
                        button.dataset.action;

                    const name =
                        row.dataset.name ||
                        "this election";


                    /* VIEW */

                    if (action === "view") {

                        alert(
                            `Election: ${name}\n\n` +
                            "Detailed election management view " +
                            "will be connected to the backend later."
                        );

                    }


                    /* EDIT */

                    if (action === "edit") {

                        openModal(row);

                    }


                    /* DELETE */

                    if (action === "delete") {

                        const confirmed =
                            window.confirm(
                                `Are you sure you want to delete "${name}"?\n\n` +
                                "This action is only simulated in the frontend demo."
                            );

                        if (!confirmed) {
                            return;
                        }


                        row.remove();

                        alert(
                            "Election deleted in demo mode."
                        );

                        filterElections();

                    }

                }
            );

        });


    /* =========================================================
       INITIALIZE
    ========================================================= */

    filterElections();

});
