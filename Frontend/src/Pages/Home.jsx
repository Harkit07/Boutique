import HomeCom from "../components/HomeCom";
import HeaderCom from "../components/HeaderCom";
import BottomNav from "../components/BottomNav";
import Footer from "../components/Footer";
import { UserDataContext } from "../context/UserContext";
import React from "react";
import Skeleton from "../components/Skeleton";

const Home = () => {
  const { setActiveTab, loading } = React.useContext(UserDataContext);

  if (loading) {
    return <Skeleton />;
  }

  return (
    <>
      <HeaderCom />
      <div className="main">
        <HomeCom />
      </div>
      <Footer />
      <BottomNav activeTab={"home"} setActiveTab={setActiveTab} />
    </>
  );
};

export default Home;
