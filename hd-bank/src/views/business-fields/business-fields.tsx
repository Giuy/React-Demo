import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import FooterSite from '../../components/footer';
import HeaderBar from '../../components/header-bar';
import BusinessTab from './tabs/business-tab';
import {ReactComponent  as DebtCollectorIcon} from '../../assets/icons/Thu-hoi-no.svg';
import ExpertiseIcon from '../../assets/icons/tu-van-tham-dinh-tai-san.svg'
import ManageAndExploitIcon from '../../assets/icons/Quan-ly-va-khai-thac-tai-san.svg';
import { IndustryEnum } from '../../apis/general-client';

function BusinessFields() {
    const { t } = useTranslation();
    const [value, setValue] = React.useState<string>('1');
    const location = useLocation();
    const navigate = useNavigate();

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const tab = params.get("tab");

    const handleChange = (event: any, newValue: React.SetStateAction<string>) => {
        setValue(newValue);
        navigate({
            pathname: '/business-fields',
            search: '?tab=' + newValue
        });
    };

    useEffect(() => {
        const state = location.state as React.SetStateAction<any>;
        setValue(state && state.industry ? state.industry : (tab ? tab : "1"));
        localStorage.setItem('navSelected', '3' as unknown as string);
        window.scrollTo(0, 0);
    },[]);

    return (
        <div className='tabs-container'>
            <HeaderBar navFromNavigate='3' typeBanner={3} />
            <TabContext value={value}>
                <TabList onChange={handleChange}>
                    <Tab icon={<DebtCollectorIcon />} label={<div className='tab-labels'>{t('debtRecovery')}</div>} value="1" />
                    <Tab label={<div className='tab-labels'> <img src={ExpertiseIcon} alt="" /> {t('expertiseProperty')}</div>} value="2" />
                    <Tab label={<div className='tab-labels'> <img src={ManageAndExploitIcon} alt="" /> {t('manageAndExploitProperty')}</div>} value="3" />
                </TabList >
                <TabPanel value="1">
                    <div className='tab-1'>
                        {/* DebtRecovery */}
                        <BusinessTab industryType={IndustryEnum.DebtRecovery} /> 
                    </div>
                </TabPanel>
                <TabPanel value="2">
                    <div className='tab-2'>
                        {/* AssetAppraisalconsulting */}
                        <BusinessTab industryType={IndustryEnum.AssetAppraisalconsulting} />
                    </div>
                </TabPanel>
                <TabPanel value="3">
                    <div className='tab-3'>
                        {/* AssetManagementExploitation */}
                        <BusinessTab industryType={IndustryEnum.AssetManagementExploitation} />
                    </div>
                </TabPanel>
            </TabContext>
            <FooterSite />
        </div>
    );
}

export default BusinessFields;