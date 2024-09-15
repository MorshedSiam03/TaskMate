import React, { useState, useContext } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import toast from "react-hot-toast";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userRole, setUserRole] = useState("normal");
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleRoleChange = (e) => {
    setUserRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value; // This will be used as displayName
    const email = e.target.email.value;
    const password = e.target.password.value;
    const role = userRole;

    try {
      await createUser(email, password, name, role); // Pass name as displayName
      toast.success("Successfully registered!");
      navigate("/"); // Redirect user after successful registration
    } catch (error) {
      toast.error("Registration failed.");
      console.error("Error during registration", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-primary">
      <div className="md:w-1/2 lg:w-2/5 flex flex-col justify-center p-4 lg:p-24 shadow-left">
        <img
          src="https://raw.githubusercontent.com/MorshedSiam03/TaskMate/refs/heads/main/src/assets/Icon/DarkLogo.png"
          className="w-60 my-5 md:w-72 mx-auto"
          alt="Logo"
        />
        <div className="px-4 md:px-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="text-white text-lg font-semibold mb-2 block"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="shadow-xl py-4 rounded-xl w-full px-4 focus:outline-none focus:shadow-outline"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="text-white text-lg font-semibold mb-2 block"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="shadow-xl py-4 rounded-xl w-full px-4 focus:outline-none focus:shadow-outline"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="relative mb-2">
              <label
                htmlFor="password"
                className="text-white text-lg font-semibold mb-2 block"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="shadow-xl py-4 rounded-xl w-full px-4 focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-[54px] text-primary"
                onClick={handlePasswordToggle}
              >
                {showPassword ? (
                  <BsEyeFill className="text-2xl" />
                ) : (
                  <BsEyeSlashFill className="text-2xl" />
                )}
              </button>
            </div>
            <div className="">
              <label className="text-white text-lg font-semibold mb-2">
                Register as
              </label>
              <div className="flex items-center justify-between">
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="admin"
                    name="role"
                    value="admin"
                    checked={userRole === "admin"}
                    onChange={handleRoleChange}
                    className="mr-2"
                  />
                  <label htmlFor="admin" className="text-white">
                    Admin
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="normal"
                    name="role"
                    value="normal"
                    checked={userRole === "normal"}
                    onChange={handleRoleChange}
                    className="mr-2"
                  />
                  <label htmlFor="normal" className="text-white">
                    Normal User
                  </label>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input type="checkbox" id="terms" className="mr-2" required />
                <label htmlFor="terms" className="text-sm text-white">
                  Agree with terms and conditions
                </label>
              </div>
            </div>
            <button
              className="bg-[#367da3] shadow-2xl hover:bg-cyan-800 text-white text-lg border-0 font-semibold w-full py-2 rounded-lg"
              type="submit"
            >
              Register
            </button>
          </form>
          <div className="mt-6">
            <button className="flex items-center justify-center text-lg bg-white text-gray-800 font-semibold shadow-2xl w-full py-2 rounded-lg">
              <img
                src="https://raw.githubusercontent.com/MorshedSiam03/TaskMate/97b2daa1f04fd1ca93792e20ed96643fd7b313f3/src/assets/Icon/google-logo.svg"
                alt="Google logo"
                className="mr-2"
              />
              Sign in with Google
            </button>
          </div>
          <div className="my-8 text-center">
            <h1 className="text-white font-semibold">
              Have an Account?{" "}
              <Link className="text-blue-700 underline" to="/Login">
                Login
              </Link>
            </h1>
          </div>
        </div>
      </div>
      <div className="hidden md:flex md:w-1/2 lg:w-3/5 bg-teal-200 items-center justify-center">
        <img
          src="https://raw.githubusercontent.com/MorshedSiam03/TaskMate/refs/heads/main/src/assets/Icon/Blocks.png"
          className="w-full max-w-[680px]"
          alt="Blocks"
        />
      </div>
    </div>
  );
};

export default Register;
