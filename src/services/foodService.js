import AxiosClient from "./axiosClient";

export default class FoodService {
  constructor() {
    this.client = new AxiosClient(
      "http://127.0.0.1:8080/lodealdi-api/v1/food/pizza",
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
  }

  async getFoods(options) {
    const { convertDataToString } = options;
    const response = await this.client.makeGetRequest();
    let data = response.data;
    if (convertDataToString) {
      data = JSON.stringify(data);
    }
    return data;
  }
}
