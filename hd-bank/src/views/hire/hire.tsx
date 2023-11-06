import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import FooterSite from '../../components/footer';
import HeaderBar from '../../components/header-bar';
import Introduce from './tabs/introduce';
import JobPosition from './tabs/job-position';
import ProfileForm from './tabs/profileForm';
import GeneralIcon from '../../assets/icons/Thong-tin-chung.svg';
import JobPositionIcon from '../../assets/icons/co-hoi-nghe-nghiep.svg';
import ProfileFormIcon from '../../assets/icons/ho-so-tuyen-dung.svg'
import { useLocation } from 'react-router-dom';

function Hire() {
    const { t } = useTranslation();
    const [value, setValue] = React.useState('1');
    const location = useLocation() as any;

    const handleChange = (event: any, newValue: React.SetStateAction<string>) => {
        setValue(newValue);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        if (location.state === '2') {
            setValue(location.state);
        }
    },[]);

    return (
        <div className='tabs-container'>
            <HeaderBar navFromNavigate='6' typeBanner={6} />
            <TabContext value={value}>
                <TabList onChange={handleChange}>
                    <Tab label={<div className='tab-labels'> <img src={GeneralIcon} /> {t('generalIntroduction')}</div>} value="1" />
                    <Tab label={<div className='tab-labels'> <img src={JobPositionIcon} /> {t('jobOpportunity')}</div>} value="2" />
                    <Tab label={<div className='tab-labels'> <img src={ProfileFormIcon} /> {t('recruitmentProfile')}</div>} value="3" />
                </TabList >
                <TabPanel value="1">
                    <div className='tab-1'>
                        <Introduce />
                    </div>
                </TabPanel>
                <TabPanel value="2">
                    <div className='tab-2'>
                        <JobPosition />
                    </div>
                </TabPanel>
                <TabPanel value="3">
                    <div className='tab-3'>
                        <ProfileForm />
                    </div>
                </TabPanel>
            </TabContext>
            <FooterSite />
        </div>
    );
}

export default Hire