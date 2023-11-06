import Cookies from "js-cookie";
import { GeneralClient } from "../apis/general-client";
import i18n from "../i18n";
import { UserType } from "../views/auth/auth-controllers/auth-model";

const generalClient = new GeneralClient(process.env.REACT_APP_API_URL);

const currentLanguageCode = Cookies.get("i18next") || "vi";
const currentLanguage = {
  isEN: currentLanguageCode === "en",
  isVI: currentLanguageCode === "vi",
};

const changeLanguage = (lang?: string) => {
  const _currentLanguage = currentLanguage.isEN ? "en" : "vi";
  Cookies.set("i18next", lang || _currentLanguage);
  i18n.changeLanguage(lang || _currentLanguage);
  window.location.reload();
};

const appLoading = {
  show: () => {
    document.getElementById("app-loading")?.classList.remove("dNone");
  },
  dismiss: () => {
    document.getElementById("app-loading")?.classList.add("dNone");
  },
};

const getToken = () => {
  const user = getUser();
  return user.accessToken;
};

const getUser = () => {
  const isRemember = localStorage.getItem("rememberMe") === "true";
  return JSON.parse(
    isRemember
      ? localStorage.getItem("user") || "{}"
      : sessionStorage.getItem("user") || "{}"
  ) as UserType;
};

const shuffleArray = (array: any[]) => {
  let currentIndex = array.length;
  let randomIndex = 0;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export {currentLanguage, changeLanguage, appLoading, getUser, getToken, generalClient, shuffleArray };
