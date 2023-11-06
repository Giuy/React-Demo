import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { AppContext } from "./context/app-context";
import "swiper/css/bundle";
import HeaderBar from "./components/header-bar";
import HomePage from "./views/home/home";
import FooterSite from "./components/footer";
import Scroll from "./components/scroll";

function App() {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(AppContext);

  return (
    <div className="App">
      <Scroll showBelow={350}></Scroll>
      <HeaderBar isHome={true} navFromNavigate="1" />
      <HomePage />
      <FooterSite />
    </div>
  );
}

export default App;
