"use client";
import React from 'react';

type InputProps = {
  type: string;
  name: string;
  id: string;
  value?: string
  placeholder?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
};

export const Input: React.FC<InputProps> = ({
  type,
  name,
  id,
  value,
  placeholder,
  required = true,
  onChange,
  className,
}) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      value={value}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      className={className}
    />
  );
};
