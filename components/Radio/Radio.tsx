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
            className={`inline-flex cursor-pointer items-center justify-center rounded-full border border-white px-4 py-2 text-center text-sm font-medium focus-within:outline focus-within:outline-2 focus-within:outline-blue-800 ${
                checked
                    ? 'bg-white text-gray-900'
                    : 'text-white hover:bg-white hover:text-gray-900'
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
