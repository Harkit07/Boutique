import HomeCom from "../components/HomeCom";
import HeaderCom from "../components/HeaderCom";
import BottomNav from "../components/BottomNav";
import Footer from "../components/Footer";
import { useAuth } from "../context/MyContext";
import React, { memo } from "react";
import { Skeleton as BoneyardSkeleton } from "boneyard-js/react";
import { useBoneyard } from "../utils/boneyard";

const Home = memo(() => {
  const { loading } = useAuth();
  const isBoneyard = useBoneyard();

  return (
    <BoneyardSkeleton name="home-page" loading={loading || isBoneyard}>
      <>
        <HeaderCom />
        <div className="main">
          <HomeCom />
        </div>
        <Footer />
        <BottomNav activeTab="home" />
      </>
    </BoneyardSkeleton>
  );
});

export default Home;
