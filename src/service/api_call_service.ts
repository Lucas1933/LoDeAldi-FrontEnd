export default class ApiCallService {
  private URL: string;
  constructor(URL: string) {
    this.URL = URL;
  }

  async getPayload<T>(param?: string): Promise<T | null> {
    try {
      console.log(this.URL + (param ? param : ""));
      const response = await fetch(this.URL + (param ? param : ""));
      if (!response.ok) {
        // Handle non-OK responses, e.g., by throwing an error or returning null
        throw new Error(`Failed to fetch data from ${this.URL}`);
      }

      const data = await response.json();
      return data.payload as T;
    } catch (error) {
      // Handle network errors, parsing errors, or other exceptions
      console.error("An error occurred:", error);
      return null; // Return null or handle the error as appropriate
    }
  }
}
