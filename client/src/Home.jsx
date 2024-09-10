import React, {useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('https://event-manager-backend-five.vercel.app/events/')
            .then(response => {
                setEvents(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching events:',
                    error);
            });
    }, []);

    return (
        <div>
            <div className="container">
                <nav className="navbar navbar-expand-lg 
                                navbar-light bg-light">
                    <div className="container my-2">
                        <h4>Event</h4>
                        <Link className="btn btn-primary ml-auto"
                            to="/dashboard">
                            Dashboard
                        </Link>
                    </div>
                </nav>
                <div className="row my-3">
                    {events.map(event => {
                        const date = new Date(event.date);
                        const day = date.getDate();
                        const month = date.toLocaleString('default',
                            { month: 'short' });
                        const year = date.getFullYear();
                        return (
                            <div className="col-lg-4" key={event.id}>
                                <div className="card card-margin">
                                    <div className="card-body pt-2">
                                        <div className="widget-49">
                                            <div className="widget-49-title-wrapper">
                                                <div className="widget-49-date-primary">
                                                    <span className="widget-49-date-day">
                                                        {day}
                                                    </span>
                                                    <span className="widget-49-date-month">
                                                        {month}
                                                    </span>
                                                </div>
                                                <div className="widget-49-meeting-info">
                                                    <span className="widget-49-pro-title">
                                                        <b>{event.title}</b>
                                                    </span>
                                                    <span className="widget-49-pro-title">
                                                        <b>{event.location}</b>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="widget-49-meeting-points">
                                                <span>{event.description}</span>
                                            </div>
                                            <div className="widget-49-meeting-action">
                                                <a href="#"
                                                    className="btn btn-sm btn-flash-border-primary">
                                                    {`${day}-${month}-${year}`}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default Home;
