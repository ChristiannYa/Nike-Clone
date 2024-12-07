import PropTypes from 'prop-types'
import { star } from "../assets/icons"

const PopularProductCard = ({ imgURL, name, price }) =>
{

   return (
      <div className="flex flex-col min-w-[250px] snap-start max-sm:snap-center">
         <img
            src={imgURL}
            alt={name}
            className="w-full h-auto object-cover"
         />
         <div className="mt-8 flex justify-start gap-2.5">
            <img
               src={star}
               alt="rating"
               width={24}
               height={24}
            />
            <p className="font-montserrat text-lg leading-normal text-slate-gray">
               (4.5)
            </p>
         </div>
         <h3 className="mt-2 text-2xl leading-normal font-semibold font-palanquin">
            {name}
         </h3>
         <p className="mt-2 font-semibold font-montserrat text-accent-2 text-base leading-normal">
            {price}
         </p>
      </div >
   );
};

PopularProductCard.propTypes = {
   imgURL: PropTypes.string.isRequired,
   name: PropTypes.string.isRequired,
   price: PropTypes.string.isRequired
}

export default PopularProductCard