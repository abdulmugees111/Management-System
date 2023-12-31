import store from "store";
import actions from "./actions";

const STORED_SETTINGS = (storedSettings) => {
  const settings = {};
  Object.keys(storedSettings).forEach((key) => {
    const item = store.get(`app.settings.${key}`);
    settings[key] = typeof item !== "undefined" ? item : storedSettings[key];
  });
  return settings;
};

const initialState = {
  ...STORED_SETTINGS({
    authProvider: "jwt", // firebase, jwt
    logo: "Clean UI Pro",
    locale: "en",
    isSidebarOpen: false,
    isSupportChatOpen: false,
    isMobileView: false,
    isMobileMenuOpen: false,
    isMenuCollapsed: false,
    menuLayoutType: "left", // left, top, nomenu
    routerAnimation: "slide-fadein-up", // none, slide-fadein-up, slide-fadein-right, fadein, zoom-fadein
    menuColor: "white", // white, dark, gray
    theme: "default", // default, dark
    authPagesColor: "white", // white, gray, image
    primaryColor: "#4b7cf3",
    leftMenuWidth: 256,
    isMenuUnfixed: false,
    isMenuShadow: false,
    isTopbarFixed: false,
    isGrayTopbar: false,
    isContentMaxWidth: false,
    isAppMaxWidth: false,
    isGrayBackground: false,
    isCardShadow: true,
    isSquaredBorders: false,
    isBorderless: false,
    rtl: false,
  }),
};

export default function settingsReducer(state = initialState, action) {
  console.log("action is", action);
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload };
    case actions.CHANGE_LOCALE:
      return { ...state, locale: action.payload, rtl: action.payload === "ar" ? true : false };
    default:
      return state;
  }
}
