import React from 'react';

interface SendIconProps {
  color?: string;
  size?: number;
}

const SendIcon: React.FC<SendIconProps> = ({
  color = 'currentColor',
  size = 24,
}) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ cursor: 'pointer' }}
  >
    <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill={color} />
  </svg>
);

export default SendIcon;
