import React from "react";
import DefaultLayout from "../../components/layouts/defaultLayout";
import HomeFilter from "./components/HomeFilter";
import HomeServices from "./components/HomeServices/HomeServices";
import HomeFeatured from "./components/HomeFeatured/HomeFeatured";
import HomeDemo from "./components/HomeDemo/HomeDemo";
import HomeHeadquarter from "./components/HomeHeadquarter";
import HomeContact from "./components/HomeContact";

const Home = () => {
  return (
    <DefaultLayout>
      <div className="home1">
        <HomeFilter />
        <HomeServices />
        <HomeFeatured />
        <HomeDemo />
        <HomeHeadquarter />
        <HomeContact />
      </div>
    </DefaultLayout>
  );
};

export default Home;
