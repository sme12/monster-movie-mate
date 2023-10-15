import React from 'react';

interface RadioProps {
    label: string;
    value: string | number;
    checked?: boolean;
    onChange: (value: string | number) => void;
}

const Radio: React.FC<RadioProps> = ({ label, value, checked, onChange }) => {
    return (
        <label
            className={`cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md ${
                checked
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
        >
            <input
                type="radio"
                className="sr-only appearance-none"
                value={value}
                checked={checked}
                onChange={() => onChange(value)}
            />
            <span>{label}</span>
        </label>
    );
};

export default Radio;
