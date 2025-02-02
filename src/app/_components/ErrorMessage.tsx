"use client";
import React from "react";
import { FormErrors } from "@/_types/FormErrorsType";

type ErrorMessagesProps = {
  errors: FormErrors;
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