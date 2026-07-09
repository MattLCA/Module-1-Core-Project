// console.log("Leave JS connected.");

// document.addEventListener("DOMContentLoaded", () => {

  /*=====================================================
    VARIABLES
  =====================================================*/

  // const tabs = document.querySelectorAll(".emp-leave-tab");
  // const contents = document.querySelectorAll(".emp-leave-content");

  // const form = document.getElementById("emp-leave-leaveForm");
  // const modal = document.getElementById("emp-leaveModal");
  // const closeModal = document.getElementById("emp-leave-closeModal");
  // const tableBody = document.getElementById("leaveHistoryTable");

  // let history = [];

  /*=====================================================
    TABS
  =====================================================*/

  // tabs.forEach((tab) => {
  //   tab.addEventListener("click", () => {

  //     tabs.forEach((t) => t.classList.remove("active"));
  //     contents.forEach((c) => c.classList.remove("active"));

  //     tab.classList.add("active");
  //     document.getElementById(tab.dataset.tab).classList.add("active");

  //   });
  // });

  /*=====================================================
    LOAD JSON
  =====================================================*/

  // fetch("data/leave_data.json")
  //   .then((response) => response.json())

  //   .then((data) => {

  //     const employee = data.employeeLeave;

  //     // Leave Balance

  //     document.getElementById("annualLeave").textContent =
  //       employee.leaveBalance.annual + " Days";

  //     document.getElementById("sickLeave").textContent =
  //       employee.leaveBalance.sick + " Days";

  //     document.getElementById("familyLeave").textContent =
  //       employee.leaveBalance.family + " Days";

  //     document.getElementById("studyLeave").textContent =
  //       employee.leaveBalance.study + " Days";

  //     // Load history

  //     history = employee.leaveHistory;

  //     const saved = localStorage.getItem("employeeLeaveHistory");

  //     if (saved) {
  //       history = JSON.parse(saved);
  //     }

  //     renderTable(history);

  //   });

  // /*=====================================================
  //   RENDER TABLE
  // =====================================================*/

  // function renderTable(records) {

  //   tableBody.innerHTML = "";

  //   records.forEach((record) => {

  //     let statusClass = "";

  //     if (record.status === "Approved") {

  //       statusClass = "emp-leave-approved";

  //     } else if (record.status === "Pending") {

  //       statusClass = "emp-leave-pending";

  //     } else {

  //       statusClass = "emp-leave-rejected";

  //     }

  //     tableBody.innerHTML += `

  //       <tr>

  //         <td>${record.type}</td>

  //         <td>${record.startDate}</td>

  //         <td>${record.endDate || "-"}</td>

  //         <td>${record.days}</td>

  //         <td>

  //           <span class="emp-leave-status ${statusClass}">

  //             ${record.status}

  //           </span>

  //         </td>

  //       </tr>

  //     `;

  //   });

  // }

  /*=====================================================
    FILTERS
  =====================================================*/

  // document
  //   .getElementById("filterType")
  //   .addEventListener("change", filterTable);

  // document
  //   .getElementById("filterStatus")
  //   .addEventListener("change", filterTable);

  // document
  //   .getElementById("fromDate")
  //   .addEventListener("change", filterTable);

  // document
  //   .getElementById("toDate")
  //   .addEventListener("change", filterTable);

  // document
  //   .getElementById("clearFilters")
  //   .addEventListener("click", () => {

  //     document.getElementById("filterType").value = "All";
  //     document.getElementById("filterStatus").value = "All";
  //     document.getElementById("fromDate").value = "";
  //     document.getElementById("toDate").value = "";

  //     renderTable(history);

  //   });

  // function filterTable() {

  //   let filtered = [...history];

  //   const type = document.getElementById("filterType").value;
  //   const status = document.getElementById("filterStatus").value;
  //   const from = document.getElementById("fromDate").value;
  //   const to = document.getElementById("toDate").value;

  //   if (type !== "All") {
  //     filtered = filtered.filter((item) => item.type === type);
  //   }

  //   if (status !== "All") {
  //     filtered = filtered.filter((item) => item.status === status);
  //   }

  //   if (from !== "") {
  //     filtered = filtered.filter((item) => item.startDate >= from);
  //   }

  //   if (to !== "") {
  //     filtered = filtered.filter((item) => item.startDate <= to);
  //   }

  //   renderTable(filtered);

  // }

  /*=====================================================
    FORM SUBMIT
  =====================================================*/

  // form.addEventListener("submit", function (e) {

  //   e.preventDefault();

  //   const request = {

  //     type: document.getElementById("leaveType").value,

  //     days: Number(document.getElementById("leaveDays").value),

  //     startDate: document.getElementById("startDate").value,

  //     endDate: document.getElementById("endDate").value,

  //     status: "Pending",

  //   };

  //   // Update modal

  //   document.getElementById("summaryType").textContent = request.type;
  //   document.getElementById("summaryDays").textContent = request.days;
  //   document.getElementById("summaryStart").textContent = request.startDate;
  //   document.getElementById("summaryEnd").textContent = request.endDate;

  //   document.getElementById("summaryReason").textContent =
  //     document.getElementById("leaveReason").value;

    // Add to history

  //   history.unshift(request);

  //   localStorage.setItem(
  //     "employeeLeaveHistory",
  //     JSON.stringify(history)
  //   );

  //   renderTable(history);

  //   // Show modal

  //   modal.classList.add("show");

  // });

  /*=====================================================
    CLOSE MODAL
  =====================================================*/

