import Dialog from './Dialog';
import Button from '../components/Button/Button';
interface Props {
    title: string;
    content: string;
    open: boolean;
    onClose: Function;
    onConfirm: Function;
}
const Confirm = (props: Props) =>{
    const { open, onClose, title, content, onConfirm } = props;
    if (!open) {
        return <></>;
    }

    return (
            <Dialog open={open} onClose={onClose}>
            <h2 className="text-base font-semibold">{title}</h2>
            <div className="py-5">{content}</div>
            <div className="flex justify-end">
                <div className="p-1">
                    <Button
                        onClick={() => onClose()}
                        className="bg-green-500"
                    >
                        No
                    </Button>
                </div>
                <div className="p-1">
                    <Button className="bg-red-500"
                        onClick={() => {
                            onClose();
                            onConfirm();
                        }}
                    >
                        Yes
                    </Button>
                </div>
            </div>
        </Dialog>


    );
}

export default Confirm;