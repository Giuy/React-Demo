import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { InputAdornment, InputProps, TextField } from "@mui/material";
import { ChangeEvent, FC, memo, useState } from "react";
import { CustomText } from "./styled-custom";

type CustomTextFieldType = {
  iconStart?: any;
  iconEnd?: any;
  iconStartAction?: () => void;
  iconEndAction?: () => void;
  variant?: "outlined" | "filled" | "standard";
  label: string;
  className?: string;
  type?: "number" | "text" | "password" | "file";
  inputProps?: InputProps;
  helperText?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const CustomTextField: FC<CustomTextFieldType> = memo((props) => {
  const isPassword = props.type === "password";
  const [type, setType] = useState(props.type);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [visibleIcon, setVisibleIcon] = useState(<VisibilityIcon />);

  const passwordVisibleHandle = () => {
    setType(type === "password" ? "text" : "password");
    setPasswordVisible(!passwordVisible);
    setVisibleIcon(
      passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />
    );
  };

  const adorment = (icon: any, action: any, position: "start" | "end") => {
    return (
      icon && (
        <InputAdornment
          style={action !== undefined ? { cursor: "pointer" } : {}}
          onClick={action}
          position={position}
        >
          {typeof icon === "string" ? (
            <img className="icon-text-field" src={icon} alt="" />
          ) : (
            icon
          )}
        </InputAdornment>
      )
    );
  };

  return (
    <div
      className={`custom-text-field ${props.className} ${
        props.inputProps?.error ? "error-field" : ""
      }`}
    >
      <TextField
        label={props.label}
        InputProps={{
          ...props.inputProps,
          startAdornment: adorment(
            props.iconStart,
            props.iconStartAction,
            "start"
          ),
          endAdornment: adorment(
            isPassword ? visibleIcon : props.iconEnd,
            isPassword ? passwordVisibleHandle : props.iconEndAction,
            "end"
          ),
          autoComplete: "off",
          type: type,
          onChange: props.onChange
        }}
        variant={props.variant || "standard"}
      />
      {props.inputProps?.error && (
        <CustomText className="helper-text">{props.helperText}</CustomText>
      )}
    </div>
  );
});

export { CustomTextField };
