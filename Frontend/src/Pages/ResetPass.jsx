import HeaderCom from "../components/HeaderCom";
import BottomNav from "../components/BottomNav";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import React, { useState, useRef, useContext } from "react";
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
  const { setUser, loading } = useContext(UserDataContext);

  const [showPassword, setShowPassword] = useState(false);
  const [sendMail, setSendMail] = useState(true);
  const [sendingMail, setSendingMail] = useState(false);

  const emailRef = useRef("");

  const navigate = useNavigate();

  const handleSendMail = async (e) => {
    e.preventDefault();
    if (!emailRef.current) {
      toast.error("Please enter email");
      return;
    }
    setSendingMail(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/forget-password`,
        { email: emailRef.current },
      );
      if (response.status === 200) {
        toast.success("OTP sent to your email!");
        setSendMail(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setSendingMail(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      otp: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/auth/reset-password`,
          {
            email: emailRef.current,
            otp: values.otp,
            newPassword: values.password,
          },
        );
        if (response.status === 200) {
          toast.success("Password reset successful!");
          navigate("/login");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Invalid OTP or Error");
      }
    },
  });

  if (loading) {
    return <Skeleton />;
  }

  return (
    <>
      <HeaderCom />
      <div className="login-container">
        <div className="login-box-wrapper">
          <div className="login-box">
            <h1 className="login-title">Reset Password</h1>
            <form onSubmit={sendMail ? handleSendMail : formik.handleSubmit}>
              {sendMail ? (
                <>
                  <input
                    type="email"
                    placeholder="Email*"
                    className="login-input"
                    aria-label="Email Address"
                    onChange={(e) => {
                      emailRef.current = e.target.value;
                    }}
                  />
                  <button
                    type="submit"
                    className="login-btn"
                    disabled={sendingMail}
                  >
                    {sendingMail ? "Sending..." : "Send OTP"}
                  </button>
                </>
              ) : (
                <>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    placeholder="6-Digit OTP*"
                    className="login-input"
                    aria-label="6 Digit OTP"
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
                      placeholder="New Password*"
                      className="login-input"
                      aria-label="New Password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <button
                      type="button"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="eye"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <VisibilityIcon />
                    </button>
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
        <div className="new-customer-section">
          <h2 className="new-customer-title">New Customer</h2>
          <p className="new-customer-desc">
            Sign up for early Sale access plus tailored new arrivals, trends and
            promotions. To opt out,
            <br />
            click unsubscribe in our emails.
          </p>
          <button type="button" className="new-customer-btn">
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
      <BottomNav activeTab="account" setActiveTab={() => {}} />
    </>
  );
};

export default ResetPass;
