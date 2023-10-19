import React from 'react';

interface RadioGroupProps {
    title: string;
    children: React.ReactNode;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ title, children }) => {
    return (
        <fieldset>
            <legend className="mb-2">{title}</legend>
            <div className="lg:grid-cols-4 grid grid-cols-2 gap-2">
                {children}
            </div>
        </fieldset>
    );
};

export default RadioGroup;
