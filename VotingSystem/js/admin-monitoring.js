document.addEventListener("DOMContentLoaded", () => {

    const lastUpdated =
        document.getElementById("lastUpdated");

    const votesCast =
        document.getElementById("votesCast");

    const votesToday =
        document.getElementById("votesToday");

    const activityRange =
        document.getElementById("activityRange");

    const adminEmail =
        document.getElementById("adminEmail");

    const notificationButton =
        document.getElementById("notificationButton");

    const footerYear =
        document.getElementById("footerYear");

    const chartBars =
        document.querySelectorAll(".chart-bar");

    const refreshButton =
        document.getElementById("refreshMonitoringButton");


    if (footerYear) {
        footerYear.textContent =
            new Date().getFullYear();
    }


    const storedAdminEmail =
        sessionStorage.getItem("voteSphereAdminEmail");

    if (adminEmail && storedAdminEmail) {
        adminEmail.textContent =
            storedAdminEmail;
    }



    function updateTimestamp() {

        if (!lastUpdated) {
            return;
        }

        const now = new Date();

        lastUpdated.textContent =
            `Updated ${now.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            })}`;
    }

    updateTimestamp();


    let currentVotes = 1872;
    let currentToday = 146;


    function updateSummary() {

        if (votesCast) {
            votesCast.textContent =
                currentVotes.toLocaleString();
        }

        if (votesToday) {
            votesToday.textContent =
                currentToday.toLocaleString();
        }
    }


    function simulateActivity() {

        const shouldAddVote =
            Math.random() > 0.55;

        if (shouldAddVote) {

            currentVotes++;
            currentToday++;

            updateSummary();
        }

        updateTimestamp();
    }


    setInterval(
        simulateActivity,
        15000
    );


    const chartData = {

        today: [
            31,
            44,
            58,
            73,
            91,
            80,
            146
        ],

        week: [
            142,
            188,
            224,
            167,
            246,
            219,
            146
        ],

        period: [
            142,
            188,
            224,
            167,
            246,
            219,
            146
        ]

    };


    const peakDayElement =
        document.querySelector(
            ".chart-summary div:nth-child(1) strong"
        );

    const highestActivityElement =
        document.querySelector(
            ".chart-summary div:nth-child(2) strong"
        );

    const averageDayElement =
        document.querySelector(
            ".chart-summary div:nth-child(3) strong"
        );


    const dayNames = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];


    function updateChartSummary(values) {

        if (!values.length) {
            return;
        }

        const maxValue =
            Math.max(...values);

        const maxIndex =
            values.indexOf(maxValue);

        const total =
            values.reduce(
                (sum, value) => sum + value,
                0
            );

        const average =
            Math.round(
                total / values.length
            );


        if (peakDayElement) {
            peakDayElement.textContent =
                dayNames[maxIndex];
        }

        if (highestActivityElement) {

            /*
             * Demo estimate.
             * Real hourly analytics will come
             * from the backend later.
             */
            highestActivityElement.textContent =
                maxValue >= 220
                    ? "10 AM – 12 PM"
                    : "12 PM – 2 PM";
        }

        if (averageDayElement) {
            averageDayElement.textContent =
                `${average.toLocaleString()} votes`;
        }
    }


    function renderChart(range) {

        if (!chartBars.length) {
            return;
        }

        const values =
            chartData[range] ||
            chartData.week;

        const max =
            Math.max(...values);


        chartBars.forEach(
            (bar, index) => {

                const value =
                    values[index] || 0;

                const percentage =
                    Math.max(
                        5,
                        (value / max) * 82
                    );


                bar.style.height =
                    `${percentage}%`;

                bar.dataset.value =
                    value;

                bar.title =
                    `${value.toLocaleString()} votes`;
            }
        );


        updateChartSummary(values);
    }
 

    if (activityRange) {

        activityRange.addEventListener(
            "change",
            () => {

                renderChart(
                    activityRange.value
                );

                updateTimestamp();
            }
        );
    }



    chartBars.forEach(
        bar => {

            bar.addEventListener(
                "mouseenter",
                () => {

                    const value =
                        Number(
                            bar.dataset.value || 0
                        );

                    bar.title =
                        `${value.toLocaleString()} votes`;
                }
            );

        }
    );


    chartBars.forEach(
        bar => {

            const finalHeight =
                bar.style.height;

            bar.style.height =
                "3%";

            requestAnimationFrame(() => {

                setTimeout(() => {

                    bar.style.height =
                        finalHeight;

                }, 100);

            });

        }
    );


    if (refreshButton) {

        refreshButton.addEventListener(
            "click",
            () => {

                const originalText =
                    refreshButton.textContent;

                refreshButton.disabled = true;

                refreshButton.textContent =
                    "Refreshing...";

                setTimeout(() => {

                    updateSummary();

                    updateTimestamp();

                    renderChart(
                        activityRange
                            ? activityRange.value
                            : "week"
                    );

                    refreshButton.disabled =
                        false;

                    refreshButton.textContent =
                        originalText;

                }, 700);

            }
        );
    }


    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            () => {

                alert(
                    "No new critical monitoring alerts. All active elections are operating normally."
                );

            }
        );
    }


    document
        .querySelectorAll("[data-demo-link]")
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();

                        const feature =
                            link.dataset.demoLink;

                        alert(
                            `${feature} will be implemented in a later admin phase.`
                        );

                    }
                );

            }
        );


    updateSummary();

    renderChart(
        activityRange
            ? activityRange.value
            : "week"
    );


    console.log(
        "VoteSphere Vote Monitoring loaded successfully."
    );

});