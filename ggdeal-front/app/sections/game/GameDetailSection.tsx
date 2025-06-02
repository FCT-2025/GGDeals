import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Config } from "~/config/config";
import type { Game, Edition } from "~/types/Game";

export default function GameDetail({ game }: { game: Game }) {
  const [selectedPlatform, setSelectedPlatform] = useState<number | null>(null);
  const [selectedEdition, setSelectedEdition] = useState<Edition | null>(null);
  const [availableEditions, setAvailableEditions] = useState<Edition[]>([]);
  const [selectedReplica, setSelectedReplica] = useState<number | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Inicializar con la primera plataforma disponible
  useEffect(() => {
    if (game.platformModels && game.platformModels.length > 0) {
      setSelectedPlatform(game.platformModels[0].id);
    }
  }, [game]);

  // Actualizar ediciones disponibles cuando cambia la plataforma
  useEffect(() => {
    if (selectedPlatform) {
      if (game.editions && game.editions.length > 0) {
        // Usar las ediciones directamente desde game.editions
        setAvailableEditions(game.editions);
        setSelectedEdition(game.editions[0]);
      } else {
        // Si no hay ediciones específicas, crear una edición estándar con el precio base del juego
        const standardEdition: Edition = {
          id: 0,
          name: "Edición Estándar",
          price: game.prize, // Nota: debe ser 'price' no 'prize' según el tipo Edition
          description: "Edición estándar del juego"
        };
        setAvailableEditions([standardEdition]);
        setSelectedEdition(standardEdition);
      }
    }
  }, [selectedPlatform, game.editions, game.prize]);

  // Encontrar la réplica disponible según plataforma y edición seleccionadas
  useEffect(() => {
    if (selectedPlatform && selectedEdition && game.replicas) {
      // Buscar réplicas disponibles
      const availableReplicas = game.replicas.filter(replica => !replica.isSold);
      
      if (selectedEdition.name === "Edición Estándar") {
        // Para edición estándar, buscar réplicas sin edición específica o cualquier réplica disponible
        const replica = availableReplicas.find(replica => 
          !replica.edition || replica.edition === null
        ) || availableReplicas[0]; // Si no hay réplicas sin edición, tomar la primera disponible
        
        setSelectedReplica(replica ? replica.id : null);
      } else {
        // Para ediciones específicas, buscar por nombre de edición
        const replica = availableReplicas.find(replica => 
          replica.edition && replica.edition.name === selectedEdition.name
        );
        
        setSelectedReplica(replica ? replica.id : null);
      }
    }
  }, [selectedPlatform, selectedEdition, game.replicas]);

  const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlatform(Number(e.target.value));
  };

  const handleEditionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const editionId = Number(e.target.value);
    const edition = availableEditions.find(ed => ed.id === editionId);
    if (edition) {
      setSelectedEdition(edition);
    }
  };

  const handleAddToCart = async () => {
    if (!selectedReplica) return;

    setIsAddingToCart(true);
    
    try {
      const response = await fetch(Config.CART.ADD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Para incluir cookies (JWT)
        body: JSON.stringify({
          replicaId: selectedReplica,
          quantity: 1
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Éxito - podrías mostrar una notificación o actualizar el estado
        alert('¡Producto añadido al carrito exitosamente!');
        // Opcional: redirigir al carrito o actualizar contador del carrito
      } else {
        // Error del servidor
        alert(data.message || 'Error al añadir al carrito');
        
        // Si es error de autenticación, redirigir al login
        if (response.status === 401) {
          window.location.href = '/login';
        }
      }
    } catch (error) {
      console.error('Error al añadir al carrito:', error);
      alert('Error de conexión. Por favor, inténtalo de nuevo.');
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Calcular precio con descuento usando el precio de la edición seleccionada
  const basePrice = selectedEdition ? selectedEdition.price : game.prize;
  const finalPrice = game.discount 
    ? basePrice - (basePrice * game.discount / 100)
    : basePrice;

  return (
    <section className="w-full mx-auto px-8 -mt-60 relative z-10">
      <div className="flex flex-wrap md:flex-nowrap gap-8">
        <div className="w-full md:w-1/3 h-auto">
          <img
            src={game.src || "/img/vistajuego2.png"}
            alt={`${game.title} Cover`}
            className="w-full h-full object-cover shadow-lg"
          />
        </div>

        <div className="w-full md:w-2/3 mt-6 md:mt-0 flex">
          <div className="bg-gray-800 p-8 rounded shadow-lg w-full h-full flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-6">{game.title.toUpperCase()}</h1>

              <div className="flex items-center gap-10 mb-6">
                <div className="flex items-center">
                  <img
                    src="/img/steam-icon.png"
                    alt="Steam"
                    className="w-8 h-8 mr-3"
                  />
                  <span className="text-lg">Digital</span>
                </div>
                <span className="text-lg">
                  {game.type === "AVAILABLE" ? "En Stock" : game.type === "PREORDER" ? "Pre-orden" : "Agotado"}
                </span>
                <span className="text-lg">Descarga Digital</span>
              </div>

              <div className="h-[1px] bg-gray-600 mb-6"></div>

              <div className="flex items-center gap-6 mb-6">
                {game.discount && (
                  <>
                    <span className="line-through text-gray-400 text-xl">
                      {basePrice.toFixed(2)}€
                    </span>
                    <span className="text-orange-500 font-semibold text-xl">
                      -{game.discount}%
                    </span>
                  </>
                )}
                <span className="text-3xl font-bold">
                  {finalPrice.toFixed(2)}€
                </span>
              </div>
            </div>

            <div className="flex gap-8 mb-6 px-4">
              <div className="flex items-center gap-4">
                <label className="text-lg font-medium text-gray-200">
                  Plataforma:
                </label>
                <div className="relative">
                  <select 
                    value={selectedPlatform || ""}
                    onChange={handlePlatformChange}
                    className="appearance-none bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 shadow-md focus:outline-none focus:border-orange-500 transition-colors"
                  >
                    {game.platformModels?.map((platform) => (
                      <option key={platform.id} value={platform.id}>
                        {platform.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 9l6 6 6-6"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="text-lg font-medium text-gray-200">
                  Edición:
                </label>
                <div className="relative">
                  <select 
                    value={selectedEdition?.id || ""}
                    onChange={handleEditionChange}
                    className="appearance-none bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 shadow-md focus:outline-none focus:border-orange-500 transition-colors"
                  >
                    {availableEditions.map((edition) => (
                      <option key={edition.id} value={edition.id}>
                        {edition.name} - {edition.price.toFixed(2)}€
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 9l6 6 6-6"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {selectedReplica ? (
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className={`flex items-center justify-center gap-3 w-full ${
                  isAddingToCart 
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                    : 'bg-secondary hover:bg-transparent hover:border-secondary hover:text-secondary'
                } text-center text-white py-3 text-lg rounded-md border border-transparent transition duration-300 ease-in-out cursor-pointer mt-auto`}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
                {isAddingToCart ? 'Añadiendo...' : 'Añadir al carrito'}
              </button>
            ) : (
              <button
                disabled
                className="flex items-center justify-center gap-3 w-full bg-gray-600 text-center text-gray-400 py-3 text-lg rounded-md cursor-not-allowed mt-auto"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
                No disponible
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}