import { useTranslation } from "react-i18next";
import Image from "next/image";
import {
  NewsDto,
  PaginatedListOfNewsDto,
} from "../../pages/api/general-client";
import moment from "moment";
import { getNewsDetailUrl } from "../../helpers/url";
import { Pagination, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { ROUTES } from "../../constants/routes";

type NewsListProps = {
  news?: PaginatedListOfNewsDto;
  isMinimizeList?: boolean;
  pageNumber?: number;
  isHidePaging?: boolean;
  onChangePage?: (page: number) => void;
};

const NewsList: React.FC<NewsListProps> = ({
  news,
  isMinimizeList,
  pageNumber,
  isHidePaging,
  onChangePage,
}) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<number>(
    pageNumber ? pageNumber : 1
  );

  useEffect(() => {
    handleChange(undefined, pageNumber);
  }, [pageNumber]);

  const handleChange = (e: any, value: any) => {
    onChangePage?.(value);
    setCurrentPage(value);
  };

  return (
    <div
      className={
        isMinimizeList ? "news-component minimize-list" : "news-component"
      }
    >
      <div className="news-list">
        <div className="row">
          {news &&
            news.items?.map((item, index) => (
              <div key={item.id} className="col-12">
                <div
                  className="news-card"
                  onClick={() =>
                    window.location.assign(
                      getNewsDetailUrl(item.friendlyUrl || "/")
                    )
                  }
                >
                  <div className="row">
                    <div className="col-12 col-md-5 col-lg-4">
                      <div className="thumbnail">
                        <Image
                          src={
                            (item.listImages &&
                              item.listImages.length > 0 &&
                              item.listImages[0].imageUrl) ||
                            ""
                          }
                          alt={item.titleEn}
                          layout="fill"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-7 col-lg-8">
                      <div className="news-info">
                        <div className="d-flex justify-content-start align-items-center flex-wrap">
                          {item.category && (
                            <p className="category-item">
                              {item.category.categoryNameEn}
                            </p>
                          )}
                        </div>
                        <div className={isMinimizeList ? "minimize-list" : ""}>
                          <p className="news-title short-title-text mt8">
                            {item.titleEn}
                          </p>
                          {!isMinimizeList && (
                            <div>
                              <p className="short-description-text mt8">
                                {item.descriptionsEn}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      {!isMinimizeList && (
                        <div className="timeline">
                          <div className="d-flex justify-content-between align-items-center">
                            <p className="time">
                              <i className="fa fa-calendar brightGreen semiBold mr8"></i>
                              {moment(item.created).format("ll")}
                            </p>
                            <p className="button">{t("readMore")}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {!isHidePaging &&
        !isMinimizeList &&
        news?.totalCount &&
        news?.totalCount > 0 ? (
          <div className="paginator mt32 d-flex justify-content-center align-items-center">
            <Stack spacing={2}>
              <Pagination
                count={news?.totalPages || 0}
                page={currentPage}
                variant="outlined"
                shape="rounded"
                onChange={handleChange}
              />
            </Stack>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default NewsList;
