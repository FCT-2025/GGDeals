import type { Route } from "../+types/root";
import {Config} from "../config/config";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GGDeal - Login" },
    { name: "description", content: "Login in GGdeal" },
  ];
}

export default function Login() {
    return (
        <section className="flex flex-col md:flex-row min-h-screen">
            <div className="flex-1 order-1 md:order-none md:w-1/2 flex justify-center items-center py-8 md:py-0">
                <div className="flex flex-col items-center w-full max-w-md px-4 md:px-0">
                    <h1 className="text-3xl md:text-4xl text-center mb-4">LOG IN</h1>
                    <div className="w-full h-[1px] bg-gray-400 mb-6"></div>
                    
                    <form className="w-full" action={`${Config.API_AUTH_URL}/login`} method="POST">
                        <div className="mb-4">
                            <input 
                                type="email" 
                                placeholder="Email"
                                name="email" 
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-6">
                            <input 
                                type="password" 
                                placeholder="********" 
                                name="password"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button className="w-full bg-secondary text-center text-white py-2 rounded-md border border-transparent hover:bg-transparent hover:border-secondary hover:text-secondary transition duration-300 ease-in-out cursor-pointer">
                            LOG IN
                        </button>
                    </form>
                </div>
            </div>

            <div className="flex-1 order-0 md:order-none md:w-1/2 bg-transparent">
                <div className="h-[50vh] md:h-screen flex items-center justify-center p-4 md:p-8">
                    <img 
                        src="/img/img-login.png" 
                        alt="Login illustration" 
                        className="h-full w-full object-cover md:object-contain md:max-h-[80vh]"
                    />
                </div>
            </div>
        </section>
    );
}