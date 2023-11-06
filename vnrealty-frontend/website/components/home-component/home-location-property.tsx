import Image from "next/image";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MasterDataServices } from "../../pages/api/services/masterdata.services";

const HomeLocationProperty: React.FC = () => {
  const { t } = useTranslation();
  const [featuredProperty, setFeaturedProperty] = useState<any[]>();

  useEffect(() => {
    getFeaturesCity();
  }, []);

  const getFeaturesCity = async () => {
    const res = await MasterDataServices.getFeaturesCity();
    setFeaturedProperty(res);
  };

  return (
    <div className="home-component">
      <div className="location-property">
        <div className="row">
          {featuredProperty &&
            featuredProperty.map((item, index) => (
              <div
                key={item.id}
                className={
                  index <= 1
                    ? index === 0
                      ? "col-12 col-lg-7"
                      : "col-12 col-lg-5"
                    : "col-12 col-lg-4"
                }
              >
                <div className="location-item">
                  <div className="location-image">
                    <Image
                      src={item.data?.coverimage?.fileUrl}
                      alt={item.data?.title}
                      layout="fill"
                    />
                  </div>
                  <div className="location-description">
                    <div className="content">
                      <p className="name">{item.data?.title}</p>
                      <p className="properties-count">
                        {item.propertyCount} {t("properties")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomeLocationProperty;
