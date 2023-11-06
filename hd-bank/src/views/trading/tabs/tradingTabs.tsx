import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AppRepositories } from "../../../apis/api-repositories";
import { ActivityCategoryDto, ActivityDto, IndustryEnum } from "../../../apis/general-client";
import { CustomText } from "../../../components/styled-custom";
import GridItems from "../../component/grid";
import LeftTemplate, { LeftPropsType } from "../../component/left-template";
import ListItems from "../../component/list";
import ChildTemplate from "../../component/template";

function TradingTabs() {
    const { t } = useTranslation();
    const [category, setCategory] = useState<ActivityCategoryDto[]>();
    const [activities, setActivities] = useState<ActivityDto[]>();
    const lang = Cookies.get("i18next");
    const isVi = lang === 'vi';
    const [title, setTitle] =useState<string | undefined>('');
    const [buttons, setButtons] = useState<any>();

    useEffect(() => {
        async function getData() {
            const res = await AppRepositories.getActivityCategoriesByIndustry(IndustryEnum.DebtAndAssetconsulting);
            setCategory(res);
            if (res && res[0].id && res[0].categoryName) {
                setButtons(res?.map(v => isVi ? v.categoryName : v.categoryNameEN) as string[]);
                const resActivities = await AppRepositories.getActivitiesByCategory(res[0].id);
                setActivities(resActivities);
                setTitle(isVi ? res[0].categoryName : res[0].categoryNameEN);
            }
        };
        getData();
    }, [isVi]);

    const selectCategory = async (value: any) => {
        const categorySelected = category?.find(v => value === (isVi ? v.categoryName : v.categoryNameEN));
        if (categorySelected && categorySelected.id) {
            const res = await AppRepositories.getActivitiesByCategory(categorySelected.id);
            setActivities(res);
            setTitle(value);
        }
    }

    function RightContent() {
    
        return(
            <div className='manage-right'>
                <CustomText className='fontXL semiBold mb20 upperCase deepblue'>{title}</CustomText>
                <ListItems data={activities} isActivities={true} industry={4} />
            </div>
        )
    }
    const left: LeftPropsType = {
        title: 'companyProperty',
        buttonTitle: buttons,
    }
    return (
        <div>
             <ChildTemplate childLeft={<LeftTemplate selectCategory={selectCategory} title={left.title} banners={left.banners} buttonTitle ={left.buttonTitle} />} childRight={<RightContent />} />
        </div>
    );
}

export default TradingTabs