import React, {useEffect, useState} from 'react';
import './ReminderForm.scss';
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import TextField from "@material-ui/core/TextField/TextField";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import {ReminderColor, ReminderModel} from "../../redux/reminders/types";
import AddIcon from '@material-ui/icons/Add';
import Fab from "@material-ui/core/Fab";
import {DateTime} from "luxon";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {GithubPicker} from 'react-color'
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { InputLabel } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';

interface IReminderFormProps {
    data: ReminderModel
    openReminder?: boolean
    onSave: any,
    onCancel: any
}


const ReminderForm: React.FC<IReminderFormProps> = (props) => {
    const {data, openReminder, onSave, onCancel} = props

    const [reminder, setReminder] = useState<ReminderModel>(data);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpenColors = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleColorChange = (newColor: any) => {
        setReminder({
            ...reminder,
            color: newColor.hex
        })
        setAnchorEl(null)
    }

    const [anchorElCity, setAnchorElCity] = useState<null | HTMLElement>(null);

    const handleOpenCity = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElCity(event.currentTarget)
    }

    useEffect(() => {
        setReminder({
            ...data,
            ...!data.dateTime ? {dateTime: DateTime.local().toMillis()} : {},
            ...!data.color ? {color: ReminderColor.BLUE_1_DARK} : {}
        })
    }, [data])

    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        setOpen(open)
    }, [open])

    useEffect(() => {
        if(!open && openReminder) {
            setOpen(true)
        }
    }, [openReminder, open])

    const handleClickOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        onCancel()
        setOpen(false)
    };

    const handleSave = () => {
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
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleSetCity = (e: any) => {
        const reminderUpdated = {
            ...reminder,
            city: {
                name: e.value.structured_formatting.main_text,
                placeId: e.value.place_id
            }
        }
        setReminder(reminderUpdated)
        setAnchorElCity(null)
    }

    const renderCity = () => {
        if (reminder.city) {
            return (
            <InputLabel>Select City
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleOpenCity}>
                    {reminder.city?.name}
                </Button>
                <Menu
                    id="city-menu"
                    anchorEl={anchorElCity}
                    keepMounted
                    open={Boolean(anchorElCity)}
                    onClose={() => setAnchorElCity(null)}
                >
                    <MenuItem>
                        <GooglePlacesAutocomplete
                            autocompletionRequest={{types: ['(cities)']}}
                            selectProps={{
                                onChange: handleSetCity,
                            }}
                        />
                    </MenuItem>
                </Menu>
            </InputLabel>
        )} else {
            return (
            <InputLabel>Select City
                <GooglePlacesAutocomplete
                    autocompletionRequest={{types: ['(cities)']}}
                    selectProps={{
                        onChange: handleSetCity,
                        style: 'width: 300px'
                    }}
                />
            </InputLabel>
        )}
    }

    return (
        <div className='ReminderForm' data-testid="ReminderForm">
            <Fab variant="extended" color="primary" style={{margin: '15px'}} onClick={() => handleClickOpen()}>
                <AddIcon/> New Reminder
            </Fab>
            <Dialog fullScreen open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Reminder</DialogTitle>
                <DialogContent>
                    <form noValidate>
                        <TextField
                            margin="dense"
                            id="description"
                            label="What?"
                            fullWidth
                            defaultValue={reminder.description}
                            onChange={handleDescriptionChange}/>
                        <TextField
                            id="dateTime"
                            label="When?"
                            type="datetime-local"
                            defaultValue={DateTime.fromMillis(reminder.dateTime).set({second: 0, millisecond: 0}).toISO({ includeOffset: false, suppressSeconds: true, suppressMilliseconds: true })}
                            onChange={handleDateTimeChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <div>
                            {renderCity()}
                        </div>
                        <div>
                            <InputLabel>Select Color
                                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleOpenColors}>
                                    <Avatar style={{color: reminder.color, backgroundColor: reminder.color, width: '25px', height: '25px'}} />
                                </Button>
                                <Menu
                                    id="color-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={() => setAnchorEl(null)}
                                >
                                    <GithubPicker color={reminder.color} onChangeComplete={handleColorChange} triangle='hide'/>
                                </Menu>
                            </InputLabel>
                        </div>
                    </form>
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
