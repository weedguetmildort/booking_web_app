import React, { useEffect, useState } from "react";
import 'react-calendar/dist/Calendar.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import axios from "axios";


function BookingCard(info: { bookingID, bookingDate, bookingStartTime, bookingDuration, bookingEndTime, serviceName, serviceDescription, businessName } ) {    
    
    const [renderCancel, setRenderCancel] = useState(false);
    const message = "Are you sure you want to cancel?"
    const confirmCancelButton = (<Button size="small" onClick={confirmCancel}>Yes</Button>);
    const cancelCancelButton = (<Button size="small" onClick={cancelCancel}>No</Button>);
    const [cancelled, setCancelled] = useState(false);
    const [failedCancel, setFailedCancel] = useState(false);
    const [failedCancelMessage, setFailedCancelMessage] = useState(<div></div>);

    function buttonClicked() {
        setRenderCancel(true)
    }

    function confirmCancel() {
        axios.post('http://localhost:5002/api/cancelBooking', {
            bookingID: info.bookingID
        })
            .then(res => {
                console.log(typeof res);
                console.log('Response:', res.data);
                setCancelled(true);

            })
            .catch(error => {
                console.error('Error:', error);
                setFailedCancel(true);
                if (error.response) {
                    setFailedCancelMessage(<Typography color={red[500]} >{"Failed to post cancellation. Status code: " + error.response.status}</Typography>);
                }
                else {
                    setFailedCancelMessage(<Typography sx={{ fontSize: 10 }} color={red[500]} >{"Failed to post cancellation, there was no response."}</Typography>);
                }
                setCancelled(false);
            });

    }

    function cancelCancel() {
        setRenderCancel(false);
        setFailedCancel(false);
    }

    if (!cancelled) {
        return (
            <Card style={{ width: "500px" }} variant="outlined">
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {info.businessName}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {info.serviceName}
                    </Typography>
                    <Typography color="text.secondary">
                        {info.bookingStartTime.toDateString()} at {info.bookingStartTime.toTimeString()}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary">
                        for {info.bookingDuration} minutes
                    </Typography>
                    <Typography noWrap={false} variant="body2" style={{ display: "inline-block", whiteSpace: "pre-line" }} >
                        {info.serviceDescription+" "} 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={buttonClicked}>Cancel appointment</Button>
                </CardActions>
                {renderCancel &&
                    (<CardContent>
                        {message}
                        {confirmCancelButton} {renderCancel && cancelCancelButton}
                        {failedCancel && failedCancelMessage}
                    </CardContent>)
                }
            </Card>
        );
    }
    else {
        return (
            <Card style={{ width: "500px" }} variant="outlined">
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        "{info.serviceName}" with {info.businessName} on {info.bookingDate.toDateString()} at {info.bookingStartTime.toTimeString()} was cancelled.
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default BookingCard;