import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import DefaultLayout from "../../components/layouts/defaultLayout";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";

import whatWeDoImage from "../../assets/images/sample/what-we-do-backgroud.jpg";
import AboutUsBanner from "../../assets/images/sample/banner/about-us-banner.jpg";
import SEO from "../../components/SEO/seo";
import { WebsiteServices } from "../api/services/website.services";

type AboutUsPageProps = {
  ourTeams?: any[];
  ourPartners?: any[];
  ourServices?: any[];
  aboutUsInfo?: any;
};

export const getServerSideProps: GetServerSideProps<
  AboutUsPageProps
> = async () => {
  const ourTeams = await WebsiteServices.getOurTeams();
  const ourPartners = await WebsiteServices.getOurPartners();
  const ourServices = await WebsiteServices.getOurServices();
  const aboutUsInfo = await WebsiteServices.getAboutInfo();

  return {
    props: {
      ourTeams,
      ourPartners,
      ourServices,
      aboutUsInfo,
    },
  };
};

const AboutUsPage: NextPage<AboutUsPageProps> = ({
  ourTeams,
  ourPartners,
  ourServices,
  aboutUsInfo,
}) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<string | false>(false);
  const [missionAndVision, setMissionAndVision] = useState<any[]>([
    {
      titleKeyword: aboutUsInfo?.data?.missionTitle,
      image: aboutUsInfo?.data?.missionImage?.fileUrl,
      descriptions: aboutUsInfo?.data?.missionDescriptions,
    },
    {
      titleKeyword: aboutUsInfo?.data?.visionTitle,
      image: aboutUsInfo?.data?.visionImage?.fileUrl,
      descriptions: aboutUsInfo?.data?.visionDescriptions,
    },
  ]);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <DefaultLayout
      headerProps={{ banners: [aboutUsInfo?.data?.backgroundImage?.fileUrl || AboutUsBanner] }}
    >
      <SEO
        seo={{
          metaTitle: "About Us",
        }}
      />
      <div className="about-us-container mt60">
        {missionAndVision &&
          missionAndVision.map((item, index) => (
            <div key={index} className="section">
              <div className="container">
                <div className="title">
                  <p>{item.titleKeyword}</p>
                </div>
                <div className="row mt20">
                  <div className="col-12">
                    {(index + 1) % 2 === 0 ? (
                      <div className="row">
                        <div
                          className="col-12 col-md-7 my-auto mt-mission"
                          dangerouslySetInnerHTML={{
                            __html: item.descriptions ? item.descriptions : "",
                          }}
                        ></div>
                        <div className="col-12 col-md-5">
                          <div className="mission-vision-image">
                            <Image
                              src={item.image}
                              alt={item.titleKeyword}
                              layout="fill"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="row">
                        <div className="col-12 col-md-5">
                          <div className="mission-vision-image">
                            <Image
                              src={item.image}
                              alt={item.titleKeyword}
                              layout="fill"
                            />
                          </div>
                        </div>
                        <div
                          className="col-12 col-md-7 my-auto mt-mission"
                          dangerouslySetInnerHTML={{
                            __html: item.descriptions ? item.descriptions : "",
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        <div className="section bg-gray200 py40">
          <div className="container">
            <div className="title">
              <p>{aboutUsInfo?.data?.ourServiceTitle}</p>
            </div>
            <div className="row mt20">
              <div className="col-12 col-md-6">
                {ourServices &&
                  ourServices.map((item, index) => (
                    <div key={index} className="accordion-our-service">
                      <Accordion
                        expanded={expanded === "panel" + (index + 1)}
                        onChange={handleChange("panel" + (index + 1))}
                      >
                        <AccordionSummary
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Typography className="d-flex justify-content-center align-items-center semiBold">
                            <i className="icon-ok-circle mr8"></i>
                            {item?.data?.title}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div
                            className="mt12"
                            dangerouslySetInnerHTML={{
                              __html: item?.data?.description
                                ? item?.data?.description
                                : "",
                            }}
                          ></div>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  ))}
              </div>
              <div className="col-12 col-md-6">
                <div className="our-service-background">
                  <Image
                    src={aboutUsInfo?.data?.ourServiceImage.fileUrl || whatWeDoImage}
                    alt=""
                    layout="fill"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="container">
            <div className="title">
              <p>{aboutUsInfo?.data?.ourTeamTitle}</p>
            </div>
            <p className="mt20">{aboutUsInfo?.data?.ourTeamSubtitle}</p>
            <div className="row mt20">
              {ourTeams &&
                ourTeams.map((item, index) => (
                  <div key={index} className="col-12 col-md-6 mb40">
                    <div className="row">
                      <div className="col-12 col-xl-5">
                        <div className="avatar mb4">
                          {item.data?.avatar && (
                            <Image
                              src={item.data.avatar?.fileUrl}
                              alt={item.data?.fullName}
                              width={306}
                              height={374}
                              layout="responsive"
                            />
                          )}
                        </div>
                      </div>
                      <div className="col-12 col-xl-7">
                        <p className="semiBold">{item.data.fullName}</p>
                        <p className="mt8 brightGreen">
                          {t(item.data.position)}
                        </p>
                        <p className="mt8">{t(item.data.shortDescription)}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="section bg-redRose py40">
          <div className="container">
            <div className="title">
              <p>{aboutUsInfo?.data?.ourPartnerTitle}</p>
            </div>
            <p className="mt20">{aboutUsInfo?.data?.ourPartnerSubtitle}</p>
            <div className="partners-images">
              <div className="row d-flex justify-content-center">
                {ourPartners &&
                  ourPartners.map((item, index) => (
                    <div
                      key={index}
                      className="col-12 col-sm-6 col-md-4 col-lg-2 position-relative"
                    >
                      <div className="image">
                        <Image
                          src={item.data?.logo?.fileUrl}
                          alt=""
                          width={250}
                          height={250}
                          layout="responsive"
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AboutUsPage;
