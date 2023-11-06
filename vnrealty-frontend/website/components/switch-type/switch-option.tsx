import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type SwitchOptionProps = {
  leftLabel: string;
  rightLabel: string;
  isOn: boolean;
  onChange?: (isOn?: boolean) => void;
};

const SwitchOption: React.FC<SwitchOptionProps> = (
  props: SwitchOptionProps
) => {
  const { t } = useTranslation();
  const [isOn, setIsOn] = useState<boolean>(props.isOn ? props.isOn : false);

  useEffect(() => {
    setIsOn(props.isOn)
  }, [props]);

  const onChangeSwitch = () => {
    const value = isOn ? false : true;
    setIsOn(value);
    props.onChange && props.onChange(value);
  };

  return (
    <div className="switch-type-container">
      <div className="switch-option-container">
        <div className="form-group switch-form">
          <div
            className={isOn ? "switch-button on" : "switch-button"}
            onClick={() => onChangeSwitch()}
          >
            <span className="option left-option">{t(props.leftLabel)}</span>
            <span className="option blank-option"></span>
            <span className="option right-option">{t(props.rightLabel)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwitchOption;
