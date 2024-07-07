import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Landingpage from './Components/LandingPage/Landingpage';
import Authpage from './Components/Authentication/Authpage';
// import AccessDenied from './Components/Common/AccessDenied';
import AdminHomepage from './Components/Homepages/Admin/AdminHomepage';
import TeacherHomePage from './Components/Homepages/Teacher/TeacherHomePage';
import Teachers from './Components/Homepages/Admin/AdminPageComponents/Teachers';
import EditTeacher from './Components/Homepages/Admin/AdminPageComponents/Forms/EditTeacher';
import AddClass from './Components/Homepages/Teacher/TeacherpageComponents/Forms/AddClass';

function App() {
 

  return (
    <BrowserRouter>
      <Routes>

        {/* ---------Auth Routes-------------- */}
        <Route path="/" element={<Landingpage />} />
        <Route path="/AuthPage" element={<Authpage />} />



        {/* -----------------Admin Page Routes-------------------- */}
          <Route path="/AdminHome" element={<AdminHomepage />} />
          <Route path="/Teachers" element={<Teachers />} />



       <Route path="/AddClass" element={<AddClass />} />


       <Route path="/TeacherHome" element={<TeacherHomePage />} />
       <Route path="/EditTeacher" element={<EditTeacher/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
