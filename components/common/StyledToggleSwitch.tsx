import React from 'react';

interface StyledToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

const StyledToggleSwitch: React.FC<StyledToggleSwitchProps> = ({ checked, onChange, label }) => {
  return (
    <label className="flex items-center cursor-pointer select-none">
      <div className="relative">
        <input 
          type="checkbox" 
          className="sr-only" 
          checked={checked} 
          onChange={(e) => onChange(e.target.checked)} 
        />
        <div className={`block w-11 h-6 rounded-sm transition-colors ${checked ? 'bg-secondary' : 'bg-gray-600'}`}></div>
        <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-sm transition-transform ${checked ? 'translate-x-5' : ''}`}></div>
      </div>
      <div className="ml-3 text-sm text-text-primary">
        {label}
      </div>
    </label>
  );
};

export default StyledToggleSwitch;
