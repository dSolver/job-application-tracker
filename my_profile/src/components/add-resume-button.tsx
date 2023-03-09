import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

import ResumeBuilder from './resume-builder';

const AddResumeButton = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                Resume Editor
            </Button>
            <SimpleDialog
                open={open}
                onClose={handleClose}
            />
        </div>
    )
}


export interface SimpleDialogProps {
    open: boolean;
    onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
    const { onClose, open } = props;

    const handleClose = () => {
        onClose('');
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Edit Resume</DialogTitle>
            <ResumeBuilder />
            <DialogActions>
                <Button onClick={() => onClose('')}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddResumeButton