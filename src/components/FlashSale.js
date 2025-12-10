import React, { useState } from "react";
import { products } from "../data/Data";
import { BiCart } from "react-icons/bi";
import Modal from "../common/Modal";
import Heading from "../common/Heading";

const FlashSale = () => {
  const [isModalOpen, setIsModalOpen] = useState(null);

  const handleOpen = (productId) => {
    setIsModalOpen(productId);
  };
  const handleClose = () => {
    setIsModalOpen(null);
  };
  return (
    <div>
      <div className="w-10/12 m-auto">
        <Heading heading={"You are in Home"} />
        <div className="grid grid-cols-4 gap-3">
          {products.map((item, index) => (
            <div key={index} className="mt-8">
              {/* {item.images[0]} */}
              <div className="overflow-hidden relative">
                <div className="image-container relative">
                  <div className="rounded-3xl">
                    {/* {item.images.map((item) => {
                      return ( */}
                    <img
                      //
                      src={item.images[0]}
                      alt="img"
                      className="rounded-3xl"
                    />
                    {/* ); */}
                    {/* })} */}
                  </div>

                  <div className="opacity-0 absolute -bottom-3 right-0 bg-white p-4 rounded-s-2xl">
                    <div className="bg-black text-white h-10 w-10 grid place-items-center rounded-3xl">
                      <button
                        className="text-2xl"
                        onClick={() => handleOpen(item.id)}
                      >
                        <BiCart />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="product-details mt-2">
                  <p className="mb-2">{item.title}</p>
                  <p>₹{item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        data={products.find((item) => item.id === isModalOpen)}
        isModalOpen={isModalOpen}
        handleClose={handleClose}
      />
    </div>
  );
};

export default FlashSale;
