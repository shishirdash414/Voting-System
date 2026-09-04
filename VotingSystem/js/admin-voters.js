document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("voterSearch");
    const electionFilter = document.getElementById("electionFilter");
    const verificationFilter = document.getElementById("verificationFilter");
    const votingFilter = document.getElementById("votingFilter");

    const clearFiltersButton =
        document.getElementById("clearFiltersButton");

    const refreshButton =
        document.getElementById("refreshVotersButton");

    const exportButton =
        document.getElementById("exportVotersButton");

    const tableBody =
        document.getElementById("voterTableBody");

    const rows = Array.from(
        document.querySelectorAll(".voter-row")
    );

    const recordCount =
        document.getElementById("voterRecordCount");

    const emptyState =
        document.getElementById("voterEmpty");

    const modal =
        document.getElementById("voterModal");

    const modalClose =
        document.getElementById("voterModalClose");

    const modalDone =
        document.getElementById("voterModalDone");


    /* =====================================================
       FOOTER YEAR
       ===================================================== */

    const footerYear =
        document.getElementById("footerYear");

    if (footerYear) {
        footerYear.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       ADMIN EMAIL
       ===================================================== */

    const adminEmail =
        sessionStorage.getItem("voteSphereAdminEmail");

    if (adminEmail) {

        const topbarEmail =
            document.getElementById("topbarAdminEmail");

        const sidebarEmail =
            document.getElementById("sidebarAdminEmail");

        if (topbarEmail) {
            topbarEmail.textContent = adminEmail;
        }

        if (sidebarEmail) {
            sidebarEmail.textContent = adminEmail;
        }
    }


    /* =====================================================
       FILTERING
       ===================================================== */

    function filterVoters() {

        const search =
            searchInput.value
                .trim()
                .toLowerCase();

        const election =
            electionFilter.value;

        const verification =
            verificationFilter.value;

        const voting =
            votingFilter.value;

        let visibleCount = 0;

        rows.forEach(row => {

            const name =
                (row.dataset.name || "").toLowerCase();

            const email =
                (row.dataset.email || "").toLowerCase();

            const voterId =
                (row.dataset.id || "").toLowerCase();

            const rowElection =
                row.dataset.election || "";

            const rowVerification =
                row.dataset.verification || "";

            const rowVoting =
                row.dataset.voting || "";


            const matchesSearch =
                !search ||
                name.includes(search) ||
                email.includes(search) ||
                voterId.includes(search);


            const matchesElection =
                election === "all" ||
                rowElection === election;


            const matchesVerification =
                verification === "all" ||
                rowVerification === verification;


            const matchesVoting =
                voting === "all" ||
                rowVoting === voting;


            const visible =
                matchesSearch &&
                matchesElection &&
                matchesVerification &&
                matchesVoting;


            row.style.display =
                visible ? "" : "none";


            if (visible) {
                visibleCount++;
            }

        });


        recordCount.textContent =
            visibleCount;


        if (visibleCount === 0) {

            emptyState.classList.add("visible");

            tableBody.style.display = "none";

        } else {

            emptyState.classList.remove("visible");

            tableBody.style.display = "";

        }
    }


    searchInput.addEventListener(
        "input",
        filterVoters
    );

    electionFilter.addEventListener(
        "change",
        filterVoters
    );

    verificationFilter.addEventListener(
        "change",
        filterVoters
    );

    votingFilter.addEventListener(
        "change",
        filterVoters
    );


    /* =====================================================
       CLEAR FILTERS
       ===================================================== */

    clearFiltersButton.addEventListener(
        "click",
        () => {

            searchInput.value = "";

            electionFilter.value = "all";

            verificationFilter.value = "all";

            votingFilter.value = "all";

            filterVoters();

        }
    );


    /* =====================================================
       VIEW VOTER
       ===================================================== */

    function openVoterModal(row) {

        const name =
            row.dataset.name || "Unknown Voter";

        const email =
            row.dataset.email || "Not available";

        const voterId =
            row.dataset.id || "N/A";

        const election =
            row.dataset.election || "";

        const verification =
            row.dataset.verification || "pending";

        const voting =
            row.dataset.voting || "not-voted";

        const status =
            row.dataset.status || "active";

        const registration =
            row.dataset.registration || "Not available";


        const avatar =
            name
                .split(" ")
                .map(part => part[0])
                .join("")
                .substring(0, 2)
                .toUpperCase();


        document.getElementById(
            "modalVoterAvatar"
        ).textContent = avatar;


        document.getElementById(
            "modalVoterName"
        ).textContent = name;


        document.getElementById(
            "modalVoterId"
        ).textContent = voterId;


        document.getElementById(
            "modalEmail"
        ).textContent = email;


        document.getElementById(
            "modalElection"
        ).textContent =
            electionLabel(election);


        document.getElementById(
            "modalRegistration"
        ).textContent = registration;


        document.getElementById(
            "modalEligibility"
        ).textContent =
            status === "active"
                ? "Eligible"
                : "Not Eligible";


        const verificationBadge =
            document.getElementById(
                "modalVerification"
            );

        verificationBadge.className =
            "status-badge " + verification;

        verificationBadge.textContent =
            verification === "verified"
                ? "✓ Verified"
                : "! Pending";


        const votingBadge =
            document.getElementById(
                "modalVotingStatus"
            );

        votingBadge.className =
            "status-badge " +
            (
                voting === "voted"
                    ? "voted"
                    : "not-voted"
            );

        votingBadge.textContent =
            voting === "voted"
                ? "✓ Voted"
                : "Not Voted";


        const accountBadge =
            document.getElementById(
                "modalAccountStatus"
            );

        accountBadge.className =
            "status-badge " +
            (
                status === "active"
                    ? "active"
                    : "disabled"
            );

        accountBadge.textContent =
            status === "active"
                ? "Active"
                : "Disabled";


        modal.classList.add("active");

        document.body.classList.add("modal-open");
    }


    function electionLabel(value) {

        const labels = {
            "student-council":
                "Student Council Election 2026",

            "environmental":
                "Environmental Committee Election",

            "student-association":
                "Student Association Election"
        };

        return labels[value] || "Election not specified";
    }


    document.querySelectorAll(
        ".view-voter"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const row =
                    button.closest(".voter-row");

                if (row) {
                    openVoterModal(row);
                }

            }
        );

    });


    /* =====================================================
       CLOSE MODAL
       ===================================================== */

    function closeModal() {

        modal.classList.remove("active");

        document.body.classList.remove("modal-open");
    }


    modalClose.addEventListener(
        "click",
        closeModal
    );

    modalDone.addEventListener(
        "click",
        closeModal
    );


    modal.addEventListener(
        "click",
        event => {

            if (event.target === modal) {
                closeModal();
            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal.classList.contains("active")
            ) {
                closeModal();
            }

        }
    );


    /* =====================================================
       VERIFY VOTER
       ===================================================== */

    document.querySelectorAll(
        ".verify-voter"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const row =
                    button.closest(".voter-row");

                const name =
                    row.dataset.name;

                const confirmed =
                    confirm(
                        `Verify voter "${name}"?`
                    );

                if (!confirmed) {
                    return;
                }


                row.dataset.verification =
                    "verified";


                const badge =
                    row.querySelector(
                        ".status-badge.pending"
                    );

                if (badge) {

                    badge.className =
                        "status-badge verified";

                    badge.textContent =
                        "✓ Verified";
                }


                button.textContent =
                    "Verified";

                button.disabled = true;

                button.style.opacity = "0.6";


                alert(
                    "Voter verified successfully.\n\n" +
                    "Demo mode: this change is only " +
                    "stored in the current page."
                );

            }
        );

    });


    /* =====================================================
       ENABLE / DISABLE VOTER
       ===================================================== */

    document.querySelectorAll(
        ".toggle-voter, .enable-voter"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const row =
                    button.closest(".voter-row");

                const name =
                    row.dataset.name;

                const currentlyActive =
                    row.dataset.status === "active";


                if (currentlyActive) {

                    const confirmed =
                        confirm(
                            `Disable voter "${name}"?`
                        );

                    if (!confirmed) {
                        return;
                    }

                    row.dataset.status =
                        "disabled";

                    button.textContent =
                        "Enable";

                    button.classList.remove(
                        "toggle-voter"
                    );

                    button.classList.add(
                        "enable-voter"
                    );


                    const avatar =
                        row.querySelector(
                            ".voter-avatar"
                        );

                    if (avatar) {
                        avatar.classList.add(
                            "disabled-avatar"
                        );
                    }


                    alert(
                        "Voter account disabled.\n\n" +
                        "Demo mode: no database was changed."
                    );

                } else {

                    const confirmed =
                        confirm(
                            `Enable voter "${name}"?`
                        );

                    if (!confirmed) {
                        return;
                    }

                    row.dataset.status =
                        "active";

                    button.textContent =
                        "Disable";

                    button.classList.remove(
                        "enable-voter"
                    );

                    button.classList.add(
                        "toggle-voter"
                    );


                    const avatar =
                        row.querySelector(
                            ".voter-avatar"
                        );

                    if (avatar) {
                        avatar.classList.remove(
                            "disabled-avatar"
                        );
                    }


                    alert(
                        "Voter account enabled.\n\n" +
                        "Demo mode: no database was changed."
                    );

                }

            }
        );

    });


    /* =====================================================
       REFRESH
       ===================================================== */

    refreshButton.addEventListener(
        "click",
        () => {

            refreshButton.disabled = true;

            const originalText =
                refreshButton.textContent;

            refreshButton.textContent =
                "↻ Refreshing...";


            setTimeout(() => {

                refreshButton.disabled = false;

                refreshButton.textContent =
                    originalText;

                filterVoters();

                alert(
                    "Voter records refreshed.\n\n" +
                    "Demo mode: records are static."
                );

            }, 500);

        }
    );


    /* =====================================================
       EXPORT DEMO
       ===================================================== */

    exportButton.addEventListener(
        "click",
        () => {

            const visibleRows =
                rows.filter(
                    row =>
                        row.style.display !== "none"
                );


            const csvRows = [
                [
                    "Voter Name",
                    "Email",
                    "Voter ID",
                    "Election",
                    "Verification",
                    "Voting Status",
                    "Account Status",
                    "Registration Date"
                ]
            ];


            visibleRows.forEach(row => {

                csvRows.push([
                    row.dataset.name,
                    row.dataset.email,
                    row.dataset.id,
                    electionLabel(
                        row.dataset.election
                    ),
                    row.dataset.verification,
                    row.dataset.voting,
                    row.dataset.status,
                    row.dataset.registration
                ]);

            });


            const csv =
                csvRows
                    .map(
                        row =>
                            row
                                .map(
                                    value =>
                                        `"${String(value)
                                            .replace(/"/g, '""')}"`
                                )
                                .join(",")
                    )
                    .join("\n");


            const blob =
                new Blob(
                    [csv],
                    {
                        type: "text/csv;charset=utf-8;"
                    }
                );


            const url =
                URL.createObjectURL(blob);


            const link =
                document.createElement("a");

            link.href = url;

            link.download =
                "votesphere-voter-records.csv";

            document.body.appendChild(link);

            link.click();

            link.remove();

            URL.revokeObjectURL(url);

        }
    );


    /* =====================================================
       INITIALIZE
       ===================================================== */

    filterVoters();

});
