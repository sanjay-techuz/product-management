import axios from "axios";
import constants from "../common";

export const client: (arg0: { url: string; method: string; data?: any }) => any = axios.create({
  baseURL: constants.baseURL,
});
