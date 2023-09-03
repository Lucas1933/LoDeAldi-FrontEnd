import ApiCallService from "./api_call_service";

// Define a specific interface for the expected data structure
export interface FoodTypeData {
  _id: string;
  type: string;
}

export default class FoodTypeService {
  private api: ApiCallService;
  constructor() {
    this.api = new ApiCallService(
      "http://127.0.0.1:8080/lodealdi-api/v1/type/"
    );
  }

  async getFoodTypes(): Promise<FoodTypeData[]> {
    const foodTypes = await this.api.getPayload<FoodTypeData[]>();
    return foodTypes || [];
  }
}
