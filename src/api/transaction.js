import axios from "../config/axios";

export const createTransaction = async (input) => {
  const res = await axios.post("/transactions", input);
  return res.data;
};

export const getTransactions = async () => {
  const res = await axios.get("/transactions");
  return res.data;
};

export const updateTransaction = async (input) => {
  const res = await axios.patch(`/transactions/${input.id}`, {
    category: input.category,
    type: input.type,
    amount: input.amount,
    note: input.note,
    date: input.date,
  });
  return res.data;
};

export const deleteTransaction = async (id) => {
  await axios.delete(`/transactions/${id}`);
};

export const getTransactionsByDate = async ({ queryKey }) => {
  const res = await axios.get(`/transactions/date/?date=${queryKey[1]}`);
  return res.data;
};
