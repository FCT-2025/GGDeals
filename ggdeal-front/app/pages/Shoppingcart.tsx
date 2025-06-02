import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Config } from "~/config/config";

// Tipos para el carrito
interface CartItemDTO {
  id: number;
  replicaId: number;
  quantity: number;
  gameName: string;
  price?: number;
}

interface CartDTO {
  id: number;
  userId: number;
  items: CartItemDTO[];
}

// Tipos para la respuesta de compra
interface PurchaseResponse {
  success: boolean;
  message?: string;
  activationKeys?: {
    gameName: string;
    activationKey: string;
    quantity: number;
  }[];
}

export default function ShoppingCart() {
  const [cart, setCart] = useState<CartDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingItems, setUpdatingItems] = useState<Set<number>>(new Set());
  const [purchasing, setPurchasing] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchaseResult, setPurchaseResult] = useState<PurchaseResponse | null>(null);

  // Cargar carrito al montar el componente
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await fetch(Config.CART.GET, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const cartData = await response.json();
        setCart(cartData);
      } else if (response.status === 401) {
        // Usuario no autenticado
        window.location.href = '/login';
      } else {
        setError('Error al cargar el carrito');
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const updateItemQuantity = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(itemId);
      return;
    }

    setUpdatingItems(prev => new Set(prev).add(itemId));

    try {
      const response = await fetch(`${Config.CART.UPDATE}/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ quantity: newQuantity })
      });

      if (response.ok) {
        // Actualizar el carrito localmente
        setCart(prevCart => {
          if (!prevCart) return null;
          return {
            ...prevCart,
            items: prevCart.items.map(item =>
              item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
          };
        });
      } else {
        const data = await response.json();
        alert(data.message || 'Error al actualizar cantidad');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Error de conexión');
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  const removeItem = async (itemId: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      return;
    }

    setUpdatingItems(prev => new Set(prev).add(itemId));

    try {
      const response = await fetch(`${Config.CART.REMOVE}/${itemId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        // Eliminar el item del carrito localmente
        setCart(prevCart => {
          if (!prevCart) return null;
          return {
            ...prevCart,
            items: prevCart.items.filter(item => item.id !== itemId)
          };
        });
      } else {
        const data = await response.json();
        alert(data.message || 'Error al eliminar producto');
      }
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Error de conexión');
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  const clearCart = async () => {
    if (!confirm('¿Estás seguro de que quieres vaciar todo el carrito?')) {
      return;
    }

    try {
      const response = await fetch(Config.CART.CLEAR, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setCart(prevCart => prevCart ? { ...prevCart, items: [] } : null);
      } else {
        const data = await response.json();
        alert(data.message || 'Error al vaciar carrito');
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      alert('Error de conexión');
    }
  };

  const proceedToPurchase = async () => {
    if (!cart || cart.items.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    if (!confirm('¿Confirmas que quieres proceder con la compra?')) {
      return;
    }

    setPurchasing(true);

    try {
      const response = await fetch(Config.PURCHARSE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        const result: PurchaseResponse = await response.json();
        setPurchaseResult(result);
        setShowPurchaseModal(true);
        
        // Limpiar el carrito después de una compra exitosa
        if (result.success) {
          setCart(prevCart => prevCart ? { ...prevCart, items: [] } : null);
        }
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error al procesar la compra');
      }
    } catch (error) {
      console.error('Error during purchase:', error);
      alert('Error de conexión durante la compra');
    } finally {
      setPurchasing(false);
    }
  };

  const closePurchaseModal = () => {
    setShowPurchaseModal(false);
    setPurchaseResult(null);
  };

  // Calcular totales
  const calculateTotals = () => {
    if (!cart || !cart.items.length) {
      return { subtotal: 0, discount: 0, total: 0 };
    }

    const subtotal = cart.items.reduce((total, item) => {
      const price = item.price || 60; // Precio por defecto si no tienes el campo
      return total + (price * item.quantity);
    }, 0);

    const discount = 0; // Implementa tu lógica de descuentos
    const total = subtotal - discount;

    return { subtotal, discount, total };
  };

  const { subtotal, discount, total } = calculateTotals();
  const isEmpty = !cart || cart.items.length === 0;

  if (loading) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 mt-35 mb-12">
        <div className="text-center">
          <p>Cargando carrito...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 mt-35 mb-12">
        <div className="text-center text-red-500">
          <p>{error}</p>
          <button 
            onClick={fetchCart}
            className="mt-4 px-4 py-2 bg-secondary text-white rounded hover:bg-transparent hover:border-secondary hover:text-secondary border border-transparent transition"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header section with lines and circle */}
      <section className="relative max-w-[1440px] mx-auto px-4 mt-35 mb-12">
        <div className="flex items-center justify-center">
          <div className="flex-1 h-[1px] bg-gray-400"></div>
          <div className="mx-4 w-10 h-10 rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-white">1</span>
          </div>
          <div className="flex-1 h-[1px] bg-gray-400"></div>
        </div>
        <div className="text-center mt-2">
          <h2 className="text-lg">Shopping cart</h2>
        </div>
      </section>

      {isEmpty ? (
        /* Empty cart section */
        <section className="max-w-[1440px] mx-auto px-4 mb-12">
          <div className="bg-gray-800 max-w-2xl mx-auto p-10 rounded flex flex-col items-center justify-center">
            <img src="/img/cart.png" alt="Empty cart" className="w-10 h-10 mb-4" />
            <h3 className="text-xl mb-2">Your shopping cart is empty</h3>
            <p className="text-center text-gray-400 mb-6">You haven't added any products to your basket yet. Browse the site and find amazing deals!</p>
            <Link 
              to="/categories" 
              className="border border-white py-2 px-8 hover:bg-white hover:text-black transition duration-300"
            >
              Discover our games
            </Link>
          </div>
        </section>
      ) : (
        /* Cart with items */
        <section className="max-w-[1440px] mx-auto px-4 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800 rounded p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl">Productos en tu carrito ({cart.items.length})</h3>
                  <button 
                    onClick={clearCart}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Vaciar carrito
                  </button>
                </div>

                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-700 rounded">
                      {/* Game image placeholder */}
                      <div className="w-20 h-20 bg-gray-600 rounded flex items-center justify-center">
                        <span className="text-xs text-gray-400">IMG</span>
                      </div>

                      {/* Game info */}
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.gameName}</h4>
                        <p className="text-sm text-gray-400">Clave digital</p>
                      </div>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                          disabled={updatingItems.has(item.id)}
                          className="w-8 h-8 bg-gray-600 hover:bg-gray-500 rounded flex items-center justify-center disabled:opacity-50"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                          disabled={updatingItems.has(item.id)}
                          className="w-8 h-8 bg-gray-600 hover:bg-gray-500 rounded flex items-center justify-center disabled:opacity-50"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right min-w-[80px]">
                        <p className="font-semibold">{((item.price || 60) * item.quantity).toFixed(2)}€</p>
                        <p className="text-sm text-gray-400">{(item.price || 60).toFixed(2)}€ c/u</p>
                      </div>

                      {/* Remove button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        disabled={updatingItems.has(item.id)}
                        className="text-red-400 hover:text-red-300 p-2 disabled:opacity-50"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 border border-gray-700 p-6 rounded sticky top-4">
                <h3 className="text-xl mb-4 text-center">Summary</h3>
                <div className="flex justify-between mb-2 pb-2 border-b border-gray-700">
                  <span>Official price</span>
                  <span>{subtotal.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between mb-2 pb-2 border-b border-gray-700">
                  <span>Discount</span>
                  <span>-{discount.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between mb-4 pb-2 border-b border-gray-700 font-semibold">
                  <span>Subtotal</span>
                  <span>{total.toFixed(2)}€</span>
                </div>
                
                <button 
                  onClick={proceedToPurchase}
                  disabled={purchasing || isEmpty}
                  className="w-full bg-secondary text-center text-white py-3 rounded-md border border-transparent hover:bg-transparent hover:border-secondary hover:text-secondary transition duration-300 ease-in-out cursor-pointer mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {purchasing ? 'PROCESANDO...' : 'PROCEED TO CHECKOUT'}
                </button>
                
                <div className="flex justify-center items-center mb-4">
                  <div className="flex-1 h-[1px] bg-gray-500"></div>
                  <div className="mx-2">
                    <span className="text-sm">or</span>
                  </div>
                  <div className="flex-1 h-[1px] bg-gray-500"></div>
                </div>
                
                <Link 
                  to="/categories"
                  className="flex justify-center items-center cursor-pointer hover:text-secondary transition"
                >
                  <span className="mr-2">Continue Shopping</span>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5H9M9 5L5 1M9 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Purchase Success Modal */}
      {showPurchaseModal && purchaseResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="text-center mb-6">
              {purchaseResult.success ? (
                <>
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-green-400 mb-2">¡Compra Exitosa!</h3>
                  <p className="text-gray-300">Tu compra se ha procesado correctamente. Aquí tienes tus claves de activación:</p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-red-400 mb-2">Error en la Compra</h3>
                  <p className="text-gray-300">{purchaseResult.message || 'Ha ocurrido un error procesando tu compra.'}</p>
                </>
              )}
            </div>

            {purchaseResult.success && purchaseResult.activationKeys && (
              <div className="space-y-4 mb-6">
                <h4 className="text-lg font-semibold text-center">Claves de Activación:</h4>
                {purchaseResult.activationKeys.map((keyInfo, index) => (
                  <div key={index} className="bg-gray-700 p-4 rounded">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-semibold text-white">{keyInfo.gameName}</h5>
                      <span className="text-sm text-gray-400">Cantidad: {keyInfo.quantity}</span>
                    </div>
                    <div className="bg-gray-600 p-3 rounded font-mono text-sm break-all">
                      <code className="text-green-400">{keyInfo.activationKey}</code>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Guarda esta clave en un lugar seguro. La necesitarás para activar tu juego.
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="text-center">
              <button
                onClick={closePurchaseModal}
                className="bg-secondary hover:bg-transparent hover:border-secondary hover:text-secondary border border-transparent text-white px-6 py-2 rounded transition duration-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}