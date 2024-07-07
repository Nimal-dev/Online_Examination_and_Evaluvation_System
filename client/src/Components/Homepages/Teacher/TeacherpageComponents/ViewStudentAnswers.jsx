import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../../Common/Sidebar";
import Navbar from "../../../Common/Navbar";


function ViewStudentAnswers() {
  const [studentAnswers, setStudentAnswers] = useState([]);
  const [marks, setMarks] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const examId = new URLSearchParams(location.search).get("examId");

  useEffect(() => {
    fetch(`http://localhost:4000/teacher/GetStudentAnswers?examId=${examId}`)
      .then((res) => res.json())
      .then((data) => {
        setStudentAnswers(data);
        const initialMarks = {};
        data.forEach((answer) => {
          initialMarks[answer.studentId._id] = answer.marks;
        });
        setMarks(initialMarks);
      })
      .catch((error) => console.error("Error fetching student answers:", error));
  }, [examId]);

  const updateMarks = (studentId, value) => {
    const updatedMarks = { ...marks };
    updatedMarks[studentId] = value;
    setMarks(updatedMarks);
  };

  const saveMarks = (studentId) => {
    fetch("http://localhost:4000/teacher/UpdateStudentMarks", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ examId, studentId, marks: marks[studentId] }),
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success("Marks updated successfully.", {
          position: "top-right",
          autoClose: 1000,
        });
      })
      .catch((error) => {
        console.error("Error updating marks:", error);
        toast.error("Failed to update marks. Please try again.", {
          position: "top-right",
          autoClose: 1000,
        });
      });
  };

  return (
    <>
      <Sidebar/>
      <div className="content">
        <Navbar />
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
              <div className="col-12">
                <div className="bg-secondary rounded h-100 p-4">
                  <h3 className="mb-4 text-center text-uppercase fs-1">Student Answers</h3>
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Student Name</th>
                        <th scope="col">Answers</th>
                        <th scope="col">Marks</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentAnswers.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center">
                            No student answers found
                          </td>
                        </tr>
                      ) : (
                        studentAnswers.map((answer, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{answer.studentId.name}</td>
                            <td>
                              {answer.answers.map((ans, ansIndex) => (
                                <div key={ansIndex}>{ans}</div>
                              ))}
                            </td>
                            <td>
                              <input
                                type="number"
                                className="form-control"
                                value={marks[answer.studentId._id] || 0}
                                onChange={(e) => updateMarks(answer.studentId._id, e.target.value)}
                              />
                            </td>
                            <td>
                              <button
                                className="btn btn-primary ms-1"
                                onClick={() => saveMarks(answer.studentId._id)}
                              >
                                Save
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default ViewStudentAnswers;
