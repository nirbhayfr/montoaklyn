import React from "react";
import PageHeading from "../common/PageHeading";
 // <-- import the CSS

const AboutUs = () => {
  return (
    <div className="about">
      <PageHeading home={"home"} pagename={"About Us"} />

      <div className="container">
        {/* Intro */}
        <section className="section">
          <h1 className="title">About UsedStuff</h1>
          <p className="para">
            <strong>UsedStuff</strong> is Haridwar’s friendly marketplace for
            quality pre-owned items. We help people <strong>buy and sell used furniture</strong>—sofas,
            beds, tables, chairs, wardrobes—and popular <strong>electronics</strong> like TVs,
            fridges, washing machines, microwaves, and small appliances.
            Our goal is simple: make second-hand shopping safe, easy, and
            value-for-money while reducing waste.
          </p>
        </section>

        {/* What we do */}
        <section className="grid grid-2 section">
          <div className="card">
            <h2 className="subtitle">We Buy</h2>
            <p className="para">
              Upgrading or moving? Share a few details and photos—our team will
              evaluate condition, age, and market demand to give you a fair quote.
              We offer quick pickups across Haridwar and hassle-free payments.
            </p>
          </div>
          <div className="card">
            <h2 className="subtitle">We Sell</h2>
            <p className="para">
              Every item we list is checked for functionality and cleanliness.
              Browse budget-friendly essentials for homes, hostels, rentals, and
              offices—delivered fast with optional installation for large items.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="section">
          <h2 className="subtitle">What you’ll find</h2>
          <ul className="chips">
            <li className="chip">Sofas & Recliners</li>
            <li className="chip">Beds, Mattresses & Wardrobes</li>
            <li className="chip">Dining Tables & Chairs</li>
            <li className="chip">Study Tables & Office Chairs</li>
            <li className="chip">LED TVs & Set-top boxes</li>
            <li className="chip">Fridges, Washing Machines, Microwaves</li>
          </ul>
        </section>

        {/* How it works */}
        <section className="grid grid-3 section">
          <div className="card">
            <h3 className="step">1) Share details</h3>
            <p className="para">
              Selling? Tell us the product name, age, and condition—add photos for a faster quote.
            </p>
          </div>
          <div className="card">
            <h3 className="step">2) Quick evaluation</h3>
            <p className="para">
              We estimate fair price and quality. For buyers, we help compare options that fit your budget.
            </p>
          </div>
          <div className="card">
            <h3 className="step">3) Pickup / Delivery</h3>
            <p className="para">
              Smooth doorstep pickup for sellers and fast delivery for buyers—convenient and reliable.
            </p>
          </div>
        </section>

        {/* Why choose us */}
        <section className="section">
          <h2 className="subtitle">Why Haridwar trusts UsedStuff</h2>
          <ul className="chips">
            <li className="chip">Fair, transparent pricing</li>
            <li className="chip">Quality-checked items</li>
            <li className="chip">Doorstep pickup & delivery</li>
            <li className="chip">Local support in Haridwar</li>
            <li className="chip">Eco-friendly and budget-smart</li>
            <li className="chip">Friendly, responsive team</li>
          </ul>
        </section>

        {/* CTA */}
        <section className="cta">
          <div className="cta__content">
            <h2 className="cta__title">Ready to buy or sell?</h2>
            <p className="cta__para">
              Share your requirements and we’ll get back with options and a best-price quote.
            </p>

            <div className="cta__actions">
              <a href="/sell" className="btn btn--primary">Sell an Item</a>
              <a href="/shop" className="btn btn--ghost">Browse Items</a>
            </div>

            <p className="cta__hint">
              Prefer WhatsApp? Message us at <strong>+91 7973624658</strong>.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
