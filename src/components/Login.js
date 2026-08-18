import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        }
      );

      const json = await response.json();

      if (json.success) {
        localStorage.setItem("token", json.authToken);

        props.showAlert(
          "Logged in Successfully",
          "success"
        );

        navigate("/home");
      } else {
        props.showAlert(
          "Invalid Credentials",
          "danger"
        );
      }
    } catch (error) {
      console.error(error);

      props.showAlert(
        "Unable to connect to server",
        "danger"
      );
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-header">

          <div className="auth-icon">
            <i className="fa-solid fa-right-to-bracket"></i>
          </div>

          <h2>Welcome Back</h2>

          <p>
            Login to access your notes
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label
              htmlFor="email"
              className="form-label"
            >
              Email address
            </label>

            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="password"
              className="form-label"
            >
              Password
            </label>

            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              placeholder="Enter your password"
              minLength={5}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 auth-button"
            disabled={
              credentials.email.length < 5 ||
              credentials.password.length < 5
            }
          >
            Login
          </button>

        </form>

        <div className="auth-footer">
          <span>Don't have an account?</span>{" "}
          <Link to="/signup">
            Create Account
          </Link>
        </div>

      </div>

    </div>
  );
};

export default Login;