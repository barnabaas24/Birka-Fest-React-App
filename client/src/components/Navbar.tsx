import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-5 py-3 shadow-sm fixed w-full z-20 bg-gray-700 nav-print">
      <div className="flex items-center justify-start space-x-4 ">
        <NavLink
          to="/"
          className=" font-semibold no-underline hover:underline text-gray-400"
        >
          Versenyzők
        </NavLink>
        <NavLink
          to="/scan"
          className=" font-semibold no-underline hover:underline text-gray-400"
        >
          Scan
        </NavLink>
        <NavLink
          to="/upload"
          className="font-semibold no-underline hover:underline text-gray-400"
        >
          Upload
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
