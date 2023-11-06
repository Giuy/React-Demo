import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Button, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import { CustomText } from '../../components/styled-custom';
import { Trans, useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Pagination, FreeMode } from "swiper";
import HeaderBar from '../../components/header-bar';
import FooterSite from '../../components/footer';
import AboutUsBanner from '../../assets/images/about-us.png';
import Polygon from '../../assets/images/polygon.svg';
import Cup from '../../assets/images/cup.svg';
import System from '../../assets/images/system.png';
import { AppRepositories } from '../../apis/api-repositories';
import { PrizeDto, WebsiteBodyMasterDto, WebsiteBodyTypesEnum } from '../../apis/general-client';
import Cookies from 'js-cookie';
import {ReactComponent as GeneralIcon} from '../../assets/icons/Thong-tin-chung.svg';
import {ReactComponent as SystemIcon} from '../../assets/icons/Co-cau-to-chuc.svg'
import { currentLanguage } from '../../helpers/utils';

function AboutUs() {
    const { t } = useTranslation();
    const carouselRef = useRef<HTMLDivElement>(null);
    const [developmentHistory, setDevelopmentHistory] = useState<WebsiteBodyMasterDto>();
    const [value, setValue] = React.useState('1');
    const [historyItemSwiper, setHistoryItemSwiper] = React.useState<number>(4);
    const [priceItemSwiper, setPriceItemSwiper] = React.useState<number>(3);
    const [leaderMap, setLeaderMap] = React.useState<number>(1);
    const [prize, setPrize] = React.useState<PrizeDto[]>();
    const currentLanguageCode = Cookies.get("i18next") || "vi";
    const viLanguage = currentLanguageCode === 'vi';

    const handleChange = (event: any, newValue: React.SetStateAction<string>) => {
        setValue(newValue);
    };

    const handleChangeItemSwiper = () => {
        if (carouselRef?.current?.offsetWidth! <= 426) {
            setHistoryItemSwiper(1.5);
            setPriceItemSwiper(1);
        }
    }

    useEffect(() => {
        async function getWebsiteBody() {
            const historyResponse = await AppRepositories.getWebsiteBodyByType(WebsiteBodyTypesEnum.DevelopmentHistory);
            setDevelopmentHistory(historyResponse);
        }
        getWebsiteBody(); 

        const fetchData = async () => {
            const prize = await AppRepositories.getPrize();
            setPrize(prize)
        };
        fetchData();
    }, []);

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        window.addEventListener("resize", handleChangeItemSwiper);
        handleChangeItemSwiper();
        return window.removeEventListener("resize", handleChangeItemSwiper);
    }, []);

    const handleChangeLeaderMap = (value: number) => {
        setLeaderMap(value);
    }

    return (
        <>
        <div className='about-us' ref={carouselRef}>
        <HeaderBar navFromNavigate='2' typeBanner={2} />
            <TabContext value={value}>
                <TabList onChange={handleChange}>
                    <Tab icon={<GeneralIcon />} label={t('generalIntroductionLabel')} value="1" />
                    <Tab icon={<SystemIcon />} label={t('leadersLabel')} value="2" />
                </TabList >
                <TabPanel value="1">
                    <div className='tab-1'>
                        <div className='introduce'>
                            <div className='introduce-content'>
                                <CustomText>{t('aboutUs')}</CustomText>
                                <div className='w100 dFlex justifyCenter'>
                                    <img src={AboutUsBanner} alt="leader" className='' />
                                </div>
                            </div>
                        </div>
                        <div className='history'>
                            <CustomText className='title-history'>{currentLanguage.isVI ? 
                                developmentHistory?.titleVi : developmentHistory?.titleEn}</CustomText>
                            <div className='history-swiper'>
                                <Swiper
                                    slidesPerView={historyItemSwiper}
                                    spaceBetween={30}
                                    freeMode={true}
                                    modules={[FreeMode]}
                                    grabCursor={true}
                                    className="mySwiper"
                                >
                                    {developmentHistory?.websiteBodyAttachFiles && 
                                        developmentHistory?.websiteBodyAttachFiles.map((item, index) => {
                                        const upItem = (index % 2 === 0) ? true : false;
                                        return (upItem ? 
                                            <SwiperSlide >
                                                <div className='milestone'>
                                                    <div className='title title-top'>{currentLanguage.isEN ? item.titleEn : item.titleVi}
                                                    <div className='polygon-top-left'><img src={Polygon} alt="polygon" /></div>
                                                    <span></span>
                                                    <div className='polygon-top-right'><img src={Polygon} alt="polygon" /></div>
                                                    </div>
                                                    <div className='summary pt20'
                                                        dangerouslySetInnerHTML={{
                                                            __html: (currentLanguage.isVI ? item.contentVi
                                                            : item.contentEn) || ""
                                                        }}></div>
                                                    <div className='empty'></div>
                                                </div>
                                            </SwiperSlide> : 
                                            <SwiperSlide >
                                                <div className='milestone'>
                                                    <div className='empty'></div>
                                                    <div className='summary pb20'
                                                        dangerouslySetInnerHTML={{
                                                            __html: (currentLanguage.isVI ? item.contentVi
                                                            : item.contentEn) || ""
                                                        }}></div>
                                                    <div className='title title-bottom'>{currentLanguage.isEN ? item.titleEn : item.titleVi}                                           
                                                        <div className='polygon-bottom-left'><img src={Polygon} alt="polygon" /></div>
                                                        <span></span>
                                                        <div className='polygon-bottom-right'><img src={Polygon} alt="polygon" /></div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>
                            </div>

                        </div>
                        <div className='price'>
                            <CustomText className='title-price'>{t('priceAndAchievement')}</CustomText>
                            <div className='price-swiper'>
                                <Swiper
                                    slidesPerView={priceItemSwiper}
                                    spaceBetween={30}
                                    modules={[Pagination]}
                                    grabCursor={true}
                                    pagination={{
                                        dynamicBullets: true,
                                    }}
                                    className="mySwiper"
                                >
                                    {prize && prize.map((item: PrizeDto, index: number) =>(
                                        <SwiperSlide key={index}>
                                        <div className='price-items'>
                                            <div className='price-item-img'>
                                                <img src={Cup} alt="cup" />
                                            </div>
                                            <CustomText className='deepblue'>{item?.prizeNameVi && viLanguage? item?.prizeNameVi : item?.prizeNameEn ?? ""}</CustomText>
                                        </div>
                                    </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value="2">
  
                    <div className='tab-2'>
                    <CustomText className='title'>
                        {t('hdAMC')}
                    </CustomText>
                    <img src={System} alt="system" />
                    </div>
                </TabPanel>
            </TabContext>
            <FooterSite />
        </div>
        </>

    );
}

export default AboutUs;