import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await response.json();
      // console.log(json);

      if (json.success) {
        console.log("Logged In");
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", json.authToken);
        // console.log(localStorage.getItem("authToken"));
        navigate("/");
      } else {
        alert("Enter valid credentials");
      }
    } catch (error) {
      console.error("Error:", error.message);
      // Handle error condition
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-success m-3">
            Login
          </button>
          <Link to="/createuser" className="btn btn-danger m-3">
            Don't have an account? Sign up
          </Link>
        </form>
      </div>
    </>
  );
}
