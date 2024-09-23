import React from "react";
import { Icon } from "@iconify/react";

interface ButtonProps {
  className?: string;
  icon?: string;
  buttonType?: "submit" | "reset" | "button";
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}
const Button = ({
  className,
  icon,
  children,
  onClick,
  buttonType = "submit",
  disabled,
}: ButtonProps) => {
  return (
    <button
      type={buttonType}
      disabled={disabled}
      className={`${className} button flex items-center justify-center gap-2 ${disabled ? "pointer-events-none" : ""}`}
      onClick={onClick}
    >
      {icon && <Icon icon={icon} />} <span>{children}</span>
    </button>
  );
};

export default Button;
