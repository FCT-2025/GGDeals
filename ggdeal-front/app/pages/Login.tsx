import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GGDeal - Login" },
    { name: "description", content: "Login in GGdeal" },
  ];
}

export default function Login() {
    return (
        <section className="flex h-screen">
            <div className="flex flex-1 justify-center align-center items-center">
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl text-center mb-4">LOG IN</h1>
                    <div className="w-90 h-[1px] bg-gray-400 mb-6"></div>
                    
                    <form className="w-full max-w-md">
                        <div className="mb-4">
                            <input 
                                type="email" 
                                placeholder="Email"
                                name="email" 
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <input 
                                type="password" 
                                placeholder="********" 
                                name="password"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </form>
                    <button className="w-full bg-secondary text-center text-white py-2 rounded-md border border-transparent hover:bg-transparent hover:border-secondary hover:text-secondary transition duration-300 ease-in-out cursor-pointer">
                        LOG IN
                    </button>
                </div>
            </div>
            <div className="flex-1">
            <div className="mr-8 mt-8 mb-8">
                    <img 
                        src="/img/img-login.png" 
                        alt="Login illustration" 
                        className="max-h-[80vh] w-full object-contain"
                    />
                </div>
            </div>
        </section>
    );
}