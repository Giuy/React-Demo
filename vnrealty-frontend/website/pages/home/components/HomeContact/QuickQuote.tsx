import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import {
  CreateContactCustomerDto,
  GeneralClient,
} from "../../../api/general-client";
import { Email } from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup";
import SubmitLoadingButton from "./SubmitLoadingButton";
import { useState } from "react";
import { generalClient } from "../../../api/api.services";
import { ContactTypesEnum } from "../../../api/general-client";
import { toast } from "react-toastify";
const QuoteSchema = Yup.object().shape({
  //* this template from backend
  customerName: Yup.string().required("Required"),
  customerPhone: Yup.number().typeError('must be a number').required("Required"),
  customerEmail: Yup.string().email("Email is invalid").required(),
  content: Yup.string().required("Required"),
});
const ContactServices = {
  //! back-end -> { bridge function } -> func get data
  CreateContactCustomer: async (model: CreateContactCustomerDto) => {
    const res = await generalClient.contactCustomer_PostNew(model);
    return JSON.parse(JSON.stringify(res));
  },
};

const QuickQuote = () => {
  const { t } = useTranslation();
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateContactCustomerDto>({
    resolver: yupResolver(QuoteSchema),
  });

  //! get API function
  const onSendContact = async (model: CreateContactCustomerDto) => {
    model.contactType = ContactTypesEnum.Contact;
    setIsSubmitLoading(true);
    console.log(model)
    const res = await ContactServices.CreateContactCustomer(model);
    setTimeout(() => {
      if (res.succeeded) {
        setIsSubmitLoading(false);
        toast.success(t("contactSuccessfully"));
      } else {
        setIsSubmitLoading(false);
        toast.error(t("contactFailed"));
      }
    }, 600)
  };
  return (
    <div className="quick-quote">
      <div className="quick-quote__container">
        <div className="quick-quote__title text-capitalize ls1 fw-normal">
          {t("getAQuickQuote")}
        </div>
        <form className="quick-quote__form"
          onSubmit={handleSubmit(onSendContact)}
        >
          <input
            {...register("customerName")}
            defaultValue={""}
            placeholder={t("fullName")}
            className="item"
          />
          {errors.customerName && <p className="error">{errors.customerName.message}</p>}
          <input
            {...register("customerEmail")}
            defaultValue={""}
            placeholder={t("emailAddress")}
            className="item"
          />
          {errors.customerEmail && <p className="error">{errors.customerEmail.message}</p>}
          <input
            {...register("customerPhone")}
            defaultValue={""}
            className="item"
            placeholder={t("phoneNumber")}
          />
          {errors.customerPhone && <p className="error">{errors.customerPhone.message}</p>}
          <textarea
            {...register("content")}
            className="item"
            defaultValue={""}
            placeholder={t("contactNotePlaceholder")}
            rows={5}
          />
          {errors.content && <p className="error">{errors.content.message}</p>}
          <SubmitLoadingButton
            label={t("sendEmail")}
            isLoading={isSubmitLoading}
          />
        </form>
      </div>
    </div>
  );
};

export default QuickQuote;
