"use client";
import React from 'react';

type LabelProps = {
  htmlFor: string;
  children: React.ReactNode;
  className: string;
};

export const Label: React.FC<LabelProps> = ({htmlFor, children, className}) => {

  return (
    <label htmlFor={htmlFor} className={className}>
      {children}
    </label>
  )
  
}