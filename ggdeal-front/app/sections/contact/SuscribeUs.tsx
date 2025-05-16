import InputPhoneNumber from "~/utils/InputPhoneNumber";

export default function SubscribeUs() {
    return (
              <section className="flex h-auto max-w-[1440px] mx-auto px-4 mb-10">
        <div className="flex flex-1 justify-center items-center">
          <div className="flex flex-col items-center w-full max-w-md">
            <h2 className="text-3xl text-center mb-4">Subscribe with us</h2>
            <div className="w-90 h-[1px] bg-gray-400 mb-6"></div>

            <form className="w-full">
              <div className="flex gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-4 mb-4">
                <InputPhoneNumber />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="w-full bg-secondary text-center text-white py-2 rounded-md border border-transparent hover:bg-transparent hover:border-secondary hover:text-secondary transition duration-300 ease-in-out cursor-pointer">
                SEND
              </button>
            </form>
          </div>
        </div>
        <div className="flex-1">
          <img
            src="/img/contact-hero2.png"
            alt="Subscribe illustration"
            className="w-full h-full object-contain"
          />
        </div>
      </section>
    );
}