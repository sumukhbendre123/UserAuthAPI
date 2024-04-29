import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Header = () => {
  let { user, logoutUser } = useContext(AuthContext);

  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center text-white">
      <Link to="/" className="text-xl font-bold">Home</Link>
      <div className="flex items-center">
        {user ? (
          <>
            <p className="mr-4">Hello {user.username}!</p>
            <button
              onClick={logoutUser}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
