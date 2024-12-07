import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

import Button from "../components/Button";
import { arrowRight } from "../assets/icons";
import { statistics, shoes } from "../constants";
import { bigShoe1 } from "../assets/images";
import ShoeCard from "../components/ShoeCard";

const Hero = () =>
{
   const statsRef = useRef();
   const shoesRef = useRef();
   const [bigShoeImg, setBigShoeImg] = useState(bigShoe1);

   useEffect(() =>
   {
      const statsElements = gsap.utils.toArray(statsRef.current.children);
      const shoeElements = gsap.utils.toArray(shoesRef.current.children);

      const statsInViewport = () => statsElements.every((element) =>
         ScrollTrigger.isInViewport(element)
      );

      // Stagger animation for stats cards
      const staggerStatsAnimation = () =>
      {
         gsap.to(statsElements, {
            opacity: 1,
            duration: 1,
            y: 0,
            stagger: 0.5,
            ease: "power2.inOut",
            scrollTrigger: {
               trigger: statsRef.current,
               start: 'top bottom',
               end: 'bottom top',
               invalidateOnRefresh: true,
            },
         });
      };

      // Individual animation for stats cards
      const individualStatsAnimation = () =>
      {
         statsElements.forEach((element) =>
         {
            gsap.to(element, {
               opacity: 1,
               duration: 1,
               y: 0,
               scrollTrigger: {
                  trigger: element,
                  start: 'top bottom',
                  end: 'bottom top',
                  invalidateOnRefresh: true,
               },
            });
         });
      };

      // ScrollTriggers for stats cards
      ScrollTrigger.create({
         trigger: statsRef.current,
         start: 'top bottom',
         end: 'bottom top',
         onEnter: () =>
         {
            if (statsInViewport())
            {
               staggerStatsAnimation();
            } else
            {
               individualStatsAnimation();
            }
         },
         onUpdate: (self) =>
         {
            if (!statsInViewport())
            {
               individualStatsAnimation();
               self.kill();
            }
         },
         invalidateOnRefresh: true,
      });

      gsap.to(shoeElements, {
         opacity: 1,
         duration: 1,
         y: 0,
         stagger: 0.2,
         ease: "power2.inOut",
         scrollTrigger: {
            trigger: shoesRef.current,
            start: 'top bottom',
            end: 'bottom top',
            toggleActions: 'restart none none none',
            invalidateOnRefresh: true,
         },
      });

      gsap.to('#newArrival_parent', {
         opacity: 1,
         delay: 0.5,
         y: 0,
         zIndex: 10,
      });

      gsap.to('#summerCollection_child', {
         opacity: 1,
         delay: 0.8,
      });

      gsap.to('#discover_gChild', {
         opacity: 1,
         delay: 1.2,
      });
   }, []);

   return (
      <section id="home" className="w-full flex xl:flex-row flex-col justify-center min-h-screen max-container">
         <div className="relative xl:w-2/5 flex flex-col justify-center items-start w-full max-xl:padding-x pt-8">
            <p id="summerCollection_child" className="text-xl font-montserrat text-accent-2 child-intro">
               Our Summer collections
            </p>

            <h1 id="newArrival_parent" className="mt-8 font-palanquin text-8xl max-sm:text-[72px] max-sm:leading-[82px] font-bold parent-intro">
               <span className="xl:bg-white xl:whitespace-nowrap relative z-10 pr-10">
                  The New Arrival
               </span>
               <br />
               <span className="text-accent-2 inline-block mt-3">Nike</span> Shoes
            </h1>
            <p id="discover_gChild" className="font-montserrat text-slate-gray text-lg leading-8 mt-6 mb-6 sm:max-w-sm gChild-intro">
               Discover stylish Nike arrivals, quality comfort, and innovation for your active life.
            </p>

            <Button label="Shop now" iconURL={arrowRight} />

            {/* Hero - stats */}
            <div ref={statsRef} className="flex justify-start items-start flex-wrap w-full mt-6 gap-12 max-sm:gap-x-8 max-sm:gap-y-4">
               {statistics.map((stat, statIndex) => (
                  <div key={statIndex} className="hidden-siblings">
                     <p className="text-4xl font-palanquin font-bold">{stat.value}</p>
                     <p className="leading-7 font-montserrat text-slate-gray">
                        {stat.label}
                     </p>
                  </div>
               ))}
            </div>
         </div>

         <div className="relative flex-1 flex justify-center items-center xl:min-h-screen max-xl:py-40 bg-primary bg-hero bg-cover bg-center">
            <img
               src={bigShoeImg}
               alt="shoe collection"
               width={610}
               height={500}
               className="object-contain relative z-10"
            />

            <div ref={shoesRef} className="flex sm:gap-6 gap-4 absolute -bottom-[5%] sm:left-[10%] max-sm:px-6">
               {shoes.map((shoe, shoeIndex) => (
                  <div key={`shoe-${shoeIndex}`} className="hidden-siblings">
                     <ShoeCard
                        imgURL={shoe}
                        changeBigShoeImage={(shoe) => setBigShoeImg(shoe)}
                        bigShoeImg={bigShoeImg}
                     />
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};

export default Hero;
