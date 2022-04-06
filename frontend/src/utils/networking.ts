import ky from "ky";

import { API_BASE_URL } from "./constants";

export const apiClient = ky.extend({
  prefixUrl: API_BASE_URL,
});