//   closeModal.addEventListener("click", () => {

//     modal.classList.remove("show");

//     form.reset();

//     tabs.forEach((tab) => tab.classList.remove("active"));

//     contents.forEach((content) => content.classList.remove("active"));

//     document
//       .querySelector('[data-tab="history"]')
//       .classList.add("active");

//     document
//       .getElementById("history")
//       .classList.add("active");

//   });

// });




console.log("Leave JS connected.");

document.addEventListener("DOMContentLoaded", () => {

    /*=====================================================
      VARIABLES
    =====================================================*/

    const tabs = document.querySelectorAll(".emp-leave-tab");

const contents = document.querySelectorAll(".emp-leave-content");


const form = document.getElementById("leaveForm");


const modal = document.getElementById("emp-leaveModal");


const closeModal = document.getElementById("emp-leave-closeModal");


const tableBody = document.getElementById("leaveHistoryTable");


let history = [];


    /*=====================================================
      TABS
    =====================================================*/

    tabs.forEach((tab) => {

        tab.addEventListener("click", () => {

            tabs.forEach((t) => {
                t.classList.remove("active");
            });

            contents.forEach((content) => {
                content.classList.remove("active");
            });


            tab.classList.add("active");


            const target = tab.dataset.tab;

            const targetContent = document.getElementById(target);

            if (targetContent) {
                targetContent.classList.add("active");
            }

        });

    });



    /*=====================================================
      LOAD JSON DATA
    =====================================================*/

    fetch("data/leave_data.json")

        .then((response) => {

            if (!response.ok) {
                throw new Error("Could not load leave data.");
            }

            return response.json();

        })


        .then((data) => {


            const employee = data.employeeLeave;


            /*
              LEAVE BALANCE
            */

            document.getElementById("annualLeave").textContent =
                employee.leaveBalance.annual + " Days";


            document.getElementById("sickLeave").textContent =
                employee.leaveBalance.sick + " Days";


            document.getElementById("familyLeave").textContent =
                employee.leaveBalance.family + " Days";


            document.getElementById("studyLeave").textContent =
                employee.leaveBalance.study + " Days";



            /*
              LEAVE HISTORY
            */


            history = employee.leaveHistory;


            const savedHistory =
                localStorage.getItem("employeeLeaveHistory");


            if (savedHistory) {

                history = JSON.parse(savedHistory);

            }


            renderTable(history);


        })


        .catch((error) => {

            console.error(error);

        });



    /*=====================================================
      RENDER HISTORY TABLE
    =====================================================*/


    function renderTable(records) {


        if (!tableBody) return;


        tableBody.innerHTML = "";



        records.forEach((record) => {


            let statusClass = "";


            if (record.status === "Approved") {

                statusClass = "emp-leave-approved";

            }

            else if (record.status === "Pending") {

                statusClass = "emp-leave-pending";

            }

            else {

                statusClass = "emp-leave-rejected";

            }



            tableBody.innerHTML += `

                <tr>

                    <td>${record.type}</td>

                    <td>${record.startDate}</td>

                    <td>${record.endDate || "-"}</td>

                    <td>${record.days}</td>

                    <td>

                        <span class="emp-leave-status ${statusClass}">
                            ${record.status}
                        </span>

                    </td>

                </tr>

            `;


        });


    }




    /*=====================================================
      FILTERS
    =====================================================*/


    const filterType = document.getElementById("filterType");
    const filterStatus = document.getElementById("filterStatus");
    const fromDate = document.getElementById("fromDate");
    const toDate = document.getElementById("toDate");
    const clearFilters = document.getElementById("clearFilters");



    if (filterType) {
        filterType.addEventListener("change", filterTable);
    }


    if (filterStatus) {
        filterStatus.addEventListener("change", filterTable);
    }


    if (fromDate) {
        fromDate.addEventListener("change", filterTable);
    }


    if (toDate) {
        toDate.addEventListener("change", filterTable);
    }



    if (clearFilters) {


        clearFilters.addEventListener("click", () => {


            filterType.value = "All";

            filterStatus.value = "All";

            fromDate.value = "";

            toDate.value = "";


            renderTable(history);


        });


    }




    function filterTable() {


        let filtered = [...history];


        const type = filterType.value;

        const status = filterStatus.value;

        const from = fromDate.value;

        const to = toDate.value;



        if (type !== "All") {

            filtered = filtered.filter((item) => {

                return item.type === type;

            });

        }



        if (status !== "All") {

            filtered = filtered.filter((item) => {

                return item.status === status;

            });

        }



        if (from !== "") {

            filtered = filtered.filter((item) => {

                return item.startDate >= from;

            });

        }



        if (to !== "") {

            filtered = filtered.filter((item) => {

                return item.startDate <= to;

            });

        }



        renderTable(filtered);


    }





    /*=====================================================
      FORM SUBMIT
    =====================================================*/


    if (form) {


    form.addEventListener("submit", (e) => {


        e.preventDefault();



        const request = {


            type: document.getElementById("leaveType").value,


            days: Number(
                document.getElementById("leaveDays").value
            ),


            startDate: document.getElementById("startDate").value,


            endDate: document.getElementById("endDate").value,


            reason: document.getElementById("leaveReason").value,


            status: "Pending"


        };



        /*
        ================================================
        UPDATE MODAL WITH FORM DATA
        ================================================
        */


        document.getElementById("summaryType").textContent =
            request.type;



        document.getElementById("summaryDays").textContent =
            request.days + " Days";



        document.getElementById("summaryStart").textContent =
            request.startDate;



        document.getElementById("summaryEnd").textContent =
            request.endDate;



        document.getElementById("summaryReason").textContent =
            request.reason;




        /*
        ================================================
        ADD REQUEST TO HISTORY TABLE
        ================================================
        */


        history.unshift(request);



        localStorage.setItem(
            "employeeLeaveHistory",
            JSON.stringify(history)
        );



        renderTable(history);





        /*
        ================================================
        SHOW MODAL
        ================================================
        */


        if (modal) {

            modal.classList.add("show");

        }



    });


}




    /*=====================================================
      CLOSE MODAL
    =====================================================*/


    if (closeModal) {


        closeModal.addEventListener("click", () => {



            modal.classList.remove("show");



            if (form) {

                form.reset();

            }



            tabs.forEach((tab)=>{

                tab.classList.remove("active");

            });



            contents.forEach((content)=>{

                content.classList.remove("active");

            });



            document
                .querySelector('[data-tab="history"]')
                .classList.add("active");



            document
                .getElementById("history")
                .classList.add("active");



        });


    }



});
