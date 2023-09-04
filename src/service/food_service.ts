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
      import.meta.env.VITE_LO_DE_ALDI_API + "food/"
    );
  }

  async getFoodByType(type: string): Promise<FoodData[]> {
    const foods = await this.api.getPayload<FoodData[]>(type);
    return foods || [];
  }
}
