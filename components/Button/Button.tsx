interface ButtonProps {
    onClick: () => void;
    text: string;
    pending: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    onClick,
    text,
    pending,
    className,
}) => {
    return (
        <button
            onClick={onClick}
            className={`${
                className ?? ''
            } rounded-full bg-orange-600 px-8 py-4 font-creepster text-3xl font-bold uppercase tracking-wider text-white hover:bg-orange-700`}
            disabled={pending}
        >
            {text}
        </button>
    );
};

export default Button;
