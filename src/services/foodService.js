import AxiosClient from "./axiosClient";

export default class FoodService {
  constructor() {
    this.client = new AxiosClient();
  }

  async getFoodByType(type, options) {
    const { toString } = options ? options : false;
    const requestConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const response = await this.client.makeGetRequest(
      `food/${type}`,
      requestConfig
    );
    if (toString) {
      return response.data.payload;
    }
    return JSON.parse(response.data.payload);
  }

  async getTypes(options) {
    const { toString } = options ? options : false;
    const requestConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const response = await this.client.makeGetRequest("type", requestConfig);
    if (toString) {
      return response.data.payload;
    }
    return JSON.parse(response.data.payload);
  }
}
