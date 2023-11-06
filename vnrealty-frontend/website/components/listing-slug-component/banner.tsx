import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { formatNumber } from "../../helpers/utils";
import {
  PropertyDto,
  PropertyImageType,
  PropertyTransactionType,
} from "../../pages/api/general-client";
import ImageGalleryDialog from "../dialog/image-gallery/image-gallery-dialog";
import VideoDialog from "../dialog/video/video-dialog";

type ListingDetailBannerComponentProps = {
  property: PropertyDto;
};

const ListingDetailBannerComponent: React.FC<
  ListingDetailBannerComponentProps
> = (props: ListingDetailBannerComponentProps) => {
  const { t } = useTranslation();
  const [isOpenImageGallery, setIsOpenImageGallery] = useState<boolean>(false);
  const [isOpenVideo, setIsOpenVideo] = useState<boolean>(false);

  return (
    <div className="listing-slug-component">
      <div className="banner-detail">
        <div className="banner">
          <div className="banner-image">
            <Image
              src={
                props.property.listPropertyImage?.filter(
                  (x) => x.propertyImageType === PropertyImageType.CoverImage
                )[0].imageUrl || ""
              }
              alt={props.property.title}
              layout="fill"
            />
          </div>
          <div className="banner-title">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="price price-desktop">
                    <p>
                      ${formatNumber(props.property.price || 0).toString()}
                      <span className="small">
                        /
                        {props.property.transactionType ===
                        PropertyTransactionType.Rent
                          ? t("perMonth")
                          : props.property.transactionType ===
                            PropertyTransactionType.Sale
                          ? t("leasehold")
                          : ""}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="col-12 mt12">
                  <div className="row">
                    <div className="col-12 col-lg-8">
                      <p className="property-title">
                        <span className="title">{props.property.title}</span>
                      </p>
                    </div>
                    <div className="col-12 col-lg-4 my-3">
                      <div className="d-flex">
                        <button
                          className="form-control submit-button"
                          onClick={() => {
                            setIsOpenImageGallery(true), setIsOpenVideo(false);
                          }}
                        >
                          <i className="icon-picture"></i> {t("viewGallery")}
                        </button>
                        {props.property.videoLink && (
                          <button
                            className="form-control submit-button"
                            onClick={() => {
                              setIsOpenVideo(true),
                                setIsOpenImageGallery(false);
                            }}
                          >
                            <i className="icon-play"></i> {t("playVideo")}
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="price price-mobile mb-2">
                      <p>
                        ${formatNumber(props.property.price || 0).toString()}
                        <span className="small">
                          /{" "}
                          {props.property.transactionType ===
                          PropertyTransactionType.Rent
                            ? t("perMonth")
                            : props.property.transactionType ===
                              PropertyTransactionType.Sale
                            ? t("leasehold")
                            : ""}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpenImageGallery && (
        <ImageGalleryDialog
          onClose={() => setIsOpenImageGallery(false)}
          images={
            props.property?.listPropertyImage &&
            props.property?.listPropertyImage
          }
          imageVariableName={"imageUrl"}
          isShowDialog={isOpenImageGallery}
        />
      )}
      {isOpenVideo && (
        <VideoDialog
          onClose={() => setIsOpenVideo(false)}
          videoLink={props.property.videoLink}
          isShowDialog={isOpenVideo}
        />
      )}
    </div>
  );
};

export default ListingDetailBannerComponent;
