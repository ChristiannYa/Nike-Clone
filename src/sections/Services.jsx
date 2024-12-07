import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

import { services } from "../constants";
import ServiceCard from "../components/ServiceCard";

const Services = () =>
{
   const servicesRef = useRef();

   useEffect(() =>
   {
      const services = gsap.utils.toArray(servicesRef.current.children);

      const servicesInViewport = () => services.every((element) =>
      {
         const bounds = element.getBoundingClientRect();
         const isVisible = bounds.top <= window.innerHeight && bounds.bottom >= 0;

         // console.log('Viewport check:', isVisible ? 'Services INVIEWPORT. Wait for animation!!' : 'Services not visible yet!');

         // Returns true only if ALL elements meet the viewport condition 
         // (top is within window height and bottom is visible)
         return isVisible;
      });

      const staggerServicesAnimation = () =>
      {
         gsap.to(services, {
            opacity: 1,
            duration: 1,
            y: 0,
            stagger: 0.2,
            ease: "power2.inOut",
         });
      };

      const individualServicesAnimation = () =>
      {
         services.forEach((service) =>
         {
            gsap.to(service, {
               opacity: 1,
               duration: 1,
               y: 0,
               scrollTrigger: {
                  trigger: service,
                  start: 'top bottom',
                  end: 'bottom top',
                  invalidateOnRefresh: true,
               }
            });
         });
      };

      ScrollTrigger.create({
         trigger: servicesRef.current,
         start: 'top center',
         end: 'bottom center',
         onEnter: () =>
         {
            if (servicesInViewport())
            {
               staggerServicesAnimation();
            } else
            {
               individualServicesAnimation();
            }
         },
         onUpdate: (self) =>
         {
            // If services are in viewport && the 
            // trigger isn't already active...
            if (servicesInViewport() && !self.isActive)
            {
               staggerServicesAnimation();
               self.kill();
            }
         },
         invalidateOnRefresh: true,
      });

      // Scroll listener for continuous viewport checking
      const handleScroll = () =>
      {
         // console.log('Scroll event detected - checking services position...');
         if (servicesInViewport())
         {
            // console.log('Services in view! Triggering animation...');
            staggerServicesAnimation();

            // Removes itself after successful trigger 
            // to optimize performance
            // console.log('Removing scroll listener');
            window.removeEventListener('scroll', handleScroll);
         }
      };

      // console.log('-- Setting up scroll listener --');
      // Continously check fot the handleScroll() functon
      window.addEventListener('scroll', handleScroll);

      return () =>
      {
         // console.log('-- Cleaning up scroll listener --');
         // Remove handleScroll() function once it is triggered
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   return (
      <section ref={servicesRef} className="max-container flex justify-center flex-wrap gap-9">
         {services.map((service) => (
            <ServiceCard key={service.label} {...service} />
         ))}
      </section>
   );
};

export default Services;
