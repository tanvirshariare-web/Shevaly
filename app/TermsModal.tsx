import React from 'react';
import { X } from 'lucide-react';

const TermsModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-[100] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50 shrink-0">
        <h2 className="text-2xl font-bold text-gray-800">Terms and Conditions</h2>
        <button onClick={onClose} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      {/* Body */}
      <div className="p-6 overflow-y-auto text-gray-700 space-y-6 flex-1 max-w-4xl mx-auto w-full">
        <p className="font-medium">
          Welcome to Shevaly. By accessing our website or placing an order, you agree to comply with the following terms:
        </p>

        <section>
          <h3 className="text-lg font-bold text-gray-900 mb-2">1. General Conditions</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>By placing an order, you confirm that you are at least 18 years old or browsing under the supervision of a parent or guardian.</li>
            <li>We reserve the right to refuse service to anyone for any reason at any time.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-bold text-gray-900 mb-2">2. Product Information & Pricing</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>We make every effort to display product colors and images as accurately as possible. However, we cannot guarantee that your device’s display will be perfectly accurate.</li>
            <li>Prices for our products are subject to change without notice.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-bold text-gray-900 mb-2">3. Ordering and Payment</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>All orders are subject to availability and confirmation of the order price.</li>
            <li>We accept Cash on Delivery (COD) and digital payments (bKash/Nagad/Cards). For COD, customers may be required to pay a delivery charge in advance to confirm the order.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-bold text-gray-900 mb-2">4. Shipping and Delivery</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Delivery times may vary depending on the location within Bangladesh.</li>
            <li>Shevaly is not responsible for delays caused by courier services or unforeseen circumstances (strikes, weather, etc.).</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-bold text-gray-900 mb-2">5. Returns and Refunds</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Customers must check the product in front of the delivery person.</li>
            <li>If a product is damaged or incorrect, it must be reported within 24 hours of receipt.</li>
            <li>Refunds will be processed according to our specific Return Policy (usually within 7–10 working days).</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-bold text-gray-900 mb-2">6. Intellectual Property</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>All content included on this site, such as text, graphics, logos, and images, is the property of Shevaly and is protected by copyright laws.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-bold text-gray-900 mb-2">7. Privacy</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Your submission of personal information through the store is governed by our Privacy Policy.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-bold text-gray-900 mb-2">8. Contact Information</h3>
          <p>
            Questions about the Terms and Conditions should be sent to us at <a href="mailto:shevalyofficial@gmail.com" className="text-[#80091B] hover:underline font-medium">shevalyofficial@gmail.com</a> or via <a href="tel:+8809611806424" className="text-[#80091B] hover:underline font-medium">+8809611806424</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsModal;
