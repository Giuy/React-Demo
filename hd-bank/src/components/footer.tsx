import { useTranslation } from "react-i18next";
import { CustomText } from "./styled-custom";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import LogoWhite from "./../assets/images/logo-white.png";
import { useEffect, useState } from "react";
import { CommonConfigDto, SocialNetworkDto } from "../apis/general-client";
import { AppRepositories } from "../apis/api-repositories";
import { currentLanguage } from "../helpers/utils";

function FooterSite() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState<CommonConfigDto>();
  const [socialNetwork, setSocialNetwork] = useState<SocialNetworkDto[]>();

  useEffect(() => {
    async function fetchData() {
      const admin = await AppRepositories.getCommonConfig();
      const socialNetwork = await AppRepositories.getSocialNetwork();
      setAdmin(admin);
      setSocialNetwork(socialNetwork);
    }
    fetchData();
  }, [])

  return (
    <div className="footer">
      <div className="footer-container">
        <div className="contact">
          <CustomText className="title">{t("moreConsult")}</CustomText>
          <Button
            onClick={() => {
              navigate("/contact", { state: "contact" });
            }}
            variant="contained"
          >
            {t("contactNow")}
          </Button>
        </div>
        <div className="info">
          <div className="item1">
            <div className="logo">
              <img src={LogoWhite} alt="Logo" />
            </div>
            <div className="dFlex mb12">
              <CustomText>{t("address")}</CustomText>
              <CustomText>
                : {currentLanguage.isEN 
                ? (admin?.addressEn ? admin?.addressEn : "") 
                : (admin?.addressVi ? admin?.addressVi : "")}{" "}
              </CustomText>
            </div>
            <div className="dFlex mb12">
              <CustomText>{t("hotline")}</CustomText>
              <CustomText>: {admin?.hotLine ? admin?.hotLine : ""}</CustomText>
            </div>
            <div className="dFlex mb12">
              <CustomText>{t("web")}</CustomText>
              <CustomText>: {admin?.websiteUrl ? admin?.websiteUrl : ""}</CustomText>
            </div>
          </div>
          <div className="item2">
            <CustomText className="mb28">{t("aboutUs")}</CustomText>
            <Link to={"/news"} state={"news"} className="fontS">
              {t("news")}
            </Link>
            <Link to={"/about-us"} state={"aboutUs"} className="fontS">
              {t("aboutUs")}
            </Link>
            <Link to={"/"} className="fontS">
              {t("faqs")}
            </Link>
          </div>
          <div className="item3">
            <CustomText className="mb28">{t("contactNow")}</CustomText>
            <div className="dFlex">
              {socialNetwork && socialNetwork.map((item, index) => {
                return (
                  <a key={index}
                    href={item.linkUrl}
                    className="borderNone background-icon"
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    {item.socialNetworkTypeName?.toLowerCase() === 'facebook' 
                      ? <FacebookOutlinedIcon color="inherit" /> 
                      : (item.socialNetworkTypeName?.toLowerCase() === 'instagram' ? <InstagramIcon color="inherit" /> 
                        : (item.socialNetworkTypeName?.toLowerCase() === 'twitter' ? <TwitterIcon color="inherit" /> : <></>))
                    }
                    
                  </a>
                )
              })}
              {/* <Link to={"/"} className="background-icon">
                <FacebookOutlinedIcon color="inherit" />
              </Link>
              <Link to={"/"} className="background-icon">
                <TwitterIcon color="inherit" />
              </Link>
              <Link to={"/"} className="background-icon">
                <InstagramIcon color="inherit" />
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterSite;
