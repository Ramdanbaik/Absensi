// Toggle Sidebar Visibility
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
}

// Show Page
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none');
    document.getElementById(pageId).style.display = 'block';
}

// Logout Function
function logout() {
    // Implement logout logic, e.g., redirect to login page or clear session data
    window.location.href = 'login.html';
}

// Save Student
function saveStudent() {
    const id = document.getElementById('studentId').value;
    const student = {
        id: id || Date.now().toString(),
        class: document.getElementById('classSelect').value,
        name: document.getElementById('studentName').value,
        address: document.getElementById('studentAddress').value,
        gender: document.getElementById('studentGender').value
    };

    let students = JSON.parse(localStorage.getItem('students')) || [];
    if (id) {
        students = students.map(s => s.id === id ? student : s);
    } else {
        students.push(student);
    }
    localStorage.setItem('students', JSON.stringify(students));
    updateStudentList();
    document.getElementById('studentForm').reset();
    document.getElementById('studentId').value = '';
}

// Update Student List
function updateStudentList() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const classSelect = document.getElementById('classSelect').value;
    const classTables = document.getElementById('classTables');
    classTables.innerHTML = '';

    const selectedClassStudents = students.filter(student => student.class === classSelect);

    if (selectedClassStudents.length > 0) {
        const table = document.createElement('table');
        table.className = 'student-table';
        table.innerHTML = `<caption>Kelas ${classSelect}</caption>
                           <tr>
                               <th>Nama</th>
                               <th>Alamat</th>
                               <th>Jenis Kelamin</th>
                               <th>Aksi</th>
                           </tr>`;
        selectedClassStudents.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${student.name}</td>
                             <td>${student.address}</td>
                             <td>${student.gender}</td>
                             <td>
                                 <button onclick="editStudent('${student.id}')">Edit</button>
                                 <button onclick="deleteStudent('${student.id}')">Delete</button>
                             </td>`;
            table.appendChild(row);
        });
        classTables.appendChild(table);
    } else {
        classTables.innerHTML = `<p>Tidak ada siswa untuk kelas ${classSelect}.</p>`;
    }
}

// Edit Student
function editStudent(id) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const student = students.find(s => s.id === id);
    if (student) {
        document.getElementById('studentId').value = student.id;
        document.getElementById('classSelect').value = student.class;
        document.getElementById('studentName').value = student.name;
        document.getElementById('studentAddress').value = student.address;
        document.getElementById('studentGender').value = student.gender;
        showPage('students');
    }
}

// Delete Student
function deleteStudent(id) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students = students.filter(s => s.id !== id);
    localStorage.setItem('students', JSON.stringify(students));
    updateStudentList();
}

// Clear All Data
function clearAllData() {
    if (confirm('Yakin ingin menghapus semua data?')) {
        localStorage.removeItem('students');
        localStorage.removeItem('attendance');
        localStorage.removeItem('assessments');
        updateStudentList();
        updateAttendanceList();
        updateAssessmentList();
    }
}

// Save Attendance
function saveAttendance() {
    const id = document.getElementById('attendanceId').value;
    const attendance = {
        id: id || Date.now().toString(),
        class: document.getElementById('attendanceClassSelect').value,
        student: document.getElementById('attendanceStudent').value,
        date: document.getElementById('attendanceDate').value,
        status: document.getElementById('attendanceStatus').value
    };

    let attendances = JSON.parse(localStorage.getItem('attendance')) || [];
    if (id) {
        attendances = attendances.map(a => a.id === id ? attendance : a);
    } else {
        attendances.push(attendance);
    }
    localStorage.setItem('attendance', JSON.stringify(attendances));
    updateAttendanceList();
    document.getElementById('attendanceForm').reset();
    document.getElementById('attendanceId').value = '';
}

// Update Attendance Student List
function updateAttendanceStudentList() {
    const classSelect = document.getElementById('attendanceClassSelect').value;
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const studentSelect = document.getElementById('attendanceStudent');
    studentSelect.innerHTML = '';

    students.filter(student => student.class === classSelect).forEach(student => {
        const option = document.createElement('option');
        option.value = student.name;
        option.textContent = student.name;
        studentSelect.appendChild(option);
    });
}

// Update Attendance List
function updateAttendanceList() {
    const attendances = JSON.parse(localStorage.getItem('attendance')) || [];
    const attendanceList = document.getElementById('attendanceList');
    attendanceList.innerHTML = '';

    attendances.forEach(attendance => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${attendance.student}</td>
                         <td>${attendance.date}</td>
                         <td>${attendance.status}</td>
                         <td>
                             <button onclick="editAttendance('${attendance.id}')">Edit</button>
                             <button onclick="deleteAttendance('${attendance.id}')">Delete</button>
                         </td>`;
        attendanceList.appendChild(row);
    });
}

