const Button = ({ imgUrl, color, text, alt }) => {
  return (
    <button className={`inline-flex items-center gap-1`} aria-label={alt}>
      <img src={imgUrl} alt={alt} />
      <span className={`text-lg font-medium text-${color}`}>{text}</span>
    </button>
  );
};

export default Button;
