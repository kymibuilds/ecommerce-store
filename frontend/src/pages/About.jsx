import React from "react";
import Title from "../components/Title";

const About = () => {
  return (
    <div className="border-t pt-16 px-4 md:px-8 text-gray-700">
      {/* Page Title */}
      <div className="text-2xl mb-8">
        <Title text1={"ABOUT"} text2={"FOREVER"} />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Introduction */}
        <p className="text-lg leading-relaxed">
          Welcome to <span className="font-semibold text-gray-900">Forever Store</span>, your go-to
          destination for premium products and effortless shopping. Our mission is to create a
          shopping experience that’s fast, reliable, and built to last — just like the name says.
        </p>

        {/* Story */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Our Story</h2>
          <p className="leading-relaxed">
            Established in 2025, Forever Store began as a vision to blend technology and lifestyle
            into one seamless retail experience. What started as a small online venture has grown
            into a trusted brand that values design, quality, and customer satisfaction above all.
          </p>
        </div>

        {/* Values */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Our Core Values</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Quality:</strong> Every product is hand-selected for its craftsmanship and reliability.
            </li>
            <li>
              <strong>Transparency:</strong> We keep pricing simple and communication clear.
            </li>
            <li>
              <strong>Customer First:</strong> Our service doesn’t end at checkout — it begins there.
            </li>
            <li>
              <strong>Innovation:</strong> We continuously evolve to deliver modern and meaningful solutions.
            </li>
          </ul>
        </div>

        {/* Mission */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
          <p className="leading-relaxed">
            At Forever Store, we believe shopping should be timeless — simple, satisfying, and
            personal. Our mission is to connect you with the things that make life better, one order at a time.
          </p>
        </div>

        {/* Closing */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Thank You</h2>
          <p className="leading-relaxed">
            Thank you for choosing <span className="font-semibold text-gray-900">Forever Store</span>.
            We’re more than a brand — we’re a promise of quality, trust, and care that lasts forever.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
