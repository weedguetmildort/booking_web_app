import React, { useEffect, useState } from "react";
import 'react-calendar/dist/Calendar.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import axios from "axios";
import { render } from "react-dom";


function BookingCardPartner(info: { bookingID, bookingDate, bookingStartTime, bookingDuration, bookingEndTime, serviceName, userFullName, userEmail }) {

    const [renderCancel, setRenderCancel] = useState(false);
    const [renderReschedule, setRenderReschedule] = useState(false);
    const [message, setMessage] = useState("Are you sure you want to cancel this appointment?");
    const confirmButton = (<Button size="small" onClick={confirm}>Yes</Button>);
    const resetOptionsButton = (<Button size="small" onClick={resetOptions}>No</Button>);
    const [cancelled, setCancelled] = useState(false);
    const [failed, setFailed] = useState(false);
    const [failedMessage, setFailedMessage] = useState(<div></div>);

    useEffect(() => {
        setMessage("Are you sure you want to cancel this appointment?");
        setRenderReschedule(false);
    }, [renderCancel])

    useEffect(() => {
        setMessage("Are you sure you want to reschedule this appointment?");
        setRenderCancel(false);
    }, [renderReschedule])


    function cancelButtonClicked() {
        setRenderCancel(!renderCancel);
        if (renderCancel === true || renderReschedule === true) {
            resetOptions();
        }
    }

    function rescheduleButtonClicked() {
        setRenderReschedule(!renderReschedule);
        if (renderReschedule === true || renderCancel === true) {
            resetOptions();
        }
    }

    function confirm() {
        if (renderCancel) {
            confirmCancel();
        }
        else if (renderReschedule) {
            confirmReschedule();
        }
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
                setFailed(true);
                if (error.response) {
                    setFailedMessage(<Typography color={red[500]} >{"Failed to post cancellation. Status code: " + error.response.status}</Typography>);
                }
                else {
                    setFailedMessage(<Typography sx={{ fontSize: 10 }} color={red[500]} >{"Failed to post cancellation, there was no response."}</Typography>);
                }
                setCancelled(false);
            });

    }

    function confirmReschedule() {
        
    }

    function resetOptions() {
        setRenderCancel(false);
        setRenderReschedule(false);
        setFailed(false);
    }

    if (!cancelled) {
        return (
            <Card style={{ width: "500px" }} variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="div">
                        {info.serviceName}
                    </Typography>
                    <Typography color="text.secondary">
                        {info.bookingStartTime.toDateString()} at {info.bookingStartTime.toTimeString()}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary">
                        for {info.bookingDuration} minutes
                    </Typography>
                    <Typography>
                        User information:
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {info.userFullName}
                        <br/>
                        {info.userEmail}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={cancelButtonClicked}>Cancel</Button>
                    <Button size="small" onClick={rescheduleButtonClicked}>Reschedule</Button>
                </CardActions>
                {(renderCancel || renderReschedule) &&
                    (<CardContent>
                        {message}
                        <div></div>
                        {confirmButton} {resetOptionsButton}
                        {failed && failedMessage}
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
                        "{info.serviceName}" with {info.userFullName} on {info.bookingDate.toDateString()} at {info.bookingStartTime.toTimeString()} was cancelled.
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default BookingCardPartner;