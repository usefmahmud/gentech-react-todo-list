import React from 'react';

const CircularProgressBar = ({
  progress = 0,
  total = 100,
  size = 200,
  strokeWidth = 10,
  circleTwoStroke = '#7ea9e1',
}) => {
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (progress / total) * circumference;

  return (
    <svg width={size} height={size} className='text-green-900'>
      <circle
        cx={center}
        cy={center}
        r={radius}
        className='stroke-[#d9edfe]'
        fill="none"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={center}
        cy={center}
        r={radius}
        className='stroke-primary-fg'
        fill="none"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"

        transform={`rotate(-90 ${center} ${center})`}
      />
      <text
        x={center}
        y={center}
        textAnchor="middle"
        dy="0.3em"
        fontSize="1em"
        className='dark:fill-white fill-black'
      >
        {progress} / {total}
      </text>
    </svg>
  );
};

export default CircularProgressBar;
