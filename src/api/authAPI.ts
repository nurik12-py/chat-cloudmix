import http from "../services/http.service";

export const authAPI = {
  login: async (data: { email: string; password: string }) => {
    return http.post<{ access_token: string }>("/auth/login/", data);
  },

  register: async (data: {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
  }) => {
    return http.post<{ access_token: string }>("/auth/register/", data);
  },
};
