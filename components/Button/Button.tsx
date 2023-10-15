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
            className="bg-orange-600 hover:bg-orange-700 text-white text-2xl font-bold py-4 px-8 rounded uppercase"
            disabled={pending}
        >
            {text}
        </button>
    );
};

export default Button;
