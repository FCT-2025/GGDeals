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
      <div className="flex gap-10 justify-center flex-wrap bg-gray-800 py-4 rounded-tl-lg rounded-tr-lg">
        <IconDiscover />
        <IconMastercard />
        <IconPaypal />
        <IconPaySafeCard />
        <IconVisa />
      </div>
      <div className="flex mt-6 px-4 gap-[30px] flex-wrap justify-center align-center">
        <div className="flex-[1_0] min-w-[200px] flex-col font-sofia space-y-2 relative aspect-[1.1]">
          <h2 className="text-lg mb-3 font-[700]">Service-Hotline</h2>
          <div>
            <p className="text-sm font-light">Telefonische Beratung unter:</p>
            <h3 className="text-base font-bold ">+49 (0) 771 / 175 131 69</h3>
          </div>
          <div className="font-[600]">
            <p>Monday - Friday</p>
            <ul className="pl-2">
              <li>08:00 - 12.00 Uhr</li>
              <li>13.00 - 17:00 Uhr</li>
            </ul>
          </div>
          <div className="absolute h-[60%] w-[2px] bg-gray-100 -translate-y-1/2 top-1/2 right-[-15px]"></div>
        </div>
        <div className="flex-[1_0] min-w-[200px] flex-col font-sofia space-y-2 relative aspect-[1.1]">
          <h2 className="text-lg mb-3 font-[700]">Shop</h2>
          <ul className="font-[600]">
            <li>Games</li>
            <li>Hardware</li>
            <li>Merchandise</li>
            <li>Exclusives</li>
            <li>Online service</li>
          </ul>
          <div className="absolute h-[60%] w-[2px] bg-gray-100 -translate-y-1/2 top-1/2 right-[-15px]"></div>
        </div>
        <div className="flex-[1_0] min-w-[200px] flex-col font-sofia space-y-2 relative aspect-[1.1]">
          <h2 className="text-lg mb-3 font-[700]">Inforamtion</h2>
          <ul className="font-[600]">
            <li>Download Area</li>
            <li>Imprint</li>
            <li>Data protection</li>
            <li>Newsletter</li>
            <li>Shipment</li>
          </ul>
          <div className="absolute h-[60%] w-[2px] bg-gray-100 -translate-y-1/2 top-1/2 right-[-15px]"></div>
        </div>
        <div className="flex-[1_0] min-w-[200px] flex-col font-sofia space-y-2  aspect-[1.1]">
          <h2 className="text-lg mb-3 font-[700]">Our Company</h2>
          <ul className="font-[600]">
            <li>About us</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
          </ul>
          <ul className="flex flex-wrap gap-4 mt-1">
            <IconTwitter />
            <IconFacebook />
            <IconInstagram />
            <IconYoutube />
            <IconDiscord />
          </ul>
        </div>
      </div>
    </footer>
  );
}
