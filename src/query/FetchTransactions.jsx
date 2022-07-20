import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../api/transaction";

function FetchTransactions() {
  return useQuery(["getTransactions"], getTransactions);
}

export default FetchTransactions;
