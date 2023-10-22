import React from 'react';

interface ButtonProps {
    onClick: () => void;
    text: string;
    pending: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, text, pending }) => {
    return (
        <button
            onClick={onClick}
            className="font-creepster rounded bg-orange-600 px-8 py-4 text-3xl font-bold uppercase tracking-wider text-white hover:bg-orange-700"
            disabled={pending}
        >
            {text}
        </button>
    );
};

export default Button;
