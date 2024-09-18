import React from "react";
import { Icon } from "@iconify/react";

interface ButtonProps {
  className?: string;
  icon?: string;
  children: React.ReactNode;
  disabled?: boolean;
}
const Button = ({ className, icon, children ,disabled}: ButtonProps) => {
  return (
    <button    disabled={disabled}  className={`${className} button flex items-center gap-2`}>
      {icon && <Icon icon={icon} />} <span>{children}</span>
    </button>
  );
};

export default Button;
