import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import { products } from "../constants";
import PopularProductCard from "../components/PopularProductCard";
import CarouselButtons from "../components/CarouselButtons";

gsap.registerPlugin(ScrollTrigger);

const PopularProducts = () =>
{
   const popularsRef = useRef();
   useGSAP(() =>
   {
      gsap.to('#popularsCarousel', {
         y: 0,
         opacity: 1,
         duration: 0.3,
         scrollTrigger: {
            trigger: '#popularsCarousel',
            start: 'top 90%',
            end: 'bottom 50%',
            // markers: true, // Debug trigger points
         }
      })
   }, [])

   return (
      <section id="products" className="max-sm:mt-12">
         <div className="flex flex-col justify-start gap-5">
            <h2 className="text-4xl font-palanquin font-bold">
               Our <span className="text-accent-2">Popular</span> Products
            </h2>
            <p className="lg:max-w-lg mt-2 font-montserrat text-slate-gray">
               Experience top-notch quality and style with
               our sought-after selections. Discover a world
               of comfort, design, and value.
            </p>
         </div>

         <div ref={popularsRef} id="popularsCarousel" className="hidden-siblings mt-16 flex gap-8 overflow-x-scroll snap-x popularScrollbar-container">
            {products.map((product) => (
               <PopularProductCard key={product.name} {...product} />
            ))}
         </div>

         <CarouselButtons containerRef={popularsRef} />
      </section>
   );
};

export default PopularProducts;
