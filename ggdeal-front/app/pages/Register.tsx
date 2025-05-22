import type { Route } from "../+types/root";
import InputPhoneNumber from "~/utils/InputPhoneNumber";
import { Config } from "../config/config";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GGDeal - Register" },
    { name: "description", content: "Register in GGdeal" },
  ];
}

export default function Register() {
  return (
    <section className="flex flex-col md:flex-row min-h-screen">
      {/* Imagen - En móvil aparece arriba, en desktop a la izquierda */}
      <div className="flex-1 order-0 md:order-none md:w-1/2">
        <div className="h-[30vh] md:h-screen flex items-center justify-center p-4 md:p-8">
          <img
            src="/img/img-register.png"
            alt="Register illustration"
            className="h-full w-full object-cover md:object-contain md:max-h-[80vh]"
          />
        </div>
      </div>
      
      {/* Formulario - En móvil aparece abajo, en desktop a la derecha */}
      <div className="flex-1 order-1 md:order-none md:w-1/2 flex justify-center items-center py-8 md:py-0">
        <div className="flex flex-col items-center w-full max-w-md px-4 md:px-0">
          <h1 className="text-3xl md:text-4xl text-center mb-4">REGISTER</h1>
          <div className="w-full h-[1px] bg-gray-400 mb-6"></div>

<<<<<<< HEAD
          <form className="w-full">
=======
          <form className="w-full max-w-md" action={`${Config.API_AUTH_URL}/api/auth/register`} method="POST">
>>>>>>> 7b50969d3b1f5c74ac04eb5d9176adcb88ec47a7
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
                placeholder="Password"
                name="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col sm:flex-row mb-4">
              <input
                type="text"
                placeholder="Name"
                name="name"
                className="w-full sm:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 sm:mb-0 sm:mr-2"
              />
              <input
                type="text"
                placeholder="Username"
                name="username"
                className="w-full sm:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:ml-2"
              />
            </div>
            <div className="flex flex-col sm:flex-row mb-6">
              <input
                type="date"
                placeholder="mm/dd/yy"
                name="birthdate"
                className="w-full sm:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 sm:mb-0 sm:mr-2"
              />
              <div className="w-full sm:w-1/2 sm:ml-2">
                <InputPhoneNumber />
              </div>
            </div>
            
            <button className="w-full bg-secondary text-center text-white py-3 text-lg rounded-md border border-transparent hover:bg-transparent hover:border-secondary hover:text-secondary transition duration-300 ease-in-out cursor-pointer">
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}