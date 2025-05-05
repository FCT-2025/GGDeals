export default function Register() {
    return (
        <section className="flex h-screen">
            <div className="flex-1">
                <div className="ml-8 mt-8 mb-8">
                    <img 
                        src="/img/img-register.png" 
                        alt="Register illustration" 
                        className="max-h-[80vh] w-full object-contain"
                    />
                </div>
            </div>
            <div className="flex flex-1 justify-center align-center items-center mt-[-40px]">
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl text-center mb-4">REGISTER</h1>
                    <div className="w-90 h-[1px] bg-gray-400 mb-6"></div>
                    
                    <form className="w-full max-w-md">
                        <div className="mb-4">
                            <input 
                                type="email" 
                                placeholder="Email" 
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <input 
                                type="password" 
                                placeholder="Password" 
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex mb-4">
                            <input 
                                type="text" 
                                placeholder="Name" 
                                className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                            />
                            <input 
                                type="text" 
                                placeholder="Surname" 
                                className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2"
                            />
                        </div>
                        <div className="flex mb-4">
                            <input 
                                type="text" 
                                placeholder="mm/dd/yy" 
                                className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                            />
                            <select 
                                className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2 appearance-none pr-8"
                                style={{ backgroundPosition: 'right 12px center', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundSize: '20px 20px' }}
                            >
                                <option value="">Spain</option>
                                <option value="usa">USA</option>
                                <option value="uk">UK</option>
                                <option value="canada">Canada</option>
                            </select>
                        </div>
                    </form>
                    <button className="w-full bg-secondary text-center text-white py-2 rounded-md border border-transparent hover:bg-transparent hover:border-secondary hover:text-secondary transition duration-300 ease-in-out cursor-pointer">
                        REGISTER
                    </button>
                </div>
            </div>
        </section>
    );
}