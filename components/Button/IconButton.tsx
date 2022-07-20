interface Props {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
}
const IconButton = (props: Props) => {
    const {
        children,
        onClick = (event: React.MouseEvent<HTMLButtonElement>) => {},
        className = '',
    } = props;
    return (
        <button
            onClick={onClick}
            className={`focus:outline-none focus:border-none hover:bg-gray-400 hover:bg-opacity-25 p-2 rounded-full inline-flex items-center ${className}`}
        >
            {children}
        </button>
    );
}

export default IconButton;