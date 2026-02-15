import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.clear();

    navigate("/");

  };

  return (

    <div className="bg-white shadow p-4 flex justify-between">

      <h1 className="text-xl font-bold">
        Dashboard
      </h1>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-1 rounded"
      >
        Logout
      </button>

    </div>

  );

}

export default Navbar;
