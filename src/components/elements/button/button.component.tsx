import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
    const baseStyles = `
    px-4 py-2 rounded transition-colors duration-200 font-nunito
    disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
  `;
  
  const variantStyles = {
    primary: 'bg-[#fbba59] text-[#111827] hover:bg-[#FAA931]',
    secondary: 'bg-white border border-gray-200 text-[#111827] hover:bg-gray-50',
    ghost: 'text-gray-600 hover:text-[#111827]'
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};