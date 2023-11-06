import { generalClient } from "../api.services";
import { FilterVideoDto } from "../general-client";

const VideoServices = {
  getFilterVideo: async (filter: FilterVideoDto) => {
    const res = await generalClient.video_GetFilterWebsite(filter);
    return JSON.parse(JSON.stringify(res));
  },
};

export { VideoServices };
