import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CustomText } from '../../components/styled-custom';
import moment from 'moment';
import { NewsDto } from '../../apis/general-client';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Stack, Pagination } from '@mui/material';

export type IItemData = {
    img?: string;
    name?: string;
    description?: string;
    date?: Date;
}

type IDataList = {
    data: NewsDto[] | undefined;
}

function ListItems(props: any) {
    const {data, isActivities} = props;
    const lang = Cookies.get("i18next");
    const isVi = lang === 'vi';
    const [page, setPage] = useState(1);
    const handleChange = (event: any, value: any) => {
      setPage(value);
    };
    return (
        <>
            {!isActivities && data && data.slice((page - 1) * 5, (page - 1) * 5 + 5).map((item:any, index:number) => (
                <Link to={"/detail/" + item.id} state={'news'} className='list-items-container' key={index}>
                    <div className='item-img'>
                        <img src={item?.imageUrl ? item?.imageUrl : ''} alt={item?.imageName ? item?.imageName : ''} className="w100"/>
                    </div>
                    <div className='item-content '>
                        <CustomText className='semiBold'>{item?.title && isVi ? item?.title : item?.titleEN}</CustomText>
                        <CustomText className='textEllipsis description'>{item?.descriptions && isVi ? item?.descriptions : item?.descriptionsEN}</CustomText>
                        <CustomText>{item?.created ? moment(item?.created).format('DD-MM-YYYY HH:mm') : ''}</CustomText>
                    </div>
                </Link>
            ))
            }
            {isActivities && data && data.slice((page - 1) * 5, (page - 1) * 5 + 5).map((item:any, index:number) => (
                <Link to={"/detail/" + item.id} state={{type: 'activities', industry: props.industry}} className='list-items-container' key={index}>
                    <div className='item-img'>
                        <img src={item?.coverImage ? item?.coverImage : ''} alt={item?.coverImage ? item?.coverImage : ''} className="w100"/>
                    </div>
                    <div className='item-content '>
                        <CustomText className='semiBold'>{item?.titleVi && isVi ? item?.titleVi : item?.titleEn}</CustomText>
                        <CustomText className='textEllipsis description'>{item?.descriptionsVi && isVi ? item?.descriptionsVi : item?.descriptionsEn}</CustomText>
                        <CustomText>{item?.created ? moment(item?.created).format('DD-MM-YYYY HH:mm') : ''}</CustomText>
                    </div>
                </Link>
            ))
            }
            {data && data.length > 0 &&
                <div className="pagination">
                    <Stack spacing={2}>
                        <Pagination count={Math.ceil(data?.length ? data?.length / 5 : 1)} page={page} onChange={handleChange} />
                    </Stack>
                </div>}
        </>
    );
}

export default ListItems;