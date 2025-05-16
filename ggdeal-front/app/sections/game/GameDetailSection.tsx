export default function GameDetail() {
    return (
            <section className="w-full mx-auto px-8 -mt-60 relative z-10">
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
            </section>
    );
}