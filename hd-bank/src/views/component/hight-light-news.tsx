import Cookies from "js-cookie";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { NewsDto } from "../../apis/general-client";
import { CustomText } from "../../components/styled-custom";
import { IItemData } from "./list";

type IDataGrid = {
  data: NewsDto[] | undefined;
};

function HightLightNews(props: IDataGrid) {
  const { data } = props;
  const lang = Cookies.get("i18next");
  const isVi = lang === 'vi';
  return (
    <div className="hight-light-container">
      {data &&
        data.map(
          (item, index) =>
            index < 3 && (
              <Link to={"/detail/" + item.id} state={'news'} key={index} className="item">
                <div className="item-img">
                  <img
                    src={item?.imageUrl ? item?.imageUrl : ""}
                    alt={item?.imageName ? item?.imageName : ""}
                  />
                </div>
                <div className="item-content">
                  <CustomText className="semiBold textEllipsis">
                    {item?.title && isVi ? item?.title : item?.titleEN}
                  </CustomText>
                  {index === 0 && (
                    <CustomText>
                      {item?.created
                        ? moment(item?.created).format("DD-MM-YYYY HH:mm")
                        : ""}
                    </CustomText>
                  )}
                </div>
              </Link>
            )
        )}
    </div>
  );
}

export default HightLightNews;
