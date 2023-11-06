import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import DefaultLayout from "../../components/layouts/defaultLayout";
import { useTranslation } from "react-i18next";
import SEO from "../../components/SEO/seo";
import { WebsiteServices } from "../api/services/website.services";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ContactTypesEnum,
  CreateContactCustomerDto,
} from "../api/general-client";
import { ContactServices } from "../api/services/contact.services";
import { toast } from "react-toastify";
import SubmitLoadingButton from "../../components/submit-loading-button";
import ContactSchema from "../../schema/contact.schema";
import { ROUTES } from "../../constants/routes";

type LandLordPortalPageProps = {
  landLordPortalInfo?: any;
  linkPortal?: any;
};

export const getServerSideProps: GetServerSideProps<
  LandLordPortalPageProps
> = async () => {
  const landLordPortalInfo = await WebsiteServices.getLandlordPortalInfo();
  const linkPortal = await WebsiteServices.getLinkPortal();

  return {
    props: {
      landLordPortalInfo,
      linkPortal,
    },
  };
};

const LandLordPortalPage: NextPage<LandLordPortalPageProps> = ({
  landLordPortalInfo,
  linkPortal,
}) => {
  const { t } = useTranslation();
  const [banners, setBanners] = useState<any[]>([
    landLordPortalInfo?.data?.backgroundImage?.fileUrl,
  ]);
  const [pageInfo, setPageInfo] = useState<any>({
    data: {
      welcomeTitle: landLordPortalInfo?.data?.title,
      welcomeSubtitle: landLordPortalInfo?.data?.descriptions,
    },
  });
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const [link, setLinkPortal] = useState<any>(linkPortal);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateContactCustomerDto>({
    resolver: yupResolver(ContactSchema),
  });

  const onSendContact = async (model: CreateContactCustomerDto) => {
    model.contactType = ContactTypesEnum.Contact;
    setIsSubmitLoading(true);
    try {
      const res = await ContactServices.createContactCustomer(model);
      setTimeout(() => {
        if (res.succeeded) {
          setIsSubmitLoading(false);
          reset();
          toast.success(t("contactSuccessfully"));
        } else {
          setIsSubmitLoading(false);
          toast.error(t("contactFailed"));
        }
      }, 600);
    } catch (err) {
      setIsSubmitLoading(false);
      toast.error(t("contactFailed"));
    }
  };

  const onGotoPortal = () => {
    window.location.assign(link);
  };
  const gotoContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };
  return (
    <DefaultLayout
      headerProps={{ banners, isHidePageTitle: true, homeInfo: pageInfo }}
    >
      <SEO
        seo={{
          metaTitle: "Landlord Portal",
        }}
      />
      <div className="landlord-portal-container">
        <div className="container">
          <div className="section">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="image">
                  <Image
                    src={landLordPortalInfo?.data?.panel1Image?.fileUrl}
                    alt=""
                    layout="fill"
                  />
                </div>
              </div>
              <div className="col-12 col-md-6 m-auto">
                <div className="descriptions mt8 mb8">
                  <p className="line-title">{t("landlordPortal")}</p>
                  <p className="main-title mt8">
                    {t("alreadyHaveLandLordAccount")}
                  </p>
                  <div
                    className="content mt20"
                    dangerouslySetInnerHTML={{
                      __html: landLordPortalInfo?.data?.panel1Descriptions
                        ? landLordPortalInfo?.data?.panel1Descriptions
                        : "",
                    }}
                  ></div>
                  <button className="form-control mt20" onClick={onGotoPortal}>
                    {t("landlordPortal")}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="row">
              <div className="col-12 col-md-6 m-auto">
                <div className="descriptions  mt8 mb8">
                  <p className="line-title">{t("landlordPortal")}</p>
                  <p className="main-title mt8">{t("dontHaveAnAccount")}</p>
                  <div
                    className="content mt20"
                    dangerouslySetInnerHTML={{
                      __html: landLordPortalInfo?.data?.panel2Descriptions
                        ? landLordPortalInfo?.data?.panel2Descriptions
                        : "",
                    }}
                  ></div>
                  <button className="form-control mt20" onClick={gotoContact}>
                    {t("readyToWorkWithUs")}
                  </button>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="image">
                  <Image
                    src={landLordPortalInfo?.data?.panel2Image?.fileUrl}
                    alt=""
                    layout="fill"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="section">
            <div id="contact" className="contact-us">
              <p className="title">{t("contactUsAboutYourPropertyNeeds")}</p>
              <div className="container">
                <form className="mt60" onSubmit={handleSubmit(onSendContact)}>
                  <div className="form-group">
                    <input
                      {...register("customerName")}
                      className="form-control"
                      placeholder={t("fullName") + " (*)"}
                    />
                    {errors.customerName && (
                      <p className="text-danger mt-0">
                        {errors.customerName.message}
                      </p>
                    )}
                  </div>
                  <div className="form-group mt16">
                    <input
                      {...register("customerEmail")}
                      className="form-control"
                      placeholder={t("email") + " (*)"}
                    />
                    {errors.customerEmail && (
                      <p className="text-danger mt-0">
                        {errors.customerEmail.message}
                      </p>
                    )}
                  </div>
                  <div className="form-group mt16">
                    <input
                      {...register("customerPhone")}
                      className="form-control"
                      placeholder={t("phoneNumber")}
                    />
                    {errors.customerPhone && (
                      <p className="text-danger mt-0">
                        {errors.customerPhone.message}
                      </p>
                    )}
                  </div>
                  <div className="form-group mt16">
                    <input
                      {...register("customerAddress")}
                      className="form-control"
                      placeholder={t("yourPropertyAddress")}
                    />
                    {errors.customerAddress && (
                      <p className="text-danger mt-0">
                        {errors.customerAddress.message}
                      </p>
                    )}
                  </div>
                  <div className="form-group mt16">
                    <textarea
                      {...register("content")}
                      className="form-control"
                      placeholder={t("howCanWeHelpYou")}
                    ></textarea>
                    {errors.content && (
                      <p className="text-danger mt-0">
                        {errors.content.message}
                      </p>
                    )}
                  </div>
                  <div className="mt16 semiBold">
                    <SubmitLoadingButton
                      label={t("sendEmail")}
                      isLoading={isSubmitLoading}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default LandLordPortalPage;
