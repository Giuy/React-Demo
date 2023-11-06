import { GetServerSideProps, NextPage } from "next";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import DefaultLayout from "../../components/layouts/defaultLayout";
import Image from "next/image";
import ContactBackgroundImage from "../../assets/images/sample/contact-background.jpg";
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

type ContactPageProps = {
  contactInfo?: any;
};

export const getServerSideProps: GetServerSideProps<
  ContactPageProps
> = async () => {
  const contactInfo = await WebsiteServices.getContactInfo();

  return {
    props: {
      contactInfo,
    },
  };
};

const ContactPage: NextPage<ContactPageProps> = ({ contactInfo }) => {
  const { t } = useTranslation();
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
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

  return (
    <DefaultLayout
      headerProps={{ banners: [contactInfo?.data?.backgroundImage?.fileUrl] }}
    >
      <SEO
        seo={{
          metaTitle: "Contact",
        }}
      />
      <div className="contact-container">
        <div className="container">
          <div className="contact-information mt60">
            <div className="contact-image">
              <Image
                src={contactInfo?.data?.mainImage?.fileUrl}
                alt=""
                layout="fill"
              />
            </div>
            {contactInfo && contactInfo.data && (
              <div className="information">
                <div className="info-section">
                  <p className="title">{t("address")}</p>
                  {contactInfo.data?.address1 && (
                    <p className="content">
                      <span>
                        <strong>{contactInfo.data?.area}: </strong>
                      </span>
                      <span>{contactInfo?.data?.address1}</span>
                    </p>
                  )}
                  {contactInfo.data?.address2 && (
                    <p className="content">
                      <span>
                        <strong>{contactInfo.data?.area} </strong>
                      </span>
                      <span>{contactInfo?.data?.address2}</span>
                    </p>
                  )}
                </div>
                {contactInfo.data?.phone1 && (
                  <div className="info-section">
                    <p className="title">{t("phoneNumber")}</p>
                    <p className="content">{contactInfo?.data?.phone1}</p>
                    <p className="content">{contactInfo?.data?.phone2}</p>
                  </div>
                )}
                {contactInfo.data?.email1 && (
                  <div className="info-section">
                    <p className="title">{t("email")}</p>
                    <p className="content">{contactInfo?.data?.email1}</p>
                    <p className="content">{contactInfo?.data?.email2}</p>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="contact-form mt60 mb60">
            <p className="title">{t("contactUs")}</p>
            <form className="form mt16" onSubmit={handleSubmit(onSendContact)}>
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
                  placeholder={t("emailAddress") + " (*)"}
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
                  placeholder={t("phoneNumber") + " (*)"}
                />
                {errors.customerPhone && (
                  <p className="text-danger mt-0">
                    {errors.customerPhone.message}
                  </p>
                )}
              </div>
              <div className="form-group mt16">
                <textarea
                  {...register("content")}
                  className="form-control"
                  placeholder={t("contactNotePlaceholder")}
                ></textarea>
                {errors.content && (
                  <p className="text-danger mt-0">{errors.content.message}</p>
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
    </DefaultLayout>
  );
};

export default ContactPage;
