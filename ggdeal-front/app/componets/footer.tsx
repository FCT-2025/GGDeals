import IconPaypal from "../assets/icons/icon-paypal.svg?react";
import IconVisa from "../assets/icons/icon-visa.svg?react";
import IconMastercard from "../assets/icons/icon-mastercard.svg?react";
import IconDiscover from "../assets/icons/icon-discover.svg?react";
import IconPaySafeCard from "../assets/icons/icon-paysafecard.svg?react";

import IconTwitter from "../assets/icons/icon-twitter.svg?react";
import IconFacebook from "../assets/icons/icon-facebook.svg?react";
import IconInstagram from "../assets/icons/icon-instagram.svg?react";
import IconYoutube from "../assets/icons/icon-youtube.svg?react";
import IconDiscord from "../assets/icons/icon-discord.svg?react";

export default function Footer() {
  return (
    <footer>
      <div className="flex gap-4 sm:gap-6 md:gap-10 justify-center flex-wrap bg-gray-800 py-3 sm:py-4 rounded-tl-lg rounded-tr-lg">
        <IconDiscover className="w-12 sm:w-auto h-6 sm:h-auto" />
        <IconMastercard className="w-12 sm:w-auto h-6 sm:h-auto" />
        <IconPaypal className="w-12 sm:w-auto h-6 sm:h-auto" />
        <IconPaySafeCard className="w-12 sm:w-auto h-6 sm:h-auto" />
        <IconVisa className="w-12 sm:w-auto h-6 sm:h-auto" />
      </div>
      
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6 px-4 gap-8 md:gap-6 lg:gap-[30px]">
        <div className="font-sofia space-y-2 relative">
          <h2 className="text-lg mb-3 font-[700]">Service-Hotline</h2>
          <div>
            <p className="text-sm font-light">Telefonische Beratung unter:</p>
            <h3 className="text-base font-bold">+49 (0) 771 / 175 131 69</h3>
          </div>
          <div className="font-[600]">
            <p>Monday - Friday</p>
            <ul className="pl-2">
              <li>08:00 - 12.00 Uhr</li>
              <li>13.00 - 17:00 Uhr</li>
            </ul>
          </div>
          <div className="hidden md:block absolute h-[60%] w-[2px] bg-gray-100 -translate-y-1/2 top-1/2 right-[-15px]"></div>
        </div>
        
        <div className="font-sofia space-y-2 relative">
          <h2 className="text-lg mb-3 font-[700]">Shop</h2>
          <ul className="font-[600] space-y-1">
            <li className="cursor-pointer hover:text-primary transition-colors">Games</li>
            <li className="cursor-pointer hover:text-primary transition-colors">Hardware</li>
            <li className="cursor-pointer hover:text-primary transition-colors">Merchandise</li>
            <li className="cursor-pointer hover:text-primary transition-colors">Exclusives</li>
            <li className="cursor-pointer hover:text-primary transition-colors">Online service</li>
          </ul>
          <div className="hidden md:block absolute h-[60%] w-[2px] bg-gray-100 -translate-y-1/2 top-1/2 right-[-15px]"></div>
        </div>
        
        <div className="font-sofia space-y-2 relative">
          <h2 className="text-lg mb-3 font-[700]">Information</h2>
          <ul className="font-[600] space-y-1">
            <li className="cursor-pointer hover:text-primary transition-colors">Download Area</li>
            <li className="cursor-pointer hover:text-primary transition-colors">Imprint</li>
            <li className="cursor-pointer hover:text-primary transition-colors">Data protection</li>
            <li className="cursor-pointer hover:text-primary transition-colors">Newsletter</li>
            <li className="cursor-pointer hover:text-primary transition-colors">Shipment</li>
          </ul>
          <div className="hidden lg:block absolute h-[60%] w-[2px] bg-gray-100 -translate-y-1/2 top-1/2 right-[-15px]"></div>
        </div>
        
        <div className="font-sofia space-y-2">
          <h2 className="text-lg mb-3 font-[700]">Our Company</h2>
          <ul className="font-[600] space-y-1">
            <li className="cursor-pointer hover:text-primary transition-colors">About us</li>
            <li className="cursor-pointer hover:text-primary transition-colors">Contact</li>
            <li className="cursor-pointer hover:text-primary transition-colors">Privacy Policy</li>
            <li className="cursor-pointer hover:text-primary transition-colors">Terms of Use</li>
          </ul>
          <div className="flex flex-wrap gap-4 mt-4">
            <IconTwitter className="cursor-pointer hover:opacity-80 transition-opacity" />
            <IconFacebook className="cursor-pointer hover:opacity-80 transition-opacity" />
            <IconInstagram className="cursor-pointer hover:opacity-80 transition-opacity" />
            <IconYoutube className="cursor-pointer hover:opacity-80 transition-opacity" />
            <IconDiscord className="cursor-pointer hover:opacity-80 transition-opacity" />
          </div>
        </div>
      </div>
      
      <div className="text-center text-gray-500 text-sm mt-8 mb-4">
        © 2023 GGDeal. All rights reserved.
      </div>
    </footer>
  );
}
