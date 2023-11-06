import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import DefaultLayout from "../../components/layouts/defaultLayout";
import TenantBackground3 from "../../assets/images/sample/tenant-background-3.png";
import { useTranslation } from "react-i18next";
import SEO from "../../components/SEO/seo";
import { WebsiteServices } from "../api/services/website.services";
import { ROUTES } from "../../constants/routes";

type TenantPortalPageProps = {
  tenantPortalInfo?: any;
  linkPortal?:any;
};

export const getServerSideProps: GetServerSideProps<
  TenantPortalPageProps
> = async () => {
  const tenantPortalInfo = await WebsiteServices.getTenantPortalInfo();
  const linkPortal = await WebsiteServices.getLinkPortal();
  return {
    props: {
      tenantPortalInfo,
      linkPortal
    },
  };
};

const TenantPortalPage: NextPage<TenantPortalPageProps> = ({
  tenantPortalInfo,linkPortal
}) => {
  
  const { t } = useTranslation();
  const [banners, setBanners] = useState<any[]>([
    tenantPortalInfo?.data?.backgroundImage?.fileUrl,
  ]);
  const [pageInfo, setPageInfo] = useState<any>({
    data: {
      welcomeTitle: tenantPortalInfo?.data?.title,
      welcomeSubtitle: tenantPortalInfo?.data?.descriptions,
    },
  });
  const [link,setLinkPortal]=useState<any>(linkPortal)

  const onGotoPortal = () => {
    window.location.assign(link);
    // console.log(link);
    
  };

  return (
    <DefaultLayout
      headerProps={{ banners, isHidePageTitle: true, homeInfo: pageInfo }}
    >
      <SEO
        seo={{
          metaTitle: "Tenant Portal",
        }}
      />
      <div className="tenant-portal-container">
        <div className="container">
          <div className="section">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="image">
                  <Image
                    src={tenantPortalInfo?.data?.panel1Image?.fileUrl}
                    alt=""
                    layout="fill"
                  />
                </div>
              </div>
              <div className="col-12 col-md-6 m-auto">
                <div className="descriptions mt8 mb8">
                  <p className="line-title">{t("tenantPortal")}</p>
                  <p className="main-title mt8">
                    {t("alreadyHaveTenantAccount")}
                  </p>
                  <div
                    className="content mt20"
                    dangerouslySetInnerHTML={{
                      __html: tenantPortalInfo?.data?.panel1Descriptions
                        ? tenantPortalInfo?.data?.panel1Descriptions
                        : "",
                    }}
                  ></div>
                  <button
                    className="form-control mt20"
                    onClick={onGotoPortal}
                  >
                    {t("tenantPortal")}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="row">
              <div className="col-12 col-md-6 m-auto">
                <div className="descriptions mt8 mb8">
                  <p className="line-title">{t("tenantPortal")}</p>
                  <p className="main-title mt8">{t("dontHaveAnAccount")}</p>
                  <div
                    className="content mt20"
                    dangerouslySetInnerHTML={{
                      __html: tenantPortalInfo?.data?.panel2Descriptions
                        ? tenantPortalInfo?.data?.panel2Descriptions
                        : "",
                    }}
                  ></div>
                  <button
                    className="form-control mt20"
                    onClick={onGotoPortal}
                  >
                    {t("rentalApplication")}
                  </button>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="image">
                  <Image
                    src={tenantPortalInfo?.data?.panel2Image?.fileUrl}
                    alt=""
                    layout="fill"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="section">
            <div
              className="request-maintenance"
              style={{
                backgroundImage: `linear-gradient(
                  #4a4a4a9c, #00000094
                ), url(${TenantBackground3.src})`,
              }}
            >
              <div className="">
                <p className="title">{t("requestMaintenance")}</p>
                <div
                  className="content"
                  dangerouslySetInnerHTML={{
                    __html: tenantPortalInfo?.data
                      ?.maintenanceRequestDescriptions
                      ? tenantPortalInfo?.data?.maintenanceRequestDescriptions
                      : "",
                  }}
                ></div>
                <button
                  className="form-control mt28"
                  onClick={onGotoPortal}
                >
                  {t("sendRequest")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default TenantPortalPage;
