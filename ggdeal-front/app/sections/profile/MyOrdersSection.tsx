import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function MyOrders() {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/purchase/history', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data);
        setError(null);
      } else if (response.status === 401) {
        setError('unauthorized');
      } else {
        setError('loadOrders');
      }
    } catch (err) {
      setError('connection');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'text-green-400';
      case 'pending':
        return 'text-yellow-400';
      case 'failed':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusText = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return t('profile.orders.status.completed');
      case 'pending':
        return t('profile.orders.status.pending');
      case 'failed':
        return t('profile.orders.status.failed');
      default:
        return t('profile.orders.status.unknown');
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // Aquí podrías mostrar una notificación de éxito
    } catch (err) {
      console.error('Error copying to clipboard:', err);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl px-4">
        <div className="bg-gray-800 p-6 text-center">
          <h3 className="text-xl text-gray-300">{t("profile.orders.title")}</h3>
          <div className="mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-400 mt-2">{t("profile.orders.loading")}</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl px-4">
        <div className="bg-gray-800 p-6 text-center">
          <h3 className="text-xl text-gray-300">{t("profile.orders.title")}</h3>
          <div className="mt-4 p-4 bg-red-900/50 rounded-lg">
            <p className="text-red-400">{t(`profile.orders.error.${error}`)}</p>
            <button 
              onClick={fetchOrders}
              className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
            >
              {t("profile.orders.retry")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="w-full max-w-4xl px-4">
        <div className="bg-gray-800 p-6 text-center">
          <h3 className="text-xl text-gray-300">{t("profile.orders.title")}</h3>
          <div className="mt-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <p className="text-gray-400 mt-4">{t("profile.orders.noOrders")}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl px-4">
      <div className="bg-gray-800 p-6">
        <h3 className="text-xl text-gray-300 mb-6">{t("profile.orders.title")}</h3>
        
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-650 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-medium text-white">
                      {order.game?.title || t("profile.orders.gameNotSpecified")}
                    </h4>
                    {order?.edition && (
                      <span className="px-2 py-1 bg-blue-600 text-blue-100 text-xs rounded">
                        {order.edition.name}
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-300">
                    <div>
                      <span className="text-gray-400">{t("profile.orders.orderNumber")}</span> {order.id}
                    </div>
                    <div>
                      <span className="text-gray-400">{t("profile.orders.date")}</span> {formatDate(order.purchaseDate)}
                    </div>
                    <div>
                      <span className="text-gray-400">{t("profile.orders.paymentMethod")}</span> {order.paymentMethod === 'balance' ? t("profile.orders.paymentMethods.balance") : order.paymentMethod}
                    </div>
                    <div>
                      <span className="text-gray-400">{t("profile.orders.status.label")}</span> 
                      <span className={`ml-1 font-medium ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                  </div>

                  {order.replica?.activationKey && order.status?.toLowerCase() === 'completed' && (
                    <div className="mt-3 p-3 bg-gray-600 rounded">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">{t("profile.orders.activationKey.label")}</span>
                        <button
                          onClick={() => copyToClipboard(order.replica.activationKey)}
                          className="text-xs px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                        >
                          {t("profile.orders.activationKey.copy")}
                        </button>
                      </div>
                      <code className="block mt-1 p-2 bg-gray-900 text-green-400 text-sm rounded font-mono break-all">
                        {order.replica.activationKey}
                      </code>
                    </div>
                  )}
                </div>

                <div className="mt-4 sm:mt-0 sm:ml-4 text-right">
                  <div className="text-2xl font-bold text-green-400">
                    €{order.amount?.toFixed(2)}
                  </div>
                  {order.purchaseAmount && order.purchaseAmount !== order.amount && (
                    <div className="text-sm text-gray-400 line-through">
                      €{order.purchaseAmount.toFixed(2)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {orders.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              {t("profile.orders.summary.showing")} {orders.length} {orders.length === 1 ? t("profile.orders.summary.order") : t("profile.orders.summary.orders")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}