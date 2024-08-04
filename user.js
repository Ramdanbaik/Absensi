function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    sidebar.classList.toggle('collapsed');
    content.classList.toggle('shifted');
}
// JavaScript code for user dashboard functionality

// Show specific page
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'block';
}



// Logout function
function logout() {
    // Redirect to login page or perform logout operations
    window.location.href = 'login.html'; // Change this to your actual logout URL
}

// Update class summary






// Update attendance list
function updateAttendanceList() {
    const classSelected = document.getElementById('attendanceClassSelect').value;
    const attendances = JSON.parse(localStorage.getItem('attendances')) || [];
    const filteredAttendances = attendances.filter(a => a.class === classSelected);
    
    const attendanceList = document.getElementById('attendanceList');
    attendanceList.innerHTML = '';
    
    filteredAttendances.forEach(a => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${a.class}</td>
            <td>${a.name}</td>
            <td>${a.date}</td>
            <td>${a.status}</td>
        `;
        attendanceList.appendChild(row);
    });
}

// Update assessment list
function updateAssessmentList() {
    const classSelected = document.getElementById('assessmentClassSelect').value;
    const assessments = JSON.parse(localStorage.getItem('assessments')) || [];
    const filteredAssessments = assessments.filter(a => a.class === classSelected);
    
    const assessmentList = document.getElementById('assessmentList');
    assessmentList.innerHTML = '';
    
    filteredAssessments.forEach(a => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${a.class}</td>
            <td>${a.name}</td>
            <td>${a.date}</td>
            <td>${a.score}</td>
        `;
        assessmentList.appendChild(row);
    });
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    showPage('profile'); // Default page to show on load
    updateClassSummary(); // Update the summary on page load

    // Event listeners for form fields and buttons
    document.getElementById('attendanceClassSelect').addEventListener('change', updateAttendanceList);
    document.getElementById('assessmentClassSelect').addEventListener('change', updateAssessmentList);
});
// Function to delete a student
function deleteStudent(studentId) {
    var students = JSON.parse(localStorage.getItem('students')) || [];
    students = students.filter(student => student.id !== studentId);
    localStorage.setItem('students', JSON.stringify(students));
    updateStudentList();
    updateClassSummary();
}

// Function to update class summary
function updateClassSummary() {
    var students = JSON.parse(localStorage.getItem('students')) || [];
        var classes = ['7A', '7B', '7C', '7D', '8A', '8B', '8C', '8D', '9A', '9B', '9C', '9D'];
    
    classes.forEach(classId => {
        var count = students.filter(student => student.class === classId).length;
        document.getElementById(`summary-${classId}`).innerText = `${count} Siswa`;
    });
}

// Function to save attendance
function saveAttendance() {
    var attendanceId = document.getElementById('attendanceId').value;
    var attendanceClass = document.getElementById('attendanceClassSelect').value;
    var attendanceStudent = document.getElementById('attendanceStudent').value;
    var attendanceDate = document.getElementById('attendanceDate').value;
    var attendanceStatus = document.getElementById('attendanceStatus').value;

    var attendances = JSON.parse(localStorage.getItem('attendances')) || [];

    if (attendanceId) {
        var index = attendances.findIndex(attendance => attendance.id === attendanceId);
        if (index !== -1) {
            attendances[index] = { id: attendanceId, class: attendanceClass, student: attendanceStudent, date: attendanceDate, status: attendanceStatus };
        }
    } else {
        var newAttendance = {
            id: Date.now().toString(),
            class: attendanceClass,
            student: attendanceStudent,
            date: attendanceDate,
            status: attendanceStatus
        };
        attendances.push(newAttendance);
    }

    localStorage.setItem('attendances', JSON.stringify(attendances));
    document.getElementById('attendanceForm').reset();
    updateAttendanceList();
}

// Function to update the attendance list
function updateAttendanceList() {
    var attendances = JSON.parse(localStorage.getItem('attendances')) || [];
    var attendanceClassSelect = document.getElementById('attendanceClassSelect').value;
    var attendanceList = document.getElementById('attendanceList');
    attendanceList.innerHTML = '';

    attendances.forEach(attendance => {
        if (attendance.class === attendanceClassSelect) {
            var row = document.createElement('tr');
            row.innerHTML = `<td>${attendance.student}</td><td>${attendance.date}</td><td>${attendance.status}</td><td><button onclick="editAttendance('${attendance.id}')">Edit</button><button onclick="deleteAttendance('${attendance.id}')">Delete</button></td>`;
            attendanceList.appendChild(row);
        }
    });
}

// Function to edit attendance
function editAttendance(attendanceId) {
    var attendances = JSON.parse(localStorage.getItem('attendances')) || [];
    var attendance = attendances.find(attendance => attendance.id === attendanceId);
    if (attendance) {
        document.getElementById('attendanceId').value = attendance.id;
        document.getElementById('attendanceClassSelect').value = attendance.class;
        document.getElementById('attendanceStudent').value = attendance.student;
        document.getElementById('attendanceDate').value = attendance.date;
        document.getElementById('attendanceStatus').value = attendance.status;
    }
}

// Function to delete attendance
function deleteAttendance(attendanceId) {
    var attendances = JSON.parse(localStorage.getItem('attendances')) || [];
    attendances = attendances.filter(attendance => attendance.id !== attendanceId);
    localStorage.setItem('attendances', JSON.stringify(attendances));
    updateAttendanceList();
}

