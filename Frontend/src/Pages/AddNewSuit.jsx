import HeaderCom from "../components/HeaderCom";
import BottomNav from "../components/BottomNav";
import Footer from "../components/Footer";
import { useAuth } from "../context/MyContext";
import React, { useCallback, memo, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Skeleton as BoneyardSkeleton } from "boneyard-js/react";
import { useBoneyard } from "../utils/boneyard";
import "../styles/Account.css";
import "../styles/AddNewSuit.css";

const CATEGORIES = [
  "AARI Work",
  "Machine Work",
  "Handwork",
  "Punjabi Baby Dress",
];

const validate = (values) => {
  const errors = {};
  if (!values.file || values.file.length === 0)
    errors.file = "Please select at least one image or video";
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

// Direct upload using signature (signed)
const uploadFileToCloudinary = async (file, signatureData, onProgress) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", signatureData.apiKey);
  formData.append("timestamp", signatureData.timestamp);
  formData.append("signature", signatureData.signature);
  formData.append("folder", signatureData.folder);
  formData.append("allowed_formats", signatureData.allowedFormats);
  formData.append("max_bytes", signatureData.maxBytes);
  formData.append("unique_filename", "true");
  formData.append("overwrite", "false");

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/upload`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: onProgress,
    },
  );
  return response.data;
};

const AddNewSuit = memo(() => {
  const navigate = useNavigate();
  const { token, loading } = useAuth();
  const isBoneyard = useBoneyard();
  const [uploadBtn, setUploadBtn] = useState("Upload Suit Design");
  const [uploadProgress, setUploadProgress] = useState({});

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
        setUploadBtn("Getting upload signature...");
        let signatureData;
        try {
          const sigRes = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/suits/upload`,
            { headers: { Authorization: `Bearer ${token}` } },
          );
          signatureData = sigRes.data;
        } catch (err) {
          console.error("Signature fetch failed:", err);
          toast.error("Could not prepare upload. Please try again.");
          setUploadBtn("Upload Suit Design");
          return;
        }

        setUploadBtn("Uploading files to Cloudinary...");
        const uploadedFiles = [];
        const filesArray = Array.from(values.file);

        for (let i = 0; i < filesArray.length; i++) {
          const file = filesArray[i];
          try {
            const result = await uploadFileToCloudinary(
              file,
              signatureData,
              (progressEvent) => {
                const percent = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total,
                );
                setUploadProgress((prev) => ({
                  ...prev,
                  [file.name]: percent,
                }));
              },
            );
            uploadedFiles.push({
              url: result.secure_url,
              public_id: result.public_id,
              mediaType: result.resource_type,
            });
          } catch (uploadErr) {
            console.error(`Upload failed for ${file.name}:`, uploadErr);
            toast.error(`Failed to upload ${file.name}`);
            setUploadBtn("Upload Suit Design");
            setUploadProgress({});
            return;
          }
        }

        setUploadBtn("Saving suit information...");
        try {
          const payload = {
            name: values.name,
            category: values.category,
            description: values.description,
            price: values.price,
            file: uploadedFiles,
          };
          const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/suits/upload`,
            payload,
            { headers: { Authorization: `Bearer ${token}` } },
          );
          if (response.status === 201) {
            toast.success("Suit added successfully!");
            navigate("/shop");
          }
        } catch (err) {
          console.error("Failed to save suit:", err);
          toast.error(err.response?.data?.message || "Failed to save suit");
          setUploadBtn("Upload Suit Design");
          setUploadProgress({});
        }
      },
      [token, navigate],
    ),
  });

  return (
    <BoneyardSkeleton name="add-suit-page" loading={loading || isBoneyard}>
      <>
        <HeaderCom />
        <div className="main add-suit-page">
          <div className="ea-page-wrapper">
            <form onSubmit={formik.handleSubmit}>
              <h2 className="ea-card-title">Add a new Suit Design</h2>

              <div className="ea-field">
                <label className="ea-label" htmlFor="file">
                  Images / Videos (max 50 MB each)
                </label>
                <input
                  className="ea-input"
                  multiple
                  id="file"
                  name="file"
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) => {
                    formik.setFieldValue("file", e.target.files);
                    setUploadProgress({});
                  }}
                />
              </div>
              {formik.errors.file && (
                <div className="error">{formik.errors.file}</div>
              )}

              {Object.keys(uploadProgress).length > 0 && (
                <div style={{ marginBottom: "1rem" }}>
                  {Object.entries(uploadProgress).map(([name, percent]) => (
                    <div key={name}>
                      <small>
                        {name}: {percent}%
                      </small>
                      <progress
                        value={percent}
                        max="100"
                        style={{ width: "100%" }}
                      />
                    </div>
                  ))}
                </div>
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
                <select
                  className="ea-input ea-select"
                  id="category"
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
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
                  Price (₹)
                </label>
                <input
                  className="ea-input"
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  onChange={formik.handleChange}
                  value={formik.values.price}
                />
              </div>
              {formik.errors.price && (
                <div className="error">{formik.errors.price}</div>
              )}

              <button
                type="submit"
                className="login-btn"
                disabled={uploadBtn !== "Upload Suit Design"}
              >
                {uploadBtn}
              </button>
            </form>
          </div>
        </div>
        <Footer />
        <BottomNav activeTab="account" />
      </>
    </BoneyardSkeleton>
  );
});

export default AddNewSuit;
