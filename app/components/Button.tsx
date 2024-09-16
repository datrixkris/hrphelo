import React from "react";
import { Icon } from "@iconify/react";

interface ButtonProps {
  className?: string;
  icon?: string;
  buttonType?: "submit" | "reset" | "button";
  children: React.ReactNode;
  onClick?: () => void;
}
const Button = ({
  className,
  icon,
  children,
  onClick,
  buttonType = "submit",
}: ButtonProps) => {
  return (
    <button
      type={buttonType}
      className={`${className} button flex items-center justify-center gap-2`}
      onClick={onClick}
    >
      {icon && <Icon icon={icon} />} <span>{children}</span>
    </button>
  );
};

export default Button;
