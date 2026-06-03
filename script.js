// ==========================
// SIDEBAR TOGGLE
// ==========================

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

if(menuBtn){
    menuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("show");
    });
}

// ==========================
// DARK MODE
// ==========================

const themeToggle = document.getElementById("themeToggle");

if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark");
    if(themeToggle){
        themeToggle.innerHTML = "☀";
    }
}

if(themeToggle){
    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if(document.body.classList.contains("dark")){
            localStorage.setItem("theme","dark");
            themeToggle.innerHTML = "☀";
        }else{
            localStorage.setItem("theme","light");
            themeToggle.innerHTML = "🌙";
        }

    });
}

// ==========================
// STUDENT SEARCH
// ==========================

const searchInput = document.getElementById("studentSearch");

if(searchInput){

    searchInput.addEventListener("keyup", () => {

        const filter = searchInput.value.toLowerCase();

        const rows =
        document.querySelectorAll("#studentTable tr");

        rows.forEach(row => {

            const text =
            row.textContent.toLowerCase();

            if(text.includes(filter)){
                row.style.display = "";
            }else{
                row.style.display = "none";
            }

        });

    });

}

// ==========================
// MODAL
// ==========================

const modal =
document.getElementById("studentModal");

const addBtn =
document.querySelector(".add-btn");

const closeBtn =
document.querySelector(".close-modal");

if(addBtn){
    addBtn.addEventListener("click", () => {
        modal.style.display = "flex";
    });
}

if(closeBtn){
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });
}

window.addEventListener("click", (e) => {

    if(e.target === modal){
        modal.style.display = "none";
    }

});

// ==========================
// ADD STUDENT
// ==========================

const studentForm =
document.getElementById("studentForm");

const studentTable =
document.getElementById("studentTable");

const studentCount =
document.getElementById("studentCount");

let totalStudents = 1250;

if(studentForm){

    studentForm.addEventListener(
        "submit",
        function(e){

        e.preventDefault();

        const inputs =
        this.querySelectorAll("input");

        const name =
        inputs[0].value;

        const studentClass =
        inputs[1].value;

        const section =
        inputs[2].value;

        const row =
        document.createElement("tr");

        row.innerHTML = `
            <td>${Date.now().toString().slice(-4)}</td>
            <td>${name}</td>
            <td>${studentClass}</td>
            <td>${section}</td>
            <td>
                <span class="badge active">
                    Active
                </span>
            </td>
        `;

        studentTable.appendChild(row);

        totalStudents++;

        if(studentCount){
            studentCount.textContent =
            totalStudents.toLocaleString();
        }

        modal.style.display = "none";

        this.reset();

        alert("Student Added Successfully");

    });

}

// ==========================
// ATTENDANCE CHART
// ==========================

const chartCanvas =
document.getElementById("attendanceChart");

if(chartCanvas){

    new Chart(chartCanvas, {

        type: "bar",

        data: {

            labels: [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat"
            ],

            datasets: [{

                label: "Attendance %",

                data: [
                    92,
                    95,
                    93,
                    97,
                    94,
                    91
                ],

                backgroundColor: [
                    "#1e3c72",
                    "#2a5298",
                    "#3f6bc2",
                    "#4d7ae6",
                    "#2a5298",
                    "#1e3c72"
                ],

                borderRadius: 10

            }]
        },

        options: {

            responsive: true,

            plugins: {

                legend: {
                    display: true
                }

            },

            scales: {

                y: {

                    beginAtZero: true,

                    max: 100

                }

            }

        }

    });

}

// ==========================
// SAVE STUDENTS LOCALSTORAGE
// ==========================

function saveStudents(){

    localStorage.setItem(
        "studentTableData",
        studentTable.innerHTML
    );

}

function loadStudents(){

    const data =
    localStorage.getItem(
        "studentTableData"
    );

    if(data){

        studentTable.innerHTML = data;

    }

}

if(studentTable){

    loadStudents();

    const observer =
    new MutationObserver(() => {

        saveStudents();

    });

    observer.observe(
        studentTable,
        {
            childList:true,
            subtree:true
        }
    );

}

// ==========================
// ACTIVE SIDEBAR MENU
// ==========================

const menuLinks =
document.querySelectorAll(".sidebar ul li");

menuLinks.forEach(item => {

    item.addEventListener("click", () => {

        menuLinks.forEach(link => {
            link.classList.remove("active");
        });

        item.classList.add("active");

    });

});

// ==========================
// WELCOME MESSAGE
// ==========================

window.addEventListener("load", () => {

    setTimeout(() => {

        console.log(
            "School Management Dashboard Loaded"
        );

    }, 500);

});