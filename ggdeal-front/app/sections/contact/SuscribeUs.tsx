import InputPhoneNumber from "~/utils/InputPhoneNumber";

export default function SubscribeUs() {
    return (
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8 md:py-12 lg:py-16 mb-8 sm:mb-10 md:mb-12">
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12">
                {/* Eliminado el fondo bg-gray-900/40 */}
                <div className="flex flex-1 justify-center items-center order-2 lg:order-1 p-4 sm:p-6 md:p-8 rounded-lg">
                    <div className="flex flex-col items-center w-full max-w-md">
                        <h2 className="text-2xl md:text-3xl text-center mb-3 sm:mb-4 font-bold text-white">
                            Subscribe with us
                        </h2>
                        <div className="w-32 md:w-48 h-[1px] bg-gray-400 mb-4 sm:mb-6"></div>

                        <form className="w-full">
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-3 sm:mb-4">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="w-full px-3 sm:px-4 py-2 border rounded-md focus:outline-none focus:ring-0 bg-black text-white"
                                />
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="w-full px-3 sm:px-4 py-2 border rounded-md focus:outline-none focus:ring-0 bg-black text-white"
                                />
                            </div>
                            <div className="mb-3 sm:mb-4">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full px-3 sm:px-4 py-2 border rounded-md focus:outline-none focus:ring-0 bg-black text-white"
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
                                <div className="w-full">
                                    <InputPhoneNumber />
                                </div>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full px-3 sm:px-4 py-2 border rounded-md focus:outline-none focus:ring-0 bg-black text-white"
                                />
                            </div>
                            <button className="w-full bg-secondary text-center text-black font-bold py-2 sm:py-3 rounded-md border border-transparent hover:bg-transparent hover:border-secondary hover:text-secondary transition duration-300 ease-in-out cursor-pointer">
                                SEND
                            </button>
                        </form>
                    </div>
                </div>

                <div className="flex-1 flex items-center justify-center order-1 lg:order-2">
                    <div className="relative w-full aspect-square sm:aspect-[4/3] lg:aspect-auto lg:h-full max-h-[500px] overflow-hidden rounded-lg">
                        <img
                            src="/img/contact-hero2.png"
                            alt="Subscribe illustration"
                            className="w-full h-full object-cover sm:object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}