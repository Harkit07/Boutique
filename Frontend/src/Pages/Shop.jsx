import HeaderCom from "../components/HeaderCom";
import BottomNav from "../components/BottomNav";
import ImageCom from "../components/ImageCom";
import Footer from "../components/Footer";
import { UserDataContext } from "../context/UserContext";
import React from "react";
import FilterCom from "../components/FilterCom";

const Shop = () => {
  const { setActiveTab } = React.useContext(UserDataContext);

  return (
    <>
      <HeaderCom />
      <div className="main">
        <div className="uc-cart-wrapper">
          <div className="uc-breadcrumb">
            Home · <span>Product</span>
          </div>

          <h1 className="uc-cart-title">Products</h1>
          <p className="uc-cart-subtitle">
            Review your selected items before purchase.
            <br />
            Enjoy a seamless shopping experience!
          </p>
        </div>
        <FilterCom />
        <ImageCom />
      </div>
      <Footer />
      <BottomNav activeTab={"shop"} setActiveTab={setActiveTab} />
    </>
  );
};

export default Shop;
