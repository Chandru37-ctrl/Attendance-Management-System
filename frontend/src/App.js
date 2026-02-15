import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Subjects from "./pages/Subjects";
import Attendance from "./pages/Attendance";
import Reports from "./pages/Reports";
import AdminAnalytics from "./pages/AdminAnalytics";
import MyAttendance from "./pages/MyAttendance";
import ProtectedRoute from "./components/ProtectedRoute";



function App() {
  return (

    <Router>

      <Routes>

  {/* Public route */}
  <Route path="/" element={<Login />} />


  {/* Admin routes */}
  <Route
    path="/admin"
    element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminDashboard />
      </ProtectedRoute>
    }
  />

  <Route
    path="/students"
    element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <Students />
      </ProtectedRoute>
    }
  />

  <Route
    path="/teachers"
    element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <Teachers />
      </ProtectedRoute>
    }
  />

  <Route
    path="/subjects"
    element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <Subjects />
      </ProtectedRoute>
    }
  />

  <Route
    path="/analytics"
    element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminAnalytics />
      </ProtectedRoute>
    }
  />


  {/* Admin + Teacher routes */}
  <Route
    path="/attendance"
    element={
      <ProtectedRoute allowedRoles={["admin", "teacher"]}>
        <Attendance />
      </ProtectedRoute>
    }
  />

  <Route
    path="/reports"
    element={
      <ProtectedRoute allowedRoles={["admin", "teacher", "student"]}>
        <Reports />
      </ProtectedRoute>
    }
  />


  {/* Student routes */}
  <Route
    path="/student"
    element={
      <ProtectedRoute allowedRoles={["student"]}>
        <StudentDashboard />
      </ProtectedRoute>
    }
  />

  <Route
    path="/my-attendance"
    element={
      <ProtectedRoute allowedRoles={["student"]}>
        <MyAttendance />
      </ProtectedRoute>
    }
  />


  {/* Teacher routes */}
  <Route
    path="/teacher"
    element={
      <ProtectedRoute allowedRoles={["teacher"]}>
        <TeacherDashboard />
      </ProtectedRoute>
    }
  />

</Routes>



    </Router>

  );
}

export default App;
