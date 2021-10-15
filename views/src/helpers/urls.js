// we made these urls as fucntion because we can make urls dynamicsl;
const API_ROOT = "http://localhost:8000/v1";

export const APIUrls = {
  login: () => `${API_ROOT}/user/create-session`,
  signup: () => `${API_ROOT}/user/create`,
  fetchPosts: (page = 1, limit = 10) =>
    `${API_ROOT}/post/read/?page=${page}&limit=${limit}`,
};
