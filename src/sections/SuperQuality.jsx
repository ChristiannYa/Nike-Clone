import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { shoe8 } from "../assets/images"
import Button from "../components/Button"

const SuperQuality = () =>
{
   useGSAP(() =>
   {
      gsap.to('#superQuality_parent', {
         y: 0,
         opacity: 1,
         duration: 1,
         scrollTrigger: {
            trigger: '#about-us',
            start: 'top 80%',
            end: 'bottom 50%',
            // markers: true, // Debug trigger points
         }
      })

      gsap.to('#ensuringPremium_child', {
         opacity: 1,
         duration: 1,
         delay: 0.4,
         scrollTrigger: {
            trigger: '#ensuringPremium_child',
            start: 'top 90%',
            end: 'bottom 50%',
            // markers: true, // Debug trigger points
         }
      });

      gsap.to('#ourDedication_child', {
         opacity: 1,
         duration: 1,
         delay: 0.6,
         scrollTrigger: {
            trigger: '#ourDedication_child',
            start: 'top 90%',
            end: 'bottom 50%',
            // markers: true, // Debug trigger points
         }
      });

      // Create a media match context
      const mm = gsap.matchMedia();

      // Add different animations for different screen sizes
      mm.add({
         // Mobile devices
         isSmall: "(max-width: 769px)",

         // Desktop and larger devices
         isLarge: "(min-width: 769px)",
      }, (context) =>
      {
         const { isSmall } = context.conditions;

         gsap.fromTo('#superQuality-img', {
            scale: 0.6,
            x: 0,
            rotation: 120,
         },
            {
               scale: 1,
               x: 'default',
               rotation: 0,
               duration: 2,
               ease: 'bounce',
               scrollTrigger: {
                  trigger: '#superQuality-img',
                  // Small devices : Large devices
                  start: isSmall ? 'top 90%' : 'top 50%',
                  end: 'bottom center',
                  toggleActions: 'restart none resume reset',
                  // markers: true,
               }
            });
      });
   }, [])

   return (
      <section id="about-us" className="flex justify-between items-center max-lg:flex-col gap-10 w-full max-container">
         <div className="flex flex-1 flex-col">
            <h2 id="superQuality_parent" className="parent-intro font-palanquin text-4xl capitalize font-bold lg:max-w-lg">
               We Provide You {' '}
               <span className="text-accent-2">Super</span> {' '}
               <span className="text-accent-2">Quality</span> Shoes
            </h2>
            <p id="ensuringPremium_child" className="mt-6 lg:max-w-lg info-text child-intro">
               Ensuring premium comfort and syle, our meticulously
               crafted footwear is designed to elevate your experience,
               providing you with unmathed quality, innovation, and
               a touch of elegance.
            </p>
            <p id="ourDedication_child" className="mt-4 lg:max-w-lg info-text child-intro">
               Our dedication to detail and excellence ensures
               your satisfaction.
            </p>
            <div className="mt-8">
               <Button label="View details" />
            </div>
         </div>

         <div id="superQuality-img" className="flex-1 flex justify-center items-center">
            <img
               src={shoe8}
               alt="Quality shoe"
               width={570}
               className="object-contain"
            />
         </div>
      </section>
   )
}

export default SuperQuality