interface RadioGroupProps {
    title: string;
    children: React.ReactNode;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ title, children }) => {
    return (
        <fieldset>
            <legend className="mb-2">{title}</legend>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
                {children}
            </div>
        </fieldset>
    );
};

export default RadioGroup;
