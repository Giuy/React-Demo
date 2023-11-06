import { useTranslation } from "react-i18next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FacebookShareButton, TwitterShareButton } from "next-share";
import {
  ContactTypesEnum,
  CreateContactCustomerDto,
  PropertyDto,
} from "../../pages/api/general-client";
import FacebookIcon from "../../assets/images/icons/facebook.svg";
import TwitterIcon from "../../assets/images/icons/twitter.svg";
import { getListingDetailUrl } from "../../helpers/url";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ContactSchema from "../../schema/contact.schema";
import { ContactServices } from "../../pages/api/services/contact.services";
import { toast } from "react-toastify";
import { getDomain } from "../../helpers/utils";
import SubmitLoadingButton from "../submit-loading-button";
import { env } from "process";

type ListingDetailSideComponentProps = {
  property: PropertyDto;
};

const ListingDetailSideComponent: React.FC<ListingDetailSideComponentProps> = (
  props: ListingDetailSideComponentProps
) => {
  const { t } = useTranslation();
  const [sharingUrl, setSharingUrl] = useState<string>(
    process.env.DOMAIN + getListingDetailUrl(props?.property?.friendlyUrl || "")
  );

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
    model.contactType = ContactTypesEnum.Order;
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
    <div className="listing-slug-component">
      <div className="side-detail">
        <div className="section">
          <div className="reserve">
            <div className="reserve-header">
              <p>{t("reserveNow")}</p>
            </div>
            <div className="reserve-form">
              <form onSubmit={handleSubmit(onSendContact)}>
                <div className="form-group">
                  <input
                    {...register("customerName")}
                    className="form-control"
                    placeholder={t("fullName")}
                  />
                  {errors.customerName && (
                    <p className="text-danger mt-0">
                      {errors.customerName.message}
                    </p>
                  )}
                </div>
                <div className="form-group mt8">
                  <input
                    {...register("customerEmail")}
                    className="form-control"
                    placeholder={t("emailAddress")}
                  />
                  {errors.customerEmail && (
                    <p className="text-danger mt-0">
                      {errors.customerEmail.message}
                    </p>
                  )}
                </div>
                <div className="form-group mt8">
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
                <div className="form-group mt8">
                  <textarea
                    {...register("content")}
                    className="form-control"
                    placeholder={t("message")}
                  ></textarea>
                  {errors.content && (
                    <p className="text-danger mt-0">{errors.content.message}</p>
                  )}
                </div>
                <div className="form-group mt8">
                  <SubmitLoadingButton
                    label={t("bookNow")}
                    isLoading={isSubmitLoading}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        {props.property.mapLink && (
          <div className="section">
            <div className="map">
              <div className="title">
                <p>{t("map")}</p>
              </div>
              <iframe
                src={props.property.mapLink}
                width="100%"
                height="200px"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        )}
        {props.property.videoLink && (
          <div className="section">
            <div className="video">
              <div className="title">
                <p>{t("video")}</p>
              </div>
              <iframe
                width="100%"
                height="200px"
                src={props.property.videoLink}
              ></iframe>
            </div>
          </div>
        )}
        <div className="section">
          <div className="social-sharing">
            <div className="title">
              <p>{t("share")}</p>
            </div>
            <div className="share">
              <FacebookShareButton url={sharingUrl} className="mr4">
                <Image src={FacebookIcon} alt="" />
              </FacebookShareButton>

              <TwitterShareButton url={sharingUrl} hashtags={["vnrealty"]}>
                <Image src={TwitterIcon} alt="" />
              </TwitterShareButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailSideComponent;
