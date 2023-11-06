import { NextPage } from "next";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import DefaultLayout from "../../components/layouts/defaultLayout";
import SEO from "../../components/SEO/seo";
import Link from "next/link";
import PropertyCard from "../../components/sliders-properties/property-card";
import CustomSelect from "../../components/custom-select/custom-select";
import { ROUTES } from "../../constants/routes";
import {
  FilterWebsitePropertyDto,
  PaginatedListOfPropertyDto,
} from "../api/general-client";
import { WebsiteServices } from "../api/services/website.services";
import { Pagination, Stack } from "@mui/material";
import ListingBanner from "../../assets/images/sample/banner/listing-banner.jpg";
import PropertyModel, {
  AppFilteringPropertyType,
} from "../api/model/search-property.model";

const ListingPage: NextPage = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageSize, setCurrentPageSize] = useState<number>(12);
  const [selectedForm, setSelectedForm] = useState<any[]>([
    {
      labelKey: "itemPerPage",
      values: [
        {
          name: "12",
          value: 12,
        },
        {
          name: "24",
          value: 24,
        },
        {
          name: "30",
          value: 30,
        },
      ],
    },
    {
      labelKey: "sorting",
      values: [
        {
          name: t("default"),
          value: 0,
        },
        {
          name: t("aToZListed"),
          value: 1,
        },
        {
          name: t("zToAListed"),
          value: 2,
        },
        {
          name: t("priceLowestFirst"),
          value: 3,
        },
        {
          name: t("priceHighestFirst"),
          value: 4,
        },
      ],
    },
  ]);
  const [properties, setProperties] = useState<PaginatedListOfPropertyDto>();

  useEffect(() => {
    getFilterProperty();
  }, []);

  const getFilterProperty = async (page?: number, pageSize?: number) => {
    var filterRequest = {
      pageNumber: page ? page : currentPage,
      pageSize: pageSize ? pageSize : currentPageSize,
      ...PropertyModel.filterPropertyModel,
    } as FilterWebsitePropertyDto;
    const res = await WebsiteServices.filterProperty(filterRequest);
    setProperties(res);
  };

  const onChangePage = (e: any, page: any) => {
    getFilterProperty(page);
    setCurrentPage(page);
  };

  const onSearch = (data: AppFilteringPropertyType) => {
    onChangePage(undefined, 1);
  };

  const onSelectSorting = (data: any) => {
    if (data.label === selectedForm[1].labelKey) {
      PropertyModel.filterPropertyModel.orderByTitle =
        data.value === 1 ? 1 : data.value === 2 ? 2 : 0;
      PropertyModel.filterPropertyModel.orderByPrice =
        data.value === 3 ? 1 : data.value === 4 ? 2 : 0;
    }

    onChangePage(undefined, 1);
  };

  const onSelectItemPerPage = (data: any) => {
    getFilterProperty(1, data.value);
    setCurrentPageSize(data.value);
    onChangePage(undefined, 1);
  };

  return (
    <DefaultLayout
      headerProps={{
        isShowSearchBox: true,
        isHidePageTitle: true,
        banners: [ListingBanner],
      }}
      searchingProps={{
        isListingPage: true,
        isMinimize: true,
        onSearch: onSearch,
      }}
    >
      <SEO
        seo={{
          metaTitle: "Listing",
        }}
      />
      <div className="listing-container">
        <div className="container">
          <div className="listing-header mt60">
            <div className="d-flex justify-content-between align-content-center flex-wrap">
              <div className="list-map-change mb8">
                <div className="d-flex">
                  <button className="form-control list-btn mr8 d-flex justify-content-center align-items-center">
                    <i className="icon-line2-list mr8"></i>
                    {t("list")}
                  </button>
                  {/* <button className="form-control map-btn d-flex justify-content-center align-content-center">
                    <i className="icon-map-marker2 mr8"></i>
                    {t("map")}
                  </button> */}
                </div>
              </div>
              <div className="select-options mb8">
                <div className="d-flex flex-wrap">
                  {selectedForm &&
                    selectedForm.map((item, index) => (
                      <div key={index} className="mr12 mb8">
                        <CustomSelect
                          key={index}
                          label={item.labelKey}
                          isLabelUppercase={true}
                          options={item.values}
                          displayNameVariable={"name"}
                          onChange={
                            index === 0 ? onSelectItemPerPage : onSelectSorting
                          }
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="listing-grid">
            <div className="row">
              {properties &&
                properties.items?.map((item, index) => (
                  <div key={index} className="col-12 col-md-6 col-lg-4">
                    <PropertyCard property={item} />
                  </div>
                ))}
            </div>
            {properties?.items && properties?.items?.length > 0 && (
              <div className="paginator mt32 d-flex justify-content-center align-items-center">
                <Stack spacing={2}>
                  <Pagination
                    count={properties?.totalPages || 0}
                    page={currentPage}
                    variant="outlined"
                    shape="rounded"
                    onChange={onChangePage}
                  />
                </Stack>
              </div>
            )}
          </div>
          <div className="mt60 mb60">
            <div className="contact-now-line">
              <p className="title">{t("homeContactNowLineText")}</p>
              <Link href={ROUTES.CONTACT} passHref>
                <div className="contact-now-btn">
                  <p>{t("contactNow")}</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ListingPage;
