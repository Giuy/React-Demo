import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import logoIcon from "../../assets/images/logo.png";
import { ROUTES } from "../../constants/routes";
import { SocialNetworkDto } from "../../pages/api/general-client";
import { SocialNetworkServices } from "../../pages/api/services/social-network.services";
import { WebsiteServices } from "../../pages/api/services/website.services";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const [footerInfo, setFooterInfo] = useState<any>({});
  const [socialNetworks, setSocialNetworks] = useState<SocialNetworkDto[]>();
  const [logo, setLogo] = useState<any>();

  useEffect(() => {
    getLogo();
    getFooterInfo();
    getSocialNetworks();
  }, []);

  const getFooterInfo = async () => {
    const res = await WebsiteServices.getFooterInfo();
    setFooterInfo(res);
  };

  const getSocialNetworks = async () => {
    const res = await SocialNetworkServices.getSocialNetworks();
    setSocialNetworks(res);
  };

  const getLogo = async () => {
    const res = await WebsiteServices.getHomeInfo();
    if (res) {
      setLogo(res.data?.logo?.fileUrl);
    }
  };

  return (
    <div className="footer-container">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4">
            {logo && (
              <div
                className="logo"
                onClick={() => window.location.assign(ROUTES.HOME || "/")}
              >
                <Image src={logo} alt="VN Realty" layout="fill" />
              </div>
            )}
            {footerInfo && <p className="mt32">{footerInfo?.data?.slogan}</p>}
            <hr />
          </div>
          <div className="col-12 col-md-4 offset-md-4">
            <h5 className="uppercase">{t("connectSocially")}</h5>
            <div className="row mt-5">
              <div className="col-12">
                <div className="d-flex align-items-center">
                  {socialNetworks &&
                    socialNetworks.map((item, index) => (
                      <div key={index} className="mb20 mr12">
                        <div className="social-network">
                          <div className="icon">
                            <a
                              href={item.linkUrl}
                              target={"_blank"}
                              rel="noreferrer"
                            >
                              <Image
                                src={item.imageUrl || ""}
                                alt={item.linkUrl}
                                layout="fill"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt20">
          <p className="fontS italic">
            Copyrights © 2022 Grex Solutions: Real Estate
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
