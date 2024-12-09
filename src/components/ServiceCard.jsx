import PropTypes from 'prop-types'

const ServiceCard = ({ imgURL, label, subtext }) =>
{
   return (
      <div className="hidden-siblings max-sm:w-[100%] sm:w-[250px] rounded-[20px] shadow-3xl sm:px-4 md:px-8 sm:py-8 max-sm:p-6">
         <div className="w-11 h-11 flex justify-center items-center bg-accent-2 rounded-full">
            <img
               src={imgURL}
               alt={label}
               width={24}
               height={24}
            />
         </div>
         <h3 className="mt-5 font-palanquin text-2xl leading-normal font-bold">
            {label}
         </h3>
         <p className="mt-3 break-words font-montserrat text-lg leading-normal text-slate-gray">
            {subtext}
         </p>
      </div>
   )
}

ServiceCard.propTypes = {
   imgURL: PropTypes.string.isRequired,
   label: PropTypes.string.isRequired,
   subtext: PropTypes.string.isRequired
}

export default ServiceCard