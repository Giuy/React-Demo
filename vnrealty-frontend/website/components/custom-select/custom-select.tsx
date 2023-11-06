import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type CustomSelectType = {
  label?: string | undefined;
  isLabelUppercase?: boolean;
  isAutoComplete?: boolean;
  onChange?: (value: any) => void;
  onReset?: () => void;
  options: ValueType[];
  optionGroups?: SeparateValueType[];
  displayNameVariable: string;
  isMultipleSelect?: boolean;
  selectedValue?: any;
  multiSelectedValues?: any[];
};

const CustomSelect: React.FC<CustomSelectType> = (props: CustomSelectType) => {
  const { t } = useTranslation();
  const [isAutoComplete, setIsAutoComplete] = useState<boolean | undefined>(
    props.isAutoComplete ? props.isAutoComplete : false
  );
  const [selectedValue, setSelectedValue] = useState<any>(
    props.selectedValue || undefined
  );
  const [multiSelectedValues, setMultiSelectedValues] = useState<any[]>(
    props.multiSelectedValues || []
  );
  const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);

  useEffect(() => {
    setIsAutoComplete(props.isAutoComplete);
    setMultiSelectedValues(props.multiSelectedValues || multiSelectedValues);
    setSelectedValue(props.selectedValue || selectedValue);
  }, [props]);

  const onSelectItem = (item: any) => {
    setSelectedValue(item);
    setIsShowDropdown(false);
    const value = { label: props.label, ...item };
    props.onChange?.(value);
  };

  const onMultiSelect = (item: any) => {
    let data = multiSelectedValues;
    item = { label: props.label, ...item };
    if (data.filter((x) => x.value === item.value).length > 0) {
      data = data.length > 1 ? data.filter((x) => x.value !== item.value) : [];
    } else {
      data = [...data, item];
    }

    setMultiSelectedValues(data);
    props.onChange?.(data);
  };

  const closeDropdown = () => {
    setIsShowDropdown(false);
  };

  return (
    <div className="custom-select-container">
      <div className="form-group">
        {props.label && (
          <label
            className={
              props.isLabelUppercase
                ? "label-title uppercase mb8"
                : "label-title mb8"
            }
          >
            {t(props.label || "")}
          </label>
        )}

        <div className="select-option">
          <div
            className="form-control display-input"
            onClick={() => setIsShowDropdown(isShowDropdown ? false : true)}
          >
            {!props.isMultipleSelect &&
              (selectedValue
                ? selectedValue[props.displayNameVariable]
                : props.options.length > 0
                ? (props.options[0] as any)[props.displayNameVariable]
                : "")}
            {props.isMultipleSelect &&
              multiSelectedValues.map((x) => x.name).join(", ")}
          </div>
          <i className="fa fa-sort-down"></i>
          {isShowDropdown && (
            <>
              {props.options || props.optionGroups ? (
                <div className="dropdown-option-result">
                  {isAutoComplete && (
                    <div className="auto-complete">
                      <input className="form-control auto-complete" />
                    </div>
                  )}
                  <div className="option-result">
                    {props.options &&
                      props.options.map((item, index) => (
                        <div
                          key={index}
                          className="option"
                          onClick={() => {
                            props.isMultipleSelect
                              ? onMultiSelect(item)
                              : onSelectItem(item);
                          }}
                        >
                          {props.isMultipleSelect ? (
                            <p>
                              {multiSelectedValues.filter(
                                (x) => item.value === x.value
                              ).length > 0 && (
                                <span>
                                  <i className="fa fa-check"></i>
                                </span>
                              )}
                              <span>
                                {(item as any)[props.displayNameVariable]}
                              </span>
                            </p>
                          ) : (
                            (item as any)[props.displayNameVariable]
                          )}
                        </div>
                      ))}
                    {/* {props.optionGroups &&
                      props.optionGroups.map((groupItem, groupIndex) => (
                        <div key={groupIndex} className="option-group">
                          <p className="option-group-title">
                            {(groupItem as any)[props.displayNameVariable]}
                          </p>
                          {groupItem.value &&
                            groupItem.value.map((item: any, index: any) => (
                              <div
                                key={index}
                                className="option"
                                onClick={() => onSelectItem(item)}
                              >
                                {item[props.displayNameVariable]}
                              </div>
                            ))}
                        </div>
                      ))} */}
                  </div>
                </div>
              ) : (
                <div className="dropdown-option-result">
                  <p>{t("noData")}</p>
                </div>
              )}
              <div className="overplay" onClick={closeDropdown}></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomSelect;
