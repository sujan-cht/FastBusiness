
import React from 'react';

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center px-3 py-2 text-sm text-text-secondary hover:bg-primary/20 hover:text-primary rounded-md transition-colors duration-200 space-x-2"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default ActionButton;
