import React from "react";

export function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-orange-400 to-yellow-300">
      <article className="max-w-3xl bg-white/95 rounded-2xl p-8 shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Contact Us</h1>
        <p className="mb-4">
          Have a question? Reach out — we'll reply as soon as we can.
        </p>

        <div className="space-y-2 mb-4">
          <p>
            <strong>Email:</strong> support@shopname.example
          </p>
          <p>
            <strong>Phone:</strong> +1 (555) 123-4567
          </p>
          <p>
            <strong>Address:</strong> 123 Market St, City, Country
          </p>
        </div>

        <p className="text-sm text-gray-600">
          This is a static contact page. If you want a contact form that works
          without a backend, I can provide a frontend-only example (local-only
          or using a service like Formspree).
        </p>
      </article>
    </div>
  );
}
