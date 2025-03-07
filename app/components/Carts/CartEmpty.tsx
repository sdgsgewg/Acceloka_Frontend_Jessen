import Image from "next/image";
import React from "react";

const CartEmpty = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[50dvh]">
        <Image
          src="/img/emptyCart.png"
          alt="Empty Cart"
          width={250}
          height={250}
        />
        <p className="text-2xl text-slate-400 font-semibold text-center">Cart is Empty</p>
      </div>
    </>
  );
};

export default CartEmpty;
