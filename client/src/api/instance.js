import axios from "axios";

const baseURL = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}/message/`
  });

  export default baseURL