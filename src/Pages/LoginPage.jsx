import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://backend-mp-2-93lr.vercel.app/api/login",
        { email, password }
      );

      const { token, user } = response.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      setLoading(false);
      alert("Login Successfully");
      navigate("/dashboard");
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.error || "Login Failed"
        : "Login Failed: Network error";
      setLoading(false);
      alert(errorMessage);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4"
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

          {/* Password Input with See/Unsee Feature */}
          <div className="mb-3 position-relative">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="MyPassword12345"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-info text-light"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <i className="bi bi-eye-slash"></i>
                ) : (
                  <i className="bi bi-eye"></i>
                )}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn text-white fs-5 btn-info w-100"
          >
            {loading ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
