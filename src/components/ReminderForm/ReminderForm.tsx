import React, {useEffect} from 'react';
import './ReminderForm.scss';
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import TextField from "@material-ui/core/TextField/TextField";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import {ReminderModel} from "../../redux/reminders/types";
import AddIcon from '@material-ui/icons/Add';
import Fab from "@material-ui/core/Fab";

interface IReminderFormProps {
    onSave: any
    data?: ReminderModel
}

const ReminderForm: React.FC<IReminderFormProps> = (props) => {
    const {onSave} = props

    const data = props.data || {description: ''}

    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        setOpen(open)
    }, [open])

    const handleClickOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
    };

    const handleSave = () => {
        setOpen(false)
        onSave(data)
    };

    const handleDescriptionChange = (e: any) => {
        data.description = e.target.value
    }

    return (
        <div className='ReminderForm' data-testid="ReminderForm">
            <Fab variant="extended" color="primary" style={{margin: '15px'}} onClick={() => handleClickOpen()}>
                <AddIcon/> New Reminder
            </Fab>
            <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Reminder</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="description"
                        label="What would you like to reminder?"
                        fullWidth
                        onChange={handleDescriptionChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ReminderForm;
