import avatarImage from "../../assets/images/sample/user/avatar.jpg";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import {
  PropertyDto,
  PropertyTransactionType,
} from "../../pages/api/general-client";
import { formatNumber } from "../../helpers/utils";

type ListingDetailTopComponentProps = {
  property: PropertyDto;
};

const ListingDetailTopComponent: React.FC<ListingDetailTopComponentProps> = (
  props: ListingDetailTopComponentProps
) => {
  const { t } = useTranslation();

  return (
    <div className="listing-slug-component">
      <div className="top-detail">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-12 col-md-6 col-lg-2">
              <div className="top-detail-item property-element">
                <div className="image text-center">
                  <i
                    className={
                      props.property.transactionType ===
                      PropertyTransactionType.Rent
                        ? "icon-realestate-rent"
                        : props.property.transactionType ===
                          PropertyTransactionType.Sale
                        ? "icon-realestate-buying-a-home"
                        : ""
                    }
                  ></i>
                </div>
                <p className="text-center mt4 semiBold">
                  {props.property.transactionType ===
                  PropertyTransactionType.Rent
                    ? t("rentalOnly")
                    : props.property.transactionType ===
                      PropertyTransactionType.Sale
                    ? t("forSale")
                    : ""}
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-2">
              <div className="top-detail-item property-element">
                <div className="image text-center">
                  <i className="icon-realestate-bed"></i>
                </div>
                <p className="text-center mt4 semiBold">
                  {props.property.bedrooms || 0} {t("bedrooms")}
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-2">
              <div className="top-detail-item property-element">
                <div className="image text-center">
                  <i className="icon-realestate-plan2"></i>
                </div>
                <p className="text-center mt4 semiBold">
                  {formatNumber(props.property.lotSize || 0).toString()} SqFt
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-2">
              <div className="top-detail-item property-element">
                <div className="image text-center">
                  <i className="icon-realestate-bathtub"></i>
                </div>
                <p className="text-center mt4 semiBold">
                  {props.property.bathrooms || 0} {t("bathrooms")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailTopComponent;
