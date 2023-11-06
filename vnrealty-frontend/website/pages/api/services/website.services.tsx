import { json } from "stream/consumers";
import { APP_CONFIG } from "../../../config";
import { generalClient } from "../api.services";
import { FilterWebsitePropertyDto } from "../general-client";

const WebsiteServices = {
  getHomeInfo: async () => {
    const res = await generalClient.website_GetHomeInfo();
    return JSON.parse(JSON.stringify(res));
  },

  getOurServices: async () => {
    const res = await generalClient.website_GetOurServices();
    return JSON.parse(JSON.stringify(res));
  },

  getBannerHomePage: async () => {
    const res = await generalClient.website_GetBannerHomePage();
    return JSON.parse(JSON.stringify(res));
  },

  getOurCommitments: async () => {
    const res = await generalClient.website_GetOurCommitment();
    return JSON.parse(JSON.stringify(res));
  },

  getContactInfo: async () => {
    const res = await generalClient.website_GetContactInfo();
    return JSON.parse(JSON.stringify(res));
  },

  getFooterInfo: async () => {
    const res = await generalClient.website_GetFooterInfo();
    return JSON.parse(JSON.stringify(res));
  },

  getOurTeams: async () => {
    const res = await generalClient.website_GetOurTeams();
    return JSON.parse(JSON.stringify(res));
  },

  getOurPartners: async () => {
    const res = await generalClient.website_GetOurPartners();
    return JSON.parse(JSON.stringify(res));
  },

  getAboutInfo: async () => {
    const res = await generalClient.website_GetAboutUsInfo();
    return JSON.parse(JSON.stringify(res));
  },

  getTenantPortalInfo: async () => {
    const res = await generalClient.website_GetTenantPortalInfo();
    return JSON.parse(JSON.stringify(res));
  },

  getLandlordPortalInfo: async () => {
    const res = await generalClient.website_GetLandlordPortalInfo();
    return JSON.parse(JSON.stringify(res));
  },

  filterProperty: async (filter: FilterWebsitePropertyDto) => {
    const res = await generalClient.website_FilterProperty(filter);
    return JSON.parse(JSON.stringify(res));
  },

  getNewsInfo: async () => {
    const res = await generalClient.website_GetNewsInfo();
    return JSON.parse(JSON.stringify(res));
  },

  getVideoInfo: async () => {
    const res = await generalClient.website_GetVideoInfo();
    return JSON.parse(JSON.stringify(res));
  },

  getLinkPortal: async () => {
    const res = await generalClient.common_GetPortalLink();
    return JSON.parse(JSON.stringify(res));
  },
};

export { WebsiteServices };
