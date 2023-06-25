export const Button = ({
  icon,
  children,
}: {
  icon?: any;
  children: React.ReactNode;
}) => {
  return (
    <button className="w-full rounded-full bg-black px-12 py-5 text-white">
      {icon && <div>{icon}</div>}
      <span className="leading-none">{children}</span>
    </button>
  );
};

export default Button;
