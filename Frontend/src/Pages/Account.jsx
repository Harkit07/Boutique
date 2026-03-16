import React, { useState } from "react";
import HeaderCom from "../components/HeaderCom";
import BottomNav from "../components/BottomNav";
import Footer from "../components/Footer";
import "../styles/Account.css";
import { Link } from "react-router-dom";
import AccountForm from "../components/AccountForm";
import { UserDataContext } from "../context/UserContext";
import Skeleton from "../components/Skeleton";

const Account = () => {
  const { user, setActiveTab, loading } = React.useContext(UserDataContext);
  const [address, setAddress] = useState(false);
  const [editAddress, setEditAddress] = useState(false);

  if (loading) {
    return <Skeleton />;
  }


  return (
    <>
      <HeaderCom />
      <div className="main">
        <div className="account-container1">
          <div className="breadcrumb">
            <Link
              to="/"
              className="nav-link"
              style={{ background: "transparent" }}
            >
              Home
            </Link>
            <span>•</span>
            <Link
              to="/account"
              className="nav-link"
              style={{ background: "transparent" }}
            >
              Account
            </Link>
          </div>

          <h1 className="title">My Account</h1>

          <div className="account-card">
            <div className="account-item">Dashboard</div>
            <div className="account-item">Your addresses</div>
            <div className="account-item">
              {user.role == "user" ? (
                <Link
                  to="/cart"
                  className="nav-link"
                  style={{ background: "transparent" }}
                >
                  Your Card
                </Link>
              ) : (
                <Link
                  to="/addnewsuit"
                  className="nav-link"
                  style={{ background: "transparent" }}
                >
                  Add New Suit
                </Link>
              )}
            </div>
            <div className="account-item logout">
              <Link
                to="/logout"
                className="nav-link"
                style={{ background: "transparent" }}
              >
                Log Out
              </Link>
            </div>
          </div>

          <p className="welcome-text">
            Welcome
            <strong>
              {`${user.fullname.firstname} ${user.fullname.lastname}`}
            </strong>
            ! (Not?{" "}
            <Link to="/logout">
              {`${user.fullname.firstname} ${user.fullname.lastname}`} Log Out
            </Link>
            )
          </p>
        </div>
        <div className="content">
          <h2 className="heading">Account details</h2>
          <div className="details-box">
            <div className="detail-row">
              <div className="left">Name</div>
              <div className="right">
                {`${user.fullname.firstname} ${user.fullname.lastname}`}
              </div>
            </div>
            <div className="detail-row2">
              <div className="left">Email</div>
              <div className="right">{user.email}</div>
            </div>
          </div>
          <button className="address-btn" onClick={() => setAddress(!address)}>
            View Addresses
          </button>
        </div>

        {address ? (
          <div className="da-page-wrapper">
            <h2 className="da-page-title">Default addresses</h2>
            <div className="da-card">
              <h3 className="da-card-title">Addresses (Default addresses)</h3>

              <p className="da-email-text">{user.email}</p>
              <p className="da-country-text">India</p>

              <div className="da-action-group">
                <button
                  className="da-btn da-btn-edit"
                  onClick={() => setEditAddress(!editAddress)}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ) : null}
        {editAddress ? <AccountForm /> : null}
      </div>
      <Footer />
      <BottomNav activeTab={"account"} setActiveTab={setActiveTab} />
    </>
  );
};

export default Account;
