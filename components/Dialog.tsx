import ExitIcon from '../components/Icons/Exit';
import IconButton from '../components/Button/IconButton';
interface Props {
    children: React.ReactNode;
    open: boolean;
    onClose: Function;
}
const Dialog = (props: Props) => {
    const { open, onClose } = props;
    if (!open) {
        return <></>;
    }
    return (
        <div className="fixed inset-0 z-500 overflow-auto flex ">
            <div className="relative p-8 bg-white border-red-500 border-2 w-full max-w-md m-auto opacity-100 flex-col flex rounded-lg">
                <div>{props.children}</div>
                <span className="absolute top-0 right-0 p-4">
       <IconButton onClick={() => onClose()}>
         <ExitIcon />
       </IconButton>
     </span>
            </div>
        </div>

    );
}

export default Dialog;