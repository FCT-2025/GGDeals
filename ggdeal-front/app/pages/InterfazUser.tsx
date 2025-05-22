import { useState } from "react";

export default function UserInterface() {
  const [activeTab, setActiveTab] = useState("controlPanel");

  const languages = [
    { name: "English", flag: "🇬🇧" },
    { name: "Español", flag: "🇪🇸" },
    { name: "Dansk", flag: "🇩🇰" },
    { name: "Polski", flag: "🇵🇱" },
    { name: "Français", flag: "🇫🇷" },
    { name: "Italiano", flag: "🇮🇹" },
    { name: "Nederlands", flag: "🇳🇱" },
    { name: "Deutsch", flag: "🇩🇪" },
    { name: "Português", flag: "🇵🇹" },
    { name: "українська", flag: "🇺🇦" },
  
  ];

  const currencies = [
    { code: "EUR", flag: "🇪🇺" },
    { code: "DKK", flag: "🇩🇰" },
    { code: "CAD", flag: "🇨🇦" },
    { code: "AUD", flag: "🇦🇺" },
    { code: "USD", flag: "🇺🇸" },
    { code: "CHF", flag: "🇨🇭" },
    { code: "RSD", flag: "🇷🇸" },
    { code: "SEK", flag: "🇸🇪" },
    { code: "GBP", flag: "🇬🇧" },
    { code: "BRL", flag: "🇧🇷" },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-black">
      <div className="flex flex-col items-center py-8">
        <div className="w-32 h-32 rounded-full bg-gray-700 overflow-hidden mb-4">
          <img
            src="/img/user.png"
            alt="User Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-2xl font-bold text-white mb-1">username</h1>
        <p className="text-sm text-gray-400">Member since 15/05/2025</p>
      </div>

      <div className="w-full max-w-4xl px-4 overflow-x-auto">
        <div className="flex border-b border-gray-700 mb-6 min-w-max">
          <button
            className={`py-3 px-6 border-b-2 ${
              activeTab === "controlPanel" 
                ? "border-secondary text-secondary" 
                : "border-transparent text-gray-400 hover:text-white"
            } transition-colors`}
            onClick={() => setActiveTab("controlPanel")}
          >
            Control Panel
          </button>
          <button
            className={`py-3 px-6 border-b-2 ${
              activeTab === "myOrders" 
                ? "border-secondary text-secondary" 
                : "border-transparent text-gray-400 hover:text-white"
            } transition-colors`}
            onClick={() => setActiveTab("myOrders")}
          >
            My Orders
          </button>
          <button
            className={`py-3 px-6 border-b-2 ${
              activeTab === "settings" 
                ? "border-secondary text-secondary" 
                : "border-transparent text-gray-400 hover:text-white"
            } transition-colors`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
          <button
            className={`py-3 px-6 border-b-2 ${
              activeTab === "languageCurrency" 
                ? "border-secondary text-secondary" 
                : "border-transparent text-gray-400 hover:text-white"
            } transition-colors`}
            onClick={() => setActiveTab("languageCurrency")}
          >
            Language & Currency
          </button>
        </div>
      </div>

      {activeTab === "controlPanel" && (
        <div className="w-full max-w-4xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-gray-800 p-4">
              <h3 className="text-center text-gray-300 mb-4">General View</h3>
              <div className="flex justify-around">
                <div className="flex flex-col items-center">
                  <span className="text-gray-400 text-sm">Friends</span>
                  <span className="text-white font-bold text-xl">0</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-gray-400 text-sm">Reviews</span>
                  <span className="text-white font-bold text-xl">0</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-gray-400 text-sm">Wishlist</span>
                  <span className="text-white font-bold text-xl">0</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-4">
              <h3 className="text-center text-gray-300 mb-4">Wallet</h3>
              <div className="flex justify-center items-center h-12">
                <span className="text-gray-400">Affiliation:</span>
                <span className="text-white font-bold text-xl ml-2">0€</span>
              </div>
            </div>

            <div className="bg-gray-800 p-4">
              <h3 className="text-center text-gray-300 mb-4">Ranking</h3>
              <div className="flex justify-center items-center h-12">
                <span className="text-gray-400">Level:</span>
                <span className="text-white font-bold text-xl ml-2">1</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-800 p-4">
              <h3 className="text-center text-gray-300 mb-2">Affiliation Link</h3>
              <p className="text-center text-sm text-gray-400">
                This is your affiliation link, share it to earn money!
              </p>
            </div>

            <div className="bg-gray-800 p-4">
              <h3 className="text-center text-gray-300 mb-2">Total Saved</h3>
              <div className="flex justify-center items-center h-12">
                <span className="text-white font-bold text-xl">0€</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-4 mb-8">
            <h3 className="text-center text-gray-300 mb-6">Latest Games Added to Wishlist</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
              <div className="group">
                <div className="relative aspect-[3/4] overflow-hidden mb-2">
                  <img
                    src="/img/vistajuego2.png"
                    alt="Death Stranding"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="text-white text-sm font-medium text-center">DEATH STRANDING</h4>
              </div>
              <div className="group">
                <div className="relative aspect-[3/4] overflow-hidden mb-2">
                  <img
                    src="/img/vistajuego2.png"
                    alt="Death Stranding"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="text-white text-sm font-medium text-center">DEATH STRANDING</h4>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "myOrders" && (
        <div className="w-full max-w-4xl px-4">
          <div className="bg-gray-800 p-6 text-center">
            <h3 className="text-xl text-gray-300">My Orders</h3>
            <p className="text-gray-400 mt-4">You don't have any orders yet.</p>
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="w-full max-w-4xl px-4">
          <div className="bg-gray-800 p-6">
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-gray-700 rounded-full overflow-hidden mr-4">
                  <img 
                    src="/img/user.png" 
                    alt="Profile" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="flex-1">
                  <input 
                    type="file"
                    className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2 text-sm focus:outline-none focus:ring-0"
                  />
                  <span className="text-gray-400 text-sm">jpg, .png</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6">
                <h3 className="text-gray-300 mr-4 mb-2 sm:mb-0 whitespace-nowrap">Username</h3>
                <div className="flex flex-1 flex-col sm:flex-row items-start sm:items-center w-full">
                  <div className="flex-1 mb-2 sm:mb-0 sm:mr-2">
                    <input 
                      type="text" 
                      placeholder="Username" 
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-0 bg-gray-800 text-white border-gray-700" 
                    />
                  </div>
                  <button className="w-full sm:w-auto bg-secondary text-center text-white py-2 px-4 rounded-md border border-transparent hover:bg-transparent hover:border-secondary hover:text-secondary transition duration-300 ease-in-out cursor-pointer">
                    SEND
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-gray-300 mb-4">Change your email</h3>
              
              <div className="space-y-4 max-w-md">
                <input 
                  type="email" 
                  placeholder="Your new email" 
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-0 bg-gray-800 text-white border-gray-700" 
                />
                
                <input 
                  type="password" 
                  placeholder="Your current password" 
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-0 bg-gray-800 text-white border-gray-700" 
                />
                
                <input 
                  type="email" 
                  placeholder="Confirm your new email" 
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-0 bg-gray-800 text-white border-gray-700" 
                />
                
                <button className="w-full bg-secondary text-center text-white py-2 rounded-md border border-transparent hover:bg-transparent hover:border-secondary hover:text-secondary transition duration-300 ease-in-out cursor-pointer">
                  ACCEPT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "languageCurrency" && (
        <div className="w-full max-w-4xl px-4">
          <div className="bg-gray-800 p-6 mb-8">
            <h3 className="text-xl text-gray-300 mb-6 text-center">Languages</h3>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {languages.map((lang) => (
                <button key={lang.name} className="flex items-center space-x-2 p-3 hover:bg-gray-700 rounded transition-colors">
                  <span className="text-xl">{lang.flag}</span>
                  <span className="text-white">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 p-6 mb-8">
            <h3 className="text-xl text-gray-300 mb-6 text-center">Currencies</h3>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {currencies.map((currency) => (
                <button key={currency.code} className="flex items-center space-x-2 p-3 hover:bg-gray-700 rounded transition-colors">
                  <span className="text-xl">{currency.flag}</span>
                  <span className="text-white">{currency.code}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}