import ApiCallService from "./api_call_service";

// Define a specific interface for the expected data structure
export interface FoodTypeData {
  _id: string;
  type: string;
}

export interface CreateFoodTypeData {
  type: string;
}

export default class FoodTypeService {
  private api: ApiCallService;
  constructor() {
    this.api = new ApiCallService(
      import.meta.env.VITE_LO_DE_ALDI_API + "type/"
    );
  }

  async getFoodTypes(): Promise<FoodTypeData[]> {
    const foodTypes = await this.api.getPayload<FoodTypeData[]>();
    return foodTypes || [];
  }
}
