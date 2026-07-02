console.log("Employee Information JS file is connected");

// const tabs = document.querySelectorAll(".tab");
// const sections = document.querySelectorAll(".tab-content");

// tabs.forEach((tab, index) => {
//     tab.addEventListener("click", () => {

//         // Remove active classes
//         tabs.forEach(t => t.classList.remove("active-tab"));
//         sections.forEach(section => section.classList.remove("active"));

//         // Activate selected tab and content
//         tab.classList.add("active-tab");
//         sections[index].classList.add("active");
//     });
// });


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