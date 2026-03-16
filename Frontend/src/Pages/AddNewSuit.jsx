import HeaderCom from "../components/HeaderCom";
import BottomNav from "../components/BottomNav";
import Footer from "../components/Footer";
import { UserDataContext } from "../context/UserContext";
import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Skeleton from "../components/Skeleton";

const validate = (values) => {
  const errors = {};
  if (!values.file || values.file.length === 0) {
    errors.file = "Please select an image";
  }

  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length <= 5) {
    errors.name = "Enter a valid name";
  }

  if (!values.description) {
    errors.description = "Required";
  } else if (values.description.length < 5) {
    errors.description = "Invalid description";
  }

  if (!values.category) {
    errors.category = "Required";
  }

  if (!values.price) {
    errors.price = "Required";
  } else if (Number(values.price) <= 0) {
    errors.price = "Enter a valid price";
  }

  return errors;
};

const AddNewSuit = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { activeTab, setActiveTab, loading } =
    React.useContext(UserDataContext);
  const [isOpen, setIsOpen] = React.useState(false);
  const [uploadBtn, setUploadBtn] = React.useState("Upload Suit Design");

  if (loading) {
    return <Skeleton />;
  }

  const categories = [
    "AARI Work",
    "Machine Work",
    "Handwork",
    "Punjabi Baby Dress",
  ];

  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      description: "",
      price: "",
      file: [],
    },
    validate,
    onSubmit: async (values) => {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("category", values.category);
      formData.append("description", values.description);
      formData.append("price", values.price);

      for (let i = 0; i < values.file.length; i++) {
        formData.append("file", values.file[i]);
      }
      setUploadBtn("Uploading...");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/suit/new`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.status === 201) {
          toast.success("Suit Added successful!");
          navigate("/shop");
        }
      } catch (error) {
        // Handle error (e.g., show error message)
        console.error(error.response?.data || error.message);
      }
    },
  });

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
            {formik.errors.file ? (
              <div className="error">{formik.errors.file}</div>
            ) : null}

            <div className="ea-field">
              <label className="ea-label" htmlFor="name">
                Name
              </label>
              <input
                className="ea-input"
                id="name"
                name="name"
                type="text"
                placeholder="Suit Name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </div>
            {formik.errors.name ? (
              <div className="error">{formik.errors.name}</div>
            ) : null}

            <div className="ea-field category-field">
              <label className="ea-label" htmlFor="category">
                Category
              </label>
              <div
                className="ea-dropdown"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(!isOpen);
                }}
              >
                <span className="ea-dropdown-value">
                  {formik.values.category || "Select Category"}
                </span>

                <span className={`ea-dropdown-icon ${isOpen ? "open" : ""}`}>
                  ▾
                </span>
              </div>

              {isOpen && (
                <ul className="ea-dropdown-list">
                  {categories.map((item) => (
                    <li
                      key={item}
                      className="ea-dropdown-item"
                      onClick={() => {
                        formik.setFieldValue("category", item);
                        setIsOpen(false);
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {formik.errors.category ? (
              <div className="error">{formik.errors.category}</div>
            ) : null}

            <div className="ea-field">
              <label className="ea-label" htmlFor="description">
                Description
              </label>
              <input
                className="ea-input"
                id="description"
                name="description"
                type="text"
                placeholder="Suit Description"
                onChange={formik.handleChange}
                value={formik.values.description}
              />
            </div>
            {formik.errors.description ? (
              <div className="error">{formik.errors.description}</div>
            ) : null}

            <div className="ea-field">
              <label className="ea-label" htmlFor="price">
                Price
              </label>
              <input
                className="ea-input"
                id="price"
                name="price"
                type="number"
                placeholder="your price"
                onChange={formik.handleChange}
                value={formik.values.price}
              />
            </div>
            {formik.errors.price ? (
              <div className="error">{formik.errors.price}</div>
            ) : null}

            <button type="submit" className="login-btn">
              {uploadBtn}
            </button>
          </form>
        </div>
      </div>
      <Footer />
      <BottomNav activeTab={"account"} setActiveTab={setActiveTab} />
    </>
  );
};

export default AddNewSuit;
