class NetworkService {
  private baseUrl: string;
  private axiosClient: any;

  constructor(axiosClient: any) {
    this.axiosClient = axiosClient;
    this.baseUrl = 'http://localhost:3000';
  }

  async get(path: string) {
    return this.axiosClient.get(`${this.baseUrl}/${path}`);
  }

  async post(path: string, data: object) {
    return this.axiosClient.post(`${this.baseUrl}/${path}`, data);
  }

  async put(path: string, data: object) {
    return this.axiosClient.put(`${this.baseUrl}/${path}`, data);
  }

  async delete(path: string) {
    return this.axiosClient.delete(`${this.baseUrl}/${path}`);
  }

}


export default NetworkService;