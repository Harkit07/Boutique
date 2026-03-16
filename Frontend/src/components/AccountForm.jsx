import React, { useState } from "react";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { toast } from "react-toastify";

const AccountForm = () => {
  const token = localStorage.getItem("token");
  const { user, setUser } = React.useContext(UserDataContext);
  const [updateBtn, setUpdateBtn] = useState("Update Address");
  const [formData, setFormData] = useState({
    firstname: user.fullname.firstname,
    lastname: user.fullname.lastname || "",
    address: user.address || "",
    city: user.city || "",
    phone: user.phone || "",
  });

  // Handle input change
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateBtn("Updating...");
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/updateuser`,
      {
        fullname: {
          firstname: formData.firstname,
          lastname: formData.lastname,
        },
        address: formData.address,
        city: formData.city,
        phone: formData.phone,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.status === 200) {
      toast.success("Account updated!");
      setUser(response.data.user);
    }
  };

  return (
    <div className="ea-page-wrapper">
      <form onSubmit={handleSubmit}>
        <h2 className="ea-card-title">Edit address: Default addresses</h2>

        <div className="ea-field">
          <label className="ea-label" htmlFor="firstname">
            First name
          </label>
          <input
            className="ea-input"
            id="firstname"
            name="firstname"
            type="text"
            onChange={handleChange}
            value={formData.firstname}
          />
        </div>

        <div className="ea-field">
          <label className="ea-label" htmlFor="lastName">
            Last name
          </label>
          <input
            className="ea-input"
            id="lastname"
            name="lastname"
            type="text"
            placeholder="Your last name"
            onChange={handleChange}
            value={formData.lastname}
          />
        </div>

        <div className="ea-field">
          <label className="ea-label" htmlFor="address">
            Address
          </label>
          <input
            className="ea-input"
            id="address"
            name="address"
            type="text"
            placeholder="your address"
            onChange={handleChange}
            value={formData.address}
          />
        </div>

        <div className="ea-field">
          <label className="ea-label" htmlFor="city">
            City
          </label>
          <input
            className="ea-input"
            id="city"
            name="city"
            type="text"
            placeholder="your city"
            onChange={handleChange}
            value={formData.city}
          />
        </div>

        <div className="ea-field">
          <label className="ea-label" htmlFor="phone">
            Phone
          </label>
          <input
            className="ea-input"
            id="phone"
            name="phone"
            type="number"
            placeholder="your phone"
            onChange={handleChange}
            value={formData.phone}
          />
        </div>
        <button type="submit" className="login-btn">
          {updateBtn}
        </button>
      </form>
    </div>
  );
};

export default AccountForm;
