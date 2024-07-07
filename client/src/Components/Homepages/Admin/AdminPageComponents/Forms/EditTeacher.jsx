import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "../../../../Common/Sidebar";

function EditTeacher() {
  const [teachername, setTeachername] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [authid, setAuthid] = useState("");

  const navigate = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    const ids = { id: loc.state.id };
    fetch("http://localhost:4000/admin/updateAgentById", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((result) => {
        setTeachername(result.agentDetails.teachername);
        setEmail(result.authDetails.email);
        setAddress(result.agentDetails.address);
        setContact(result.agentDetails.contact);
        setAuthid(result.authDetails._id); // Store auth ID for update
      });
  }, [loc.state.id]);

  const updateTeacher = () => {
    const params = {
      id: loc.state.id,
      teachername: teachername,
      contact: contact,
      address: address,
      email: email,
      userstatus: 1,
      authid: authid // Pass auth ID for update
    };
    fetch("http://localhost:4000/admin/editAndUpdateTeacher", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success('Teacher updated successfully!', {
          position: "top-right",
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate(-1); // Redirect to desired page
        }, 2000);
      })
      .catch(() => {
        toast.error('Failed to update teacher. Please try again.', {
          position: "top-right",
          autoClose: 2000,
        });
      });
  };

  return (
    <>
      <Sidebar/>
      <div className="content">
        <div className="container-fluid">
          <div
            className="row h-100 align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-6">
              <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <h3>UPDATE TEACHER</h3>
                </div>
                <div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="agentnameInput"
                      placeholder="Agent Name"
                      value={teachername}
                      onChange={(event) => setTeachername(event.target.value)}
                    />
                    <label htmlFor="agentnameInput">Teacher Name</label>
                  </div>
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
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="addressInput"
                      placeholder="Address"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                    />
                    <label htmlFor="addressInput">Address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="emailInput"
                      placeholder="Email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <label htmlFor="emailInput">Email</label>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary py-3 w-100 mb-4"
                    onClick={updateTeacher}
                  >
                    <strong>UPDATE</strong>{" "}
                    <i className="fa fa-upload" aria-hidden="true"></i>
                  </button>
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

export default EditTeacher;
