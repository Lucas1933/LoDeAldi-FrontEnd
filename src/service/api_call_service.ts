export default class ApiCallService {
  private URL: string;
  constructor(URL: string) {
    this.URL = URL;
  }

  async getPayload<T>(param?: string): Promise<T | null> {
    try {
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

  async deleteResource(_id: string): Promise<boolean> {
    console.log(this.URL + _id);
    const response = await fetch(this.URL + _id, { method: "DELETE" });
    console.log(await response.json());
    if (!response.ok) {
      // Handle non-OK responses, e.g., by throwing an error or returning null
      throw new Error(`Failed to fetch data from ${this.URL}`);
    }
    return true;
  }

  async createResource<T>(resourceBody: T): Promise<boolean> {
    const response = await fetch(this.URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Modify this header if needed
      },
      body: JSON.stringify(resourceBody),
    });
    if (!response.ok) {
      // Handle non-OK responses, e.g., by throwing an error or returning null
      throw new Error(`Failed to fetch data from ${this.URL}`);
    }
    return true;
  }

  async updateResource<T>(resourceBody: T): Promise<boolean> {
    const response = await fetch(this.URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Modify this header if needed
      },
      body: JSON.stringify(resourceBody),
    });
    if (!response.ok) {
      // Handle non-OK responses, e.g., by throwing an error or returning null
      throw new Error(`Failed to fetch data from ${this.URL}`);
    }
    return true;
  }
}
