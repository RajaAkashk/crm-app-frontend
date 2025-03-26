import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backend-mp-2-93lr.vercel.app/api/login",
        {
          email,
          password,
        }
      );

      const { token, user } = response.data;

      // Store token and user info in local storage
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user)); // Store user details

      // Redirect to dashboard
      alert("Login Successfully");
      navigate("/dashboard");
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.error || "Login Failed"
        : "Login Failed: Network error";
      alert(errorMessage);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card  p-4"
        style={{
          width: "30vw",
          boxShadow: "0 4px 10px rgba(135, 206, 250, 0.8)",
        }}
      >
        <h2 className="text-center text-info mb-4">Avnaya Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="John@wick.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="MyPassword12345"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-info w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
