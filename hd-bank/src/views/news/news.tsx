import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AppRepositories } from '../../apis/api-repositories';
import { NewsCategoryDto } from '../../apis/general-client';
import FooterSite from '../../components/footer';
import HeaderBar from '../../components/header-bar';
import Imprint from './tabs/imprint';
import ImprintIcon from '../../assets/icons/tin-noi-bat.svg';
import ActivitiesIcon from '../../assets/icons/Cong-dong.svg'
import CoporationNewsIcon from '../../assets/icons/Tin-tap-doan-HDAMC.svg'
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import { currentLanguage } from '../../helpers/utils';

function News() {
    const { t } = useTranslation();
    const [value, setValue] = React.useState('');
    const [category, setcategory] = React.useState<NewsCategoryDto[]>();
    const lang =  Cookies.get("i18next");
    const isVi = lang === 'vi';
    const location = useLocation() as any;
    
    const handleChange = (event: any, newValue: React.SetStateAction<string>) => {
        setValue(newValue);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            const res = await AppRepositories.getNewsCategory();
            if (res && res[0].id && (!location.state || location.state === 'news')) {
              setValue(res[0].id);
            }
            let temp = res.filter(v => v.isActived).slice(0, 3);
            setcategory(temp);
            if (location.state && location.state !== '' && location.state !== 'news') {
                setValue(location.state);
            }
        }

        fetchData();
    },[]);

    return (value && (category && (category.length > 0 && category[0].id) && (category[1].id && category[2].id)) ? <div className='tabs-container'>
            <HeaderBar navFromNavigate='5' typeBanner={5} />
            <TabContext value={value}>
                <TabList onChange={handleChange}>
                    {category && category.map((item, index) => (
                        <Tab label={<div className='tab-labels'> <img src={item.iconImage} alt="" />
                            {currentLanguage.isEN 
                            ? (item.categoryNameEN ? item.categoryNameEN : "") 
                            : (item.categoryName ? item.categoryName : "")}</div>} value={item?.id} />
                    ))}
                </TabList >
                {category && category.map((item, index) => (
                    <TabPanel value={item.id || ""}>
                        <div className='tab-1'>
                            <Imprint id={item?.id} />
                        </div>
                    </TabPanel>
                ))}
                {/* <TabList onChange={handleChange}>
                    <Tab label={<div className='tab-labels'> <img src={ImprintIcon} alt="" /> {isVi ? category[0].categoryName : category[0].categoryNameEN}</div>} value={category[0].id} />
                    <Tab label={<div className='tab-labels'> <img src={ActivitiesIcon} alt="" /> {isVi ? category[1].categoryName : category[1].categoryNameEN}</div>} value={category[1].id} />
                    <Tab label={<div className='tab-labels'> <img src={CoporationNewsIcon} alt="" /> {isVi ? category[2].categoryName : category[2].categoryNameEN}</div>} value={category[2].id} />
                </TabList >
                <TabPanel value={category[0].id}>
                    <div className='tab-1'>
                        <Imprint id={category && category[0]?.id ? category[0]?.id : ''} />
                    </div>
                </TabPanel>
                <TabPanel value={category[1].id}>
                    <div className='tab-2'>
                        <Imprint id={category && category[1]?.id ? category[1]?.id : ''} />
                    </div>
                </TabPanel>
                <TabPanel value={category[2].id}>
                    <div className='tab-3'>
                        <Imprint id={category && category[2]?.id ? category[2]?.id : ''} />
                    </div>
                </TabPanel> */}
            </TabContext>
            <FooterSite />
        </div> : <></>
    );
}

export default News