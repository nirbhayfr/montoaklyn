import axios from "axios";

export const api = axios.create({
	baseURL: "https://monto-backend.onrender.com/api",
});
