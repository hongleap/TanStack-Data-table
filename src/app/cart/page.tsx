"use client";

import Image from "next/image";
import { useCart } from "./Cart";
import React, { useEffect, useState } from "react";

// Cart item from cart context
interface CartItem {
  id: string | number;
  quantity: number;
}

// Product detail from API
interface ProductDetail {
  id: string | number;
  name: string;
  price: number;
  image?: string;
}

export default function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart() as {
    cart: CartItem[];
    removeFromCart?: (id: string | number) => void;
    increaseQuantity?: (id: string | number) => void;
    decreaseQuantity?: (id: string | number) => void;
  };

  // State for product details
  const [products, setProducts] = useState<Record<string, ProductDetail>>({});
  const [loading, setLoading] = useState(true);

  // Fetch product details for all items in cart
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const ids = cart.map((item) => item.id);
      // Fetch all products in parallel
      const responses = await Promise.all(
        ids.map((id) =>
          fetch(`/api/products/${id}`).then((res) => res.json())
        )
      );
      // Map product details by id for easy lookup
      const productMap: Record<string, ProductDetail> = {};
      responses.forEach((product: ProductDetail) => {
        productMap[product.id] = product;
      });
      setProducts(productMap);
      setLoading(false);
    }
    if (cart.length > 0) fetchProducts();
    else setProducts({});
  }, [cart]);

  // Calculate subtotal
  const subtotal = cart.reduce((sum, item) => {
    const product = products[item.id];
    return product ? sum + product.price * item.quantity : sum;
  }, 0);

  return (
    <section className="w-full max-w-3xl mx-auto my-10 p-4 bg-white rounded-lg shadow-lg border">
      <h2 className="font-bold text-3xl text-blue-700 mb-8 text-left border-b pb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-10">
          <p className="text-gray-600 text-lg">Your cart is empty.</p>
          <span className="text-5xl">🛍️</span>
        </div>
      ) : loading ? (
        <div className="flex justify-center items-center py-10 text-gray-500">Loading...</div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cart Items */}
          <ul className="space-y-4">
            {cart.map((item) => {
              const product = products[item.id];
              if (!product) return null;
              return (
                <li
                  key={item.id}
                  className="flex flex-col md:flex-row gap-4 items-center border-b pb-4 last:border-b-0"
                >
                  {/* Product Image */}
                  <div className="w-full md:w-32">
                    {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={128}
                          height={128}
                          className="w-full h-32 object-contain rounded bg-gray-100"
                          unoptimized
                        />
                    ) : (
                      <div className="w-full h-32 flex items-center justify-center bg-gray-100 rounded text-4xl text-gray-400">
                        🛒
                      </div>
                    )}
                  </div>
                  {/* Product Info */}
                  <div className="flex-1 w-full">
                    <div className="font-semibold">{product.name}</div>
                    <div className="text-sm text-gray-500 mb-2">
                      ${product.price} x {item.quantity} = <span className="font-bold text-green-700">${(product.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {decreaseQuantity && (
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="p-1 bg-gray-200 rounded text-lg"
                          disabled={item.quantity <= 1}
                          aria-label="Decrease"
                        >
                          {/* Minus Icon */}
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                      )}
                      <span className="mx-2">{item.quantity}</span>
                      {increaseQuantity && (
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="p-1 bg-gray-200 rounded text-lg"
                          aria-label="Increase"
                        >
                          {/* Plus Icon */}
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      )}
                      {removeFromCart && (
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-4 p-1 bg-red-100 rounded text-red-600 hover:bg-red-200"
                          aria-label="Remove"
                        >
                          {/* Trash Icon */}
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          {/* Summary & Checkout */}
          <div className="w-full md:w-80 bg-gray-100 rounded-lg p-6 flex flex-col gap-4 shadow">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">Subtotal</span>
              <span className="font-bold text-2xl text-green-700">${subtotal.toFixed(2)}</span>
            </div>
            <span className="text-sm text-gray-500">Taxes and shipping calculated at checkout.</span>
            <button
              className="w-full py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition text-lg shadow"
              disabled={cart.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </section>
    
  );
}