import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/auth";

function FetchMe(date) {
  return useQuery(["getMe"], getMe);
}

export default FetchMe;
