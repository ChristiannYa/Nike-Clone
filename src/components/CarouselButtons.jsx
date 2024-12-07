import PropTypes from 'prop-types';

import '../componentsCSS/carouselButtons.css';

const CarouselButtons = ({ containerRef, scrollDistance = 300 }) =>
{
   const nextShoe = (container, scrollDistance) =>
   {
      container.scrollBy({
         left: scrollDistance,
         behavior: "smooth"
      });
   };

   const prevShoe = (container, scrollDistance) =>
   {
      container.scrollBy({
         left: -scrollDistance,
         behavior: "smooth"
      });
   };

   return (
      <aside className="w-full flex justify-between mt-6 flex-wrap gap-3">
         <button
            onClick={() => prevShoe(containerRef.current, scrollDistance)}
            className="pushable"
         >
            <span className="shadow"></span>
            <span className="edge"></span>
            <span className="front bg-accent-2">prev</span>
         </button>

         <button
            onClick={() => nextShoe(containerRef.current, scrollDistance)}
            className="pushable"
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
