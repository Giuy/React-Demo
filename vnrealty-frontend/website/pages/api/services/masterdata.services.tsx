import { generalClient } from "../api.services";

const MasterDataServices = {
  getMasterDataPriceRange: async () => {
    const res = await generalClient.masterData_GetMasterDataPriceRange();
    return JSON.parse(JSON.stringify(res));
  },

  getMasterDataAreaRange: async () => {
    const res = await generalClient.masterData_GetMasterDataAreaRange();
    return JSON.parse(JSON.stringify(res));
  },

  getVideoCategory: async () => {
    const res = await generalClient.masterData_GetMasterDataVideoCategory();
    return JSON.parse(JSON.stringify(res));
  },

  getFeaturesCity: async () => {
    const res = await generalClient.masterData_GetMasterDataFeaturesCity();
    return JSON.parse(JSON.stringify(res));
  },

  getPropertyType: async () => {
    const res = await generalClient.masterData_GetMasterDataPropertyType();
    return JSON.parse(JSON.stringify(res));
  },
};

export { MasterDataServices };
