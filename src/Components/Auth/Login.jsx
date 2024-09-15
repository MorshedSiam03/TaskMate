import React, { useState, useContext } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
 // Update the import path if necessary
import "./style.css";
import { AuthContext } from "../../Provider/AuthProvider";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { Login, googleLogin } = useContext(AuthContext); // Get login and Google sign-in function
  const navigate = useNavigate(); // Hook for navigation

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const email = e.target.email.value;
    const password = e.target.password.value;
  
    if (!email || !password) {
      console.error("Email or password is missing");
      return; // Stop if email or password is missing
    }
  
    try {
      await Login(email, password); // Call the login function from AuthProvider
      navigate("/"); // Redirect to home page after successful login
    } catch (error) {
      console.error("Error during login: ", error.message);
      // You can display an error message to the user here
    }
  };
  

  const handleGoogleSignIn = async () => {
    try {
      await googleLogin(); // Sign in using Google
      navigate("/"); // Redirect to home page after successful sign-in
    } catch (error) {
      console.error("Error during Google sign-in: ", error.message);
      // Handle the error (e.g., show an error message)
    }
  };
  

  return (
    <div className="flex flex-col md:flex-row h-screen bg-primary">
      <div className="md:w-1/2 lg:w-2/5 flex flex-col justify-center p-4 lg:p-24 shadow-left">
        <img
          src="https://raw.githubusercontent.com/MorshedSiam03/TaskMate/refs/heads/main/src/assets/Icon/DarkLogo.png?token=GHSAT0AAAAAACV2LVVRLKFYCNAAG474CP7UZXGUVYA"
          className="w-60 my-5 md:w-72 mx-auto"
          alt="Logo"
        />
        <div className="px-4 md:px-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="text-white text-lg font-semibold mb-2 block"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email" // Added name attribute for easier form data access
                className="shadow-xl py-4 rounded-xl w-full px-4 focus:outline-none focus:shadow-outline"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="text-white text-lg font-semibold mb-2 block"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password" // Added name attribute
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
            <div className="mb-4 flex justify-end">
              <Link
                className="text-sm text-white hover:underline"
                to="/forgot-password"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-sm text-white">
                  Remember me
                </label>
              </div>
            </div>
            <button
              className="bg-[#367da3] shadow-2xl hover:bg-cyan-800 text-white text-lg border-0 font-semibold w-full py-2 rounded-lg"
              type="submit"
            >
              Login
            </button>
          </form>
          <div className="mt-6">
            <button
              className="flex items-center justify-center text-lg bg-white text-gray-800 font-semibold shadow-2xl w-full py-2 rounded-lg"
              onClick={handleGoogleSignIn}
            >
              <img
                src="https://raw.githubusercontent.com/MorshedSiam03/TaskMate/616fccbd8c64d27325984f521a3eea0a0e1dd71c/src/assets/Icon/google-logo.svg?token=ASRXYMP2IKV2LR3M5UPEJTLG42S2C"
                alt="Google logo"
                className="mr-2"
              />
              Sign in with Google
            </button>
          </div>
          <div className="my-8 text-center">
            <h1 className="text-white font-semibold">
              Don't Have an Account?{" "}
              <Link className="text-blue-700 underline" to="/Register">
                Register Here
              </Link>
            </h1>
          </div>
        </div>
      </div>
      <div className="hidden md:flex md:w-1/2 lg:w-3/5 bg-teal-200 items-center justify-center">
        <img
          src="https://raw.githubusercontent.com/MorshedSiam03/TaskMate/refs/heads/main/src/assets/Icon/Blocks.png?token=GHSAT0AAAAAACV2LVVQTMPFTIOKLJE3RTXQZXGUVAA"
          className="w-full max-w-[680px]"
          alt="Blocks"
        />
      </div>
    </div>
  );
};

export default Login;
