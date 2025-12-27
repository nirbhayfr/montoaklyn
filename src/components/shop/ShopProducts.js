import React from "react";
import ShopCard from "./ShopCard";

export default function ShopProducts({ products }) {
	return (
		<>
			<div className="flex items-center justify-between text-sm text-gray-600 px-4 py-2 mb-4">
				{/* Breadcrumb */}
				<div>
					<span className="hover:underline cursor-pointer font-medium">
						Home
					</span>
					<span className="mx-2">&gt;</span>
					<span className="font-medium text-black">Shop</span>
				</div>

				{/* Result Count */}
				<div className="text-xs font-bold">
					{products.length} Products
				</div>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 mb-6">
				{products.map((product, index) => {
					const isInjectedCard = (index + 1) % 7 === 0;

					if (isInjectedCard) {
						return (
							<div
								key={product.id ?? index}
								className="col-span-2"
							>
								<ShopCard
									product={product}
									isFeatured
								/>
							</div>
						);
					}

					return (
						<ShopCard
							key={product.id ?? index}
							product={product}
						/>
					);
				})}
			</div>
		</>
	);
}
