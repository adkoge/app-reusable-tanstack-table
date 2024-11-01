import { useState, useEffect } from "react";

interface DebouncedInputProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  debounce?: number;
  placeholder?: string;
}

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce,
  className = "",
  ...props
}: DebouncedInputProps) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={`w-full max-w-[232px] h-9 px-3 text-gray-800 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 placeholder-gray-500 placeholder-italic ${className}`}
    />
  );
};

interface SearchInputProps {
  debounce: number;
  value: string;
  onChange: (value: string) => void;
}

const Search = ({ debounce = 500, value, onChange }: SearchInputProps) => {
  return (
    <DebouncedInput
      debounce={debounce}
      value={value ?? ""}
      onChange={onChange}
      placeholder="Search..."
      className="shadow-sm"
    />
  );
};

export default Search;
