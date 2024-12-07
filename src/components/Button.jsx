import PropTypes from 'prop-types'

const Button = ({
   label,
   iconURL,
   alt,
   backgroundColor,
   textColor,
   borderColor,
   fullWidth
}) =>
{
   return (
      <button className={`flex justify-center items-center gap-2 px-7 py-4 font-montserrat text-lg leading-none
      ${backgroundColor
            ? `${backgroundColor} ${textColor} ${borderColor}`
            : "bg-accent-2 text-white border-accent-2"} rounded-full ${fullWidth && 'w-full'}"}`}
      >
         {label}
         <img src={iconURL} alt={alt} />
      </button>
   )
}

Button.propTypes = {
   label: PropTypes.string.isRequired,
   iconURL: PropTypes.string,
   alt: PropTypes.string,
   backgroundColor: PropTypes.string,
   textColor: PropTypes.string,
   borderColor: PropTypes.string,
   fullWidth: PropTypes.bool
}

export default Button