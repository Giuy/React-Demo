import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { formatNumber } from "../../helpers/utils";
import {
  PropertyAmenitiesDto,
  PropertyDto,
} from "../../pages/api/general-client";

type ListingDetailMiddleComponentProps = {
  property: PropertyDto;
};

const ListingDetailMiddleComponent: React.FC<
  ListingDetailMiddleComponentProps
> = (props: ListingDetailMiddleComponentProps) => {
  const { t } = useTranslation();
  const [sepicification, setSepicification] = useState<any[]>();

  useEffect(() => {
    getSepicification();
  }, []);

  const getSepicification = () => {
    let data = [
      {
        name: t("constructionYear"),
        value: moment(props.property.constructionYear).format("YYYY"),
      },
      {
        name: t("bedrooms"),
        value: props.property.bedrooms,
      },
      {
        name: t("kitchens"),
        // value: (1).toString(),
        value: props.property.kitchens,

      },
      {
        name: t("squareArea"),
        value: formatNumber(props.property.lotSize || 0).toString(),
      },
      {
        name: t("balconies"),
        value: props.property.balconies,
      },
      {
        name: t("garages"),
        value: props.property.gagares,
      },
      {
        name: t("livingRooms"),
        value: props.property.livingrooms,
      },
      {
        name: t("carParking"),
        value: props.property.carParking,
      },
      {
        name: t("pools"),
        value: props.property.pools,
      },
      {
        name: t("bathrooms"),
        value: props.property.bathrooms,
      },
      {
        name: t("totalFloors"),
        value: props.property.totalFloors,
      },
      {
        name: t("insurance"),
        value: props.property.isFeatures,
      },
    ];

    setSepicification(data);
  };

  return (
    <div className="listing-slug-component">
      <div className="middle-detail">
        {props.property.shortDescriptions && (
          <div className="section">
            <div
              className="innerHtml"
              dangerouslySetInnerHTML={{
                __html: props.property.shortDescriptions,
              }}
            ></div>
          </div>
        )}
        {sepicification && (
          <div className="section">
            <div className="title">
              <p>{t("sepicification")}</p>
            </div>
            <div className="element-items">
              <div className="row">
                {sepicification.map((item, index) => (
                  <div key={index} className="col-12 col-md-6 col-lg-4">
                    <div className="item">
                      <p className="name">
                        <i className="icon-line2-check"></i>
                        {item.name}: {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {props.property.listPropertyAmenities &&
          props.property.listPropertyAmenities.length > 0 && (
            <div className="section">
              <div className="title">
                <p>{t("amenities")}</p>
              </div>
              <div className="element-items">
                <div className="row">
                  {props.property.listPropertyAmenities.map(
                    (item: any, index: number) => (
                      <div key={index} className="col-12 col-md-6 col-lg-4">
                        <div className="item">
                          <p className="name">
                            <i className="icon-line2-check"></i>
                            {item.amenities?.name}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        {props.property.descriptions && (
          <div className="section">
            <div
              className="innerHtml"
              dangerouslySetInnerHTML={{
                __html: props.property.descriptions,
              }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingDetailMiddleComponent;
