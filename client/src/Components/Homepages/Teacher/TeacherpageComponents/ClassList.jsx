import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ClassList() {
    const [classes, setClass] = useState([]);
    const [refresh, setRefresh] = useState(0);
  const navigate = useNavigate();
  
  const deleteClass = (id) => {
    fetch("http://localhost:4000/admin/deleteClass", {
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
        console.error("Error deleting state:", error);
      });
  };
  return (
    <>
    
    <div className="col-sm-12 col-xl-6">
      <div className="bg-secondary rounded h-100 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h6 className="mb-4 text-uppercase fs-3">class</h6>
          <Link className="btn btn-primarys" to="/AddClass">
            ADD CLASS
          </Link>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Class</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No Classes added
                </td>
              </tr>
            ) : (
                classes.map((classes, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{classes.categoryname}</td>
                  <td>
                    <img
                      src={`http://localhost:4000${classes.image}`}
                      alt={classes.categoryname}
                      style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger ms-1"
                      style={{ padding: "5px 20px" }}
                      onClick={() => deleteClass(classes._id)}
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
    </>
  )
}

export default ClassList