import React from "react";

const InputBox = ({
  type,
  title,
  placeholder,
  onChange,
  value,
  disabled,
  onClick,
  required,
}) => {
  return (
    <div className="my-4 lg:w-[250px] lg:mx-2">
      <p className="text-gray-500">{title}</p>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onClick={onClick}
        className="w-full h-12 border rounded-xl px-2 lg:h-10"
        required={required}
      />
    </div>
  );
};

export default InputBox;
