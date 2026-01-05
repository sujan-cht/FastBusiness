
import React from 'react';

interface IconProps {
  className?: string;
}

const CountriesIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.737 16.95l.009.008m10.23-10.238l.009.008m-10.248 0l.009-.008m5.114 5.114l.009.008M12 21a9 9 0 110-18 9 9 0 010 18z" />
  </svg>
);

export default CountriesIcon;
