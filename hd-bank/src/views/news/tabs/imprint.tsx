import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AppRepositories } from "../../../apis/api-repositories";
import { NewsDto } from "../../../apis/general-client";
import { CustomText } from "../../../components/styled-custom";
import HightLightNews from "../../component/hight-light-news";
import LeftTemplate, { LeftPropsType } from "../../component/left-template";
import ListItems, { IItemData } from "../../component/list";
import ChildTemplate from "../../component/template";

function Imprint(categoryId: any) {
  const { id } = categoryId;
  const { t } = useTranslation();
  const [dataHightLight, setHighLightData] = useState<NewsDto[]>();
  const [newData, setNewData] = useState<NewsDto[]>();

  useEffect(() => {
    const getData = async () => {
      if (id) {
        let listNew = await AppRepositories.getNews();
        let newsByCategory = await AppRepositories.getNewsByCategory(id);
        let listHightlightNew = listNew.filter((x) => x.featured == true);
        setHighLightData(listHightlightNew);
        setNewData(newsByCategory);
      }
    };
    getData();
  }, [id]);

  function RightContent() {
    return (
      <div className="imprint-right">
        <HightLightNews data={dataHightLight} />
        {newData && newData.length > 0 && <CustomText className="fontXL semiBold mb20">
          {t("newestNews")}
        </CustomText>}
        <ListItems data={newData} />
      </div>
    );
  }

  return (
    <div>
      <ChildTemplate
        childLeft={<LeftTemplate />}
        childRight={<RightContent />}
      />
    </div>
  );
}

export default Imprint;
