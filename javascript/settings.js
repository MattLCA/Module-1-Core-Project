document.addEventListener("DOMContentLoaded", () => {

    const tabs = document.querySelectorAll(".tab-btn");

    const contents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            tabs.forEach(button =>
                button.classList.remove("active")
            );

            contents.forEach(content =>
                content.classList.remove("active")
            );

            tab.classList.add("active");

            document
                .getElementById(tab.dataset.tab)
                .classList.add("active");

        });

    });

});