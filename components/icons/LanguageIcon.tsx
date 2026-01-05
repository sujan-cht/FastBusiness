
import React from 'react';

interface IconProps {
  className?: string;
}

const LanguageIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h-6.088a18.022 18.022 0 01-2.048-5.5m7.048 5.5A18.022 18.022 0 0018.588 9m3.412 0a18.022 18.022 0 00-7.048-5.5" />
    </svg>
);

export default LanguageIcon;
