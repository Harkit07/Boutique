import React from "react";
import "../styles/ShopCom.css";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import design1 from "../assets/design1.jpg";

const bestSellers = [
  {
    id: 1,
    name: "Line Weaved Viscose Tissue Organza Saree",
    sku: "INV118",
    price: 1499,
    image: "https://via.placeholder.com/250/C9A961/FFFFFF?text=Saree+INV118",
    isPreOrder: false,
  },
  {
    id: 2,
    name: "Traditional Elephant Motifs Design Semi Silk Saree",
    sku: "SSN166",
    price: 1399,
    image: "https://via.placeholder.com/250/DAA520/FFFFFF?text=Saree+SSN166",
    isPreOrder: true,
  },
  {
    id: 3,
    name: "Zig Zag Pattern Traditional Saree",
    sku: "ZPS201",
    price: 1299,
    image: "https://via.placeholder.com/250/F08080/FFFFFF?text=Saree+ZPS201",
    isPreOrder: true,
  },
  {
    id: 4,
    name: "Designer Silk Saree Collection",
    sku: "DSC401",
    price: 1599,
    image: "https://via.placeholder.com/250/CD853F/FFFFFF?text=Saree+DSC401",
    isPreOrder: false,
  },
];

const ShopCom = () => {
  return (
    <div className="shop-page-bg">
      <div className="shop-container">
        <div className="shop-breadcrumbs">
          Home <span className="dot">•</span> Products
        </div>
        <h1 className="shop-title">Products</h1>
        <div className="shop-controls">
          <button className="shop-filter-btn">&#x1F50D; Filter</button>
          <select className="shop-sort-select">
            <option>Sort by:</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>
          <div className="shop-view-icons">
            <span className="shop-view-icon active">&#x2630;</span>
            <span className="shop-view-icon">&#x25A6;</span>
          </div>
        </div>
        <div className="container-product-grid">
          <div className="products-grid">
            {bestSellers.map((product) => (
              <div key={product.id} className="product-card">
                {product.isPreOrder && (
                  <div className="pre-order-badge">Pre-Order</div>
                )}
                <div className="product-image-wrapper">
                  <img
                    src={design1}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-overlay">
                    <div className="shopping-icon">
                      <ShoppingBagIcon
                        className="hover"
                        style={{ background: "transparent" }}
                      />
                    </div>
                  </div>
                </div>
                <p className="product-name">{product.name}</p>
                <p className="product-sku">{product.sku}</p>
                <p className="product-price">
                  Rs. {product.price.toLocaleString()}.00
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCom;
