import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import StyledVariables from "../helpers/materials/_variables";

// Styled Components
const CustomText = styled.p`
  margin: 0;
  padding: 0;
  font-size: ${StyledVariables.fontSize.fontM}px;
  color: ${StyledVariables.colors.black};
`;

const loadingMarkup = (
  <div style={{ display: "flex" }}>
    <CircularProgress />
  </div>
);

export { CustomText, loadingMarkup };
