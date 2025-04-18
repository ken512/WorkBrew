"use client";
import React from "react";
import { FormErrorsType } from "@/app/_types/FormErrorsType";

type ErrorMessagesProps = {
  errors: FormErrorsType;
}

const ErrorMessage: React.FC<ErrorMessagesProps> = ({errors}) => {
  
  return (
    <div>
      {Object.entries(errors).map(([key, message]) => (
        <p key={key}>{key}: {message}</p>
      ))}
    </div>
  )
}
export default ErrorMessage;