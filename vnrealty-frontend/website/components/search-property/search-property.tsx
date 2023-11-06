import { Grid, Slider } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { PropertyTransactionType } from "../../pages/api/general-client";
import PropertyModel, {
  AppFilteringPropertyType,
} from "../../pages/api/model/search-property.model";
import { MasterDataServices } from "../../pages/api/services/masterdata.services";
import CustomSelect from "../custom-select/custom-select";
import SwitchOption from "../switch-type/switch-option";
import { ROUTES } from "../../constants/routes";
import { formatNumber } from "../../helpers/utils";

type SearchPropertyFormType = {
  labelKey: string;
  values?: ValueType[];
  separateValue?: SeparateValueType[];
};

let priceRange: any;
let areaRange: any;

export type SearchPropertyProps = {
  isMinimize?: boolean;
  isListingPage?: boolean;
  onSearch?: (data: AppFilteringPropertyType) => void;
};

const searchingDefaultValues: SearchPropertyFormType[] = [
  {
    labelKey: "chooseLocations",
    separateValue: [],
  },
  {
    labelKey: "propertyType",
    values: [],
  },
  {
    labelKey: "beds",
    values: [
      {
        name: "Any",
        value: undefined,
      },
      {
        name: "1",
        value: 1,
      },
      {
        name: "2",
        value: 2,
      },
      {
        name: "3",
        value: 3,
      },
      {
        name: "4",
        value: 4,
      },
      {
        name: "5",
        value: 5,
      },
      {
        name: "5+",
        value: 6,
      },
    ],
  },
  {
    labelKey: "baths",
    values: [
      {
        name: "Any",
        value: undefined,
      },
      {
        name: "1",
        value: 1,
      },
      {
        name: "2",
        value: 2,
      },
      {
        name: "3",
        value: 3,
      },
      {
        name: "4",
        value: 4,
      },
      {
        name: "5",
        value: 5,
      },
      {
        name: "5+",
        value: 6,
      },
    ],
  },
];