// Function to save assessment
function saveAssessment() {
    var assessmentId = document.getElementById('assessmentId').value;
    var assessmentClass = document.getElementById('assessmentClassSelect').value;
    var assessmentStudent = document.getElementById('assessmentStudent').value;
    var assessmentDate = document.getElementById('assessmentDate').value;
    var assessmentScore = document.getElementById('assessmentScore').value;

    var assessments = JSON.parse(localStorage.getItem('assessments')) || [];

    if (assessmentId) {
        var index = assessments.findIndex(assessment => assessment.id === assessmentId);
        if (index !== -1) {
            assessments[index] = { id: assessmentId, class: assessmentClass, student: assessmentStudent, date: assessmentDate, score: assessmentScore };
        }
    } else {
        var newAssessment = {
            id: Date.now().toString(),
            class: assessmentClass,
            student: assessmentStudent,
            date: assessmentDate,
            score: assessmentScore
        };
        assessments.push(newAssessment);
    }

    localStorage.setItem('assessments', JSON.stringify(assessments));
    document.getElementById('assessmentForm').reset();
    updateAssessmentList();
}

// Function to update the assessment list
function updateAssessmentList() {
    var assessments = JSON.parse(localStorage.getItem('assessments')) || [];
    var assessmentClassSelect = document.getElementById('assessmentClassSelect').value;
    var assessmentList = document.getElementById('assessmentList');
    assessmentList.innerHTML = '';

    assessments.forEach(assessment => {
        if (assessment.class === assessmentClassSelect) {
            var row = document.createElement('tr');
            row.innerHTML = `<td>${assessment.student}</td><td>${assessment.date}</td><td>${assessment.score}</td><td><button onclick="editAssessment('${assessment.id}')">Edit</button><button onclick="deleteAssessment('${assessment.id}')">Delete</button></td>`;
            assessmentList.appendChild(row);
        }
    });
}

// Function to edit assessment
function editAssessment(assessmentId) {
    var assessments = JSON.parse(localStorage.getItem('assessments')) || [];
    var assessment = assessments.find(assessment => assessment.id === assessmentId);
    if (assessment) {
        document.getElementById('assessmentId').value = assessment.id;
        document.getElementById('assessmentClassSelect').value = assessment.class;
        document.getElementById('assessmentStudent').value = assessment.student;
        document.getElementById('assessmentDate').value = assessment.date;
        document.getElementById('assessmentScore').value = assessment.score;
    }
}

// Function to delete assessment
function deleteAssessment(assessmentId) {
    var assessments = JSON.parse(localStorage.getItem('assessments')) || [];
    assessments = assessments.filter(assessment => assessment.id !== assessmentId);
    localStorage.setItem('assessments', JSON.stringify(assessments));
    updateAssessmentList();
}

// Function to clear all data
function clearAllData() {
    localStorage.removeItem('students');
    localStorage.removeItem('attendances');
    localStorage.removeItem('assessments');
    updateStudentList();
    updateClassSummary();
    updateAttendanceList();
    updateAssessmentList();
}

// Function to search students
function searchStudent() {
    var searchInput = document.getElementById('searchStudent').value.toLowerCase();
    var students = JSON.parse(localStorage.getItem('students')) || [];
    var classTables = document.getElementById('classTables');
    classTables.innerHTML = '';

    students.forEach(student => {
        if (student.name.toLowerCase().includes(searchInput)) {
            var studentDiv = document.createElement('div');
            studentDiv.className = 'student-item';
            studentDiv.innerHTML = `<p>${student.name}</p><button onclick="editStudent('${student.id}')">Edit</button><button onclick="deleteStudent('${student.id}')">Delete</button>`;
            classTables.appendChild(studentDiv);
        }
    });
}

// Function to search attendance
function searchAttendance() {
    var searchInput = document.getElementById('searchAttendance').value.toLowerCase();
    var attendances = JSON.parse(localStorage.getItem('attendances')) || [];
    var attendanceList = document.getElementById('attendanceList');
    attendanceList.innerHTML = '';

    attendances.forEach(attendance => {
        if (attendance.student.toLowerCase().includes(searchInput)) {
            var row = document.createElement('tr');
            row.innerHTML = `<td>${attendance.student}</td><td>${attendance.date}</td><td>${attendance.status}</td><td><button onclick="editAttendance('${attendance.id}')">Edit</button><button onclick="deleteAttendance('${attendance.id}')">Delete</button></td>`;
            attendanceList.appendChild(row);
        }
    });
}

// Function to search assessment
function searchAssessment() {
    var searchInput = document.getElementById('searchAssessment').value.toLowerCase();
    var assessments = JSON.parse(localStorage.getItem('assessments')) || [];
    var assessmentList = document.getElementById('assessmentList');
    assessmentList.innerHTML = '';

    assessments.forEach(assessment => {
        if (assessment.student.toLowerCase().includes(searchInput)) {
            var row = document.createElement('tr');
            row.innerHTML = `<td>${assessment.student}</td><td>${assessment.date}</td><td>${assessment.score}</td><td><button onclick="editAssessment('${assessment.id}')">Edit</button><button onclick="deleteAssessment('${assessment.id}')">Delete</button></td>`;
            assessmentList.appendChild(row);
        }
    });
}

// Function to logout
function logout() {
    // Clear session or token here if you have implemented authentication
    window.location.href = 'login.html';
}

// Initial call to update data
document.addEventListener('DOMContentLoaded', function() {
    updateStudentList();
    updateClassSummary();
    updateAttendanceList();
    updateAssessmentList();
});
