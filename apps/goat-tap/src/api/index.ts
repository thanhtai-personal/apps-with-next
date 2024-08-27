export const apiConfig = {
  apiEndpoint: import.meta.env.VITE_API_URL,
  options: {
    axiosConfig: {},
    getAccessToken: () => "",
  }
}