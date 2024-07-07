import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../../../Common/Sidebar";
import Navbar from "../../../../Common/Navbar";

function AddExam() {
  const [examName, setExamName] = useState("");
  const [classId, setClassId] = useState("");
  const [dateOfExam, setDateOfExam] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [questions, setQuestions] = useState([{ questionText: "", options: ["", "", "", ""], correctOption: "" }]);
  const [classes, setClasses] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const teacherData = JSON.parse(localStorage.getItem("userdata"));
    const teacherId = teacherData._id;
    fetch(`http://localhost:4000/teacher/classes?teacherId=${teacherId}`)
      .then((res) => res.json())
      .then((data) => setClasses(data))
      .catch((error) => console.error("Error fetching classes:", error));
  }, []);

  const validateForm = () => {
    const formErrors = {};
    if (!examName.trim()) formErrors.examName = "Exam Name is required";
    if (!classId) formErrors.classId = "Class must be selected";
    if (!dateOfExam.trim()) formErrors.dateOfExam = "Date of Exam is required";
    if (!startTime.trim()) formErrors.startTime = "Start Time is required";
    if (!endTime.trim()) formErrors.endTime = "End Time is required";
    questions.forEach((q, index) => {
      if (!q.questionText.trim()) formErrors[`question${index}`] = "Question text is required";
      if (!q.correctOption.trim()) formErrors[`correctOption${index}`] = "Correct option is required";
      q.options.forEach((option, optIndex) => {
        if (!option.trim()) formErrors[`option${index}${optIndex}`] = "All options are required";
      });
    });
    return formErrors;
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionText: "", options: ["", "", "", ""], correctOption: "" }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[optIndex] = value;
    setQuestions(updatedQuestions);
  };

  const registerExam = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const teacherData = JSON.parse(localStorage.getItem("userdata"));
    const teacherId = teacherData._id;

    const params = {
      examName,
      classId,
      dateOfExam,
      startTime,
      endTime,
      questions,
      teacherId,
    };

    fetch("http://localhost:4000/teacher/AddExam", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success("Exam added successfully.", {
          position: "top-right",
          autoClose: 1000,
        });
        setExamName("");
        setClassId("");
        setDateOfExam("");
        setStartTime("");
        setEndTime("");
        setQuestions([{ questionText: "", options: ["", "", "", ""], correctOption: "" }]);
        setErrors({});
        setTimeout(() => {
          navigate("/ExamList");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error adding Exam:", error);
        toast.error("Failed to add Exam. Please try again.", {
          position: "top-right",
          autoClose: 1000,
        });
      });
  };

  return (
    <>
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
              <div className="col-12">
                <div className="bg-secondary rounded h-100 p-4">
                  <h3 className="mb-4 text-center text-uppercase fs-1">Add Exam</h3>
                  <form>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Examination Name"
                        value={examName}
                        onChange={(e) => setExamName(e.target.value)}
                      />
                      <label>Examination Name</label>
                      {errors.examName && <small className="text-danger">{errors.examName}</small>}
                    </div>
                    <div className="form-floating mb-3">
                      <select className="form-control" value={classId} onChange={(e) => setClassId(e.target.value)}>
                        <option value="">Select Class</option>
                        {classes.map((classData, index) => (
                          <option key={index} value={classData._id}>
                            {classData.classname}
                          </option>
                        ))}
                      </select>
                      <label>Select Class</label>
                      {errors.classId && <small className="text-danger">{errors.classId}</small>}
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Date of Exam"
                        value={dateOfExam}
                        onChange={(e) => setDateOfExam(e.target.value)}
                      />
                      <label>Date of Exam</label>
                      {errors.dateOfExam && <small className="text-danger">{errors.dateOfExam}</small>}
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="time"
                        className="form-control"
                        placeholder="Start Time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                      />
                      <label>Start Time</label>
                      {errors.startTime && <small className="text-danger">{errors.startTime}</small>}
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="time"
                        className="form-control"
                        placeholder="End Time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                      />
                      <label>End Time</label>
                      {errors.endTime && <small className="text-danger">{errors.endTime}</small>}
                    </div>
                    <div>
                      <h5 className="mb-4">Questions</h5>
                      {questions.map((question, qIndex) => (
                        <div key={qIndex}>
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Question Text"
                              value={question.questionText}
                              onChange={(e) => handleQuestionChange(qIndex, "questionText", e.target.value)}
                            />
                            <label>Question Text</label>
                            {errors[`question${qIndex}`] && <small className="text-danger">{errors[`question${qIndex}`]}</small>}
                          </div>
                          {question.options.map((option, optIndex) => (
                            <div key={optIndex} className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder={`Option ${optIndex + 1}`}
                                value={option}
                                onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                              />
                              <label>Option {optIndex + 1}</label>
                              {errors[`option${qIndex}${optIndex}`] && <small className="text-danger">{errors[`option${qIndex}${optIndex}`]}</small>}
                            </div>
                          ))}
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Correct Option"
                              value={question.correctOption}
                              onChange={(e) => handleQuestionChange(qIndex, "correctOption", e.target.value)}
                            />
                            <label>Correct Option</label>
                            {errors[`correctOption${qIndex}`] && <small className="text-danger">{errors[`correctOption${qIndex}`]}</small>}
                          </div>
                        </div>
                      ))}
                      <button type="button" className="btn btn-secondary" onClick={addQuestion}>
                        Add Another Question
                      </button>
                    </div>
                    <button type="button" className="btn btn-primary py-3 w-100 mb-4" onClick={registerExam}>
                      <strong>CREATE</strong>
                      <i className="fa fa-plus"></i>
                    </button>
                  </form>
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

export default AddExam;
