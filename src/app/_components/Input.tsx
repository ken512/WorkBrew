"use client";
import React from 'react';
import "../globals.css";

type InputProps = {
  type: string;
  name: string;
  id: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
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
  onFocus,
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
      onFocus={onFocus}
      className={className}
    />
  );
};
