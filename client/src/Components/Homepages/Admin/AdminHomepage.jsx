import React from "react";
import Navbar from "../../Common/Navbar";
import Sidebar from "../../Common/Sidebar";
import Widgets from "../../Common/Widgets";
import TeachersList from "./AdminPageComponents/TeachersList";

function AdminHomepage() {
  return (
    <>
    
    <Sidebar/>
    <div class="content">
      <Navbar />
      <div class="container-fluid pt-4 px-4">
        <div class="row g-4">
          <Widgets/>
          <TeachersList/>
          
        </div>
      </div>
    </div>
  </>
  );
}

export default AdminHomepage;
