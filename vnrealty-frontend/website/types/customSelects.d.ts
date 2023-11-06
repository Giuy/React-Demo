declare type ValueType = {
  name: string;
  value: string | number | undefined;
  onClick?: () => void;
};

declare type SeparateValueType = {
  name: string;
  value: ValueType[];
};

// declare type CustomSelectDataType = {
//   name: string;
//   value?: ValueType[];
//   separateValue?: SeparateValueType[];
// };