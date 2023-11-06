import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import { ROUTES } from "../../constants/routes";
import MenuButton from "../menu-button/menu-button";
import SearchProperty, {
  SearchPropertyProps,
} from "../search-property/search-property";
import { useRouter } from "next/router";
import {
  CommonConfigDto,
  CommonListInfoDto,
} from "../../pages/api/general-client";
import { WebsiteServices } from "../../pages/api/services/website.services";
import { delay } from "lodash";
import { positions } from "@mui/system";

type NavigateMenuType = {
  key: string;
  url: string;
  isActive?: boolean;
};

export type HeaderProps = {
  isHideBanner?: boolean;
  isBannerFullScreen?: boolean;
  isShowSearchBox?: boolean;
  isHidePageTitle?: boolean;
  isAutoPlayBanner?: boolean;
  isHomePage?: boolean;
  isHideBreadcrumbs?: boolean;
  homeInfo?: CommonConfigDto;
  ourServices?: CommonListInfoDto[];
  banners?: any[];
  searchingProps?: SearchPropertyProps;
};

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const fullPathName = router.pathname.split("/");

  SwiperCore.use([Autoplay]);
  const [logo, setLogo] = useState<any>();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [headerBottomColor, setHeaderBottomColor] = useState<string>("#eee");
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [blackMenu, setblackMenu] = useState<boolean>(false);

  const [navigateMenu, setNavigateMenu] = useState<NavigateMenuType[]>([
    {
      key: "aboutUs",
      url: ROUTES.ABOUT,
      isActive: fullPathName[1] === "about-us",
    },
    {
      key: "tenantPortal",
      url: ROUTES.TENANTPORTAL,
      isActive: fullPathName[1] === "tenant-portal",
    },
    {
      key: "landlordPortal",
      url: ROUTES.LANDLORDPORTAL,
      isActive: fullPathName[1] === "landlord-portal",
    },
    {
      key: "news",
      url: ROUTES.NEWS.INDEX,
      isActive: fullPathName[1] === "news",
    },
    {
      key: "video",
      url: ROUTES.VIDEO,
      isActive: fullPathName[1] === "video",
    },
    {
      key: "listing",
      url: ROUTES.LISTING.INDEX,
      isActive: fullPathName[1] === "listing",
    },
    {
      key: "contact",
      url: ROUTES.CONTACT,
      isActive: fullPathName[1] === "contact",
    },
  ]);

  useEffect(() => {
    getLogo();
    handleResize();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, false);
  }, []);

  const handleResize = () => {
    // setIsOpenMenu(false);
    if (window.innerWidth < 992) {
      setIsMobile(true);
      setHeaderBottomColor("#eee");
    } else {
      setIsMobile(false);
      setHeaderBottomColor(props.isHomePage ? "#eee" : "transparent");
    }
  };

  const handleScroll = () => {
    const position = window.pageYOffset;
    if (position > 50) {
      setblackMenu(true)
      setHeaderBottomColor("#eee");
    } else {
      setblackMenu(false)

      if (props.isHomePage) {
        setHeaderBottomColor("#eee");
      } else {
        setHeaderBottomColor(window.innerWidth < 992 ? "#eee" : "transparent");
      }
    }
  };

  const onOpenMenu = (isOpen: boolean) => {
    setIsOpenMenu(isOpen);

    return isOpen;
  };

  const getLogo = async () => {
    const res = await WebsiteServices.getHomeInfo();
    if (res) {
      setLogo(res.data?.logo?.fileUrl);
    }
  };

  return (
    <div className="header-container">
      <div className={props.isHomePage ? "header header-hompage" : "header"}>
        <div
          className="bottom-header"
          style={{ background: headerBottomColor }}
        >
          <div className="container">
            <div className="d-flex justify-content-between">
              <div className="logo">
                {logo && (
                  <div
                    onClick={() => window.location.assign(ROUTES.HOME || "/")}
                  >
                    <Image src={logo} alt="VN Realty" layout="fill" />
                  </div>
                )}
              </div>
              <div className="menu">
                {!isMobile ? (
                  <ul>
                    {navigateMenu &&
                      navigateMenu.map((item, index) => (
                        <li key={index}>
                          <p
                            className={
                              item.isActive
                                ? "active"
                                : blackMenu
                                ? "colorScroll"
                                : ""
                            }
                            onClick={() =>
                              window.location.assign(item.url || "/")
                            }
                          >
                            {t(item.key)}
                          </p>
                        </li>
                      ))}
                  </ul>
                ) : (
                  <MenuButton isOpen={isOpenMenu} onOpen={onOpenMenu} />
                )}
              </div>
            </div>
            {isMobile && (
              <div
                className={isOpenMenu ? "menu-mobile opened" : "menu-mobile"}
              >
                {isOpenMenu && (
                  <ul>
                    {navigateMenu &&
                      navigateMenu.map((item, index) => (
                        <li key={index}>
                          <p
                            className={item.isActive ? "active" : ""}
                            onClick={() =>
                              window.location.assign(item.url || "/")
                            }
                          >
                            {t(item.key)}
                          </p>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {!props.isHideBanner && (
        <div
          className={props.isBannerFullScreen ? "banner full-screen" : "banner"}
        >
          <Swiper
            modules={[Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            preventInteractionOnTransition={
              props.banners && props.banners.length > 1 ? true : false
            }
            autoplay={{
              delay: 2000,
              reverseDirection: false,
              disableOnInteraction: false,
            }}
            direction="horizontal"
            pagination={{
              clickable:
                props.banners && props.banners.length > 1 ? true : false,
            }}
          >
            {props.banners &&
              props.banners.map((item, index: number) => (
                <SwiperSlide key={index}>
                  <div
                    className={
                      props.isBannerFullScreen
                        ? "banner-image full-screen"
                        : "banner-image"
                    }
                  >
                    <Image
                      src={item.data ? item.data.image?.fileUrl : item}
                      alt="banner"
                      layout="fill"
                    />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
          {!props.isShowSearchBox && (
            <div
              className={
                props.isBannerFullScreen
                  ? "banner-title full-screen"
                  : "banner-title"
              }
            >
              {!props.isHidePageTitle && (
                <div className="title">
                  {fullPathName.length < 3 && (
                    <p className="page-name">
                      {fullPathName[1].replace("-", " ")}
                    </p>
                  )}
                  {/* {!props.isHideBreadcrumbs && !props.isHomePage && (
                
                  )} */}
                </div>
              )}
              {props.homeInfo && (
                <div
                  className={
                    props.isBannerFullScreen
                      ? "banner-title-hompage full-screen"
                      : "banner-title-hompage"
                  }
                >
                  <div className="row h100 p-0 m-0">
                    <div
                      className={
                        props.ourServices ? "col-12 col-lg-7 p-0" : "col-12 p-0"
                      }
                    >
                      <div className="home-greeting h100 d-flex align-items-center">
                        <div className="container">
                          <div className="greeting">
                            {props.homeInfo.data?.welcomeTitle}
                          </div>
                          <div className="greeting-content mt-4">
                            <p className="line-1">
                              {props.homeInfo.data?.welcomeSubtitle}
                            </p>
                            <p className="line-2">
                              {props.homeInfo.data?.welcomeShortDescriptions}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {props.ourServices && (
                      <div className="col-12 col-lg-5 p-0">
                        <div className="our-service h100 d-flex align-items-center">
                          <div className="container">
                            <div className="our-service-title">
                              {t("ourServices")}
                            </div>
                            <div className="our-service-body mt-5">
                              {props.ourServices.slice(0, 2).map((item) => (
                                <div key={item.id} className="section">
                                  <p className="short-title-text-header">
                                    {item.data?.title}
                                  </p>
                                  <p className="short-title-text-header">
                                    {item.data?.shortDescription}
                                  </p>
                                </div>
                              ))}
                              <p
                                onClick={() =>
                                  window.location.assign(ROUTES.ABOUT)
                                }
                                className="view-more pl12"
                              >
                                {t("viewMore") + " >>"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          {props.isShowSearchBox && (
            <div className="search-box">
              <SearchProperty
                isMinimize={props.searchingProps?.isMinimize}
                isListingPage={props.searchingProps?.isListingPage}
                onSearch={props.searchingProps?.onSearch}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
