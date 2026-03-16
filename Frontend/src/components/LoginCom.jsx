import React, { useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { UserDataContext } from "../context/UserContext";
import { toast } from "react-toastify";

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  return errors;
};

const Login = () => {
  const { user, setUser } = React.useContext(UserDataContext);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/users/login`,
          {
            email: values.email,
            password: values.password,
          },
        );
        if (response.status === 200) {
          toast.success("Login successful!");
          const data = response.data;
          setUser(data.user);
          localStorage.setItem("token", data.token);
          navigate("/home");
        }
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error(error.response?.data?.message || "Login failed");
        }
        // Handle error (e.g., show error message)
        console.error(error.response?.data || error.message);
      }
    },
  });

  return (
    <>
      <div className="login-bg-container">
        <div className="login-content">
          <video
            className="login-bg-video"
            src="/logovideo.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <nav className="login-breadcrumb">
            <span>Home</span>
            <span className="dot">•</span>
            <span className="active">Account</span>
          </nav>
          <h1 className="login-title">Great to have you back!</h1>
          <p className="login-desc">
            Log in to manage your account, track orders,
            <br />
            and enjoy exclusive member benefits.
          </p>
          <form className="login-form" onSubmit={formik.handleSubmit}>
            <h2 className="login-form-title">Login</h2>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Your email*"
              className="login-input"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
            <div className="password-wrapper">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password*"
                className="login-input"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <VisibilityIcon
                className="eye"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            {formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
            <div className="login-forgot">
              <Link to="/resetpass">Forgot your password?</Link>
            </div>
            <button type="submit" className="login-btn">
              Sign In
            </button>
          </form>
        </div>
      </div>
      {/* New Customer Section */}
      <div className="new-customer-section">
        <h2 className="new-customer-title">New Customer</h2>
        <p className="new-customer-desc">
          Sign up for early Sale access plus tailored new arrivals, trends and
          promotions. To opt out,
          <br />
          click unsubscribe in our emails.
        </p>
        <button className="new-customer-btn">
          <Link
            to="/signup"
            className="nav-link"
            style={{ background: "transparent", color: "white" }}
          >
            Create Account
          </Link>
        </button>
      </div>
    </>
  );
};

export default Login;
