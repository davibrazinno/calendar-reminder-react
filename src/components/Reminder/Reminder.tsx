import React from 'react';
import {ReminderModel} from "../../redux/reminders/types";
import {Card} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

interface IReminderProps {
    data: ReminderModel;
}

const Reminder: React.FC<IReminderProps> = (props: IReminderProps) => {
    const {data} = props
    let weatherData
    if (data.weather) {
        weatherData = <span>
            <img style={{width: '25px', height: 'auto', verticalAlign: "middle"}} alt='Weather'
                 src={`http://openweathermap.org/img/w/${data.weather.icon}.png`}/>
            {data.weather.main}
        </span>

    }
    return (
        <Card style={{backgroundColor: data.color, borderRadius: '10px'}}>
            <Box style={{paddingTop: '5px', paddingLeft: '5px'}}>
                <Typography noWrap>{data.description}</Typography>
                <Typography noWrap>{data.city}{weatherData}</Typography>
            </Box>
        </Card>
    );
}

export default Reminder;
