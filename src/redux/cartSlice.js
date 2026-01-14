import { createSlice } from "@reduxjs/toolkit";

const storeInLocalStorage = (data) => {
	localStorage.setItem("cart", JSON.stringify(data));
};

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		data: JSON.parse(localStorage.getItem("cart")) || [],
		totalAmount: 0,
		totalItems: 0,
	},

	reducers: {
		addToCart(state, action) {
			const { _id, size, quantity, price } = action.payload;

			const item = state.data.find(
				(p) => p._id === _id && p.size === size
			);

			if (item) {
				item.quantity += quantity;
				item.totalPrice = item.quantity * item.price;
			} else {
				state.data.push({
					...action.payload,
					totalPrice: price * quantity,
				});
			}

			storeInLocalStorage(state.data);
		},
		updateQuantity: (state, action) => {
			const { id, quantity } = action.payload;

			const productIndex = state.data.findIndex(
				(product) => product.id === id
			);
			if (productIndex !== -1) {
				const updateProduct = {
					...state.data[productIndex],
					quantity: Math.max(quantity || 1, 1),
				};
				updateProduct.totalPrice =
					updateProduct.price * updateProduct.quantity;

				state.data[productIndex] = updateProduct;
				storeInLocalStorage(state.data);
			}
		},

		increaseQuantity(state, action) {
			const { id } = action.payload;

			const item = state.data.find((product) => product.id === id);

			if (item) {
				item.quantity += 1;
				item.totalPrice = item.quantity * item.price;
			}

			storeInLocalStorage(state.data);
		},

		decreaseQuantity(state, action) {
			const { id } = action.payload;

			const itemIndex = state.data.findIndex(
				(product) => product.id === id
			);

			if (itemIndex !== -1) {
				if (state.data[itemIndex].quantity > 1) {
					state.data[itemIndex].quantity -= 1;
					state.data[itemIndex].totalPrice =
						state.data[itemIndex].quantity *
						state.data[itemIndex].price;
				} else {
					// quantity becomes 0 → remove item
					state.data.splice(itemIndex, 1);
				}
			}

			storeInLocalStorage(state.data);
		},

		removeItem(state, action) {
			const itemIndex = state.data.findIndex(
				(product) => product.id === action.payload.id
			);

			if (itemIndex !== -1) {
				state.data.splice(itemIndex, 1);
			}

			storeInLocalStorage(state.data);
		},

		getCartTotal(state) {
			state.totalAmount = state.data.reduce((cartTotal, cartItem) => {
				return (cartTotal += cartItem.totalPrice);
			}, 0);

			state.totalItems = state.data.length;
		},
		resetCart(state) {
			state.data = [];
			localStorage.setItem("cart", JSON.stringify([]));
			// state.totalAmount = 0;
			// state.totalItems = 0;
			// localStorage.removeItem("cart"); // clear localStorage as well
		},
	},
});

export const {
	addToCart,
	updateQuantity,
	removeItem,
	getCartTotal,
	resetCart,
	increaseQuantity,
	decreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
