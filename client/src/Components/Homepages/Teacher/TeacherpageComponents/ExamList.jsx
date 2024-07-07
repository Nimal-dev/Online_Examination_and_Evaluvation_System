import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ExamList() {
  const [students, setStudents] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const teacherData = JSON.parse(localStorage.getItem("userdata"));
    const teacherId = teacherData._id;

    fetch(`http://localhost:4000/teacher/students?teacherId=${teacherId}`)
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, [refresh]);

  const deleteStudent = (id) => {
    fetch("http://localhost:4000/admin/deleteStudent", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setRefresh((prev) => prev + 1); // Trigger a refresh
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
      });
  };

  return (
    <div className="col-sm-12 col-xl-12">
      <div className="bg-secondary rounded h-100 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h6 className="mb-4 text-uppercase fs-3">EXAMS</h6>
          <Link className="btns btn-primary" to="/AddStudent">
            ADD EXAM
          </Link>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Examination Name</th>
              <th scope="col">Class</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No Students added
                </td>
              </tr>
            ) : (
              students.map((student, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.studentName}</td>
                  <td>{student.classId.classname}</td>
                  <td>{student.admissionNumber}</td>
                  <td>
                    <button
                      className="btn btn-danger ms-1"
                      style={{ padding: "5px 20px" }}
                      onClick={() => deleteStudent(student._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExamList;
