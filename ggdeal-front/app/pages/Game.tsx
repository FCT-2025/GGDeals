import Breadcrumbs from "~/componets/Breadcrumbs";

export default function Game() {
    return (
        <div className="flex flex-col">
            <div className="w-full h-[600px] relative">
                <img 
                    src="/img/vistajuego1.png" 
                    alt="Death Stranding Hero" 
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="w-full mx-auto px-8 -mt-60 relative z-10">
                <div className="flex flex-wrap md:flex-nowrap gap-8">
                    <div className="w-full md:w-1/3 h-auto">
                        <img 
                            src="/img/vistajuego2.png" 
                            alt="Death Stranding Cover" 
                            className="w-full h-full object-cover shadow-lg"
                        />
                    </div>

                    <div className="w-full md:w-2/3 mt-6 md:mt-0 flex">
                        <div className="bg-gray-800 p-8 rounded shadow-lg w-full h-full flex flex-col justify-between">
                            <div>
                                <h1 className="text-3xl font-bold mb-6">DEATH STRANDING (PS4)</h1>
                                
                                <div className="flex items-center gap-10 mb-6">
                                    <div className="flex items-center">
                                        <img src="/img/steam-icon.png" alt="Steam" className="w-8 h-8 mr-3" />
                                        <span className="text-lg">Steam</span>
                                    </div>
                                    <span className="text-lg">En Stock</span>
                                    <span className="text-lg">Descarga Digital</span>
                                </div>
                                
                                <div className="h-[1px] bg-gray-600 mb-6"></div>
                                
                                <div className="flex items-center gap-6 mb-6">
                                    <span className="line-through text-gray-400 text-xl">69.65€</span>
                                    <span className="text-orange-500 font-semibold text-xl">-20%</span>
                                    <span className="text-3xl font-bold">55.65€</span>
                                </div>
                            </div>
                            
                            <button className="flex items-center justify-center gap-3 w-full bg-secondary text-center text-white py-3 text-lg rounded-md border border-transparent hover:bg-transparent hover:border-secondary hover:text-secondary transition duration-300 ease-in-out cursor-pointer mt-auto">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                                </svg>
                                Add to shopping cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full mx-auto px-8 mt-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="col-span-1">
                        <h2 className="text-2xl font-bold mb-6 uppercase">ABOUT</h2>
                        <p className="text-lg leading-relaxed">
                            Death Stranding is an action game set in a post-apocalyptic United States, where mysterious invisible creatures begin to appear. You play as Sam Porter Bridges, a delivery man tasked with delivering vital supplies. The game explores themes of connection, loneliness, and survival, featuring an asynchronous online component in a shared gameplay where players can indirectly help each other across worlds.
                        </p>
                    </div>
                    
                    <div className="col-span-1 pl-0 md:pl-12">
                        <div className="mb-8">
                            <div className="flex items-center justify-between gap-4">
                                <h3 className="font-semibold text-base">Installation:</h3>
                                <p className="text-base">How to activate your product</p>
                            </div>
                        </div>
                        
                        <div className="mb-8">
                            <div className="flex items-center justify-between gap-4">
                                <h3 className="font-semibold text-base">Developer:</h3>
                                <p className="text-base">Kojima Productions</p>
                            </div>
                        </div>
                        
                        <div className="mb-8">
                            <div className="flex items-center justify-between gap-4">
                                <h3 className="font-semibold text-base">Publisher:</h3>
                                <p className="text-base">505 Games (PC), Sony</p>
                            </div>
                        </div>
                        
                        <div className="mb-8">
                            <div className="flex items-center justify-between gap-4">
                                <h3 className="font-semibold text-base">Release Date:</h3>
                                <p className="text-base">November 8, 2019</p>
                            </div>
                        </div>
                        
                        <div className="mb-8">
                            <div className="flex items-center justify-between gap-4">
                                <h3 className="font-semibold text-base">Genre:</h3>
                                <p className="text-base">Action / Adventure</p>
                            </div>
                        </div>
                        
                        <div className="mb-8">
                            <div className="flex items-center justify-between gap-4">
                                <h3 className="font-semibold text-base">All Steam Reviews:</h3>
                                <p className="text-base">Very Positive</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full mx-auto px-8 mt-16 mb-16">
                <h2 className="text-2xl font-bold mb-6 uppercase">VISUALS</h2>
                
                <div className="w-full mb-6">
                    <img 
                        src="/img/vistajuego3.png" 
                        alt="Death Stranding Visual" 
                        className="w-full h-[500px] object-cover rounded-lg"
                    />
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/2">
                        <img 
                            src="/img/vistajuego4.png" 
                            alt="Death Stranding Visual" 
                            className="w-full h-[400px] object-cover rounded-lg"
                        />
                    </div>
                    
                    <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
                        <img 
                            src="/img/vistajuego5.png" 
                            alt="Death Stranding Visual" 
                            className="w-full h-[195px] object-cover rounded-lg"
                        />
                        <img 
                            src="/img/vistajuego6.png" 
                            alt="Death Stranding Visual" 
                            className="w-full h-[195px] object-cover rounded-lg"
                        />
                        <img 
                            src="/img/vistajuego7.png" 
                            alt="Death Stranding Visual" 
                            className="w-full h-[195px] object-cover rounded-lg"
                        />
                        <img 
                            src="/img/vistajuego8.png" 
                            alt="Death Stranding Visual" 
                            className="w-full h-[195px] object-cover rounded-lg"
                        />
                    </div>
                </div>
            </div>
            
            {/* Settings section */}
            <div className="w-full mx-auto px-8 mt-16">
                <h2 className="text-2xl font-bold mb-6 uppercase">SETTINGS</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Minimum Requirements */}
                    <div className="col-span-1">
                        <h3 className="text-xl font-bold mb-4">Minimum Requirements</h3>
                        
                        <div className="space-y-3 text-sm">
                            <div>
                                <span className="font-bold">OS:</span> Windows 10 64-bit
                            </div>
                            <div>
                                <span className="font-bold">Processor:</span> Intel Core i5-3470 or AMD Ryzen 3 1200
                            </div>
                            <div>
                                <span className="font-bold">Memory:</span> 8 GB RAM
                            </div>
                            <div>
                                <span className="font-bold">Graphics:</span> GeForce GTX 1050 3 GB or AMD Radeon RX 560 4 GB
                            </div>
                            <div>
                                <span className="font-bold">DirectX:</span> Version 12
                            </div>
                            <div>
                                <span className="font-bold">Storage:</span> 80 GB available space
                            </div>
                            <div>
                                <span className="font-bold">Additional Notes:</span> 720p (30-60FPS) with low settings
                            </div>
                        </div>
                    </div>
                    
                    {/* Recommended Requirements */}
                    <div className="col-span-1">
                        <h3 className="text-xl font-bold mb-4">Recommended Requirements</h3>
                        
                        <div className="space-y-3 text-sm">
                            <div>
                                <span className="font-bold">OS:</span> Windows 10 64-bit
                            </div>
                            <div>
                                <span className="font-bold">Processor:</span> Intel Core i7-3770 or AMD Ryzen 5 1600
                            </div>
                            <div>
                                <span className="font-bold">Memory:</span> 8 GB RAM
                            </div>
                            <div>
                                <span className="font-bold">Graphics:</span> GeForce GTX 1060 6 GB or AMD Radeon RX 590
                            </div>
                            <div>
                                <span className="font-bold">DirectX:</span> Version 12
                            </div>
                            <div>
                                <span className="font-bold">Storage:</span> 80 GB available space
                            </div>
                            <div>
                                <span className="font-bold">Additional Notes:</span> 1080p (30-60FPS) with medium to high settings
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Reviews section */}
            <div className="w-full mx-auto px-8 mt-16 mb-16">
                <h2 className="text-2xl font-bold mb-6 uppercase">REVIEWS</h2>
                
                <div className="bg-gray-800 p-8 rounded-lg flex items-center justify-center">
                    <p className="text-xl mr-6">Not reviews yet</p>
                    <button className="bg-secondary text-center text-white py-2 px-8 rounded-md border border-transparent hover:bg-transparent hover:border-secondary hover:text-secondary transition duration-300 ease-in-out cursor-pointer">
                        Rate this game
                    </button>
                </div>
            </div>
        </div>
    );
}