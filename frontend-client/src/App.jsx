import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Login";


function App() {
  // Student List State
  const [students, setStudents] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Form Fields State
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");

  // Edit Student ID State
  const [editId, setEditId] = useState(null);
  

  // Search, Message, Loading, and Sorting States
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  // Calculate indices for cutting the list into pages
  const lastStudentIndex = currentPage * studentsPerPage;
  const firstStudentIndex = lastStudentIndex - studentsPerPage;

  const [dashboard, setDashboard] = useState({});
  const [courseFilter, setCourseFilter] = useState("");




  // ===========================
  // Get All Students
  // ===========================
  const getStudents = () => {
 axios.get("https://student-management-backend-32ae.onrender.com/students")
      .then((response) => {
        console.log(response.data); // <-- Add this
        setStudents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getDashboard = () => {
axios.get("https://student-management-backend-32ae.onrender.com/dashboard")
      .then((res) => {
        console.log(res.data);
        setDashboard(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getStudents();      // Load students immediately
    getDashboard();     // Load dashboard immediately
  }, []);
  // ===========================
  // Add Student
  // ===========================
  const addStudent = () => {
    if (!name || name.trim() === "") {
      alert("Please enter Name");
      return;
    }
    if (!age || String(age).trim() === "") {
      alert("Please enter Age");
      return;
    }
    if (!course || course.trim() === "") {
      alert("Please enter Course");
      return;
    }
    if (!email || email.trim() === "") {
      alert("Please enter Email");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid Email");
      return;
    }

    setLoading(true);
   axios.post("https://student-management-backend-32ae.onrender.com/students", {
        name,
        age,
        course,
        email,
      })
      .then((response) => {
        console.log(response.data);
    toast.success("Student Added Successfully!");
       

        getStudents();
        getDashboard();

        setName("");
        setAge("");
        setCourse("");
        setEmail("");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  // ===========================
  // Edit Student (Fill Form Fields)
  // ===========================
  // Edit Student
  // ===========================
  const editStudent = (student) => {
    setEditId(student.id);
    setName(student.name);
    setAge(student.age);
    setCourse(student.course);
    setEmail(student.email);
   const formSection = document.querySelector(".form-card");
    if (formSection) {
      formSection.scrollIntoView({ 
        behavior: "smooth", 
        block: "start" 
      });
    }
  };

  // ===========================
  // Update Student
  // ===========================
  const updateStudent = () => {

    console.log("Edit ID:", editId);
    console.log({
      name,
      age,
      course,
      email,
    });

  axios.put(`https://student-management-backend-32ae.onrender.com/students/${editId}`, {
        name,
        age,
        course,
        email,
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Student Updated Successfully!");

        getStudents();
        getDashboard();

        setEditId(null);
        setName("");
        setAge("");
        setCourse("");
        setEmail("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // ===========================
  // Delete Student
  // ===========================
const deleteStudent = (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this student?"
  );

  if (!confirmDelete) {
    return;
  }

 axios.delete(`https://student-management-backend-32ae.onrender.com/students/${id}`)
    .then((response) => {

      console.log(response.data);
toast.success("Student Deleted Successfully!");


      getStudents();
      getDashboard();

    })
    .catch((error) => {
      console.log(error);
    });

};

  // ===============================================
  // Process Data (Search -> Sort -> Paginate)
  // ===============================================
  const filteredAndSortedStudents = students
    .filter((student) => {

      const matchesSearch =
        search === "" ||
        student.name.toLowerCase().includes(search.toLowerCase());

      const matchesCourse =
        courseFilter === "" ||
        student.course.toLowerCase() === courseFilter.toLowerCase();

      return matchesSearch && matchesCourse;
    })

    .sort((a, b) => {

      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }

    });

  const currentStudents = filteredAndSortedStudents.slice(
    firstStudentIndex,
    lastStudentIndex
  );

  const totalPages = Math.ceil(
    filteredAndSortedStudents.length / studentsPerPage
  );

  
  const exportExcel = () => {

    const worksheet = XLSX.utils.json_to_sheet(students);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Students"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });


    const file = new Blob(
      [excelBuffer],
      {
        type: "application/octet-stream"
      }
    );


    saveAs(file, "students.xlsx");

  };
  if (!isLoggedIn) {
  return <Login setIsLoggedIn={setIsLoggedIn} />;
}
  return (
    <div className="container">
     
       <img className="logo"  src="https://res.cloudinary.com/deil060qy/image/upload/v1782808234/ChatGPT_Image_Jun_30_2026_01_58_26_PM_yzpieh.png" alt="logo"/>
      <h1 className="system-title">Student Management System</h1>
   
      <br></br>
      <p className="subtitle">
        Manage Student Records Efficiently
      </p>
      <div className="dashboard">
        <div className="card">
          <h2>👨‍🎓</h2>
          <h3>Total Students</h3>
          <p>{dashboard.totalStudents}</p>
        </div>

        <div className="card">
          <h2>🎂</h2>
          <h3>Average Age</h3>
          <p>{Number(dashboard.averageAge || 0).toFixed(1)}</p>
        </div>

        <div className="card">
          <h2>🏆</h2>
          <h3>Highest Age</h3>
          <p>{dashboard.highestAge}</p>
        </div>

      </div>
      -      <div className="form-card">
  


        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br /><br />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <br /><br />

        <input
          type="text"
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
        <br /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />
      

        <button className="add1" onClick={editId ? updateStudent : addStudent} disabled={loading}>
          {loading ? "Processing..." : editId ? "Update Student" : "Add Student"}
        </button>
      </div>

      <br></br>
      <div className="toolbar">
         <div className="toolbar-item">
          <label>🔍 Search Student</label>

          <input
            type="text"
           placeholder="Search by Name"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // Reset page to 1 when user types a search query
            }}
          />
           </div>
        <div className="toolbar-item">

          <label>📚 Filter Course</label>

          <select
            value={courseFilter}
            onChange={(e) => {
              setCourseFilter(e.target.value);
              setCurrentPage(1);
            }}
          >

            <option value="">All Courses</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="react">React</option>
            <option value="node.js">Node.js</option>

          </select>

          </div>
            <div className="toolbar-item">
              <label>⇅ Sort</label>
     
        <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
          Sort: {sortOrder === "asc" ? "A-Z" : "Z-A"}
        </button>
        </div>
         <div className="toolbar-item">
         <label>📤 Export</label>
      <button onClick={exportExcel}>
        Export Excel
      </button>
      </div>
      </div>
      <div className="table-container">
   <table className="student-table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Course</th>
              <th>Email</th>
              <th style={{ width: "170px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.course}</td>
                <td>{student.email}</td>
                {/* ADD THE CLASS NAME RIGHT HERE */}
                <td>
                  <button className="edit-btn" onClick={() => editStudent(student)}>
                  ✏ Edit
                  </button>
                  {" "}
                  <button className="delete-btn" onClick={() => deleteStudent(student.id)}>
                  🗑 Delete
                  </button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>






        {/* Pagination Controls Section */}
     <div className="pagination">

<button
className="nav-btn"
disabled={currentPage === 1}
onClick={() => setCurrentPage(currentPage - 1)}
>
◀ Previous
</button>


<div className="page-numbers">

{
Array.from({ length: totalPages }, (_, index)=>(
<button
key={index}
className={
currentPage === index + 1 
? "active-page"
: "page-btn"
}
onClick={() => setCurrentPage(index + 1)}
>
{index + 1}
</button>
))
}

</div>


<button
className="nav-btn"
disabled={currentPage === totalPages}
onClick={() => setCurrentPage(currentPage + 1)}
>
Next ▶
</button>


</div>
      </div>
      <ToastContainer
  position="top-right"
  autoClose={3000}
/>
    </div>
  );
}

export default App;
