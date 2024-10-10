import React from 'react';

const PaymentInfoPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-8">
        {/* Page Title */}
        <h2 className="text-2xl font-bold border-l-5 border-primary  pl-5  text-gray-800 mb-6">
          Payment Information
        </h2>

        {/* Payment Summary Section */}
        <div className="space-y-6">
          {/* Payment Method */}
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Payment Method</h3>
            <p className="text-gray-600">
              <strong>Cardholder Name:</strong> John Doe
            </p>
            <p className="text-gray-600">
              <strong>Card Number:</strong> **** **** **** 1234
            </p>
            <p className="text-gray-600">
              <strong>Expiration Date:</strong> 08/26
            </p>
            <p className="text-gray-600">
              <strong>Payment Status:</strong> Paid
            </p>
          </div>

          {/* Payment Details */}
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Transaction Details</h3>
            <p className="text-gray-600">
              <strong>Transaction ID:</strong> TXN123456789
            </p>
            <p className="text-gray-600">
              <strong>Date:</strong> October 1, 2024
            </p>
            <p className="text-gray-600">
              <strong>Amount Paid:</strong> $120.00
            </p>
          </div>

          {/* Payment History */}
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Payment History</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Transaction on September 10, 2024 - $150.00</li>
              <li>Transaction on August 5, 2024 - $130.00</li>
              <li>Transaction on July 3, 2024 - $200.00</li>
            </ul>
          </div>
        </div>

        {/* Footer Information */}
        <div className="text-center mt-6 text-sm text-gray-500">
          If you have any issues with payments, please contact support at <a href="mailto:support@technest.com" className="text-teal-600 underline">support@technest.com</a>.
        </div>
      </div>
    </div>
  );
};

export default PaymentInfoPage;
