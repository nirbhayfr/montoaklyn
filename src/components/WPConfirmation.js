import { useState } from "react";

const WhatsAppNotifier = ({ phone, message }) => {
  const [sending, setSending] = useState(false);

  const sendWhatsApp = () => {
    setSending(true);
    setTimeout(() => {
      const encoded = encodeURIComponent(message);
      window.open(`https://wa.me/919862728148?text=Helloworld`, "_blank");
      setSending(false);
    }, 1500);
  };

  return (
    <div>
      <button
        onClick={sendWhatsApp}
        className="px-4 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition"
      >
        Complete Order
      </button>

      {sending && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-2">
              Sending WhatsApp Message...
            </h2>
            <p className="text-gray-500 mb-3">Please wait a moment 💬</p>
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-green-500 mx-auto"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppNotifier;
