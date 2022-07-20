import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getTransactionsByDate } from "../api/transaction";

function FetchTransactionsByDate(selectedDate) {
  return useQuery(
    ["getTransactionsByDate", selectedDate],
    getTransactionsByDate
  );
}

export default FetchTransactionsByDate;
