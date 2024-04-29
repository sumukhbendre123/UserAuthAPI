import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import basicAxios from "../utils/basicAxios";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [user, setUser] = useState(null);
  let [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  let loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await basicAxios.post("/login/", {
        username: e.target.username.value,
        password: e.target.password.value,
      });
      const data = response.data;
      setUser(data.user);
      navigate("/");
    } catch (error) {
      alert("Something went wrong while logging in the user!");
      console.error("Login error:", error);
    }
  };

  let registerUser = async (formData) => {
    try {
      const response = await basicAxios.post("/register/", formData);
      if (response.status === 201) {
        navigate("/login");
      } else {
        console.error("Registration error:", response.data);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  let logoutUser = () => {
    localStorage.removeItem("authTokens");
    setUser(null);
    navigate("/login");
  };

  let contextData = {
    user: user,
    loginUser: loginUser,
    registerUser: registerUser,
    logoutUser: logoutUser,
  };

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
