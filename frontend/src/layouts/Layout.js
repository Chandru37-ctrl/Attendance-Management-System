import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {

  return (

    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 p-6">

          <div className="max-w-7xl mx-auto">

            {children}

          </div>

        </main>

      </div>

    </div>

  );

}

export default Layout;
