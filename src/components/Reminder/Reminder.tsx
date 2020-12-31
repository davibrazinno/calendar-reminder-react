import React from 'react';
import {ReminderModel} from "../../redux/reminders/types";
import {Card} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {DateTime} from "luxon";

interface IReminderProps {
    data: ReminderModel
    onRemainderClicked: any
}

const Reminder: React.FC<IReminderProps> = (props: IReminderProps) => {
    const {data, onRemainderClicked} = props
    const city = !data.city ? <span></span> : <span>{data.city.name}</span>
    const weatherData = !data.weather ? <span>{city}</span> :
        <span>
            <img style={{width: '25px', height: 'auto', verticalAlign: "middle"}} alt='Weather'
                 src={`http://openweathermap.org/img/w/${data.weather.icon}.png`}/>
                 {city} - {data.weather.main}
        </span>
    return (
        <div data-testid="Reminder" style={{border: 0}} onClick={() => onRemainderClicked(data)}
             onKeyPress={() => {}} role='button' tabIndex={0}>
            <Card style={{backgroundColor: data.color, borderRadius: '10px'}}>
                <Box style={{paddingTop: '5px', paddingLeft: '5px'}}>
                    <Typography noWrap style={{fontSize: 'small'}}>{DateTime.fromMillis(data.dateTime).toFormat('hh:mm a')}</Typography>
                    <Typography noWrap>{data.description}</Typography>
                    <Typography noWrap style={{fontSize: 'small'}}>{weatherData}</Typography>
                </Box>
            </Card>
        </div>
    );
}

export default Reminder;
