import ApiCallService from "./api_call_service";
// Define a specific interface for the expected data structure
export interface FoodData {
  _id: string;
  name: string;
  price: number;
  description: string;
  thumbnails: string[];
  type: string;
}

export default class FoodService {
  private api: ApiCallService;
  constructor() {
    this.api = new ApiCallService(
      "http://127.0.0.1:8080/lodealdi-api/v1/food/"
    );
  }

  async getFoodByType(type: string): Promise<FoodData[]> {
    const foods = await this.api.getPayload<FoodData[]>(type);
    return foods || [];
  }
}
