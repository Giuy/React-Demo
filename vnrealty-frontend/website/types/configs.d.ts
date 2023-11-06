declare type GlobalConfig = {
  id: number;
  siteName: string;
  favicon?: Media;
  defaultSeo?: SEOConfig;
  footer?: FooterConfig;
  contact?: ContactConfig;
};

declare type SEOConfig = {
  id?: number;
  metaDescription?: string;
  metaTitle?: string;
  shareImage?: string;
  article?: boolean;
};
