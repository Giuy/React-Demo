import { NProgress } from "nprogress";
export {};

interface PEBONA {
  niceInit: CallableFunction;
  mainNav: CallableFunction;
  imageBgSettings: CallableFunction;
  primarySlider: CallableFunction;
  ElementsSpacingClasses: CallableFunction;
  elementsCarousel: CallableFunction;
  galleryWithThumb: CallableFunction;
  testimonialCarousel: CallableFunction;
  scrollToTop: CallableFunction;
  interactiveBehaviour: CallableFunction;
  instagramSettings: CallableFunction;
  init: CallableFunction;
}

declare global {
  interface Window {
    PEBONA: PEBONA;
    NProgress: NProgress;
  }
}

export declare type SocialNetWorkType = {
  icon: string;
  url: string;
};
