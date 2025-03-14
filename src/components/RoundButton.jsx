function RoundButton({
  icon,
  onClick,
  disabled,
  text,
  className,
  lighter = false,
}) {
  return (
    <button
      className={`p-2 px-3 ${
        lighter ? "bg-neutral-800" : "bg-neutral-900"
      } rounded-full flex items-center justify-center gap-2 shadow-md hover:bg-neutral-700 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && icon}
      {text && (
        <span className="text-neutral-200 text-sm whitespace-nowrap">
          {text}
        </span>
      )}
    </button>
  );
}

export default RoundButton;
