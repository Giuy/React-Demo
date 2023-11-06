import { GetServerSideProps, NextPage } from "next";
import { useTranslation } from "react-i18next";
import DefaultLayout from "../../components/layouts/defaultLayout";
import SEO from "../../components/SEO/seo";
import ListingDetailMiddleComponent from "../../components/listing-slug-component/middle";
import ListingDetailSideComponent from "../../components/listing-slug-component/side";
import ListingDetailTopComponent from "../../components/listing-slug-component/top";
import SliderProperties from "../../components/sliders-properties/sliders-properties";
import ListingDetailBannerComponent from "../../components/listing-slug-component/banner";
import {
  FilterWebsitePropertyDto,
  PaginatedListOfPropertyDto,
  PropertyDto,
  PropertyImageType,
} from "../api/general-client";
import { PropertyServices } from "../api/services/property.services";
import { WebsiteServices } from "../api/services/website.services";

type ListingDetailPageProps = {
  similarProperties?: PaginatedListOfPropertyDto;
  property?: PropertyDto;
  similarPropertyExceptIt?: PropertyDto[];
};

export const getServerSideProps: GetServerSideProps<
  ListingDetailPageProps
> = async ({ params }) => {
  if (!params?.slug)
    return {
      notFound: true,
    };

  const property = await PropertyServices.getPropertyDetail(
    params.slug as string
  );

  var filterProperty = {
    pageNumber: 1,
    pageSize: 16,
    listPropertyType: [property.propertyTypeId],
    listTransactionType: [property.transactionType],
  } as FilterWebsitePropertyDto;
  const similarProperties = await WebsiteServices.filterProperty(
    filterProperty
  );
 
  const similarPropertyExceptIt = similarProperties?.items.filter(
    (x: any) => x.propertyId != property?.propertyId
  );

  return {
    props: {
      property,
      similarProperties,
      similarPropertyExceptIt,
    },
  };
};

const ListingDetailPage: NextPage<ListingDetailPageProps> = ({
  similarProperties,
  property,
  similarPropertyExceptIt,
}) => {
  const { t } = useTranslation();

  return property ? (
    <DefaultLayout headerProps={{ isHidePageTitle: true, isHideBanner: true }}>
      <SEO
        seo={{
          metaTitle: property.title,
          shareImage:
            property.listPropertyImage?.filter(
              (x) => x.propertyImageType === PropertyImageType.ThumbnailImage
            )[0].imageUrl || "",
          metaDescription: property.shortDescriptions,
        }}
      />
      <div className="listing-detail-container">
        <ListingDetailBannerComponent property={property} />
        <ListingDetailTopComponent property={property} />
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-8 col-xl-9">
              <ListingDetailMiddleComponent property={property} />
              <div className="similar-properties">
                <p className="title">{t("similarProperties")}</p>
                <SliderProperties properties={similarPropertyExceptIt ?? []} />
              </div>
            </div>
            <div className="col-12 col-lg-4 col-xl-3">
              <ListingDetailSideComponent property={property} />
            </div>
          </div>
        </div>
        <div className="container"></div>
      </div>
    </DefaultLayout>
  ) : (
    <></>
  );
};

export default ListingDetailPage;
