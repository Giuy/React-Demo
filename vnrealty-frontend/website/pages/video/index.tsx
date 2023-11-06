import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import DefaultLayout from "../../components/layouts/defaultLayout";
import SEO from "../../components/SEO/seo";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { MasterDataServices } from "../api/services/masterdata.services";
import { VideoServices } from "../api/services/video.services";
import { FilterVideoDto, PaginatedListOfVideoDto } from "../api/general-client";
import { useForm } from "react-hook-form";
import { WebsiteServices } from "../api/services/website.services";
import moment from "moment";
import { FacebookShareButton, TwitterShareButton } from "next-share";
import { ROUTES } from "../../constants/routes";
import FacebookIcon from "../../assets/images/icons/facebook.svg";
import TwitterIcon from "../../assets/images/icons/twitter.svg";
import { Pagination, Stack } from "@mui/material";

type VideoPageProps = {
  videoCategories?: any[];
  videoInfos?: any;
};

export const getServerSideProps: GetServerSideProps<
  VideoPageProps
> = async () => {
  const videoCategories = await MasterDataServices.getVideoCategory();
  const videoInfos = await WebsiteServices.getVideoInfo();

  return {
    props: {
      videoCategories,
      videoInfos,
    },
  };
};

const VideoPage: NextPage<VideoPageProps> = ({
  videoCategories,
  videoInfos,
}) => {
  const { t } = useTranslation();
  const [sharingUrl, setSharingUrl] = useState<string>(
    process.env.DOMAIN + ROUTES.VIDEO
  );
  const [isShowVideoInfo, setIsShowVideoInfo] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FilterVideoDto>();
  const [filterRequest, setFilterRequest] = useState<FilterVideoDto>({
    pageNumber: currentPage,
    pageSize: 10,
    highlight: false,
  } as FilterVideoDto);
  const [videoList, setVideoList] = useState<PaginatedListOfVideoDto>();
  const [hightlightedVideo, setHightlightedVideo] =
    useState<PaginatedListOfVideoDto>();
  videoCategories = [
    {
      id: undefined,
      data: {
        name: t("all"),
      },
    },
    ...(videoCategories as any[]),
  ] as any[];
  const [currentCategory, setCurrentCategory] = useState<any>(
    videoCategories && videoCategories[0]
  );

  useEffect(() => {
    filterVideo();
    getHightlightedVideo();
  }, []);

  const onSelectCategory = (item: any) => {
    if (item.id) {
      filterRequest.videoCategoryId = item.id;
    } else {
      filterRequest.videoCategoryId = undefined;
    }

    setCurrentCategory(item);
    onChangePage(undefined, 1);
  };

  const onSearchInput = async (data: FilterVideoDto) => {
    filterRequest.title = data.title;
    onChangePage(undefined, 1);
  };

  const filterVideo = async (page?: number) => {
    filterRequest.pageNumber = page ? page : currentPage;
    filterRequest.title = getValues("title") || "";
    const res = await VideoServices.getFilterVideo(filterRequest);
    setVideoList(res);
  };

  const getHightlightedVideo = async () => {
    var filter = {
      pageNumber: 1,
      pageSize: 12,
      highlight: true,
    } as FilterVideoDto;
    const res = await VideoServices.getFilterVideo(filter);
    setHightlightedVideo(res);
  };

  const onChangePage = (e: any, page: any) => {
    filterRequest.pageNumber = page;
    filterVideo(page);
    setCurrentPage(page);
  };

  return (
    <DefaultLayout
      headerProps={{ banners: [videoInfos?.data?.backgroundImage.fileUrl] }}
    >
      <SEO
        seo={{
          metaTitle: "Video",
        }}
      />
      <div className="video-container">
        <div className="container">
          <div className="highlighted-video">
            <p className="header-title">{t("highlightedVideo")}</p>
            <div className="slider mt32">
              <Swiper
                modules={[Navigation]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                direction="horizontal"
              >
                {hightlightedVideo &&
                  hightlightedVideo.items?.map((item, index) => (
                    <SwiperSlide key={item.id}>
                      <div className="video-frame">
                        <iframe
                          width="100%"
                          height="100%"
                          src={item.orginalLink}
                          allowFullScreen={true}
                        ></iframe>
                        <div className="video-info">
                          <div className="d-flex justify-content-end align-items-start flex-column w-100 h-100 background-linear-gradient pl16 pb16">
                            {item.videoCategory && (
                              <p className="tag">{item.videoCategory?.name}</p>
                            )}
                            <p className="title mt8 short-title-text">
                              {item.title}
                            </p>
                            <p className="timeline mt8">
                              <i className="fa fa-calendar brightGreen mr8 semiBold"></i>
                              {moment(item.created).format("ll")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
          <div className="row mb60 mt60">
            <div className="col-12 col-lg-8">
              <div className="lasted-video">
                <p className="header-title">{t("lastedVideo")}</p>
                <div className="row mt32">
                  {videoList &&
                    videoList.items?.map((item, index) => (
                      <div key={item.id} className="col-12">
                        <div className="video-card">
                          <div className="top-card">
                            <iframe
                              width="100%"
                              height="100%"
                              src={item.orginalLink}
                              allowFullScreen={true}
                            ></iframe>
                          </div>
                          <div className="bottom-card mt8">
                            <div className="d-block d-md-flex justify-content-between align-align-items-center">
                              <p className="title short-title-text">
                                {item.title}
                              </p>
                              <div className="share d-block d-md-flex justify-content-between align-align-items-center">
                                <FacebookShareButton
                                  url={sharingUrl}
                                  className="mr4"
                                >
                                  <Image src={FacebookIcon} alt="" />
                                </FacebookShareButton>

                                <TwitterShareButton
                                  url={sharingUrl}
                                  hashtags={["vnrealty"]}
                                >
                                  <Image src={TwitterIcon} alt="" />
                                </TwitterShareButton>
                              </div>
                            </div>
                            {item.videoCategory && (
                              <p className="tag">{item.videoCategory?.name}</p>
                            )}
                            <p className="timeline mt8">
                              <i className="fa fa-calendar brightGreen mr8 semiBold"></i>
                              {moment(item.created).format("ll")}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                {videoList?.totalCount && videoList.totalCount > 0 ? (
                  <div className="paginator mt32 mb32 d-flex justify-content-center align-items-center">
                    <Stack spacing={2}>
                      <Pagination
                        count={videoList?.totalPages || 0}
                        page={currentPage}
                        variant="outlined"
                        shape="rounded"
                        onChange={onChangePage}
                      />
                    </Stack>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="col-12 col-lg-3 offset-lg-1">
              <div className="right-side">
                <div className="section">
                  <div className="search">
                    <p className="search-title">{t("search")}</p>
                    <form onSubmit={handleSubmit(onSearchInput)}>
                      <div className="form-group search-box">
                        <input
                          {...register("title")}
                          className="form-control"
                          placeholder={t("searching") + "..."}
                        />
                        <i
                          className="fa fa-search"
                          onClick={() => filterVideo()}
                        ></i>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="section">
                  <div className="category">
                    <div className="semiBold fontMP">{t("category")}</div>
                    <div className="mb16">
                      <div className="category-menu mt8">
                        {videoCategories &&
                          videoCategories.map((item, index) => (
                            <div
                              key={item.id}
                              className={
                                currentCategory.id === item.id
                                  ? "menu-item actived"
                                  : "menu-item"
                              }
                              onClick={() => onSelectCategory(item)}
                            >
                              <p className="line-title">{item.data?.name}</p>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default VideoPage;
