import { GetServerSideProps, NextPage } from "next";
import DefaultLayout from "../../components/layouts/defaultLayout";
import { useTranslation } from "react-i18next";
import NewsList from "../../components/news-component/news-list";
import { useEffect, useState } from "react";
import {
  FilterNewsDto,
  NewsDto,
  PaginatedListOfNewsDto,
} from "../api/general-client";
import { NewsServices } from "../api/services/news.services";
import SEO from "../../components/SEO/seo";
import NewsBanner from "../../assets/images/sample/banner/news-banner.png";
import moment from "moment";
import Link from "next/link";
import { ROUTES } from "../../constants/routes";
import { WebsiteServices } from "../api/services/website.services";

type NewsDetailPageProps = {
  news?: NewsDto;
  newsInfo?: any;
};

export const getServerSideProps: GetServerSideProps<
  NewsDetailPageProps
> = async ({ params }) => {
  if (!params?.slug)
    return {
      notFound: true,
    };

  const news = await NewsServices.getNewsDetail(params?.slug as string);
  const newsInfo = await WebsiteServices.getNewsInfo();

  return {
    props: {
      news,
      newsInfo,
    },
  };
};

const NewsDetailPage: NextPage<NewsDetailPageProps> = ({ news, newsInfo }) => {
  const { t } = useTranslation();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [relatedNews, setRelatedNews] = useState<PaginatedListOfNewsDto>();

  useEffect(() => {
    getNewsData();
  }, []);

  const getNewsData = async (page?: number) => {
    let filterParams = {
      pageNumber: page ? page : pageNumber,
      pageSize: 1000,
      categoryId: news?.categoryId,
      isActived: true,
      isHotNews: true,
      sortNewest: true,
      sortOldest: false,
    } as FilterNewsDto;
    const res = await NewsServices.getFilterNews(filterParams);
    res.items = res.items.filter((x: any) => x.id != news?.id);
    res.items = res.items.slice(0, 4);
    setRelatedNews(res);
  };

  const onChangePage = (page: number) => {
    getNewsData(page);
    setPageNumber(page);
    return page;
  };

  return (
    <DefaultLayout
      headerProps={{ banners: [newsInfo?.data?.backgroundImage?.fileUrl] }}
    >
      <SEO
        seo={{
          metaTitle: news?.titleEn,
        }}
      />
      <div className="news-detail-container">
        <div className="container">
          <div className="breadcrumbs mt24">
            <div className="d-flex">
              <Link href={ROUTES.HOME} passHref>
                <span className="mr-2 text-uppercase pointer">{t("home")}</span>
              </Link>
              <div>
                {" "}
                <i className="fa fa-chevron-right" aria-hidden="true"></i>
              </div>
              <Link className="" href={ROUTES.NEWS.INDEX}>
                <span className="ml-2 text-uppercase pointer">news</span>
              </Link>
            </div>
          </div>
          <div className="news-detail">
            <div className="header-content">
              <p className="title">{news?.titleEn}</p>
              <p className="mt20 d-flex align-align-items-center justify-content-center">
                <span className="decord mr8"></span>
                <span>{moment(news?.created).format("DD/MM/YYYY HH:mm")}</span>
                <span className="decord ml8"></span>
              </p>
            </div>
            <div className="main-content mt32">
              <div
                dangerouslySetInnerHTML={{
                  __html: news?.contentEn ? news?.contentEn : "",
                }}
              ></div>
            </div>
          </div>
          <div className="related-news">
            <p className="fontL semiBold mb20">{t("relatedNews")}</p>
            <NewsList
              news={relatedNews}
              pageNumber={pageNumber}
              onChangePage={onChangePage}
              isHidePaging={true}
            />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default NewsDetailPage;
