import { APP_CONFIG } from "../../config";
import { GeneralClient } from "./general-client";

const generalClient = new GeneralClient(APP_CONFIG.API_URL);

export { generalClient };
