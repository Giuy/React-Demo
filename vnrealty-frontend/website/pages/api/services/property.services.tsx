import { generalClient } from "../api.services";
import { PropertyFilterDto } from "../general-client";

const PropertyServices = {
  filterProperty: async (filter: PropertyFilterDto) => {
    const res = await generalClient.property_Filter(filter);
    return JSON.parse(JSON.stringify(res));
  },

  getPropertyDetail: async (slug: string) => {
    const res = await generalClient.property_DetailByFriendlyUrl(slug);
    return JSON.parse(JSON.stringify(res));
  },
};

export { PropertyServices };
