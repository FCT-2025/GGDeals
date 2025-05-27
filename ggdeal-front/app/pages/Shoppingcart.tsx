export default function ShoppingCart() {
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

            {/* Empty cart section */}
            <section className="max-w-[1440px] mx-auto px-4 mb-12">
                <div className="bg-gray-800 max-w-2xl mx-auto p-10 rounded flex flex-col items-center justify-center">
                    <img src="/img/cart.png" alt="Empty cart" className="w-10 h-10 mb-4" />
                    <h3 className="text-xl mb-2">Your shopping cart is empty</h3>
                    <p className="text-center text-gray-400 mb-6">You haven't added any products to your basket yet. Browse the site and find amazing deals!</p>
                    <button className="border border-white py-2 px-8 hover:bg-white hover:text-black transition duration-300">
                        Discover our games
                    </button>
                </div>
            </section>

            {/* Summary section */}
            <section className="max-w-[1440px] mx-auto px-4 mb-12">
                <div className="max-w-sm mx-auto border border-gray-700 p-4 rounded">
                    <h3 className="text-xl mb-4 text-center">Summary</h3>
                    <div className="flex justify-between mb-2 pb-2 border-b border-gray-700">
                        <span>Official price</span>
                        <span>0€</span>
                    </div>
                    <div className="flex justify-between mb-2 pb-2 border-b border-gray-700">
                        <span>Discount</span>
                        <span>0€</span>
                    </div>
                    <div className="flex justify-between mb-4 pb-2 border-b border-gray-700">
                        <span>Subtotal</span>
                        <span>0€</span>
                    </div>
                    
                    <button className="w-full bg-secondary text-center text-white py-2 rounded-md border border-transparent hover:bg-transparent hover:border-secondary hover:text-secondary transition duration-300 ease-in-out cursor-pointer">
                        PROCEED TO CHECKOUT
                    </button>
                    
                    <div className="flex justify-center items-center mt-2">
                        <div className="flex-1 h-[1px] bg-gray-500"></div>
                        <div className="mx-2">
                            <span className="text-sm">o</span>
                        </div>
                        <div className="flex-1 h-[1px] bg-gray-500"></div>
                    </div>
                    
                    <div className="flex justify-center items-center mt-4 cursor-pointer">
                        <span className="mr-2">Continue Shopping</span>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 5H9M9 5L5 1M9 5L5 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>
            </section>
        </>
    );
}