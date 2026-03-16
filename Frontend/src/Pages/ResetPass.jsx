import HeaderCom from "../components/HeaderCom";
import BottomNav from "../components/BottomNav";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import React, { useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { toast } from "react-toastify";
import Skeleton from "../components/Skeleton";

const validate = (values) => {
  const errors = {};

  if (!values.otp) {
    errors.otp = "Required";
  } else if (values.otp.length !== 6) {
    errors.otp = "OTP must be 6 digits";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  return errors;
};

const ResetPass = () => {
  const { setUser, loading } = React.useContext(UserDataContext);

  if (loading) {
    return <Skeleton />;
  }

  const [showPassword, setShowPassword] = useState(false);
  const [sendMail, setSendMail] = useState(true);
  const [sendingMail, setSendingMail] = useState(false);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const sendOTP = async () => {
    if (!email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = "Invalid email address";
    }

    setSendingMail(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/forgotpassword`,
        {
          email: email,
        },
      );
      console.log(response.data);
      if (response.status === 201) {
        toast.success("Mail send successful!");
        setSendMail(false);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error(error.response?.data?.message || "Try again");
      }
      // Handle error (e.g., show error message)
      console.error(error.response?.data || error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/users/resetpassword`,
          {
            email: email,
            otp: values.otp,
            password: values.password,
          },
        );
        if (response.status === 200) {
          toast.success("Password Reset successful!");
          const data = response.data;
          setUser(data.user);
          localStorage.setItem("token", data.token);
          navigate("/");
        }
      } catch (error) {
        if (error.response?.status === 404) {
          toast.error(error.response?.data?.message || "Try again");
        }
        if (error.response?.status === 400) {
          toast.error(error.response?.data?.message || "Invalid OTP");
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
              src="/logovideo.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
            <nav className="login-breadcrumb">
              <span>Home</span>
              <span className="dot">•</span>
              <span className="active">Reset Password</span>
            </nav>
            <h1 className="login-title">Reset Your Password</h1>
            <p className="login-desc">
              Enter your email to receive a one-time password (OTP) and reset
              your password.
            </p>
            <form className="login-form" onSubmit={formik.handleSubmit}>
              <h2 className="login-form-title">Reset Password</h2>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Your email*"
                className="login-input"
                onChange={(e) => setEmail(e.target.value)}
              />
              {formik.errors.email ? (
                <div className="error">{formik.errors.email}</div>
              ) : null}
              {sendMail ? (
                <div className="login-btn mail-btn" onClick={sendOTP}>
                  {sendingMail ? "Sending..." : "Send Mail"}
                </div>
              ) : (
                <>
                  <input
                    id="otp"
                    type="number"
                    name="otp"
                    placeholder="Enter OTP"
                    className="login-input"
                    onChange={formik.handleChange}
                    value={formik.values.otp}
                  />
                  {formik.errors.otp ? (
                    <div className="error">{formik.errors.otp}</div>
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
                    Reset Password
                  </button>
                </>
              )}
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
      </div>
      <BottomNav />
    </>
  );
};

export default ResetPass;
