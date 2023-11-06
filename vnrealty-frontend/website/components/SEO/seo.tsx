import { isNil, omitBy } from "lodash";
import Head from "next/head";
import { useMemo } from "react";
import { GLOBAL_CONFIG } from "../../constants/global";

type SEOProps = {
  seo?: SEOConfig;
};

const SEO: React.FC<SEOProps> = ({ seo }) => {
  const seoWithDefaults = useMemo(
    () => ({
      ...GLOBAL_CONFIG.defaultSeo,
      ...omitBy(seo, isNil),
    }),
    [seo]
  );
  const fullSeo = useMemo(
    () => ({
      ...seoWithDefaults,
      // Add title suffix
      metaTitle: `${GLOBAL_CONFIG.siteName} | ${seoWithDefaults.metaTitle}`,
      // Get full image URL
      shareImage: seoWithDefaults.shareImage,
    }),
    [seoWithDefaults]
  );

  return (
    <Head>
      {fullSeo.metaTitle && (
        <>
          <title>{fullSeo.metaTitle}</title>
          <meta property="og:title" content={fullSeo.metaTitle} />
          <meta name="twitter:title" content={fullSeo.metaTitle} />
        </>
      )}
      {fullSeo.metaDescription && (
        <>
          <meta name="description" content={fullSeo.metaDescription} />
          <meta property="og:description" content={fullSeo.metaDescription} />
          <meta name="twitter:description" content={fullSeo.metaDescription} />
        </>
      )}
      {fullSeo.shareImage && (
        <>
          <meta property="og:image" content={fullSeo.shareImage} />
          <meta name="twitter:image" content={fullSeo.shareImage} />
          <meta name="image" content={fullSeo.shareImage} />
        </>
      )}
      {fullSeo.article && <meta property="og:type" content="article" />}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default SEO;
