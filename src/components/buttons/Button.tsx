import type { ButtonProps } from "../../types";

const Button = ({
  imgUrl,
  color,
  text,
  alt,
  type,
  spanProps = "text-lg",
  classProps = "",
  handleClick,
  disabled,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`inline-flex items-center gap-1 ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      } ${classProps}`}
      aria-label={alt}
      onClick={handleClick}
      disabled={disabled}
    >
      {imgUrl && imgUrl}
      <span className={`${spanProps} font-medium text-${color}`}>{text}</span>
    </button>
  );
};

export default Button;
