import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const Navbar = () => {
  const { user, Logout } = useContext(AuthContext);

  const handleLogout = () => {
    Logout()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  const navbar = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            `mx-1 ${
              isActive
                ? "border-2 border-primary text-primary font-bold bg-transparent hover:bg-primary hover:border-1 hover:text-white"
                : "text-black hover:bg-primary  hover:font-semibold hover:text-white"
            }`
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            `mx-1 ${
              isActive
                ? "border-2 border-primary text-primary font-bold bg-transparent hover:bg-primary hover:border-1 hover:text-white"
                : "text-black hover:bg-primary  hover:font-semibold hover:text-white"
            }`
          }
          to="/s"
        >
          Important Task
        </NavLink>
      </li>

      <li>
        <NavLink
          className={({ isActive }) =>
            `mx-1 ${
              isActive
                ? "border-2 border-primary text-primary font-bold bg-transparent hover:bg-primary hover:border-1 hover:text-white"
                : "text-black hover:bg-primary  hover:font-semibold hover:text-white"
            }`
          }
          to="/About"
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            `mx-1 ${
              isActive
                ? "border-2 border-primary text-primary font-bold bg-transparent hover:bg-primary hover:border-1 hover:text-white"
                : "text-black hover:bg-primary  hover:font-semibold hover:text-white"
            }`
          }
          to="/Contact"
        >
          Contact
        </NavLink>
      </li>
    </>
  );
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[2] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navbar}
            </ul>
          </div>
          <Link>
            <img src="https://raw.githubusercontent.com/MorshedSiam03/TaskMate/616fccbd8c64d27325984f521a3eea0a0e1dd71c/src/assets/Icon/Logo.svg?token=ASRXYMILAPEDO2HDSTDLMX3G42S6Y" className="w-48" alt="" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navbar}</ul>
        </div>
        <div className="navbar-end items-center gap-1">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-12 rounded-full">
                  <img alt="Profile" src={user?.photoURL || 'https://raw.githubusercontent.com/MorshedSiam03/TaskMate/refs/heads/main/src/assets/Icon/man-avatar-icon-flat-vector-19152370.jpg?token=GHSAT0AAAAAACV2LVVQNBGHXO56PR5VRDQGZXGUYOQ'} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[2] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    {user?.displayName}
                    <span className="badge">{user?.role || 'normal'}</span>
                  </a>
                </li>
                <li>
                  <Link to={`/UpdateProfile`}>Update Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to={"/Login"}
              className="btn px-4 py-1 hover:bg-primary bg-transparent border-2 border-primary text-cyan-700 hover:border-0 hover:text-white "
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
