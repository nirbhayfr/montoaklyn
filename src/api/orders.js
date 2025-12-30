import { api } from "./api";

export const createOrder = (payload) => {
	return api.post("/order", payload);
};

export const fetchAllOrders = () => {
	return api.get("/order");
};

export const fetchUserAllOrders = (userId) => {
	return api.get(`/order/${userId}`);
};

export const fetchOrderDetails = (orderId) => {
	return api.get(`/order/order-details/${orderId}`);
};

export const completeOrder = (orderId) => {
	return api.patch(`/order/${orderId}`);
};
