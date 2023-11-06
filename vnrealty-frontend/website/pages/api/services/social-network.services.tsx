import { generalClient } from "../api.services";

const SocialNetworkServices = {
  getSocialNetworks: async () => {
    const res = await generalClient.socialNetwork_GetSocialNetworks();
    return JSON.parse(JSON.stringify(res));
  },
};

export { SocialNetworkServices };
