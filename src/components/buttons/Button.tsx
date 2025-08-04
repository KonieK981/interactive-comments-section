const Button = ({
  imgUrl,
  color,
  text,
  alt,
  spanProps = "text-lg",
  classProps = "",
  handleClick,
}) => {
  return (
    <button
      className={`inline-flex items-center gap-1 ${classProps}`}
      aria-label={alt}
      onClick={handleClick}
    >
      {imgUrl && <img src={imgUrl} alt={alt} />}
      <span className={`${spanProps} font-medium text-${color}`}>{text}</span>
    </button>
  );
};

export default Button;
