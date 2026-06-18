import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useAuth } from "../context/MyContext";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";

const validate = (values) => {
  const errors = {};
  if (!values.about) {
    errors.about = "Required";
  } else if (values.about.length < 2) {
    errors.about = "Review too short";
  }
  if (!values.rating) {
    errors.rating = "Required";
  } else if (values.rating < 1 || values.rating > 5) {
    errors.rating = "Enter a rating between 1 to 5";
  }
  return errors;
};

const ReviewForm = ({ suit, fetchSuitDetails }) => {
  const { token } = useAuth();

  const formik = useFormik({
    initialValues: { about: "", rating: 1 },
    validate,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/suits/${suit._id}/reviews`,
          { about: values.about, rating: values.rating },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        if (response.status === 201) {
          toast.success("Review Added successful!");
          fetchSuitDetails();
          formik.resetForm();
        }
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    },
  });

  return (
    <div className="ea-page-wrapper">
      <form onSubmit={formik.handleSubmit}>
        <h2 className="ea-card-title">REVIEW: add new Review</h2>

        <div className="ea-field">
          <Typography component="legend">Rating</Typography>
          <Rating
            name="rating"
            id="rating"
            value={formik.values.rating}
            onChange={(event, newValue) => {
              formik.setFieldValue("rating", newValue === null ? 1 : newValue);
            }}
          />
        </div>
        {formik.errors.rating && (
          <div className="error">{formik.errors.rating}</div>
        )}

        <div className="ea-field">
          <label className="ea-label" htmlFor="about">
            Review
          </label>
          <input
            className="ea-input"
            id="about"
            name="about"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.about}
          />
        </div>
        {formik.errors.about && (
          <div className="error">{formik.errors.about}</div>
        )}

        <button type="submit" className="login-btn">
          Add Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
