import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { AppProvider } from "./context/app-context";
import { Box, CircularProgress } from "@mui/material";
import AppRoutes from "./routes/app-routes";
import "./index.css";
import "./i18n";
import "./main.scss";
import "swiper/css/bundle";
import "swiper/css";
import AppLoading from "./components/app-loading";

const rootElement = document.getElementById("root");
const loadingMarkup = (
  <Box sx={{ display: "flex" }}>
    <CircularProgress />
  </Box>
);

ReactDOM.render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </React.StrictMode>
    <AppLoading />
  </Suspense>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
