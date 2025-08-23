import React from "react";

const CheckboxComponent = ({
  checked,
  disabled,
  onChange,
  id,
  label,
}: {
  checked: boolean;
  disabled: boolean;
  onChange: () => void;
  id: string;
  label: string;
}) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        id={id}
        className="checkbox checkbox-sm"
      />
      <label htmlFor={id} className="text-hr font-normal">
        {label}
      </label>
    </div>
  );
};

export default CheckboxComponent;
