import NetworkService from '../network';
import axios from 'axios';

jest.mock('axios');

describe('NetworkService', () => {
  let service;
  let mockAxios;

  beforeEach(() => {
    mockAxios = axios;
    service = new NetworkService(mockAxios);
  });

  it('should perform a GET request', async () => {
    mockAxios.get.mockResolvedValue({ data: 'response' });
    const response = await service.get('path');
    expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:3000/path');
    expect(response).toEqual({ data: 'response' });
  });

  it('should perform a POST request', async () => {
    mockAxios.post.mockResolvedValue({ data: 'response' });
    const response = await service.post('path', { key: 'value' });
    expect(mockAxios.post).toHaveBeenCalledWith('http://localhost:3000/path', { key: 'value' });
    expect(response).toEqual({ data: 'response' });
  });

  it('should perform a PUT request', async () => {
    mockAxios.put.mockResolvedValue({ data: 'response' });
    const response = await service.put('path', { key: 'value' });
    expect(mockAxios.put).toHaveBeenCalledWith('http://localhost:3000/path', { key: 'value' });
    expect(response).toEqual({ data: 'response' });
  });

  it('should perform a DELETE request', async () => {
    mockAxios.delete.mockResolvedValue({ data: 'response' });
    const response = await service.delete('path');
    expect(mockAxios.delete).toHaveBeenCalledWith('http://localhost:3000/path');
    expect(response).toEqual({ data: 'response' });
  });
});