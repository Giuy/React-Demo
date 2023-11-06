import Image from "next/image";
import { useTranslation } from "react-i18next";
import { formatNumber } from "../../helpers/utils";
import {
  PropertyDto,
  PropertyImageType,
  PropertyTransactionType,
} from "../../pages/api/general-client";
import { getListingDetailUrl } from "../../helpers/url";

type PropertyCardProps = {
  property: PropertyDto;
};

const PropertyCard: React.FC<PropertyCardProps> = (
  props: PropertyCardProps
) => {
  const { t } = useTranslation();

  return (
    <div
      className="property-card-container"
      onClick={() =>
        window.location.assign(
          getListingDetailUrl(props?.property?.friendlyUrl || "/")
        )
      }
    >
      <div className="cover-thumbnail">
        <div className="image">
          <Image
            src={
              props.property.listPropertyImage?.filter(
                (x) => x.propertyImageType === PropertyImageType.ThumbnailImage
              )[0].imageUrl || ""
            }
            alt={props.property.title}
            layout="fill"
          />
        </div>
        <div className="over-content">
          <div className="content">
            {props.property.tags && (
              <p className="tag">{props.property.tags}</p>
            )}
            <div className="price">
              <p>${formatNumber(props.property.price || 0).toString()}</p>
              <p>
                {props.property.transactionType === PropertyTransactionType.Rent
                  ? t("perMonth")
                  : props.property.transactionType ===
                    PropertyTransactionType.Sale
                  ? t("leasehold")
                  : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="property-infor mt8 p8">
        <div className="property-infor-top pb16">
          <p className="title short-title-text">{props.property.title}</p>
          <p className="title-hover">{props.property.title}</p>
          <p className="state short-title-text">{props.property.location}</p>
        </div>
        <div className="property-infor-bottom mt16">
          <div className="d-block d-md-flex justify-content-between align-items-center flex-wrap">
            <p>
              <span>Beds: </span>
              <span className="brightGreen semiBold">
                {props.property.bedrooms}
              </span>
            </p>
            <p>
              <span>Baths: </span>
              <span className="brightGreen semiBold">
                {props.property.bathrooms}
              </span>
            </p>
            <p>
              <span>Area: </span>
              <span className="brightGreen semiBold">
                {formatNumber(props.property.lotSize || 0).toString()} sqm
              </span>
            </p>
          </div>
          {/* <div className="d-block d-md-flex justify-content-between align-items-center flex-wrap mt8">
            <p className="d-flex align-align-items-center">
              <span className="mr4">Pool: </span>
              <i className="icon-check-sign brightGreen"></i>
            </p>
            <p className="d-flex align-align-items-center">
              <span className="mr4">Internet: </span>
              <i className="icon-check-sign brightGreen"></i>
            </p>
            <p className="d-flex align-align-items-center">
              <span className="mr4">Cleaning: </span>
              <i className="icon-check-sign brightGreen"></i>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
