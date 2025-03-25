import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // No need to enter different passwords
  const dispatch = useDispatch();

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

      dispatch(setAuthToken(token)); // Save token in Redux
      alert("Login Successful");
    } catch (error) {
      alert("Login Failed: " + error.response?.data?.error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
