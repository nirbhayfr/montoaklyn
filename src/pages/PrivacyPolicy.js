export function PrivacyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-orange-400 to-yellow-300">
      <article className="max-w-3xl bg-white/95 rounded-2xl p-8 shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Privacy Policy</h1>
        <p className="mb-3">
          We respect your privacy. This page briefly describes how we collect
          and use data.
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-3">
          <li>
            We collect information you provide (name, email, address) to process
            orders and communicate updates.
          </li>
          <li>
            We use cookies and analytics to improve the site experience; no
            personal data is sold to third parties.
          </li>
          <li>
            Payments are handled by third-party providers (e.g., Razorpay) — we
            do not store full card details.
          </li>
        </ul>
        <p className="text-sm text-gray-600">
          Customize this page with your retention periods, data subject rights,
          and contact details for privacy requests.
        </p>
      </article>
    </div>
  );
}
