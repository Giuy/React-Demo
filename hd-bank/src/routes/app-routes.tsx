import { BrowserRouter, Route, Routes, MemoryRouter } from "react-router-dom";
import App from "../App";
import AboutUs from "../views/about-us/about-us";
import LoginScreen from "../views/auth/login/login";
import RegisterScreen from "../views/auth/register/register";
import BusinessFields from "../views/business-fields/business-fields";
import DetailTemplate from "../views/component/template-detail";
import Contact from "../views/contact/contact";
import Hire from "../views/hire/hire";
import News from "../views/news/news";
import Trading from "../views/trading/trading";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="login" element={<LoginScreen />} />
        <Route path="register" element={<RegisterScreen />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="business-fields" element={<BusinessFields />} />
        <Route path="news" element={<News />} />
        <Route path="hire" element={<Hire />} />
        <Route path="contact" element={<Contact />} />
        <Route path="detail/:id" element={<DetailTemplate/>}/>
        <Route path="trading" element={<Trading />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
