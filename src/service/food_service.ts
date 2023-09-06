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
export interface CreateFoodData {
  name: string;
  price: number;
  description: string;
  /* thumbnails: string[]; to do*/
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
  async deleteFood(_id: string): Promise<boolean> {
    const result = await this.api.deleteResource(_id);
    return result;
  }

  async createFood(food: CreateFoodData): Promise<boolean> {
    const result = await this.api.createResource(food);
    return result;
  }
}
