import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';
import { CustomText } from '../../components/styled-custom';
import StyledVariables from '../../helpers/materials/_variables';
import { AppRepositories } from '../../apis/api-repositories';
import { BannerDto } from '../../apis/general-client';
import { Button } from '@mui/material';

type BannerType = {
    img: string,
    link?: string
}

export type LeftPropsType = {
    title?: string,
    buttonTitle?: string[],
    banners?: BannerType[],
    selectCategory?: (e: any) => void,
}

function LeftTemplate(props: LeftPropsType) {
    const { t } = useTranslation();
    const { title, buttonTitle } = props;
    const [selected, setSelected] = useState<string>('');
    const [banners, setBanners] = useState<BannerDto[]>();

    useEffect(() => {
        let isCancelled = false;
        const fetchData = async () => {
            const banner = await AppRepositories.getBannerByType(8);
            setBanners(banner);

            if (buttonTitle) {
                setSelected(buttonTitle[0]);
            }
        };
        if (!isCancelled) {
            fetchData();
        }
            
        return () => {
            isCancelled = true;
          };
    }, [buttonTitle])

    const handleSelected = (value: any) => {
        setSelected(value); 
        if (props.selectCategory) {
            props.selectCategory(value)
        }
    }

    return (
        <div className='left-content'>
            {title &&
                <div className='verticalCenter title'>
                    <CustomText className='semiBold blue' color={StyledVariables.colors.blue200}>{t(title)}</CustomText>
                </div>
            }
            {buttonTitle && buttonTitle.length > 0 &&
                <div className='dFlex directionColumn pb40 nav-left'>
                    {buttonTitle.map((item, index) => (
                        <Button
                            onClick={() => handleSelected(item)}
                            key={index}
                            className={item === selected ? 'mt12 pt12 pb12 justifyBetween selected' : 'mt12 pt12 pb12 justifyBetween'}
                            variant="contained"
                            color='inherit'
                            endIcon={<NavigateNextIcon />
                            }>
                            {item}
                        </Button>
                    ))}
                </div>
            }

            <div className='left-banner'>
                {banners && banners.map((item: BannerDto, index: number) => (
                   <img src={item.imageUrl} alt="" className='w100' key={index} />
                ))}
            </div>
        </div>
    );
}

export default LeftTemplate;