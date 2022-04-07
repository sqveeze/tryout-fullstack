import axios from "axios";
import ky from "ky";

import { API_BASE_URL } from "./constants";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});
