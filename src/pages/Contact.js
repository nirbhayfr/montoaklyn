import React, { useEffect } from "react";
import PageHeading from "../common/PageHeading";

const CONTACT_NUMBER = "917973624658"; // country code + number
const PREFILL_TEXT = "Hi UsedStuff! I’d like to buy/sell a used item.";

const ContactUs = () => {
  useEffect(() => {
    // Build WhatsApp Web / App URL (works on mobile + desktop/web)
    const waUrl =
      "https://wa.me/" +
      CONTACT_NUMBER +
      "?text=" +
      encodeURIComponent(PREFILL_TEXT);

    // Redirect immediately; replace() avoids leaving this page in history
    window.location.replace(waUrl);
  }, []);

  return (
    <div>
      <PageHeading home={"home"} pagename={"Contact Us"} />
      <div className="w-11/12 md:w-10/12 mx-auto my-8">
        <div className="text-2xl md:text-3xl font-bold">Opening WhatsApp…</div>
        <p className="mt-3 text-slate-600">
          If you’re not redirected automatically,{" "}
          <a
            href={
              "https://wa.me/" +
              CONTACT_NUMBER +
              "?text=" +
              encodeURIComponent(PREFILL_TEXT)
            }
            className="text-blue-600 underline"
          >
            tap here to open WhatsApp
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
