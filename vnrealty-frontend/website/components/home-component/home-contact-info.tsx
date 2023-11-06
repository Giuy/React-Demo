import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ContactTypesEnum,
  CreateContactCustomerDto,
} from "../../pages/api/general-client";
import { ContactServices } from "../../pages/api/services/contact.services";
import SubmitLoadingButton from "../submit-loading-button";
import { toast } from "react-toastify";
import ContactSchema from "../../schema/contact.schema";

type HomeContactInfoProps = {
  contactInfo?: any;
};

const HomeContactInfo: React.FC<HomeContactInfoProps> = ({ contactInfo }) => {
  const { t } = useTranslation();
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);

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

  return (
    <div className="home-component">
      <div className="contact-info mb60">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 company-contact">
              {contactInfo && (
                <>
                  <p className="title">{contactInfo?.data?.title}</p>

                  <p className="semiBold mt40">{contactInfo?.data?.area}: </p>
                  <p>{contactInfo?.data?.address1}</p>
                  <p>{contactInfo?.data?.address2}</p>

                  <p className="semiBold mt40">{t("phone")}:</p>
                  <p>{contactInfo?.data?.phone1}</p>
                  <p>{contactInfo?.data?.phone2}</p>

                  <p className="semiBold mt40">{t("email")}:</p>
                  <p>{contactInfo?.data?.email1}</p>
                  <p>{contactInfo?.data?.email2}</p>

                  <p className="semiBold mt40">{t("workingHours")}: </p>
                  <p className="mt8">
                    <span className="semiBold mt40">
                      {contactInfo?.data?.dayOfWeek}:{" "}
                    </span>
                    {contactInfo?.data?.workingHours}
                  </p>
                </>
              )}
            </div>
            <div className="col-12 col-md-6 contact-form">
              <p className="title">{t("getAQuickQuote")}</p>
              <div className="form form-quick-quote mt40">
                <form onSubmit={handleSubmit(onSendContact)}>
                  <div className="form-group ">
                    <input
                      {...register("customerName")}
                      defaultValue={""}
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
    </div>
  );
};

export default HomeContactInfo;
