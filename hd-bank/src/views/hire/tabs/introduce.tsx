import { Trans, useTranslation } from 'react-i18next';
import { CustomText } from '../../../components/styled-custom';
import ChildTemplate from '../../component/template';
import LeftTemplate, { LeftPropsType } from '../../component/left-template';
import { useEffect, useState } from 'react';
import { AppRepositories } from '../../../apis/api-repositories';
import { CommonConfigDto } from '../../../apis/general-client';
import Cookies from 'js-cookie';

function Introduce() {
    const { t } = useTranslation();
    const [admin, setAdmin] = useState<CommonConfigDto>();
    const currentLanguageCode = Cookies.get("i18next") || "vi";
    const viLanguage = currentLanguageCode === 'vi';

    useEffect(() => {
        const fetchData = async () => {
            const admin = await AppRepositories.getCommonConfig();
            setAdmin(admin);
        };
        fetchData();
    }, []);
    
    const RightContent = () => {
        return (
            <div className='introduce-right'>

            <div className="content-detail"
                dangerouslySetInnerHTML={{
                  __html:
                  admin?.hrPoliciesVi && viLanguage
                      ? admin?.hrPoliciesVi
                      : admin?.hrPoliciesEn ?? "",
                }}
              ></div>
        </div>
        )
    }

    const left: LeftPropsType = {
        title: 'generalIntroduction',
        buttonTitle: [t('policy')]
    }

    return (
        <div>
            <ChildTemplate childLeft={<LeftTemplate title={left.title} banners={left.banners} buttonTitle ={left.buttonTitle} />} childRight={<RightContent />} />
        </div>
    );
}

export default Introduce;