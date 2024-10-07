import { 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    Slide 
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions';
import { Fragment ,useCallback, FC, forwardRef, Ref } from 'react'

export type DialogRemoveType = {
    open : boolean,
    setOpen : (value : boolean) => void,
    removeFunction: () => void,
};

const Transition = forwardRef(function Transition(
        props: TransitionProps & {
            children: React.ReactElement<any, any>;
        },
        ref: Ref<unknown>,
    ) {
        return <Slide direction="up" ref={ref} {...props} />;
});

const DialogDelete : FC<DialogRemoveType> = (props) => {
    
    const { open, setOpen, removeFunction } = props;

    const handleClose = useCallback(() => {
        setOpen(false);
    }, [open]);

    const handleConfirm = () => {
        setOpen(false);
        removeFunction();
    }

    return (
        <Fragment>
            <Dialog open={open} onClose={handleClose} TransitionComponent={Transition} aria-describedby="alert-dialog-slide-description">
                <DialogTitle>{'คุณแน่ใจ?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        คุณแน่ใจมั้ยที่จะลบข้อมูลที่คุณเลือก?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>
                        ยกเลิก
                    </Button>
                    <Button variant="contained" onClick={handleConfirm}>
                        ยืนยัน
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default DialogDelete