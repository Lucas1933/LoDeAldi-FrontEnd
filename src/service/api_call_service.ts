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
    const response = await fetch(this.URL + _id, { method: "DELETE" });

    if (!response.ok) {
      // Handle non-OK responses, e.g., by throwing an error or returning null
      throw new Error(`Failed to fetch data from ${this.URL}`);
    }
    return true;
  }

  async createResource<T>(
    resourceBody: T | FormData,
    headers?: { [key: string]: string },
  ): Promise<boolean> {
    let response;
    if (!headers) {
      headers = {};
    }
    if (resourceBody instanceof FormData) {
      response = await fetch(this.URL, {
        method: "POST",
        headers,
        body: resourceBody,
      });
    } else {
      response = await fetch(this.URL, {
        method: "POST",
        headers,
        body: JSON.stringify(resourceBody),
      });
    }

    if (!response.ok) {
      // Handle non-OK responses, e.g., by throwing an error or returning null
      throw new Error(`Failed to fetch data from ${this.URL}`);
    }
    return true;
  }

  async updateResource<T>(
    resourceBody: T | FormData,
    headers?: { [key: string]: string },
  ): Promise<boolean> {
    let response;
    if (!headers) {
      headers = {};
    }
    if (resourceBody instanceof FormData) {
      response = await fetch(this.URL, {
        method: "PUT",
        headers,
        body: resourceBody,
      });
    } else {
      response = await fetch(this.URL, {
        method: "PUT",
        headers,
        body: JSON.stringify(resourceBody),
      });
    }
    if (!response.ok) {
      // Handle non-OK responses, e.g., by throwing an error or returning null
      throw new Error(`Failed to fetch data from ${this.URL}`);
    }
    return true;
  }

  async deleteFoodImage(
    imageName: string,
    type: string,
    id: string,
  ): Promise<boolean> {
    const response = await fetch(
      this.URL + "/" + type + "/" + imageName + "/" + id,
      {
        method: "DELETE",
      },
    );
    if (!response.ok) {
      // Handle non-OK responses, e.g., by throwing an error or returning null
      throw new Error(
        `Failed to delete image from ${
          this.URL + "/" + type + "/" + imageName + "/" + id
        }`,
      );
    }
    return true;
  }
}
