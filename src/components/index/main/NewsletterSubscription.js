import React from "react";

const NewsletterSubscription = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.elements["nwsltr-subs-email"].value;
    console.log("Subscribed Email:", email);
    // You can add your API call here to save the email
  };

  return (
    <div className="ul-container">
      <section className="ul-nwsltr-subs">
        <div className="ul-inner-container">
          {/* heading */}
          <div className="ul-section-heading justify-content-center text-center">
            <div>
              <span className="ul-section-sub-title text-white">
                GET NEWSLETTER
              </span>
              <h2 className="ul-section-title text-white">
                Sign Up to Newsletter
              </h2>
            </div>
          </div>

          {/* form */}
          <div className="ul-nwsltr-subs-form-wrapper">
            <div className="icon">
              <i className="flaticon-airplane"></i>
            </div>
            <form className="ul-nwsltr-subs-form" onSubmit={handleSubmit}>
              <input
                type="email"
                name="nwsltr-subs-email"
                id="nwsltr-subs-email"
                placeholder="Enter Your Email"
                required
              />
              <button type="submit">
                Subscribe Now <i className="flaticon-up-right-arrow"></i>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsletterSubscription;
