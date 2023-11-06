import { ReactNode, useCallback, useEffect, useState } from "react";
import Header, { HeaderProps } from "../header/header";
import Footer from "../footer/footer";
import { ToastContainer } from "react-toastify";
import { SearchPropertyProps } from "../search-property/search-property";

type DefaultLayoutProps = {
  children?: ReactNode;
  headerProps?: HeaderProps;
  searchingProps?: SearchPropertyProps;
};

const DefaultLayout: React.FC<DefaultLayoutProps> = (
  props: DefaultLayoutProps
) => {
  const [showBelow, setShowBelow] = useState<number>(350);
  const [show, setShow] = useState(showBelow ? false : true);

  useEffect(() => {
    // if (window.PEBONA) window.PEBONA.init();

    if (showBelow) {
      window.addEventListener(`scroll`, handleScroll);
      return () => window.removeEventListener(`scroll`, handleScroll);
    }
  }, []);

  const handleScroll = () => {
    if (window.scrollY > showBelow) {
      if (!show) setShow(true);
    } else {
      if (show) setShow(false);
    }
  };

  const handleClick = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const onMainScriptLoad = useCallback(() => {
    window.PEBONA.init();
  }, []);

  return (
    <>
      <div id="whole" className="whole-site-wrapper">
        <Header
          isBannerFullScreen={props.headerProps?.isBannerFullScreen}
          isHidePageTitle={props.headerProps?.isHidePageTitle}
          isHideBanner={props.headerProps?.isHideBanner}
          isShowSearchBox={props.headerProps?.isShowSearchBox}
          isAutoPlayBanner={props.headerProps?.isAutoPlayBanner}
          isHomePage={props.headerProps?.isHomePage}
          homeInfo={props.headerProps?.homeInfo}
          ourServices={props.headerProps?.ourServices}
          banners={props.headerProps?.banners}
          isHideBreadcrumbs={props.headerProps?.isHideBreadcrumbs}
          searchingProps={props.searchingProps}
        />
        <main id="content" className="main-content-wrapper">
          {props.children}
        </main>
        {show && (
          <div
            id="gotoTop"
            className="icon-angle-up"
            onClick={handleClick}
          ></div>
        )}
        <ToastContainer />
        <Footer />
        {/* <div id="to_top" onClick={() => onScrollToTop()}>
          <i className="ion ion-ios-arrow-forward"></i>
          <i className="ion ion-ios-arrow-forward"></i>
        </div> */}
      </div>
      {/* <Script
        strategy="afterInteractive"
        src="/js/main.js"
        onLoad={onMainScriptLoad}
      /> */}
    </>
  );
};

export default DefaultLayout;
