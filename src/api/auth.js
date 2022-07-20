import axios from "../config/axios";

export const register = async (input) => {
  const res = await axios.post(`/auth/register`, input);
  return res.data;
};

export const login = async (input) => {
  const res = await axios.post(`/auth/login`, input);
  return res.data;
};

export const getMe = async () => {
  const res = await axios.get(`/auth/me`);
  return res.data;
};
