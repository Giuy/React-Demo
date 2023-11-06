import { generalClient } from "../api.services";
import { FilterNewsDto } from "../general-client";

const NewsServices = {
  getAllNews: async () => {
    const res = await generalClient.news_GetNews();
    return JSON.parse(JSON.stringify(res));
  },

  getFilterNews: async (filter: FilterNewsDto) => {
    const res = await generalClient.news_Filter(filter);
    return JSON.parse(JSON.stringify(res));
  },

  getNewsDetail: async (friendlyUrl: string) => {
    const res = await generalClient.news_DetailByFriendlyUrl(friendlyUrl);
    return JSON.parse(JSON.stringify(res));
  },

  getAllNewsCategories: async () => {
    const res = await generalClient.newCategories_GetNewCategories();
    return JSON.parse(JSON.stringify(res));
  },

  getNewsByCategories: async (categoryId: string) => {
    const res = await generalClient.news_GetByCategoryNews(categoryId);
    return JSON.parse(JSON.stringify(res));
  },
};

export { NewsServices };
