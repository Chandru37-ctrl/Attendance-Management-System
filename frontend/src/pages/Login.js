import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");


  const handleLogin = async () => {

  try {

    const res = await API.post("/auth/login", {
      email,
      password
    });

    if (res.data.role !== role) {

      alert("Incorrect role selected");

      return;

    }

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);
    localStorage.setItem("name", res.data.name);


    if (role === "admin")
      navigate("/admin");

    else if (role === "teacher")
      navigate("/teacher");

    else
      navigate("/student");

  } catch {

    alert("Login failed");

  }

};


  return (

    <div className="flex justify-center items-center h-screen bg-gray-100">

      <div className="bg-white p-8 rounded shadow w-96">

        <h2 className="text-2xl font-bold mb-4">
          Login
        </h2>

        <input
          className="w-full p-2 border mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 border mb-3"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="mb-3 flex gap-4">

  <label className="flex items-center gap-1">
    <input
      type="radio"
      name="role"   // IMPORTANT: same name for all
      value="admin"
      checked={role === "admin"}
      onChange={(e) => setRole(e.target.value)}
    />
    Admin
  </label>

  <label className="flex items-center gap-1">
    <input
      type="radio"
      name="role"
      value="teacher"
      checked={role === "teacher"}
      onChange={(e) => setRole(e.target.value)}
    />
    Teacher
  </label>

  <label className="flex items-center gap-1">
    <input
      type="radio"
      name="role"
      value="student"
      checked={role === "student"}
      onChange={(e) => setRole(e.target.value)}
    />
    Student
  </label>

</div>



        <button
          className="w-full bg-blue-500 text-white p-2"
          onClick={handleLogin}
        >
          Login
        </button>

      </div>

    </div>

  );

}

export default Login;
