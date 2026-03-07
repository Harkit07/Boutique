import React, { useState } from "react";
import "../styles/ImageCom.css";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

// const sampleProducts = [
//   {
//     name: "Line Weaved Viscose Tissue Organza Saree",
//     sku: "NN118",
//     price: 1499,
//     image: img1,
//     preOrder: false,
//   },
//   {
//     name: "Traditional Elephant Motifs Design Semi Silk Saree",
//     sku: "SSN166",
//     price: 1399,
//     image: img2,
//     preOrder: true,
//   },
//   {
//     name: "Designer Embroidered Saree",
//     sku: "DSR201",
//     price: 1599,
//     image: img3,
//     preOrder: true,
//   },
//   {
//     name: "Classic Red Saree",
//     sku: "CRS301",
//     price: 1299,
//     image: img4,
//     preOrder: false,
//   },
// ];

const DataCard = ({
  id,
  category,
  name,
  price,
  image,
  preOrder,
  mediaType,
}) => {
  const navigate = useNavigate();

  return (
    <div className="data-card" onClick={() => navigate(`/suit/${id}`)}>
      <div className="data-card-img-wrapper">
        {preOrder && <span className="data-card-preorder">Pre-Order</span>}
        {mediaType === "video" ? (
          <video className="data-card-img" src={image} autoPlay muted loop />
        ) : (
          <img
            src={image || "Suit IMG"}
            alt="Image"
            className="data-card-img"
          />
        )}

        <span className="data-card-wishlist">
          <ShoppingBagIcon
            className="hover"
            style={{ background: "transparent" }}
          />
        </span>
      </div>
      <div className="data-card-title">
        <div className="data-card-name">{name}</div>
        <div className="data-card-sku">| {category}</div>
      </div>
      <div className="data-card-price">Rs. {price.toLocaleString()}.00</div>
    </div>
  );
};

const DataGrid = () => {
  const { sortedSuits } = React.useContext(UserDataContext);

  if (sortedSuits.length === 0) {
    return (
      <div className="data-card-grid">
        <h2>No Suit Yet</h2>
      </div>
    );
  }

  const isOdd = sortedSuits.length % 2 !== 0;

  return (
    <div className="data-card-grid">
      {sortedSuits.map((suit) => (
        <DataCard
          key={suit._id}
          id={suit._id}
          name={suit.name}
          description={suit.description}
          category={suit.category}
          price={suit.price}
          image={suit.file?.[0]?.url}
          mediaType={suit.file?.[0]?.mediaType}
        />
      ))}
      {isOdd && <div className="data-card"></div>}
    </div>
  );
};

export default DataGrid;
