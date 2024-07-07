import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function AddTeacher() { 
    const [teacherName, setTeacherName] = useState('');
    const [subject, setSubject] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
  
    const validateForm = () => {
      const formErrors = {};
      if (!teacherName.trim()) formErrors.teacherName = "Teacher Name is required";
      if (!subject.trim()) formErrors.subject = "Subject is required";
      if (!contact.trim()) formErrors.contact = "Contact is required";
      if (!address.trim()) formErrors.address = "Address is required";
      if (!email.trim()) {
        formErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        formErrors.email = "Email is invalid";
      }
      if (!password.trim()) formErrors.password = "Password is required";
      setErrors(formErrors);
      return Object.keys(formErrors).length === 0;
    };
  
    const registerTeacher = () => {
      if (!validateForm()) return;
  
      const params = {
        teacherName: teacherName,
        subject:subject,
        contact: contact,
        address: address,
        email: email,
        password: password,
        usertype: 1,
      };
  
      fetch("http://localhost:4000/admin/teacherRegister", {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(params),
      })
        .then((res) => res.json())
        .then((result) => {
          // Show success message
          toast.success("Teacher added successfully.", {
            position: "top-right",
            autoClose: 1000,
          });
          // Clear form fields after successful submission
          setTeacherName("");
          setSubject("")
          setContact("");
          setAddress("");
          setEmail("");
          setPassword("");
          setErrors({});
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          console.error("Error adding Teacher:", error);
          // Show error message
          toast.error("Failed to add Teacher. Please try again.", {
            position: "top-right",
            autoClose: 1000,
          });
        });
    };
  
    return (
      <>
      
        <div className="container-fluid">
          <div
            className="row h-100 align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
                <div className="d-flex align-items-center justify-content-center mb-3">
              <h3>ADD TEACHER</h3>
            </div>
            <form>
              {/*------------------------- Teacher Name Input ---------------------------------*/}
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="teacherNameInput"
                  placeholder="Teacher Name"
                  
                  onChange={(event) => setTeacherName(event.target.value)}
                />
                <label htmlFor="teacherNameInput">Teacher Name</label>
                {errors.teacherName && <small className="text-danger">{errors.teacherName}</small>}
              </div>
              {/*------------------------- Subject Input ---------------------------------*/}
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="subjectInput"
                  placeholder="Subject"
                  
                  onChange={(event) => setSubject(event.target.value)}
                />
                <label htmlFor="subjectInput">Subject</label>
                {errors.subject && <small className="text-danger">{errors.subject}</small>}
              </div>
              {/*------------------------- Contact Input ---------------------------------*/}
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="contactInput"
                  placeholder="Contact"
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
                />
                <label htmlFor="contactInput">Contact</label>
                {errors.contact && <small className="text-danger">{errors.contact}</small>}
              </div>
              {/*------------------------- Address Input ---------------------------------*/}
              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  placeholder="Enter Address"
                  id="addressInput"
                  style={{ height: "100px" }}
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                ></textarea>
                <label htmlFor="addressInput">Address</label>
                {errors.address && <small className="text-danger">{errors.address}</small>}
              </div>
              {/*------------------------- Email Input ---------------------------------*/}
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="emailInput"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <label htmlFor="emailInput">Email</label>
                {errors.email && <small className="text-danger">{errors.email}</small>}
              </div>
              {/*------------------------- Password Input ---------------------------------*/}
              <div className="form-floating mb-4">
                <input
                  type="password"
                  className="form-control"
                  id="passwordInput"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <label htmlFor="passwordInput">Password</label>
                {errors.password && <small className="text-danger">{errors.password}</small>}
              </div>
              {/*------------------------- SUBMIT BUTTON ---------------------------------*/}
              <button
                type="button"
                className="btn btn-primary py-3 w-100 mb-4"
                onClick={registerTeacher}
              >
                <strong>CREATE</strong>
                <i className="fa fa-plus"></i>
              </button>
            </form>
          </div>
        </div>
        </div>
        </div>
       
        <ToastContainer />
      </>
    );
  }

export default AddTeacher