import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import '../componentsCSS/carouselButtons.css';

const CarouselButtons = ({ containerRef, scrollDistance = 300 }) =>
{
   const nextShoe = (container, scrollDistance) =>
   {
      const maxScroll = container.scrollWidth - container.clientWidth;
      const newScrollPosition = Math.min(
         container.scrollLeft + scrollDistance,
         maxScroll
      );

      container.scrollTo({
         left: newScrollPosition,
         behavior: "smooth"
      });
   };

   const prevShoe = (container, scrollDistance) =>
   {
      const newScrollPosition = Math.max(
         container.scrollLeft - scrollDistance,
         0
      );

      container.scrollTo({
         left: newScrollPosition,
         behavior: "smooth"
      });
   };

   // Log to check values
   // const isAtStart = containerRef.current?.scrollLeft === 0;
   // const isAtEnd = containerRef.current?.scrollLeft >=
   // (containerRef.current?.scrollWidth - containerRef.current?.clientWidth);

   // console.log({
   //    scrollLeft: containerRef.current?.scrollLeft,
   //    scrollWidth: containerRef.current?.scrollWidth,
   //    clientWidth: containerRef.current?.clientWidth,
   //    isAtStart,
   //    isAtEnd
   // });

   const [scrollState, setScrollState] = useState({
      isAtStart: true,
      isAtEnd: false
   });

   useEffect(() =>
   {
      const container = containerRef.current;

      const checkScrollPosition = () =>
      {
         if (container)
         {
            const isAtStart = container.scrollLeft <= 0;
            const isAtEnd = Math.ceil(container.scrollLeft + container.clientWidth) >= container.scrollWidth;

            setScrollState({ isAtStart, isAtEnd });

            // console.log({
            //    scrollLeft: container.scrollLeft,
            //    scrollWidth: container.scrollWidth,
            //    clientWidth: container.clientWidth,
            //    isAtStart,
            //    isAtEnd
            // });
         }
      };

      container?.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition(); // Initial check

      return () => container?.removeEventListener('scroll', checkScrollPosition);
   }, [containerRef]);

   return (
      <aside className="w-full flex justify-center mt-10 flex-wrap gap-x-10">
         <button
            onClick={() => prevShoe(containerRef.current, scrollDistance)}
            className="pushable"
            disabled={scrollState.isAtStart}
         >
            <span className="shadow"></span>
            <span className="edge"></span>
            <span className="front bg-accent-2">prev</span>
         </button>

         <button
            onClick={() => nextShoe(containerRef.current, scrollDistance)}
            className="pushable"
            disabled={scrollState.isAtEnd}
         >
            <span className="shadow"></span>
            <span className="edge"></span>
            <span className="front bg-accent-2">next</span>
         </button>
      </aside>
   );
};


CarouselButtons.propTypes = {
   containerRef: PropTypes.shape({ current: PropTypes.object }).isRequired,
   scrollDistance: PropTypes.number
};

export default CarouselButtons;
