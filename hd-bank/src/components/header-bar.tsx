import Logo from './../assets/images/logo.png';
import { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Collapse, IconButton, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import MenuIcon from '@mui/icons-material/Menu';
import { CustomText } from './styled-custom';
import Banner from "../assets/images/home-banner.png";
import BannerMobile from "../assets/images/home-banner-mobile.png";
import BannerBlur from "../assets/images/home-banner-opacity.png";
import VI from '../assets/images/vi-flag.png';
import EN from '../assets/images/en-flag.png';
import { changeLanguage } from '../helpers/utils';
import LogoWhite from './../assets/images/logo-white.png';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import { AppRepositories } from '../apis/api-repositories';
import { BannerDto } from '../apis/general-client';
import Cookies from 'js-cookie';

type contentType = {
  isHome?: boolean,
  content?: string,
  navFromNavigate?: string,
  typeBanner?: number,
}

const defaultBanner: any[] = [
  {
    id: '1',
    imageUrl: Banner,
    bannerType: 1,
    bannerTypeName: '',
    isActived: true,
    order: 1,
    isDeleted: 1,
    created: new Date(),
    lastModified: undefined,
    lastModifiedBy: 'null',
    createdBy: 'null',
  }
]

function HeaderBar(props: contentType) {
    const { t } = useTranslation();
    const [scroll, setScroll] = useState<boolean>(false);
    const [nav, setNav] = useState<string>('1');
    const [isChecked, setIsChecked] = useState(false);
    const [lang, setLang] = useState<string>(Cookies.get("i18next") || "vi");
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const [menuBgOpacity, setMenuBgOpacity] = useState<number>(0);
    const [shadowOpacity, setShadowOpacity] = useState<number>(0);
    const [menuTextColor, setMenuTextColor] = useState<string>('rgba(255, 255, 255, 1');
    const [content, setContent] = useState<any>('')
    const location = useLocation();
    const [typeBanner, setTypeBanner] = useState<number>(1);
    const [banners, setBanners] = useState<BannerDto[]>();

  useEffect(() => {
    let isCancelled = false;
    const state = location.state as React.SetStateAction<string>;
    setContent(state);
    window.addEventListener("scroll", changeLogo);
    const nav = localStorage.getItem('navSelected') || '';
    if (props.navFromNavigate) {
      setNav(props.navFromNavigate);
    } else {
      setNav(nav);
    }
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    };
    handleScroll();

    const fetchData = async () => {
      const banner = await AppRepositories.getBannerByType(Number(props?.navFromNavigate) || Number(nav) || 0);
      if (banner && banner.length > 0) {
        setBanners(banner);
      } else {
        setBanners(defaultBanner);
      }
    }

    if (!isCancelled) {
      fetchData();
  }

    window.addEventListener('resize', handleWindowResize);
    window.addEventListener("scroll", handleScroll, false);
    return () => {
      isCancelled = true;
      window.removeEventListener("scroll", handleScroll, false);
      window.removeEventListener('resize', handleWindowResize);
    }

  }, [props.navFromNavigate]);

    function getWindowSize() {
        const {innerWidth, innerHeight} = window;
        return {innerWidth, innerHeight};
    }

    const handleChangeLanguage = (e: SelectChangeEvent<string>) => {
      const targetValue = e.target.value;
      if (targetValue !== lang) {
        setLang(targetValue);
        changeLanguage(targetValue);
      }
    }  

    const changeLogo = () => {
        const scrollHeight = document.documentElement.scrollTop;
        setScroll(scrollHeight > 0);
    }

    const onSelectNav = (value: string) => {
        localStorage.setItem('navSelected', value as unknown as string);
        setNav(value);
    }

    const onCollapseMenu = () => {
        setIsChecked((prev) => !prev);
    }

    const handleScroll = () => {
      // const position = window.pageYOffset;
      setMenuBgOpacity(1);
      setMenuTextColor('rgba(29, 45, 62, 1');
      setShadowOpacity(0.16);
      // if (position > 255) {
      //   setMenuBgOpacity(1);
      //   setMenuTextColor('rgba(29, 45, 62, 1');
      //   setShadowOpacity(0.16);
      // } else {
      //   const opacity = position / 255;
      //   const shadow = position * (0.16 / 510);
      //   setMenuBgOpacity(opacity);
      //   setMenuTextColor('rgba(255, 255, 255, 1)');
      //   setShadowOpacity(shadow);
      // }
    };

    return (
      <div className="header-bar">
          <div className="navigate" style={{
            backgroundColor: `rgba(255, 255, 255, ${menuBgOpacity})`,
            boxShadow: `0 0 15px 0 rgba(0, 0, 0, ${shadowOpacity})`,
          }}>
            <div className="navigate-container">
            <div className="logo">
              <Link to={"/"}
                onClick={() => {
                  onSelectNav("1");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}>
                {<img src={menuBgOpacity ? Logo : LogoWhite} alt="logo" style={{ width: '176px', height: '80px' }} />}
              </Link>
            </div>
            <div className='dFlex bold'>
            <Link
              to={"/"}
              onClick={() => {
                onSelectNav("1");  
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={nav === "1" ? "selected" : ""}
            >
                <CustomText
                  style={{
                    color: menuTextColor,
                    // borderRight: `1px solid rgba(${menuTextColor})`,
                  }}>

                  {t("homePage")}
                </CustomText>
            </Link>
            <Link
              to={"/about-us"}
              onClick={() => {
                onSelectNav("2");
              }}
              className={nav === "2" ? "selected" : ""}
              state={"aboutUs"}
            >
                <CustomText
                  style={{
                    color: menuTextColor,
                    // borderRight: `1px solid rgba(${menuTextColor})`,
                  }}>
                  {t("aboutUs")}
                </CustomText>
            </Link>
            <Link
              to={"/business-fields"}
              state={[{tab: '1'}, { title: "businessFields"}]}
              onClick={() => {
                onSelectNav("3");
              }}
              className={nav === "3" ? "selected" : ""}
            >
                <CustomText
                  style={{
                    color: menuTextColor,
                  }}>
                  {t("businessFields")}
                </CustomText>
            </Link>
            <Link
              to={"/trading"}
              onClick={() =>{
                 onSelectNav("4");
                }}
              className={nav === "4" ? "selected" : ""}
              state={"tradingFloor"}
            >
                <CustomText
                  style={{
                    color: menuTextColor,
                    // borderRight: `1px solid rgba(${menuTextColor})`,
                  }}>
                  {t("tradingFloor")}
                </CustomText>
            </Link>
            <Link
              to={"/news"}
              onClick={() => {
                onSelectNav("5");
              }}
              className={nav === "5" ? "selected" : ""}
            >
                <CustomText
                  style={{
                    color: menuTextColor,
                    // borderRight: `1px solid rgba(${menuTextColor})`,
                  }}>
                  {t("news")}
                </CustomText>
            </Link>
            <Link
              to={"/hire"}
              onClick={() => {
                onSelectNav("6");
              }}
              className={nav === "6" ? "selected" : ""}
              state={"recruit"}
            >
                <CustomText
                  style={{
                    color: menuTextColor,
                    // borderRight: `1px solid rgba(${menuTextColor})`,
                  }}>
                  {t("recruit")}
                </CustomText>
            </Link>
            <Link
              to={"/contact"}
              onClick={() => {
                onSelectNav("7");
              }}
              className={nav === "7" ? "selected" : ""}
              state={"contact"}
            >
                <CustomText
                  style={{
                    color: menuTextColor,
                    // borderRight: `1px solid rgba(${menuTextColor})`,
                  }}>
                  {t("contact")}
                </CustomText>
            </Link>

            </div>
            <Select
              className="language-select"
              value={lang}
              onChange={handleChangeLanguage}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="vi">
                <div className="flag-icon">
                  <img src={VI} alt="VI Flag" className="w100 h100" />
                </div>
              </MenuItem>
              <MenuItem value="en">
                <div className="flag-icon">
                  <img src={EN} alt="VI Flag" className="w100 h100" />
                </div>
              </MenuItem>
            </Select>
            </div>
          </div>
          <div className="navigate-mobile">
            <div className="logo">
              <Link to={"/"} onClick={() => {onSelectNav("1"); window.scrollTo({ top: 0, behavior: "smooth" });}}>
              <img src={Logo} alt="logo" style={{width: '176px', height: '60px'}} />
              </Link>
            </div>

            <div className="menu">
              <Select
                className="language-select"
                value={lang}
                onChange={handleChangeLanguage}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="vi">
                  <div className="flag-icon">
                    <img src={VI} alt="VI Flag" className="w100 h100" />
                  </div>
                </MenuItem>
                <MenuItem value="en">
                  <div className="flag-icon">
                    <img src={EN} alt="VI Flag" className="w100 h100" />
                  </div>
                </MenuItem>
              </Select>
              <IconButton aria-label="menu" onClick={onCollapseMenu}>{isChecked ? <ClearIcon /> : <MenuIcon />}</IconButton >
              <Collapse in={isChecked} orientation="horizontal" className='nav-mobile' timeout={300}>
                <div className='nav'>
                  <Link to={"/about-us"} state={"aboutUs"} onClick={() => onSelectNav('2')} className={nav === '2' ? 'selected' : ''}>{t('aboutUs')}</Link>
                  <Link to={"/business-fields"} state={[{tab: '1'}, { title: "businessFields"}]} onClick={() => onSelectNav('3')} className={nav === '3' ? 'selected' : ''}>{t('businessFields')}</Link>
                  <Link to={"/trading"} state={"tradingFloor"} onClick={() => onSelectNav('4')} className={nav === '4' ? 'selected' : ''}>{t('tradingFloor')}</Link>
                  <Link to={"/news"} state={"news"} onClick={() => onSelectNav('5')} className={nav === '5' ? 'selected' : ''}>{t('news')}</Link>
                  <Link to={"/hire"} state={"recruit"} onClick={() => onSelectNav('6')} className={nav === '6' ? 'selected' : ''}>{t('recruit')}</Link>
                  <Link to={"/contact"} state={"contact"} onClick={() => onSelectNav('7')} className={nav === '7' ? 'selected' : ''}>{t('contact')}</Link>
                </div>
              </Collapse>
            </div>

          </div>
        <div className="banner">

          <div className="background">
            <div className="not-blur">
              <Swiper
                spaceBetween={0}
                pagination={true}
                modules={[Pagination, Autoplay]}
                grabCursor={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                slidesPerView={1}
                className="home-banner-swiper"
              >
                {banners && banners.map((item: BannerDto, index: number) => (
                  <SwiperSlide key={index}>
                  <img src={item.imageUrl} alt="banner" className="w100 h100" />
                  </SwiperSlide>
                ))}
              </Swiper>
              
            </div>
            <div className="blur">
              <img src={BannerBlur} alt="Banner-blur" className="w100 h100" />
            </div>
          </div>
        </div>
      </div>
    );
}

export default HeaderBar