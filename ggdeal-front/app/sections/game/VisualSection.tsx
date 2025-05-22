import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { Thumbnails } from "yet-another-react-lightbox/plugins";

export default function VisualsSection() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const images = [
    "/img/vistajuego3.png",
    "/img/vistajuego4.png",
    "/img/vistajuego5.png",
    "/img/vistajuego6.png",
    "/img/vistajuego7.png",
    "/img/vistajuego8.png",
  ];

  const slides = images.map((src) => ({
    src,
    style: { objectFit: "cover" },
    alt: "Death Stranding",
  }));
  console.log(slides);
  return (
    <section className="w-full mx-auto px-8 mt-16 mb-16">
      <h2 className="text-2xl font-bold mb-6 uppercase">VISUALS</h2>

      <div className="w-full mb-6">
        <img
          src={images[0]}
          alt="Death Stranding Visual"
          className="w-full h-[500px] object-cover rounded-lg cursor-pointer"
          onClick={() => {
            setIndex(0);
            setOpen(true);
          }}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <img
            src={images[1]}
            alt="Death Stranding Visual"
            className="w-full h-[400px] object-cover rounded-lg cursor-pointer"
            onClick={() => {
              setIndex(1);
              setOpen(true);
            }}
          />
        </div>

        <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
          {images.slice(2).map((src, i) => (
            <img
              key={i}
              src={src}
              alt="Death Stranding Visual"
              className="w-full h-[195px] object-cover rounded-lg cursor-pointer"
              onClick={() => {
                setIndex(i + 2);
                setOpen(true);
              }}
            />
          ))}
        </div>
        {/*         <div className="relative cursor-pointer" onClick={() => {setOpen(true); setIndex(3)}}>
          <img
            src="/img/vistajuego8.png"
            alt="Death Stranding Visual"
            className="w-full h-[195px] object-cover rounded-lg"
            
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-lg">
            <span className="text-white text-xl font-semibold">+3</span>
          </div>
        </div> */}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        plugins={[Fullscreen, Thumbnails]}
        index={index}
        styles={{
          container: {
            backgroundColor: "#161618", 
          },
        }}
      />
    </section>
  );
}
