import Cookies from 'js-cookie';
import React from 'react';
import { Link } from 'react-router-dom';
import { CustomText } from '../../components/styled-custom';
import { IItemData } from './list';

type IDataGrid = {
    data: IItemData[] | undefined;
}

function GridItems(props: any) {
    const { data, isActivities } = props;
    const lang = Cookies.get("i18next");
    const isVi = lang === 'vi';
    return (
        <div className='grid-items-container'>
            {!isActivities && data && data.map((item: any, index: number) => (
                <div key={index}>
                    <div className='item-img'>
                        <img src={item?.img ? item?.img : ''} alt={item?.name && isVi ? item?.name : ''} />
                    </div>
                    <div className='item-content'>
                        <CustomText className='semiBold'>{item?.name ? item?.name : ''}</CustomText>
                    </div>
                </div>
            ))}
            {isActivities && data && data.map((item: any, index: number) => (
                <Link to={"/detail/" + item.id} state={'activities'} className='dFlex ' key={index}>

                <div key={index} className="dFlex directionColumn">
                    <div className='item-img'>
                        <img src={item?.coverImage ? item?.coverImage : ''} alt={item?.titleVi && isVi ? item?.titleVi : item?.titleEn} />
                    </div>
                    <div className='item-content'>
                        <CustomText className='semiBold'>{item?.titleVi && isVi ? item?.titleVi : item?.titleEn}</CustomText>
                    </div>
                </div>
                </Link>
            ))}
        </div>
    );
}

export default GridItems;