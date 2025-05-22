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

          <form className="w-full max-w-md" action={`${Config.API_AUTH_URL}/api/auth/register`} method="POST">
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
            <div className="flex mb-4">
              <input
                type="text"
                placeholder="Name"
                name="name"
                className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
              />
              <input
                type="text"
                placeholder="Username"
                name="username"
                className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2"
              />
            </div>
            <div className="flex mb-4">
              <input
                type="date"
                placeholder="mm/dd/yy"
                name="birthdate"
                className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
              />
              <InputPhoneNumber />
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
