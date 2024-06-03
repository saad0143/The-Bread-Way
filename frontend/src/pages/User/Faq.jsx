import React, { useState } from 'react';

import styles from '../../style/style';
import Navbar from '../../components/User/Navbar';
import Footer from '../../components/User/Footer';

const FAQ = () => {
  

  
  const handleEmailClick = () => {
    
    window.location.href = 'mailto:thebreadwayproject@gmail.com';
  };
  return (
    <>
      <Navbar />
      <div className="h-auto p-8 sm:mt-0 mt-10">
        <div className="max-w-2xl mx-auto">
          <h1 className={`${styles.heading} w-auto`}>Frequently Asked Questions</h1>
          <div className="space-y-4 mt-5">
            <div className="border rounded-lg p-4 bg-white">
              <h2 className="text-lg font-semibold">Q: What is The Bread Way?</h2>
              <p>A: The Bread Way is a platform that connects you with a variety of bakeries, allowing you to order their products online.</p>
            </div>
            <div className="border rounded-lg p-4 bg-white">
              <h2 className="text-lg font-semibold">Q: How can I place an order?</h2>
              <p>A: To place an order, simply browse the list of bakeries, select the products you want, and proceed to checkout.</p>
            </div>
            <div className="border rounded-lg p-4 bg-white">
              <h2 className="text-lg font-semibold">Q: Can I customize my cake, donuts, or cupcakes and make 3d Models?</h2>
              <p>
                A: Yes, customization options are available for cake, donuts, and cupcakes. However, please note that this feature is offered by specific bakeries. Look for the customization option during the product selection process.
              </p>
            </div>

            {/* Second new FAQ item for limited customization availability */}
            <div className="border rounded-lg p-4 bg-white">
              <h2 className="text-lg font-semibold">Q: Are customization options available at all bakeries?</h2>
              <p>
                A: No, customization options are not available at all bakeries. Only select bakeries offer this feature. Check the product details or contact the bakery to confirm customization availability.
              </p>
            </div>
            <div className="border rounded-lg p-4 bg-white">
              <h2 className="text-lg font-semibold">Q: How do I contact customer support?</h2>
              <p>
                A: You can contact our customer support team by visiting the 'Contact Us' page or email us at  {" "}
                <span className="text-blue-500 cursor-pointer hover:underline" onClick={handleEmailClick}>
                  thebreadwayproject@gmail.com
                </span>.
              </p>
            </div>

            <div className="border rounded-lg p-4 bg-white">
              <h2 className="text-lg font-semibold">Q: Can I cancel my order?</h2>
              <p>A: No, you can't cancel your order</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQ;
