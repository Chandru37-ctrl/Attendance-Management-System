import { Link, useLocation } from "react-router-dom";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaClipboardCheck,
  FaChartBar,
  FaHome,
  FaUserCheck,
  FaChartLine
} from "react-icons/fa";

function Sidebar() {

  const role = localStorage.getItem("role");
  const location = useLocation();

  // function to highlight active menu
  const isActive = (path) => {
    return location.pathname === path
      ? "bg-gray-700"
      : "";
  };

  return (

    <div className="w-64 bg-gray-900 text-white h-screen p-5">

      {/* Logo / Title */}
      <h2 className="text-2xl font-bold mb-8">
        Attendance System
      </h2>

      <ul className="space-y-2">

        {/* ================= ADMIN MENU ================= */}

        {role === "admin" && (
          <>
            <li>
              <Link
                to="/admin"
                className={`flex items-center gap-3 p-2 rounded hover:bg-gray-700 ${isActive("/admin")}`}
              >
                <FaHome />
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/students"
                className={`flex items-center gap-3 p-2 rounded hover:bg-gray-700 ${isActive("/students")}`}
              >
                <FaUserGraduate />
                Students
              </Link>
            </li>

            <li>
              <Link
                to="/teachers"
                className={`flex items-center gap-3 p-2 rounded hover:bg-gray-700 ${isActive("/teachers")}`}
              >
                <FaChalkboardTeacher />
                Teachers
              </Link>
            </li>

            <li>
              <Link
                to="/subjects"
                className={`flex items-center gap-3 p-2 rounded hover:bg-gray-700 ${isActive("/subjects")}`}
              >
                <FaBook />
                Subjects
              </Link>
            </li>

            <li>
              <Link
                to="/attendance"
                className={`flex items-center gap-3 p-2 rounded hover:bg-gray-700 ${isActive("/attendance")}`}
              >
                <FaClipboardCheck />
                Attendance
              </Link>
            </li>

            <li>
              <Link
                to="/reports"
                className={`flex items-center gap-3 p-2 rounded hover:bg-gray-700 ${isActive("/reports")}`}
              >
                <FaChartBar />
                Reports
              </Link>
            </li>

            <li>
              <Link
                to="/analytics"
                className={`flex items-center gap-3 p-2 rounded hover:bg-gray-700 ${isActive("/analytics")}`}
              >
                <FaChartLine />
                Analytics
              </Link>
            </li>
          </>
        )}

        {/* ================= TEACHER MENU ================= */}

        {role === "teacher" && (
          <>
            <li>
              <Link
                to="/teacher"
                className={`flex items-center gap-3 p-2 rounded hover:bg-gray-700 ${isActive("/teacher")}`}
              >
                <FaHome />
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/attendance"
                className={`flex items-center gap-3 p-2 rounded hover:bg-gray-700 ${isActive("/attendance")}`}
              >
                <FaClipboardCheck />
                Mark Attendance
              </Link>
            </li>

            <li>
              <Link
                to="/reports"
                className={`flex items-center gap-3 p-2 rounded hover:bg-gray-700 ${isActive("/reports")}`}
              >
                <FaChartBar />
                Reports
              </Link>
            </li>
          </>
        )}

        {/* ================= STUDENT MENU ================= */}

        {role === "student" && (
          <>
            <li>
              <Link
                to="/student"
                className={`flex items-center gap-3 p-2 rounded hover:bg-gray-700 ${isActive("/student")}`}
              >
                <FaHome />
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/my-attendance"
                className={`flex items-center gap-3 p-2 rounded hover:bg-gray-700 ${isActive("/my-attendance")}`}
              >
                <FaUserCheck />
                My Attendance
              </Link>
            </li>

            <li>
              <Link
                to="/reports"
                className={`flex items-center gap-3 p-2 rounded hover:bg-gray-700 ${isActive("/reports")}`}
              >
                <FaChartBar />
                Reports
              </Link>
            </li>
          </>
        )}

      </ul>

    </div>

  );

}

export default Sidebar;
