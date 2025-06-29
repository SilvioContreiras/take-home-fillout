import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input: React.FC<InputProps> = ({
  className = '',
  ...props
}) => {
  return (
    <input
      className={`
        w-full px-3 py-2 border border-gray-200 rounded-lg
        focus:outline-none focus:ring-1 focus:ring-[#fbba59]
        text-[#111827] placeholder-gray-400
        ${className}
      `}
      {...props}
    />
  );
};