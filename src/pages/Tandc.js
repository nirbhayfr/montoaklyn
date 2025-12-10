import React from "react";

export function TermsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-orange-400 to-yellow-300">
      <article className="max-w-3xl bg-white/95 rounded-2xl p-8 shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Terms &amp; Conditions</h1>
        <p className="mb-3">
          Welcome to ShopName. By using this website and placing an order you
          agree to these terms.
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-3">
          <li>
            Prices, availability and product descriptions may change without
            prior notice.
          </li>
          <li>
            Orders are subject to availability and successful payment
            authorization.
          </li>
          <li>We may cancel or refuse orders at our discretion.</li>
        </ul>
        <p className="text-sm text-gray-600">
          This page is a short template — include any store-specific clauses
          such as returns, warranties, or dispute procedures as needed.
        </p>
      </article>
    </div>
  );
}
