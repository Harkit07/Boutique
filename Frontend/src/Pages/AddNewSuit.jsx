import HeaderCom from "../components/HeaderCom";
import BottomNav from "../components/BottomNav";
import Footer from "../components/Footer";
import { useAuth, useUi } from "../context/MyContext";
import React, { useCallback, memo, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Skeleton from "../components/Skeleton";

const CATEGORIES = [
  "AARI Work",
  "Machine Work",
  "Handwork",
  "Punjabi Baby Dress",
];

const validate = (values) => {
  const errors = {};
  if (!values.file || values.file.length === 0)
    errors.file = "Please select an image";
  if (!values.name) errors.name = "Required";
  else if (values.name.length <= 3) errors.name = "Enter a valid name";
  if (!values.description) errors.description = "Required";
  else if (values.description.length < 5)
    errors.description = "Invalid description";
  if (!values.category) errors.category = "Required";
  if (!values.price) errors.price = "Required";
  else if (Number(values.price) <= 0) errors.price = "Enter a valid price";
  return errors;
};

const AddNewSuit = memo(() => {
  const navigate = useNavigate();
  const { token, loading } = useAuth();
  const { setActiveTab } = useUi();
  const [uploadBtn, setUploadBtn] = useState("Upload Suit Design");

  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      description: "",
      price: "",
      file: [],
    },
    validate,
    onSubmit: useCallback(
      async (values) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("category", values.category);
        formData.append("description", values.description);
        formData.append("price", values.price);
        for (let i = 0; i < values.file.length; i++)
          formData.append("file", values.file[i]);
        setUploadBtn("Uploading...");
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/suits`,
            formData,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          if (response.status === 200) {
            toast.success("Suit added successfully!");
            navigate("/shop");
          }
        } catch (error) {
          console.error(error.response?.data || error.message);
          setUploadBtn("Upload Suit Design");
        }
      },
      [token, navigate],
    ),
  });

  if (loading) return <Skeleton />;

  return (
    <>
      <HeaderCom />
      <div className="main">
        <div className="ea-page-wrapper">
          <form onSubmit={formik.handleSubmit}>
            <h2 className="ea-card-title">Add a new Suit Design</h2>
            <div className="ea-field">
              <label className="ea-label" htmlFor="file">
                Image
              </label>
              <input
                className="ea-input"
                multiple
                id="file"
                name="file"
                type="file"
                onChange={(e) => formik.setFieldValue("file", e.target.files)}
              />
            </div>
            {formik.errors.file && (
              <div className="error">{formik.errors.file}</div>
            )}
            <div className="ea-field">
              <label className="ea-label" htmlFor="name">
                Name
              </label>
              <input
                className="ea-input"
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </div>
            {formik.errors.name && (
              <div className="error">{formik.errors.name}</div>
            )}
            <div className="ea-field">
              <label className="ea-label" htmlFor="category">
                Category
              </label>
              <input
                className="ea-input"
                id="category"
                name="category"
                list="category-list"
                onChange={formik.handleChange}
                value={formik.values.category}
              />
              <datalist id="category-list">
                {CATEGORIES.map((item) => (
                  <option key={item} value={item} />
                ))}
              </datalist>
            </div>
            {formik.errors.category && (
              <div className="error">{formik.errors.category}</div>
            )}
            <div className="ea-field">
              <label className="ea-label" htmlFor="description">
                Description
              </label>
              <input
                className="ea-input"
                id="description"
                name="description"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.description}
              />
            </div>
            {formik.errors.description && (
              <div className="error">{formik.errors.description}</div>
            )}
            <div className="ea-field">
              <label className="ea-label" htmlFor="price">
                Price
              </label>
              <input
                className="ea-input"
                id="price"
                name="price"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.price}
              />
            </div>
            {formik.errors.price && (
              <div className="error">{formik.errors.price}</div>
            )}
            <button type="submit" className="login-btn">
              {uploadBtn}
            </button>
          </form>
        </div>
      </div>
      <Footer />
      <BottomNav activeTab="account" />
    </>
  );
});

export default AddNewSuit;
