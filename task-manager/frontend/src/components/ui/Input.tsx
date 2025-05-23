import React from 'react';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ value, onChange, placeholder, type = 'text', className = '' }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border p-2 rounded ${className}`}
    />
  );
};

export default Input;
