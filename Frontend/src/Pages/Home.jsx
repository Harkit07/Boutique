import HomeCom from "../components/HomeCom";
import HeaderCom from "../components/HeaderCom";
import BottomNav from "../components/BottomNav";
import Footer from "../components/Footer";
import { useAuth, useUi } from "../context/MyContext";
import React, { memo } from "react";
import Skeleton from "../components/Skeleton";

const Home = memo(() => {
  const { loading } = useAuth();
  const { setActiveTab } = useUi();

  if (loading) return <Skeleton />;

  return (
    <>
      <HeaderCom />
      <div className="main">
        <HomeCom />
      </div>
      <Footer />
      <BottomNav activeTab="home" />
    </>
  );
});

export default Home;
