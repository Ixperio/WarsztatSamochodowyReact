
const baseUrl = 'https://localhost:7169/api'; 

interface ResponseData {
    jsonResponse: string
}

const apiService = {
  get: async (url: string): Promise<ResponseData> => {
    const response = await fetch(baseUrl + url);
    return handleResponse(response);
  },

  post: async (url: string, data: Record<string, any>): Promise<ResponseData> => {
    const response = await fetch(baseUrl + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  put: async (url: string, data: Record<string, any>): Promise<ResponseData> => {
    const response = await fetch(baseUrl + url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  delete: async (url: string): Promise<ResponseData> => {
    const response = await fetch(baseUrl + url, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};

const handleResponse = async (response: Response): Promise<ResponseData> => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Coś poszło nie tak!');
  }

  const data: ResponseData = await response.json();
  return data;
};

export default apiService;
