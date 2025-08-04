const Button = ({
  imgUrl,
  color,
  text,
  alt,
  spanProps = "text-lg",
  classProps = "",
}) => {
  return (
    <button
      className={`inline-flex items-center gap-1 ${classProps}`}
      aria-label={alt}
    >
      {imgUrl && <img src={imgUrl} alt={alt} />}
      <span className={`${spanProps} font-medium text-${color}`}>{text}</span>
    </button>
  );
};

export default Button;
