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
import AddStudent from './Components/Homepages/Teacher/TeacherpageComponents/Forms/AddStudent';
import AddExam from './Components/Homepages/Teacher/TeacherpageComponents/Forms/AddExam';
import ExamList from './Components/Homepages/Teacher/TeacherpageComponents/ExamList';
import ViewStudentAnswers from './Components/Homepages/Teacher/TeacherpageComponents/ViewStudentAnswers';

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
       <Route path="/AddStudent" element={<AddStudent />} />
       <Route path="/ExamList" element={<ExamList />} />
          <Route path="/AddExam" element={<AddExam />} />
          <Route path="/ViewStudentAnswers" element={<ViewStudentAnswers />} />


       <Route path="/TeacherHome" element={<TeacherHomePage />} />
       <Route path="/EditTeacher" element={<EditTeacher/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
