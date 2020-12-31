import React, {useEffect, useState} from 'react';
import './ReminderForm.scss';
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import TextField from "@material-ui/core/TextField/TextField";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import {CityModel, ReminderColor, ReminderModel} from "../../redux/reminders/types";
import AddIcon from '@material-ui/icons/Add';
import Fab from "@material-ui/core/Fab";
import {DateTime} from "luxon";
import {GithubPicker} from 'react-color'
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import {InputLabel} from '@material-ui/core';
import {v4 as uuidv4} from 'uuid';
import {CityAutocompleteField} from "../CityAutocompleteField/CityAutocompleteField";

interface IReminderFormProps {
    data: ReminderModel
    openReminder?: boolean
    onSave: any,
    onCancel: any,
    onDelete: any
}


const ReminderForm: React.FC<IReminderFormProps> = (props) => {
    const {data, openReminder, onSave, onCancel, onDelete} = props

    const [reminder, setReminder] = useState<ReminderModel>(data);

    const [anchorColorSelection, setAnchorColorSelection] = useState<null | HTMLElement>(null);

    const [descriptionError, setDescriptionError] = useState(false)
    const [descriptionHelperText, setDescriptionHelperText] = useState('')

    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        setReminder({
            ...data,
            ...!data.dateTime ? {dateTime: DateTime.local().toMillis()} : {},
            ...!data.color ? {color: ReminderColor.BLUE_1_DARK} : {}
        })
    }, [data])

    // handles the dialog open internally
    useEffect(() => {
        setOpen(open)
    }, [open])

    // handles the dialog open externally
    useEffect(() => {
        if (!open && openReminder) {
            setOpen(true)
        }
    }, [openReminder, open])

    const handleOpenColors = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorColorSelection(event.currentTarget)
    }

    const handleColorChange = (newColor: any) => {
        setReminder({
            ...reminder,
            color: newColor.hex
        })
        setAnchorColorSelection(null)
    }

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        validateDescription(event.target.value)
        const reminderUpdated = {
            ...reminder,
            description: event.target.value
        }
        setReminder(reminderUpdated)
    }

    const handleDateTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const dateTime = DateTime.fromISO(event.target.value)
        const reminderUpdated = {
            ...reminder,
            dateTime: dateTime.toMillis(),
        }
        setReminder(reminderUpdated)
    }

    const handleSetCity = (city: CityModel) => {
        const reminderUpdated = {
            ...reminder,
            city
        }
        setReminder(reminderUpdated)
    }

    const validateDescription = (description: string) => {
        let valid = true
        if (!description) {
            valid = false
            setDescriptionHelperText('The description is required')
        } else if (description.length > 30) {
            valid = false
            setDescriptionHelperText('The description must have up to 30 characters')
        } else {
            setDescriptionHelperText('')
        }
        setDescriptionError(!valid)
        return valid
    }

    const validateForm = (data: ReminderModel) => {
        return validateDescription(data.description)
    }

    const handleClickOpen = () => {
        setOpen(true)
    };

    const handleDelete = () => {
        setDescriptionError(false)
        setDescriptionHelperText('')
        setOpen(false)
        onDelete(reminder)
    }

    const handleClose = () => {
        setDescriptionError(false)
        setDescriptionHelperText('')
        setOpen(false)
        onCancel()
    };

    const handleSave = () => {
        if (validateForm(reminder)) {
            setOpen(false)
            const dateTime = DateTime.fromMillis(reminder.dateTime)
            const reminderUpdated = {
                ...reminder,
                day: dateTime.day,
                month: dateTime.month,
                year: dateTime.year,
                id: reminder.id ? reminder.id : uuidv4()
            }
            setReminder(reminderUpdated)
            onSave(reminderUpdated)
        }
    };

    return (
        <div className='ReminderForm' data-testid="ReminderForm">
            <Fab variant="extended" color="primary" style={{margin: '15px'}} onClick={() => handleClickOpen()} data-testid="NewReminderButton">
                <AddIcon/> New Reminder
            </Fab>
            <Dialog fullWidth open={open} onClose={handleClose} className="form-dialog-title">
                <DialogTitle id="form-dialog-title">Reminder</DialogTitle>
                <DialogContent>
                    <form noValidate>
                        <TextField
                            inputProps={{ 'data-testid': 'DescriptionInput' }}
                            style={{marginBottom: '15px'}}
                            fullWidth
                            required
                            error={descriptionError}
                            helperText={descriptionHelperText}
                            margin="dense"
                            id="description"
                            label="What?"
                            defaultValue={reminder.description}
                            onChange={handleDescriptionChange}
                            onKeyPress={(e) => e.keyCode === 13 ? e.preventDefault() : {}}
                        />
                        <TextField
                            style={{marginBottom: '15px'}}
                            fullWidth
                            id="dateTime"
                            label="When?"
                            type="datetime-local"
                            defaultValue={DateTime.fromMillis(reminder.dateTime).set({
                                second: 0,
                                millisecond: 0
                            }).toISO({includeOffset: false, suppressSeconds: true, suppressMilliseconds: true})}
                            onChange={handleDateTimeChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <CityAutocompleteField
                            onCitySelected={handleSetCity}
                            initialValue={reminder.city?.name || ''}
                        />
                        <div>
                            <InputLabel>Select Color
                                <Button data-testid='select-color' aria-controls="simple-menu" aria-haspopup="true" onClick={handleOpenColors}>
                                    <Avatar style={{
                                        color: reminder.color,
                                        backgroundColor: reminder.color,
                                        width: '25px',
                                        height: '25px'
                                    }}/>
                                </Button>
                                <Menu
                                    id="color-menu"
                                    anchorEl={anchorColorSelection}
                                    keepMounted
                                    open={Boolean(anchorColorSelection)}
                                    onClose={() => setAnchorColorSelection(null)}
                                >
                                    <GithubPicker color={reminder.color} onChangeComplete={handleColorChange}
                                                  triangle='hide'/>
                                </Menu>
                            </InputLabel>
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    {reminder.id
                        ?
                        <Button onClick={handleDelete} color="secondary">
                            Delete
                        </Button>
                        : <span/>
                    }
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary" data-testid="SaveReminderButton">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ReminderForm;