// Edit Attendance
function editAttendance(id) {
    const attendances = JSON.parse(localStorage.getItem('attendance')) || [];
    const attendance = attendances.find(a => a.id === id);
    if (attendance) {
        document.getElementById('attendanceId').value = attendance.id;
        document.getElementById('attendanceClassSelect').value = attendance.class;
        document.getElementById('attendanceStudent').value = attendance.student;
        document.getElementById('attendanceDate').value = attendance.date;
        document.getElementById('attendanceStatus').value = attendance.status;
        showPage('attendanceTables');
    }
}

// Delete Attendance
function deleteAttendance(id) {
    let attendances = JSON.parse(localStorage.getItem('attendance')) || [];
    attendances = attendances.filter(a => a.id !== id);
    localStorage.setItem('attendance', JSON.stringify(attendances));
    updateAttendanceList();
}

// Save Assessment
function saveAssessment() {
    const id = document.getElementById('assessmentId').value;
    const assessment = {
        id: id || Date.now().toString(),
        class: document.getElementById('assessmentClassSelect').value,
        student: document.getElementById('assessmentStudent').value,
        date: document.getElementById('assessmentDate').value,
        score: document.getElementById('assessmentScore').value
    };

    let assessments = JSON.parse(localStorage.getItem('assessments')) || [];
    if (id) {
        assessments = assessments.map(a => a.id === id ? assessment : a);
    } else {
        assessments.push(assessment);
    }
    localStorage.setItem('assessments', JSON.stringify(assessments));
    updateAssessmentList();
    document.getElementById('assessmentForm').reset();
    document.getElementById('assessmentId').value = '';
}

// Update Assessment Student List
function updateAssessmentStudentList() {
    const classSelect = document.getElementById('assessmentClassSelect').value;
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const studentSelect = document.getElementById('assessmentStudent');
    studentSelect.innerHTML = '';

    students.filter(student => student.class === classSelect).forEach(student => {
        const option = document.createElement('option');
        option.value = student.name;
        option.textContent = student.name;
        studentSelect.appendChild(option);
    });
}

// Update Assessment List
function updateAssessmentList() {
    const assessments = JSON.parse(localStorage.getItem('assessments')) || [];
    const assessmentList = document.getElementById('assessmentList');
    assessmentList.innerHTML = '';

    assessments.forEach(assessment => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${assessment.student}</td>
                         <td>${assessment.date}</td>
                         <td>${assessment.score}</td>
                         <td>
                             <button onclick="editAssessment('${assessment.id}')">Edit</button>
                             <button onclick="deleteAssessment('${assessment.id}')">Delete</button>
                         </td>`;
        assessmentList.appendChild(row);
    });
}

// Edit Assessment
function editAssessment(id) {
    const assessments = JSON.parse(localStorage.getItem('assessments')) || [];
    const assessment = assessments.find(a => a.id === id);
    if (assessment) {
        document.getElementById('assessmentId').value = assessment.id;
        document.getElementById('assessmentClassSelect').value = assessment.class;
        document.getElementById('assessmentStudent').value = assessment.student;
        document.getElementById('assessmentDate').value = assessment.date;
        document.getElementById('assessmentScore').value = assessment.score;
        showPage('assessmentTables');
    }
}

// Delete Assessment
function deleteAssessment(id) {
    let assessments = JSON.parse(localStorage.getItem('assessments')) || [];
    assessments = assessments.filter(a => a.id !== id);
    localStorage.setItem('assessments', JSON.stringify(assessments));
    updateAssessmentList();
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    showPage('dashboard'); // Default page to show on load
    updateStudentList();
    updateAttendanceList();
    updateAssessmentList();

    // Event listeners for form fields and buttons
    document.getElementById('classSelect').addEventListener('change', updateStudentList);
    document.getElementById('attendanceClassSelect').addEventListener('change', updateAttendanceStudentList);
    document.getElementById('assessmentClassSelect').addEventListener('change', updateAssessmentStudentList);
});


//sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    sidebar.classList.toggle('collapsed');
    content.classList.toggle('shifted');
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

