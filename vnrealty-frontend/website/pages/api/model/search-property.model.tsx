import { PropertyTransactionType } from "../general-client";

type AppFilteringPropertyType = {
  propertyTitle?: string | undefined;
  location?: string | undefined;
  numberOfBedRooms?: number | undefined;
  numberOfBathRooms?: number | undefined;
  priceRangeFrom?: number | undefined;
  priceRangeTo?: number | undefined;
  areaFrom?: number | undefined;
  areaTo?: number | undefined;
  orderByTitle?: number;
  orderByPrice?: number;
  isFeatured?: boolean | undefined;
  listTags?: string[] | undefined;
  listPropertyType?: string[] | undefined;
  listTransactionType?: PropertyTransactionType[] | undefined;
};

class PropertyModel {
  static filterPropertyModel: AppFilteringPropertyType =
    {} as AppFilteringPropertyType;
}

export default PropertyModel;
export type { AppFilteringPropertyType };
