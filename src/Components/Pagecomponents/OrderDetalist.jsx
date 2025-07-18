import React, { useEffect, useState } from "react";
import { Trash2, Plus, Minus, ArrowRight, X } from "lucide-react";

const promoCodes = {
  SAVE10: { type: "amount", value: 10 },
  FREEDEL: { type: "freeShipping" },
  HALFOFF: { type: "percent", value: 50 },
};

const OrderDetalist = () => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [error, setError] = useState("");

  // Re-sync cart from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // Load promo from localStorage
  useEffect(() => {
    const savedPromo = localStorage.getItem("promo");
    if (savedPromo) setAppliedPromo(JSON.parse(savedPromo));
  }, []);

  // Save cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Save promo changes
  useEffect(() => {
    if (appliedPromo) {
      localStorage.setItem("promo", JSON.stringify(appliedPromo));
    } else {
      localStorage.removeItem("promo");
    }
  }, [appliedPromo]);

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max((item.qty || 1) + delta, 1) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (promoCodes[code]) {
      setAppliedPromo(promoCodes[code]);
      setPromoInput("");
      setError("");
    } else {
      setError("Invalid promo code");
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setError("");
    setPromoInput("");
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * (item.qty || 1), 0);
  const shippingFee = appliedPromo?.type === "freeShipping" ? 0 : 40;

  let discount = 0;
  if (appliedPromo?.type === "amount") {
    discount = appliedPromo.value;
  } else if (appliedPromo?.type === "percent") {
    discount = Math.floor((subtotal * appliedPromo.value) / 100);
  }

  const total = subtotal - discount + shippingFee;

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto bg-white min-h-screen">
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty 🛒</p>
      ) : (
        cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-3 rounded-xl shadow border"
            onClick={() => window.location.href = `/products/${item.id}`}
          >
            <img
              src={item.thumbnail}
              alt={item.name}
              className="w-20 h-24 object-cover rounded"
            />
            <div className="flex-1">
              <p className="font-medium text-sm">{item.name}</p>
              <p className="text-base font-semibold mt-1">{item.brand}</p>
              <p className="text-gray-500 text-xs">{item.description?.slice(0, 35)}...</p>
              <p className="text-base font-semibold mt-1">${item.price}</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateQty(item.id, -1);
                  }}
                  className="border rounded p-1"
                >
                  <Minus size={14} />
                </button>
                <span className="px-2 text-sm">{item.qty || 1}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateQty(item.id, 1);
                  }}
                  className="border rounded p-1"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeItem(item.id);
              }}
              className="text-red-500"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))
      )}

      {/* Promo Code Input */}
      <div className="pt-2">
        <label className="text-sm font-medium">Promo Code</label>
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            placeholder="Enter code"
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
          />
          <button
            onClick={applyPromo}
            className="bg-black text-white px-4 rounded-lg text-sm"
          >
            Apply
          </button>
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        {appliedPromo && (
          <div className="flex items-center justify-between mt-2 text-green-700 bg-green-100 px-3 py-2 rounded-lg">
            <span>Promo applied ✔</span>
            <button onClick={removePromo}>
              <X size={16} className="text-green-700" />
            </button>
          </div>
        )}
      </div>

      {/* Price Summary */}
      <div className="space-y-2 text-sm text-gray-700 pt-4 border-t">
        <div className="flex justify-between">
          <span>Sub-total</span>
          <span>${subtotal.toLocaleString()}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>- ${discount.toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>VAT (%)</span>
          <span>$0.00</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping fee</span>
          <span>${shippingFee}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-2">
          <span>Total</span>
          <span>${total.toLocaleString()}</span>
        </div>
      </div>

      <button className="w-full bg-black text-white rounded-xl py-3 flex items-center justify-center gap-2 mt-4">
        Go To Checkout <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default OrderDetalist;
