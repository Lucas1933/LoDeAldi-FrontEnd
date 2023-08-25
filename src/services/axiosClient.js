import axios from "axios";
export default class AxiosClient {
  constructor(url, config) {
    this.url = url;
    this.config = config;
  }
  makeGetRequest() {
    return axios.get(this.url, this.config);
  }
}
