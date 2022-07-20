import axios from "../config/axios";

export const createTransaction = async (input) => {
  const res = await axios.post("/transactions", input);
  return res.data;
};
