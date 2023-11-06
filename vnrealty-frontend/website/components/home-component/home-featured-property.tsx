import { useTranslation } from "react-i18next";
import SliderProperties from "../sliders-properties/sliders-properties";
import Link from "next/link";
import { ROUTES } from "../../constants/routes";
import { PaginatedListOfPropertyDto } from "../../pages/api/general-client";

type HomeFeaturedPropertiesProps = {
  featuredProperties?: PaginatedListOfPropertyDto;
};

const HomeFeaturedProperties: React.FC<HomeFeaturedPropertiesProps> = ({
  featuredProperties,
}) => {
  const { t } = useTranslation();

  return (
    <div className="home-component">
      <div className="featured-properties">
        <div className="row">
          <div className="col-12 col-md-6">
            <h3 className="uppercase">{t("featuredProperties")}</h3>
          </div>
          <div className="col-12 col-md-6">
            <Link href={ROUTES.LISTING.INDEX}>
              <button>{t("checkAll")}</button>
            </Link>
          </div>
        </div>
        <div className="properties-list mt20">
          <SliderProperties properties={featuredProperties?.items || []} />
        </div>
      </div>
    </div>
  );
};

export default HomeFeaturedProperties;
