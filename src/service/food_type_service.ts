import ApiCallService from "./api_call_service";

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

  async createFoodType(type: FoodTypeDataForInsertion): Promise<boolean> {
    const result = await this.api.createResource(type);
    return result;
  }
  async updateFoodType(type: FoodTypeData): Promise<boolean> {
    const result = await this.api.updateResource(type);
    return result;
  }
  async deleteFoodType(id: string): Promise<boolean> {
    const result = await this.api.deleteResource(id);
    return result;
  }
}
