import logovideo from "../assets/logovideo.mp4";
import HeaderCom from "../components/HeaderCom";
import BottomNav from "../components/BottomNav";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import React, { useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { toast } from "react-toastify";

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length > 15) {
    errors.firstName = "Must be 15 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  return errors;
};

const Signup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const { setUser } = React.useContext(UserDataContext);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/users/signup`,
          {
            fullname: {
              firstname: values.firstName,
              lastname: values.lastName,
            },
            email: values.email,
            password: values.password,
          },
        );

        if (response.status === 201) {
          toast.success("Signup successful!");
          const data = response.data;
          setUser(data.user);
          localStorage.setItem("token", data.token);
          navigate("/");
        }
      } catch (error) {
        if (error.response?.status === 400) {
          toast.error(error.response?.data?.message || "Signup failed");
        }
        // Handle error (e.g., show error message)
        console.error(error.response?.data || error.message);
      }
    },
  });

  return (
    <>
      <HeaderCom />
      <div className="main">
        <div className="login-bg-container">
          <div className="login-content">
            <video
              className="login-bg-video"
              src={logovideo}
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
            <h1 className="login-title">Create your account</h1>
            <p className="login-desc">
              Sign up to manage your account, track orders,
              <br />
              and enjoy exclusive member benefits.
            </p>
            <form className="login-form" onSubmit={formik.handleSubmit}>
              <h2 className="login-form-title">Sign Up</h2>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Your first name"
                className="login-input"
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
              {formik.errors.firstName ? (
                <div className="error">{formik.errors.firstName}</div>
              ) : null}
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Your last name"
                className="login-input"
                onChange={formik.handleChange}
                value={formik.values.lastName}
              />
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
              <button type="submit" className="login-btn">
                Create Account
              </button>
            </form>
          </div>
        </div>
        {/* New Customer Section */}
        <div className="new-customer-section">
          <p className="new-customer-desc">Log in to manage your account...</p>
          <button className="new-customer-btn">
            <Link
              to="/login"
              className="nav-link"
              style={{ background: "transparent", color: "white" }}
            >
              Login Account
            </Link>
          </button>
        </div>
      </div>
      <BottomNav />
    </>
  );
};

export default Signup;
