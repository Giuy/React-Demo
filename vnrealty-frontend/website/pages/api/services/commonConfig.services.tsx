import { APP_CONFIG } from "../../../config";
import { generalClient } from "../api.services";

const CommonConfigServices = {
  getCommonConfigAboutUs: async () => {
    const res = await generalClient.commonConfig_GetCommonConfigByType(
      "AboutUs"
    );
    return JSON.parse(JSON.stringify(res));
  },
};

export { CommonConfigServices };
