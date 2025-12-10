import React from "react";

export function ShippingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-orange-400 to-yellow-300">
      <article className="max-w-3xl bg-white/95 rounded-2xl p-8 shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Shipping</h1>
        <p className="mb-3">
          We deliver to the regions listed at checkout. Estimated delivery
          times:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-3">
          <li>Standard: 5–8 business days</li>
          <li>Express: 2–4 business days</li>
        </ul>
        <p className="text-sm text-gray-600">
          Shipping charges are calculated at checkout. Delays caused by
          carriers, customs, or force majeure are outside our control.
        </p>
      </article>
    </div>
  );
}
