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
        <div className="modal opacity-100 pointer-events-none absolute w-full h-full top-0 left-0 flex items-center justify-center">
            <div className="modal-overlay absolute w-full h-full bg-white opacity-95"></div>
        <div className="modal-container fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
            <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
                <div>{props.children}</div>
                <span className="absolute top-0 right-0 p-4">
       <IconButton onClick={() => onClose()}>
         <ExitIcon />
       </IconButton>
     </span>
            </div>
        </div>
        </div>
    );
}

export default Dialog;