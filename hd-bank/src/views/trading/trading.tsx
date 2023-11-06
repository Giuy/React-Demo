import { TabContext, TabList, TabPanel } from "@mui/lab";
import { t } from "i18next";
import React, { useEffect } from "react";
import FooterSite from "../../components/footer";
import HeaderBar from "../../components/header-bar";
import TradingTabs from "./tabs/tradingTabs";
import TradingTabsIcon from '../../assets/icons/trading.svg'
import { Tab } from "@mui/material";

function Trading() {
    const [value, setValue] = React.useState<string>('1');
    
    useEffect(() => {
        window.scrollTo(0, 0);
        localStorage.setItem('navSelected', '4' as unknown as string);

    },[]);

    const handleChange = (event: any, newValue: React.SetStateAction<string>) => {
        setValue(newValue);
    };
    
    return (
        <div className='tabs-container'>
        <HeaderBar navFromNavigate="4" typeBanner={4} />
        <TabContext value={value}>
            <TabList onChange={handleChange}>
                <Tab label={<div className='tab-labels'> <img src={TradingTabsIcon} alt="trading" /> {t('tradingFloor')}</div>} value="1" />
            </TabList >
            <TabPanel value="1">
                <div className='tab-1'>
                    <TradingTabs />
                </div>
            </TabPanel>
        </TabContext>
        <FooterSite />
    </div>
     )
}

export default Trading