import { GetServerSideProps, NextPage } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import DefaultLayout from "../../components/layouts/defaultLayout";
import NewsBanner from "../../assets/images/sample/banner/news-banner.png";
import { useTranslation } from "react-i18next";
import NewsList from "../../components/news-component/news-list";
import {
  FilterNewsDto,
  NewsCategoryDto,
  PaginatedListOfNewsDto,
} from "../api/general-client";
import { NewsServices } from "../api/services/news.services";
import SEO from "../../components/SEO/seo";
import { useForm } from "react-hook-form";
import { WebsiteServices } from "../api/services/website.services";

type NewsPageProps = {
  newsCategories?: NewsCategoryDto[];
  newsInfo?: any;
};

export const getServerSideProps: GetServerSideProps<NewsPageProps> = async (
  context
) => {
  const newsCategories = await NewsServices.getAllNewsCategories();
  const newsInfo = await WebsiteServices.getNewsInfo();

  return {
    props: {
      newsCategories,
      newsInfo,
    },
  };
};

const NewsPage: NextPage<NewsPageProps> = ({ newsCategories, newsInfo }) => {
  const { t } = useTranslation();
  newsCategories = [
    {
      id: undefined,
      categoryNameEn: t("all"),
      categoryNameVi: t("all"),
    },
    ...(newsCategories as NewsCategoryDto[]),
  ] as NewsCategoryDto[];
  const [currentCategory, setCurrentCategory] = useState<
    NewsCategoryDto | undefined
  >(newsCategories[0]);
  const [news, setNews] = useState<PaginatedListOfNewsDto>();
  const [hotNews, setHotNews] = useState<PaginatedListOfNewsDto>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FilterNewsDto>();
  const [filterRequest, setFilterRequest] = useState<FilterNewsDto>({
    pageNumber: pageNumber,
    pageSize: 10,
    titleEn: getValues("titleEn") || "",
    isActived: true,
    sortNewest: true,
    sortOldest: false,
  } as FilterNewsDto);

  useEffect(() => {
    onChangePage(1);
    getHotNews();
  }, []);

  const getHotNews = async () => {
    let request = {
      pageNumber: 1,
      pageSize: 4,
      isActived: true,
      isHotNews: true,
      sortNewest: true,
      sortOldest: false,
    } as FilterNewsDto;
    const res = await NewsServices.getFilterNews(request);
    setHotNews(res);
  };

  const getNewsData = async (page?: number) => {
    filterRequest.pageNumber = page ? page : pageNumber;
    filterRequest.titleEn = getValues("titleEn") || "";
    const res = await NewsServices.getFilterNews(filterRequest);
    setNews(res);
    setPageNumber(page ? page : pageNumber);
  };

  const onSelectCategory = async (category: NewsCategoryDto) => {
    if (category.id) {
      filterRequest.categoryId = category.id;
    } else {
      filterRequest.categoryId = undefined;
    }

    onChangePage(1);
    setCurrentCategory(category);
  };

  const onSearchInput = async (data: FilterNewsDto) => {
    filterRequest.titleEn = data.titleEn;
    onChangePage(1);
  };

  const onChangePage = (page: number) => {
    getNewsData(page);
    setPageNumber(page);
  };

  return (
    <DefaultLayout
      headerProps={{
        isHideBreadcrumbs: true,
        banners: [newsInfo?.data?.backgroundImage?.fileUrl],
      }}
    >
      <SEO
        seo={{
          metaTitle: "News",
        }}
      />
      <div className="news-container">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-8 news-left-side mb32">
              <p className="line-title">{t("news")}</p>
              <p className="category-name mt12">
                {currentCategory?.categoryNameEn} {t("news")}
              </p>
              <div className="mt16">
                <NewsList
                  news={news}
                  pageNumber={pageNumber}
                  onChangePage={onChangePage}
                />
              </div>
            </div>
            <div className="col-12 col-lg-4 news-right-side">
              <div className="section">
                <div className="search">
                  <p className="search-title">{t("search")}</p>
                  <form onSubmit={handleSubmit(onSearchInput)}>
                    <div className="form-group search-box">
                      <input
                        {...register("titleEn")}
                        className="form-control"
                        placeholder={t("searching") + "..."}
                      />
                      <i
                        className="fa fa-search"
                        onClick={() => onChangePage(1)}
                      ></i>
                    </div>
                  </form>
                </div>
              </div>
              <div className="section">
                <div className="category">
                  <div className="semiBold brightGreen fontMP">
                    {t("category")}
                  </div>
                  <div className="mb16">
                    <div className="category-menu mt8">
                      {newsCategories &&
                        newsCategories.map((item, index) => (
                          <div
                            key={item.id}
                            className={
                              currentCategory?.id === item.id
                                ? "menu-item actived"
                                : "menu-item"
                            }
                            onClick={() => onSelectCategory(item)}
                          >
                            <p className="line-title">{item.categoryNameEn}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                {hotNews?.totalCount && hotNews.totalCount > 0 ? (
                  <div className="hot-news mt16">
                    <div className="semiBold brightGreen fontMP">
                      {t("hotNews")}
                    </div>
                    <div className="news-list mt8">
                      <NewsList news={hotNews} isMinimizeList={true} />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default NewsPage;
