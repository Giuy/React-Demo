import { t } from 'i18next';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { AppRepositories } from '../../../apis/api-repositories';
import { RecruitmentCategoryDto, RecruitmentDto } from '../../../apis/general-client';
import { currentLanguage } from '../../../helpers/utils';
import LeftTemplate, { LeftPropsType } from '../../component/left-template';
import TableCustome from '../../component/table';
import ChildTemplate from '../../component/template';

function JobPosition() {
    const [jobCategory, setJobCategory] = useState<RecruitmentCategoryDto[]>();
    const [jobs, setJobs] = useState<RecruitmentDto[]>([]);
    const lang =  Cookies.get("i18next");
    const isVi = lang === 'vi';
    const [buttons, setButtons] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            let data = await AppRepositories.getJobCategory();
            setJobCategory(data);
            if(data && data[0].id) {
                setButtons(data?.map(v => isVi ? v.categoryNameVi : v.categoryNameEn) as string[],);
                const res = await AppRepositories.getJobByCategory(data[0].id);
                setJobs(res);
            }
        }

        fetchData();
    }, [isVi]);

    const left: LeftPropsType = {
        title: 'jobOpportunity',
        buttonTitle: buttons,
    }

    const RightContent = () => {
        function createData (index: number, position?: string, deadLine?: string, place?: string, id?: string) {
            return {index, position, deadLine, place, id}
        }

        const dataRow = jobs.map((item, index) => createData(index + 1, isVi ? item?.jobTitle : item?.jobTitleEN, item?.expirationDate?.toLocaleDateString('vi-VN'), item.location, item.id));

        return(dataRow.length > 0 ? <div>
            <TableCustome dataRow={dataRow} />
        </div> : <></>)
    }

    const selectCategory = async (value: any) => {
        const category = jobCategory?.find(v => value === (isVi ? v.categoryNameVi : v.categoryNameEn));
        if (category && category.id) {
            const res = await AppRepositories.getJobByCategory(category.id);
            setJobs(res);
        }
    }

    return (
        <div>
            <ChildTemplate childLeft={<LeftTemplate selectCategory={selectCategory} title={left.title} banners={left.banners} buttonTitle ={left.buttonTitle} />} childRight={<RightContent />} />
        </div>
    );
}

export default JobPosition;