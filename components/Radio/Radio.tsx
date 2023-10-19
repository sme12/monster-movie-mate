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
            className={`inline-flex cursor-pointer items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-center text-sm font-medium shadow-sm ${
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
