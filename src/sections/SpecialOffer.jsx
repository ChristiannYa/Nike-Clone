import gsap from "gsap"
import { useEffect } from "react"
import { Power0 } from "gsap" // Add this import

import { arrowRight } from "../assets/icons"
import { offer } from "../assets/images"
import Button from "../components/Button"

const SpecialOffer = () =>
{
   useEffect(() =>
   {
      const masterTimeline = gsap.timeline({
         repeat: -1,

         // Waits n seconds between each burst
         repeatDelay: 3,
      })

      masterTimeline.add(
         gsap.to('#specialOffer', {
            duration: 0.6,
            scale: 1.12,

            // Does 3 pulses (initial + n repeats)
            repeat: 3,
            yoyo: true,
            ease: Power0.easeNone,
         })
      )

      // Stop the animation while scrolling away
      return () => masterTimeline.kill()
   }, [])

   return (
      <section id="special-offer" className="flex justify-wrap items-center max-xl:flex-col-reverse gap-10 max-container">
         <div>
            <img src={offer} width={773} height={687} className="object-contain w-full" />
         </div>
         <div className="flex flex-1 flex-col">
            <h2 className="font-palanquin text-4xl capitalize font-bold lg:max-w-lg">
               <span id="specialOffer" className="text-accent-2 inline-block">Special</span> Offer
            </h2>
            <p className="mt-4 lg:max-w-lg info-text">
               Embark on a shopping journey that redefines your experience
               with unbeatable deals. From premier selections to incredible savings,
               we offer unparalled value that sets us apart.
            </p>
            <p className="mt-6 lg:max-w-lg info-text">
               Navigate a realm of possibilities designed to fulfill your unique desires,
               surpassing the loftiest expectations. Your journey with us is nothing
               short of exceptional.
            </p>
            <div className="mt-11 flex flex-wrap gap-4">
               <Button label="Shop Now" iconURL={arrowRight} />
               <Button label="Learn More" backgroundColor="bg-white" borderolor="border-slate-gray" textColor="text-slate-gray" />
            </div>
         </div>
      </section>
   )
}

export default SpecialOffer