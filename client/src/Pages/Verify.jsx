import React, { useContext, useEffect, useState } from 'react';
import { shopContext } from '../Context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function Verify() {
  const { navigate, token, setCartItems, backendUrl } = useContext(shopContext);
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({ success: null, message: '' });

  const verifyPayment = async () => {
    if (!token) {
      setStatus({ success: false, message: 'You need to be logged in to verify payment.' });
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/verifyStripe`,
        { success, orderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setCartItems({});
        toast.success(response.data.message, { position: "top-center", autoClose: 2000 });
        setStatus({ success: true, message: response.data.message });
        setTimeout(() => navigate('/orders'), 1500);
      } else {
        toast.error('Payment verification failed.', { position: "top-center", autoClose: 2000 });
        setStatus({ success: false, message: 'Payment verification failed.' });
        setTimeout(() => navigate('/cart'), 1500);
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Something went wrong.';
      toast.error(msg, { position: "top-center", autoClose: 2000 });
      setStatus({ success: false, message: msg });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      {loading && (
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin w-10 h-10 text-gray-700" />
          <p className="text-gray-600 text-lg">Verifying your payment, please wait...</p>
        </div>
      )}

      {!loading && status.success && (
        <div className="flex flex-col items-center gap-4 text-green-600">
          <CheckCircle className="w-12 h-12" />
          <p className="text-lg font-medium">{status.message}</p>
          <p className="text-gray-600">Redirecting to your orders...</p>
        </div>
      )}

      {!loading && status.success === false && (
        <div className="flex flex-col items-center gap-4 text-red-600">
          <XCircle className="w-12 h-12" />
          <p className="text-lg font-medium">{status.message}</p>
          <p className="text-gray-600">Redirecting to your cart...</p>
        </div>
      )}
    </div>
  );
}
