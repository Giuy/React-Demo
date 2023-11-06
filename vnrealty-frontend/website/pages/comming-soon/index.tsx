import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import DefaultLayout from "../../components/layouts/defaultLayout";
import SEO from "../../components/SEO/seo";
import DevelopIcon from "../../assets/images/icons/develop-icon.png";
import { useTranslation } from "react-i18next";

type CommingSoonPageProps = {};

const CommingSoonPage: NextPage<CommingSoonPageProps> = () => {
  const { t } = useTranslation();

  return (
    <DefaultLayout headerProps={{ isHideBanner: true }}>
      <SEO seo={{ metaTitle: "Comming Soon" }}></SEO>
      <div className="comming-soon-container">
        <div className="container">
          <div className="card">
            <div className="image">
              <Image src={DevelopIcon} alt="Developing" />
            </div>
            <div className="title">{t("commingSoon")}</div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CommingSoonPage;
