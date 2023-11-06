import { generalClient } from "../helpers/utils";
import { CreateContactCustomerDto, FileParameter, WebsiteBodyTypesEnum } from "./general-client";

const AppRepositories = {
  getNews: async () => {
    const res = await generalClient.news_GetNews();
    return res;
  },

  getNewById: async (id: string) => {
    const res = await generalClient.news_GetNew(id);
    return res;
  },

  getHomeNews: async () => {
    const res = await generalClient.news_GetHomeViewNews();
    return res
  },

  getCommonConfig:async () => {
    const res = await generalClient.commonConfig_GetCommonConfigs();
    return res;
  },

  getJobCategory:async () => {
    const res = await generalClient.recruitmentCategories_GetRecruitmentCategories();
    return res;
  },

  getJobByCategory:async (id: string) => {
    const res = await generalClient.recruitment_GetRecruitmentsByCategory(id);
    return res;
  },

  getJobById:async (id: string) => {
    const res = await generalClient.recruitment_GetNewCategory(id);
    return res;
  },

  getBanner:async () => {
    const res = await generalClient.banner_GetBanners();
    return res;
  },

  getActivityCategoriesByIndustry:async (industry: number) => {
    const res = await generalClient.activityCategories_GetActivityCategoriesByIndustry(industry);
    return res;
  },

  getActivitiesByCategory:async (id: string) => {
    const res = await generalClient.activity_GetActivitiesByCategory(id);
    return res;
  },

  getActivitiesById:async (id:string) => {
    const res = await generalClient.activity_GetNewCategory(id);
    return res;
  },

  getNewsCategory:async () => {
    const res = await generalClient.newCategories_GetNewCategories();
    return res;
  },

  getNewsByCategory:async (id:string) => {
    const res = await generalClient.news_GetByCategoryNews(id);
    return res;
  },

  sendMessage:async (model: any) => {
    const res = await generalClient.contactCustomer_PostNew(model);
    return res;
  },

  getSocialNetwork:async () => {
    const res = await generalClient.socialNetwork_GetAllSocialNetworks();
    return res;
  },

  uploadFile:async (data:any, name: string) => {
    const _file = {
      data,
      fileName: name
    }
    const res = await generalClient.contactCustomer_UploadCV(_file);
    return res;
  },

  uploadCV:async (data: CreateContactCustomerDto) => {
    const res = await generalClient.contactCustomer_PostNew(data);
    return res;
  },

  getPrize:async () => {
    const res = await generalClient.prize_GetPrizes();
    return res
  },

  getBannerByType:async (type:number) => {
    const res = await generalClient.banner_GetBannerByType(type);
    return res;
  },

  getWebsiteBodyByType: async(type: WebsiteBodyTypesEnum) => {
    const res = await generalClient.websiteBody_GetWebsiteBodyByType(type);
    return res;
  }
};

export { AppRepositories };
