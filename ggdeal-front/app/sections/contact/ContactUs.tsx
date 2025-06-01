export default function ContactUs() {
  return (
    <section className="flex flex-col md:flex-row h-auto max-w-[1440px] mx-auto px-4 sm:px-6 my-8 sm:my-10 md:my-16 gap-6 sm:gap-8 md:gap-10">
      <div className="md:flex-1 md:order-1 order-2">
        <div className="relative w-full aspect-square md:aspect-auto md:h-full max-h-[500px] overflow-hidden rounded-lg">
          <img
            src="/img/contact-hero3.png"
            alt="Contact illustration"
            className="w-full h-full object-cover md:object-contain"
          />
        </div>
      </div>
      
      <div className="flex md:flex-1 justify-center items-center md:order-2 order-1 bg-gray-900/40 p-4 sm:p-6 md:p-8 rounded-lg">
        <div className="flex flex-col items-center w-full max-w-md">
          <h2 className="text-2xl sm:text-3xl text-center mb-3 sm:mb-4 font-bold text-white">Contact with us</h2>
          <div className="w-32 sm:w-48 h-[1px] bg-gray-400 mb-4 sm:mb-6"></div>

          <form className="w-full">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-3 sm:mb-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-3 sm:px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black text-white"
              />
              <input
                type="text"
                placeholder="Username"
                className="w-full px-3 sm:px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black text-white"
              />
            </div>
            <div className="mb-3 sm:mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 sm:px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black text-white"
              />
            </div>
            <div className="mb-3 sm:mb-4">
              <textarea
                placeholder="Your Message"
                rows={5}
                className="w-full px-3 sm:px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black text-white resize-none"
              ></textarea>
            </div>
            <button className="w-full bg-secondary text-center text-black font-bold py-2 sm:py-3 rounded-md border border-transparent hover:bg-transparent hover:border-secondary hover:text-secondary transition duration-300 ease-in-out cursor-pointer">
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}