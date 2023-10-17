import ApiCallService from "./api_call_service";

export default class FoodService {
  private api: ApiCallService;
  constructor() {
    this.api = new ApiCallService(
      import.meta.env.VITE_LO_DE_ALDI_API + "food/",
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

  async createFood(form: FormData): Promise<boolean> {
    const result = await this.api.createResource(form);
    return result;
  }

  async updateFood(food: FoodData): Promise<boolean> {
    const result = await this.api.updateResource(food);
    return result;
  }

  async deleteImage(
    imageName: string,
    type: string,
    id: string,
  ): Promise<boolean> {
    const result = await this.api.deleteFoodImage(imageName, type, id);
    return result;
  }
}
