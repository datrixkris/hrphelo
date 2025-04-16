import { Icon } from "@iconify/react/dist/iconify.js";
import { useId } from "react";

type AmountInputProps = {
  label: string;
  id?: string;
  inputName?: string;
  currencyName?: string;
  value?: string;
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  currencyValue?: string;
  onCurrencyChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  prefix?: string; // Optional fixed prefix (overrides currency-based symbol)
  currencies?: string[];
  className?: string;
  required?: boolean;
  disabled?: boolean;
};

const defaultCurrencySymbols: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CAD: "$",
  AUD: "$",
  CHF: "CHF",
  CNY: "¥",
  GHS:"₵"
};

export default function AmountInput({
  label,
  id,
  inputName = "amount",
  currencyName = "currency",
  value,
  onInputChange,
  currencyValue = "GHS",
  onCurrencyChange,
  placeholder = "0.00",
  prefix, // Optional prop for fixed prefix
  currencies = ["GHS","USD", "CAD", "EUR"],
  className = "",
  required = false,
  disabled = false,
}: AmountInputProps) {
  const generatedId = useId();
  const inputId = id || generatedId;

  // Determine the displayed prefix
  const displayedPrefix =
    prefix || defaultCurrencySymbols[currencyValue] || currencyValue;

  return (
    <div className={className}>
      <label
        htmlFor={inputId}
        className="block text-sm/6 font-medium text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <div className="flex items-center rounded-md border bg-base-100 pl-3 outline-1 -outline-offset-1 outline-gray-100 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
          <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
            {displayedPrefix}
          </div>
          <input
            id={inputId}
            name={inputName}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onInputChange}
            className="input block min-w-0 grow py-1.5 pl-1 pr-3 text-base bg-base-100 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
            required={required}
            disabled={disabled}
          />
          <div className="grid shrink-0 grid-cols-1 focus-within:relative">
            <select
              name={currencyName}
              aria-label="Currency"
              value={currencyValue}
              onChange={onCurrencyChange}
              className="col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pl-3 pr-7 text-base bg-base-100 text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
              disabled={disabled}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
            <Icon
              icon="hugeicons:arrow-down-01"
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
