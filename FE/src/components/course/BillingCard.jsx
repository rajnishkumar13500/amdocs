import PropTypes from 'prop-types';

const BillingCard = ({ courseCost }) => {
  const GST_RATE = 0.18; // 18% GST
  const gstAmount = courseCost * GST_RATE;
  const totalAmount = courseCost + gstAmount;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Billing Details</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <span className="text-gray-600">Course Price</span>
          <span className="text-gray-800 font-semibold">₹{courseCost.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <span className="text-gray-600">GST (18%)</span>
          <span className="text-gray-800 font-semibold">₹{gstAmount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center pt-4">
          <span className="text-lg font-bold text-gray-800">Total Amount</span>
          <span className="text-lg font-bold text-green-600">₹{totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <button className="w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300">
        Proceed to Payment
      </button>

      <div className="mt-4 text-sm text-gray-500">
        <p>* Prices are inclusive of GST</p>
        <p>* Payment is secure and encrypted</p>
      </div>
    </div>
  );
};

BillingCard.propTypes = {
  courseCost: PropTypes.number.isRequired,
};

export default BillingCard; 