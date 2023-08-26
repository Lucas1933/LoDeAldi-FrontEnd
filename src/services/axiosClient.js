import axios from "axios";
export default class AxiosClient {
  constructor() {
    this.baseUrl = "http://localhost:8080/lodealdi-api/v1/"
  }
  makeGetRequest(endPoint,config) {
    return axios.get(this.baseUrl+endPoint, config);
  }
}
