import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import HomeContactInfo from "../components/home-component/home-contact-info";
import HomeFeaturedProperties from "../components/home-component/home-featured-property";
import HomeLocationProperty from "../components/home-component/home-location-property";
import HomeOurCommitments from "../components/home-component/home-our-commitment";
import DefaultLayout from "../components/layouts/defaultLayout";
import SearchProperty from "../components/search-property/search-property";
import SEO from "../components/SEO/seo";
import { ROUTES } from "../constants/routes";
import {
  CommonConfigDto,
  CommonListInfoDto,
  FilterWebsitePropertyDto,
  PaginatedListOfPropertyDto,
} from "./api/general-client";
import { WebsiteServices } from "./api/services/website.services";

type HomePageProps = {
  homeInfo?: CommonConfigDto;
  ourServices?: CommonListInfoDto[];
  ourCommitments?: any[];
  banners?: any[];
  contactInfo?: any[];
  featuredProperties?: PaginatedListOfPropertyDto;
};

export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => {
  const homeInfo = await WebsiteServices.getHomeInfo();
  const ourServices = await WebsiteServices.getOurServices();
  const banners = await WebsiteServices.getBannerHomePage();
  const ourCommitments = await WebsiteServices.getOurCommitments();
  const contactInfo = await WebsiteServices.getContactInfo();

  var filterProperty = {
    pageNumber: 1,
    pageSize: 15,
    isFeatured: true,
  } as FilterWebsitePropertyDto;
  const featuredProperties = await WebsiteServices.filterProperty(
    filterProperty
  );

  return {
    props: {
      homeInfo,
      ourServices,
      banners,
      ourCommitments,
      contactInfo,
      featuredProperties,
    },
  };
};

const HomePage: NextPage<HomePageProps> = ({
  homeInfo,
  ourServices,
  banners,
  ourCommitments,
  contactInfo,
  featuredProperties,
}) => {
  const { t } = useTranslation();

  return (
    <DefaultLayout
      headerProps={{
        isBannerFullScreen: true,
        isAutoPlayBanner: true,
        isHomePage: true,
        homeInfo,
        ourServices,
        banners,
      }}
    >
      <SEO
        seo={{
          metaTitle: "Home",
        }}
      />
      <SearchProperty />
      <div className="home-container">
        <main className="main">
          <div className="container">
            <div className="mt80">
              <HomeOurCommitments
                ourCommitments={ourCommitments}
                homeInfo={homeInfo}
              />
            </div>
            <div className="mt60">
              <HomeFeaturedProperties featuredProperties={featuredProperties} />
            </div>
            <div className="mt60">
              <div className="contact-now-line">
                <p className="title">{t("homeContactNowLineText")}</p>
                <Link href={ROUTES.CONTACT} passHref>
                  <div className="contact-now-btn">
                    <p>{t("contactUs")}</p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="mt60">
              <HomeLocationProperty />
            </div>
          </div>
          <div className="mt60">
            <HomeContactInfo contactInfo={contactInfo} />
          </div>
        </main>
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
