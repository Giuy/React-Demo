import { useTranslation } from "react-i18next";
import Pic16 from "../../assets/images/pic16.png";
import Pic17 from "../../assets/images/pic17.png";
import Pic18 from "../../assets/images/pic18.png";
import Pic19 from "../../assets/images/pic19.png";
import Pic20 from "../../assets/images/pic20.png";
import Pic21 from "../../assets/images/pic21.png";
import Pic22 from "../../assets/images/pic22.png";
import Pic23 from "../../assets/images/pic23.png";
import Pic24 from "../../assets/images/pic24.png";
import { useEffect, useState } from "react";
import { CustomText } from "../../components/styled-custom";
import { Link } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import { AppRepositories } from "../../apis/api-repositories";
import { CommonConfigDto, NewsDto, WebsiteBodyMasterDto, WebsiteBodyTypesEnum } from "../../apis/general-client";
import Cookies from "js-cookie";
import { Slide, Button } from "@mui/material";
import { currentLanguage } from "../../helpers/utils";

const mockDataNews = [
  {
    img: Pic21,
    title: "Bảo hiểm 24/24 là gì? Đối tượng cà quyền lợi khi tham gia",
    content: "Ngoài ốm đau, bệnh tật thì tai nạn cũng là rủi ro để lại không ít gánh nặng cho nhiều gia đình, đặc biệt là chi phí điều trị và hồi phục sức khỏe",
    link: ''
  },
  {
    img: Pic22,
    title: "Tìm hiểu lịch sử bảo hiểm nhân thọ ra đời như thế nào",
    content: "Bảo hiểm nhân thọ ra đời tử rất lâu trên thế giới, xuất phát từ nhu cầu thực tế của con người mong muốn cuộc sống đảm bảo trước những rủi ro.",
    link: ''
  },
  {
    img: Pic23,
    title: "Vì sao nên mua bảo hiểm cho người trụ cột trong gia đình",
    content: "Không ít lời khuyên đưa ra nên tham gia bảo hiểm cho người trụ cột trong gia đình? Vì sao lại như vậy? Cùng đi tìm lời giải đáp cho bài viết dưới đây.",
    link: ''
  },
]

