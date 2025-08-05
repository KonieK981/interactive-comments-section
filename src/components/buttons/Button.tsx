const Button = ({
  imgUrl,
  color,
  text,
  alt,
  type,
  spanProps = "text-lg",
  classProps = "",
  handleClick,
}) => {
  return (
    <button
      type={type}
      className={`inline-flex items-center gap-1 cursor-pointer ${classProps}`}
      aria-label={alt}
      onClick={handleClick}
    >
      {imgUrl && imgUrl}
      <span className={`${spanProps} font-medium text-${color}`}>{text}</span>
    </button>
  );
};

export default Button;
