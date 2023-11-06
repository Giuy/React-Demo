import { generalClient } from "../api.services";
import { CreateContactCustomerDto } from "../general-client";

const ContactServices = {
  createContactCustomer: async (model: CreateContactCustomerDto) => {
    const res = await generalClient.contactCustomer_PostNew(model);
    return JSON.parse(JSON.stringify(res));
  },
};

export { ContactServices };
