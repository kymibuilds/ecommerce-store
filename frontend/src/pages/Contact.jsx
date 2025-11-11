import React from "react";
import Title from "../components/Title";

const Contact = () => {
  return (
    <div className="border-t pt-16 px-4 md:px-8 text-gray-700">
      {/* Page Title */}
      <div className="text-2xl mb-8">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      {/* Content Wrapper */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Left Section: Info */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Get in Touch</h2>
          <p className="leading-relaxed">
            Have questions about your order, our products, or want to collaborate?  
            The <span className="font-semibold text-gray-900">Forever Store</span> team is here to help.  
            Reach out through any of the channels below, and we’ll get back to you shortly.
          </p>

          <div className="space-y-3 text-sm sm:text-base">
            <p>
              <strong>Email:</strong> <a href="mailto:support@foreverstore.com" className="text-blue-600 hover:underline">support@foreverstore.com</a>
            </p>
            <p>
              <strong>Phone:</strong> +91 98765 43210
            </p>
            <p>
              <strong>Address:</strong> Forever Store HQ, New Delhi, India
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Business Hours</h3>
            <p>Monday – Saturday: 9:00 AM – 7:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>

        {/* Right Section: Form */}
        <div className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Send us a Message</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-gray-200"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-gray-200"
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-gray-200"
            />
            <button
              type="submit"
              className="w-full bg-gray-900 text-white font-medium py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
