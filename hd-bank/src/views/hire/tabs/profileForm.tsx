import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { CustomText } from '../../../components/styled-custom';
import LeftTemplate, { LeftPropsType } from '../../component/left-template';
import ChildTemplate from '../../component/template';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { AppRepositories } from '../../../apis/api-repositories';
import { saveAs } from "file-saver";
import { Button } from '@mui/material';

function ProfileForm() {
    const { t } = useTranslation();
    const [data, setData] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
          const res = await AppRepositories.getCommonConfig();
          setData(res);
        }
    
        fetchData();
      }, []);

      const handleDownload = () => {
        
        saveAs(
            data.applyTemplateForm,
            "Apply CV Template"
          );
        }
        

    const left: LeftPropsType = {
        title: 'recruitmentProfile',
        banners: [
            {
                img: 'https://HD AMC.com.vn/images/banners/resized/banner3_1634283868.jpg',
                link: '/'
            },
            {
                img: 'https://HD AMC.com.vn/images/banners/resized/banner2_1634281162.jpg',
                link: '/'
            },
            {
                img: 'https://HD AMC.com.vn/images/banners/resized/banner1_1634281272.jpg',
                link: '/'
            },
        ],
        buttonTitle: [t('profileForm')]
    }

    const RightContent = () => {
        return (
            <div className='profile-right'>
            <CustomText className='fontXL semiBold mb20 dFlex justifyCenter'>{t('profileForm')}</CustomText>
            <CustomText>{t('profileFormGuide')}</CustomText>
            <Button onClick={handleDownload} className='mt40' variant="contained" startIcon={<SystemUpdateAltIcon />} color='error'>{t('profileFormButton')}</Button>
        </div>
        )
    }

    return (
        <div>
            <ChildTemplate childLeft={<LeftTemplate title={left.title} banners={left.banners} buttonTitle ={left.buttonTitle} />} childRight={<RightContent />} />
        </div>
    );
}

export default ProfileForm