function HomePage() {
  const { t } = useTranslation();
  const [servicesData, setServicesData] = useState<WebsiteBodyMasterDto>();
  const [typicalIndex, setTypicalIndex] = useState<WebsiteBodyMasterDto>();
  const [aboutUs, setAboutUs] = useState<WebsiteBodyMasterDto>();
  const [customerThinking, setCustomerThinking] = useState<WebsiteBodyMasterDto>();
  const [newsInfo, setNewsInfo] = useState<WebsiteBodyMasterDto>();
  const [aboutTab, setAboutTab] = useState<number>(0);
  const [newsTab, setNewsTab] = useState<any>();
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [news, setNews] = useState<NewsDto[]>([]);
  const currentLanguageCode = Cookies.get("i18next") || "vi";
  const viLanguage = currentLanguageCode === 'vi';
  const [aboutSlide, setAboutSlide] = useState<boolean>(false);
  const [priceSlide, setPriceSlide] = useState<boolean>(false);
  const [introRightSlide, setIntroRightSlide] = useState<boolean>(false);
  const [customerSlide, setCustomerSlide] = useState<boolean>(false);
  const [admin, setAdmin] = useState<CommonConfigDto>();

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    };

    window.addEventListener('resize', handleWindowResize);
    window.addEventListener("scroll", handleScroll, false);

    window.scrollTo(0, 0);

    async function getWebsiteBody() {
      const servicesResponse = await AppRepositories.getWebsiteBodyByType(WebsiteBodyTypesEnum.HomeOurService);
      const typicalIndexResponse = await AppRepositories.getWebsiteBodyByType(WebsiteBodyTypesEnum.HomeTypicalIndex);
      const aboutUsResponse = await AppRepositories.getWebsiteBodyByType(WebsiteBodyTypesEnum.HomeAboutUs);
      const customerThinkingResponse = await AppRepositories.getWebsiteBodyByType(WebsiteBodyTypesEnum.HomeCustomerThinking);
      const newsInfoResponse = await AppRepositories.getWebsiteBodyByType(WebsiteBodyTypesEnum.HomeNewsInfo);
      setServicesData(servicesResponse);
      setTypicalIndex(typicalIndexResponse);
      setAboutUs(aboutUsResponse);
      setCustomerThinking(customerThinkingResponse);
      setNewsInfo(newsInfoResponse);
    }
    getWebsiteBody(); 

    setNewsTab(mockDataNews);

    const fetchData = async () => {
      const res = await AppRepositories.getHomeNews();
      const admin = await AppRepositories.getCommonConfig();
      setAdmin(admin);
      setNews(res.slice(0, 3));
    }

    fetchData();
    return () => {
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener("scroll", handleScroll, false);
    };
  }, []);

  function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  }

  const handleScroll = () => {
    const position = window.pageYOffset;
    const destopSpace = [1100, 1600, 2000, 2700];
    const mobileSpace = [600, 1200, 1700, 2700];
    let space = window.innerWidth < 426 ? mobileSpace : destopSpace; 
    if (position > space[0]) {
      setAboutSlide(true);
    }
    if (position > space[1]) {
      setPriceSlide(true);
    }
    if (position > space[2]) {
      setIntroRightSlide(true);
    }
    if (position > space[3]) {
      setCustomerSlide(true);
    }

    if (position < 255) {
      setAboutSlide(false);
      setPriceSlide(false);
      setIntroRightSlide(false);
      setCustomerSlide(false);
    }
    
  };

  return (
    <div className="home-page">

      <div className="our-services mb24">
        <CustomText>{t("ourServices")}</CustomText>
        <CustomText className="title mb40">
          {currentLanguage.isEN ? servicesData?.titleEn : servicesData?.titleVi}
        </CustomText>
        <div className="services">
          {servicesData?.websiteBodyAttachFiles &&
            servicesData?.websiteBodyAttachFiles?.map((item, index: number) => (
              <div className="service" key={index}>
                <div className="service-image">
                  <img src={item.attachFileUrl} alt="" />
                </div>
                <div className="dFlex justifyBetween directionColumn h100 mt28">
                  <div className="content">
                    <CustomText className="bold">{currentLanguage.isVI ? item.titleVi : item.titleEn}</CustomText>
                    <div
                      className="fontM property-descriptions"
                      dangerouslySetInnerHTML={{
                        __html: currentLanguage.isVI ? (item.contentVi ? item.contentVi : "") : (item.contentEn ? item.contentEn : "")
                      }}
                    ></div>
                  </div>
                  <div className="btn">
                    <a href={item.url}
                      className="dFlex itemsCenter"
                      rel="noreferrer"
                    >
                      {t("more")}
                      <ArrowRightAltIcon />
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="services-mobile">
          <Swiper
            spaceBetween={5}
            pagination={true}
            modules={[Pagination]}
            grabCursor={true}
            slidesPerView={1}
            className="services-swiper"
          >
            {servicesData?.websiteBodyAttachFiles &&
              servicesData?.websiteBodyAttachFiles.map((item, index: number) => (
              <SwiperSlide key={index}>
                <div className="service">
                  <img src={item.attachFileUrl} alt="" />
                  <div className="content-container">
                    <div className="content">
                      <CustomText className="bold">{currentLanguage.isVI ? item.titleVi : item.titleEn}</CustomText>
                      <div
                        className="fontM property-descriptions"
                        dangerouslySetInnerHTML={{
                          __html: (currentLanguage.isVI ? item.contentVi : item.contentEn) || ""
                        }}
                      ></div>
                    </div>
                    <div className="btn">
                      <a href={item.url}
                        className="dFlex itemsCenter"
                        rel="noreferrer"
                      >
                        {t("more")}
                        <ArrowRightAltIcon />
                    </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="about">
        {aboutSlide ?
        <>
        {aboutUs && (
          <Slide direction="up" in={aboutSlide} mountOnEnter unmountOnExit timeout={1000}>
            <div className="left">
              <img src={aboutUs.coverImageUrl} alt="" className="left-img" />
              {aboutUs?.websiteBodyContents && aboutUs?.websiteBodyContents.length > 0 && 
              aboutUs?.websiteBodyContents.map((item, index) => (
                <div className="content">
                  <div
                      className="fontM property-descriptions"
                      dangerouslySetInnerHTML={{
                        __html: (currentLanguage.isVI ? item.contentVi
                        : item.contentEn) || ""
                      }}
                  ></div>
                </div>
              ))}
            </div>
          </Slide>
        )}
        {aboutUs?.websiteBodyAttachFiles && aboutUs?.websiteBodyAttachFiles.length > 0 && (
          <Slide direction="left" in={aboutSlide} mountOnEnter unmountOnExit timeout={800}>
            <div className="right">
              <CustomText>{t("aboutUs")}</CustomText>
              <CustomText className="title">
                {currentLanguage.isVI ? aboutUs.titleVi : aboutUs.titleEn}
              </CustomText>

              <div className="dFlex justifyAround mt56">
                {aboutUs?.websiteBodyAttachFiles.map((item, index) => (
                  <Button key={index}
                    onClick={() => {setAboutTab(index)}}
                    variant="contained"
                    className={aboutTab === index ? "deepBlueBtn" : "whiteBtn"}
                  >
                    {currentLanguage.isVI ? item.titleVi : item.titleEn}
                  </Button>
                ))}
              </div>

              <div
                className="fontM property-descriptions"
                dangerouslySetInnerHTML={{
                  __html: (currentLanguage.isVI ? aboutUs?.websiteBodyAttachFiles[aboutTab].contentVi
                  : aboutUs?.websiteBodyAttachFiles[aboutTab].contentEn) || ""
                }}
              ></div>
              <a href={aboutUs?.websiteBodyAttachFiles[aboutTab].url}
                className="dFlex itemsCenter mt12"
                rel="noreferrer"
              >
                {t("readMore")}
                <ArrowRightAltIcon />
              </a>
            </div>
        </Slide>
        )}
        </> : <div style={{height: 2000, width: '100%'}}></div>}
      </div>

      <Slide direction="up" in={priceSlide} mountOnEnter unmountOnExit timeout={800}>
        <div>
        <CustomText className="partner upperCase">
              {t("partner")}
        </CustomText>
        <div className="price mt20">
          <div className="item-container">
            {typicalIndex?.websiteBodyAttachFiles &&
              typicalIndex?.websiteBodyAttachFiles?.map((item, index: number) => (
              <div className="item">
                <div className="logo">
                  <img src={item.attachFileUrl} alt="" />
                </div>
                <CustomText className="white fontL bold">{currentLanguage.isVI ? item.titleVi : item.titleEn}</CustomText>
                <div
                  className="item-name"
                  dangerouslySetInnerHTML={{
                    __html: currentLanguage.isVI ? (item.contentVi ? item.contentVi : "") : (item.contentEn ? item.contentEn : "")
                  }}
                ></div>
              </div>
            ))}
          </div>
          </div>
        </div>
        
      </Slide>
      {!priceSlide && <div style={{height: 2000, width: '100%'}}></div>}        

      <div className="intro">
        <Slide direction="right" in={introRightSlide} mountOnEnter unmountOnExit timeout={800}>
          <div className="left">
            <CustomText className="title">
              {t("aboutUs")}
            </CustomText>
              <div className="content-detail"
                dangerouslySetInnerHTML={{
                  __html:
                  admin?.aboutUsVi && viLanguage
                      ? admin?.aboutUsVi
                      : admin?.aboutUsEn ?? "",
                }}
              ></div>
          </div>
        </Slide>


        <Slide direction="left" in={introRightSlide} mountOnEnter unmountOnExit timeout={800}>
          <div className="right">
            <img src={windowSize.innerWidth < 769 ? Pic24 : Pic20} alt="" className="w100 h100" />
          </div>
        </Slide>
      </div>
      {!introRightSlide && <div style={{height: 2000, width: '100%'}}></div>} 

      <Slide direction="up" in={customerSlide} mountOnEnter unmountOnExit timeout={800}>
        <div className="customer">
          <div className="banner">
            {/* <img src={windowSize.innerWidth < 769 ? CustomerBannerMobile : CustomerBanner} alt="" className="w100 h100" /> */}
            <img src={customerThinking?.coverImageUrl} alt="" className="w100 h100" />
          </div>
          <div className="customer-swiper">
            <Swiper
              spaceBetween={30}
              pagination={true}
              modules={[Pagination, Autoplay]}
              grabCursor={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              className="customer-swiper"
            >
              {customerThinking?.websiteBodyContents && 
                customerThinking?.websiteBodyContents.map((item: any, index: number) => (
                <SwiperSlide key={index}>
                  <div className="items">
                    <CustomText className="fontL bold white mb12">{currentLanguage.isEN ? customerThinking.titleEn : customerThinking.titleVi}</CustomText>
                    <div className="content-detail"
                      dangerouslySetInnerHTML={{
                        __html: (currentLanguage.isEN ? item.contentEn : item.contentVi) || ""
                      }}
                    ></div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </Slide>

      <div className="news">
        <CustomText className="mb12 title bold">{t('news')}</CustomText>
        <CustomText className=" title-secondary">
          {currentLanguage.isEN ? newsInfo?.titleEn : newsInfo?.titleVi}
        </CustomText>
        <div className="news-container">
          {news && news.map((item: NewsDto, index: number) => (
              <div className="item" key={index}>
                <div className="image">
              <img src={item.imageUrl} alt="" />

                </div>
              <div className="dFlex justifyBetween directionColumn h100 pt24">
                <div className="content">
                  <CustomText className="bold deepblue">{viLanguage ? item.title : item.titleEN}</CustomText>
                  <CustomText className="textEllipsis">{viLanguage ? item.descriptions : item.descriptionsEN}</CustomText>
                </div>
                <div className="btn">
                  <Link className="dFlex itemsCenter" to={"/detail/" + item.id} state={'news'}>
                    {t("readMore")}
                    <ArrowRightAltIcon />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="news-container-mobile">
            <Swiper
              spaceBetween={10}
              pagination={true}
              modules={[Pagination]}
              grabCursor={true}
              slidesPerView={1}
              className="news-swiper"
            >
              {news && news.map((item: NewsDto, index: number) => (
                <SwiperSlide key={index}>
                  <div className="item">
                    <img src={item.imageUrl} alt="" />
                    <div className="dFlex directionColumn">
                      <div className="content">
                        <CustomText className="bold deepblue">
                          {viLanguage ? item.title : item.titleEN}
                          </CustomText>
                        <CustomText className="textEllipsis">
                          {viLanguage ? item.descriptions : item.descriptionsEN}
                          </CustomText>
                      </div>
                      <div className="btn">
                        <Link className="dFlex itemsCenter" to={"/detail/" + item.id} state={"news"}>
                          {t("readMore")}
                          <ArrowRightAltIcon />
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
