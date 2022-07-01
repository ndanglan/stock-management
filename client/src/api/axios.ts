import axios from "axios";
import { CONSTANTS } from "utilities/constants";

export default axios.create({
  baseURL: CONSTANTS.BASEAPI,
  headers: {
    "Content-type": "application/json"
  }
});