const SearchProperty: React.FC<SearchPropertyProps> = (
  props: SearchPropertyProps
) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [searchingForm, setSearchingForm] = useState<SearchPropertyFormType[]>(
    searchingDefaultValues
  );

  const [isShowSearchBody, setIsShowSearchBody] = useState<boolean>(true);
  const [isAdvanceMenu, setIsAdvanceMenu] = useState<boolean>(false);

  const [priceValue, setPriceValue] = useState<number[]>([]);
  const [areaValue, setAreaValue] = useState<number[]>([]);

  const handlePriceChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    const minDistance = priceRange.minPrice || 10;
    let result: number[];
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        result = [clamped, clamped + minDistance];
        setPriceValue(result);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        result = [clamped - minDistance, clamped];
        setPriceValue(result);
      }
    } else {
      result = newValue;
      setPriceValue(newValue as number[]);
    }
    PropertyModel.filterPropertyModel.priceRangeFrom = result[0];
    PropertyModel.filterPropertyModel.priceRangeTo = result[1];
  };

  const handleAreaChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    const minDistance = areaRange.minPrice || 10;
    let result: number[];
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        result = [clamped, clamped + minDistance];
        setAreaValue(result);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        result = [clamped - minDistance, clamped];
        setAreaValue(result);
      }
    } else {
      result = newValue;
      setAreaValue(newValue as number[]);
    }
    PropertyModel.filterPropertyModel.areaFrom = result[0];
    PropertyModel.filterPropertyModel.areaTo = result[1];
  };

  const getMasterData = async () => {
    const priceRangeRes = await MasterDataServices.getMasterDataPriceRange();
    const areaRangeRes = await MasterDataServices.getMasterDataAreaRange();
    const propertyType = await MasterDataServices.getPropertyType();

    let tmpSearchingForm = searchingForm;
    const propertySearchingData = propertyType.map((x: any) => ({
      name: x.data.name,
      value: x.id,
    }));
    tmpSearchingForm[1].values = propertySearchingData;
    setSearchingForm(tmpSearchingForm);

    // Price range
    try {
      priceRange = priceRangeRes[0].data;
      priceRange.minValue = parseInt(priceRange.minValue);
      priceRange.maxValue = parseInt(priceRange.maxValue);
      setPriceValue([
        PropertyModel.filterPropertyModel?.priceRangeFrom
          ? PropertyModel.filterPropertyModel?.priceRangeFrom
          : parseInt(priceRangeRes[0].data?.minValue),
        PropertyModel.filterPropertyModel?.priceRangeTo
          ? PropertyModel.filterPropertyModel?.priceRangeTo
          : parseInt(priceRangeRes[0].data?.maxValue),
      ]);
    } catch (err) {}

    // Area range
    try {
      areaRange = areaRangeRes[0].data;
      areaRange.minValue = parseInt(areaRange.minValue);
      areaRange.maxValue = parseInt(areaRange.maxValue);
      setAreaValue([
        PropertyModel.filterPropertyModel?.areaFrom
          ? PropertyModel.filterPropertyModel?.areaFrom
          : parseInt(areaRangeRes[0].data?.minValue),
        PropertyModel.filterPropertyModel?.areaTo
          ? PropertyModel.filterPropertyModel?.areaTo
          : parseInt(areaRangeRes[0].data?.maxValue),
      ]);
    } catch (err) {}
  };

  useEffect(() => {
    getMasterData();

    if (!props.isListingPage) {
      if (window.innerWidth < 770) {
        setIsShowSearchBody(false);
      } else {
        setIsShowSearchBody(true);
      }
    } else {
      setIsShowSearchBody(true);
    }

    // return () => window.addEventListener("resize", handleResize);
  }, [PropertyModel.filterPropertyModel]);

  const onShowSearchBody = () => {
    setIsShowSearchBody(isShowSearchBody ? false : true);
  };

  const onChangeSwitch = (isOn?: boolean) => {
    if (isOn) {
      PropertyModel.filterPropertyModel.listTransactionType = [
        PropertyTransactionType.Sale,
      ];
    } else {
      PropertyModel.filterPropertyModel.listTransactionType = [
        PropertyTransactionType.Rent,
      ];
    }
  };

  const onSelectValue = (data: any, labelKey: string = "") => {
    if (Array.isArray(data)) {
      // if (
      //   data.filter((x: any) => x.label === searchingForm[1].labelKey).length >
      //   0
      // ) {
      //   PropertyModel.filterPropertyModel.listPropertyType = data.map(
      //     (x: any) => x.value
      //   );
      if (labelKey == searchingForm[1].labelKey) {
        PropertyModel.filterPropertyModel.listPropertyType = data.map(
          (x: any) => x.value
        );
      } else if (data.length === 0) {
        PropertyModel.filterPropertyModel.listPropertyType = undefined;
      }
    } else {
      if (data.label === searchingForm[2].labelKey) {
        PropertyModel.filterPropertyModel.numberOfBedRooms = data.value;
      }
      if (data.label === searchingForm[3].labelKey) {
        PropertyModel.filterPropertyModel.numberOfBathRooms = data.value;
      }
    }
  };

  const onSearch = (e: any) => {
    e.stopPropagation();
    if (!PropertyModel.filterPropertyModel.listTransactionType) {
      PropertyModel.filterPropertyModel.listTransactionType = [
        PropertyTransactionType.Rent,
      ];
    }
    console.log(PropertyModel.filterPropertyModel);
    if (!props.isListingPage) {
      router.push(ROUTES.LISTING.INDEX);
    } else {
      props.onSearch && props.onSearch(PropertyModel.filterPropertyModel);
    }
  };

  const onResetSearch = () => {
    PropertyModel.filterPropertyModel = {};
    getMasterData();
  };

  return (
    <>
      <div className="search-property-container">
        <div className="container">
          {!props.isListingPage && (
            <div
              className="search-tag"
              onClick={() => {
                onShowSearchBody();
              }}
            >
              {t("searchProperties")}
            </div>
          )}
          {isShowSearchBody && (
            <div className="search-body py-5">
              <div className="row">
                <div className="col-12 col-lg-2 mb-2">
                  <label className="label-title uppercase mb8">
                    {t("type")}
                  </label>
                  <SwitchOption
                    leftLabel="rent"
                    rightLabel="buy"
                    isOn={
                      PropertyModel.filterPropertyModel.listTransactionType?.includes(
                        PropertyTransactionType.Sale
                      )
                        ? true
                        : false
                    }
                    onChange={onChangeSwitch}
                  />
                </div>
                <div className="col-12 col-lg-10">
                  <div className="row">
                    {searchingForm &&
                      searchingForm.map((item, index) => {
                        if (
                          !props.isMinimize ||
                          (props.isMinimize && index !== 2 && index !== 3)
                        )
                          return (
                            <div
                              key={index}
                              className={
                                props.isMinimize
                                  ? "col-12 col-lg-4 mb-2"
                                  : "col-12 col-md-6 col-lg-3 mb-2"
                              }
                            >
                              {(!props.isMinimize ||
                                (props.isMinimize &&
                                  index !== 2 &&
                                  index !== 3)) && (
                                <CustomSelect
                                  label={item.labelKey}
                                  isLabelUppercase={true}
                                  options={item.values || []}
                                  optionGroups={item.separateValue}
                                  displayNameVariable={"name"}
                                  isMultipleSelect={index === 1 ? true : false}
                                  onChange={(e) => {
                                    onSelectValue(e, item.labelKey);
                                  }}
                                  selectedValue={
                                    index === 2
                                      ? item.values?.filter(
                                          (x) =>
                                            x.value ===
                                            PropertyModel.filterPropertyModel
                                              .numberOfBedRooms
                                        )[0]
                                      : index === 3
                                      ? item.values?.filter(
                                          (x) =>
                                            x.value ===
                                            PropertyModel.filterPropertyModel
                                              .numberOfBathRooms
                                        )[0]
                                      : item.values?.[0]
                                  }
                                  multiSelectedValues={
                                    index === 1
                                      ? item.values?.filter((x) =>
                                          PropertyModel.filterPropertyModel.listPropertyType?.includes(
                                            x.value?.toString() || ""
                                          )
                                        )
                                      : undefined
                                  }
                                />
                              )}
                            </div>
                          );
                      })}
                    {props.isMinimize && (
                      <div className="col-12 col-lg-4 mb-2">
                        <div className="row">
                          <div className="col-12 col-md-6">
                            <button
                              className="reset-button form-control semiBold uppercase minimize"
                              onClick={onResetSearch}
                            >
                              {t("reset")}
                            </button>
                          </div>
                          <div className="col-12 col-md-6">
                            <button
                              className="search-button form-control semiBold uppercase minimize"
                              onClick={onSearch}
                            >
                              {t("search")}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {(!props.isMinimize || (props.isMinimize && isAdvanceMenu)) && (
                <div className="row">
                  <div
                    className={
                      props.isMinimize ? "col-12 col-md-4" : "col-12 col-md-4"
                    }
                  >
                    <label className="label-title uppercase">
                      {t("priceRange")}
                    </label>
                    <div className="select-range">
                      <Slider
                        getAriaLabel={() => "Price Range"}
                        onChange={handlePriceChange}
                        value={priceValue}
                        valueLabelDisplay="on"
                        valueLabelFormat={(value: number) => {
                          return `${formatNumber(value)}`;
                        }}
                        min={priceRange ? priceRange?.minValue : 0}
                        max={priceRange ? priceRange?.maxValue : 20}
                        disableSwap
                      />
                    </div>
                  </div>
                  <div
                    className={
                      props.isMinimize ? "col-12 col-md-4" : "col-12 col-md-4"
                    }
                  >
                    <label className="label-title uppercase">
                      {t("propertyArea")}
                    </label>
                    <div className="select-range">
                      <Slider
                        getAriaLabel={() => "Area Range"}
                        onChange={handleAreaChange}
                        value={areaValue}
                        valueLabelDisplay="on"
                        valueLabelFormat={(value: number) => {
                          return `${formatNumber(value)}`;
                        }}
                        min={areaRange ? areaRange?.minValue : 0}
                        max={areaRange ? areaRange?.maxValue : 20}
                        disableSwap
                      />
                    </div>
                  </div>
                  {props.isMinimize &&
                    searchingForm &&
                    searchingForm.map((item, index) => {
                      if (index === 2 || index === 3)
                        return (
                          <div className="col-12 col-md-2" key={index}>
                            <CustomSelect
                              label={item.labelKey}
                              isLabelUppercase={true}
                              options={item.values || []}
                              optionGroups={item.separateValue}
                              displayNameVariable={"name"}
                              onChange={onSelectValue}
                              selectedValue={
                                index === 2
                                  ? item.values?.filter(
                                      (x) =>
                                        x.value ===
                                        PropertyModel.filterPropertyModel
                                          .numberOfBedRooms
                                    )[0]
                                  : index === 3
                                  ? item.values?.filter(
                                      (x) =>
                                        x.value ===
                                        PropertyModel.filterPropertyModel
                                          .numberOfBathRooms
                                    )[0]
                                  : item.values?.[0]
                              }
                            />
                          </div>
                        );
                    })}
                  {!props.isMinimize && (
                    <div className="col-12 col-md-4">
                      <div className="row">
                        <div className="col-12 col-md-6">
                          <button
                            className="reset-button form-control semiBold uppercase minimize"
                            onClick={onResetSearch}
                          >
                            {t("reset")}
                          </button>
                        </div>
                        <div className="col-12 col-md-6">
                          <button
                            className="search-button form-control semiBold uppercase minimize"
                            onClick={(e) => {
                              onSearch(e);
                            }}
                          >
                            {t("search")}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {props.isMinimize && (
        <div className="advanced-search">
          <p
            className="d-flex justify-content-center align-align-items-center"
            onClick={() => setIsAdvanceMenu(isAdvanceMenu ? false : true)}
          >
            <span>
              <i className="icon-line-plus"></i>
            </span>
            <span>{t("advancedSearch")}</span>
          </p>
        </div>
      )}
    </>
  );
};

export default SearchProperty;
