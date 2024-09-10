import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [events, setEvents] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get('https://event-manager-backend-five.vercel.app/events/')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, [isSuccess]);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        date: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submit action
        axios.post('https://event-manager-backend-five.vercel.app/events/', formData)
            .then(response => {
                console.log('Event added successfully:', response.data);
                setFormData({
                    title: '',
                    description: '',
                    location: '',
                    date: ''
                });
                setIsSuccess(true);
                setShowModal(false); // Close the modal
            })
            .catch(error => {
                setIsSuccess(false);
                console.error('Error adding event:', error);
            });
    };

    const handleDelete = (id) => {
        axios.delete(`https://event-manager-backend-five.vercel.app/events/${id}`)
            .then(response => {
                console.log('Event deleted successfully:', response.data);
                setIsSuccess(true);
            })
            .catch(error => {
                setIsSuccess(false);
                console.error('Error deleting event:', error);
            });
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container my-2">
                    <h4>Event Dashboard</h4>
                    <div>
                        <Button variant="success" className="mx-3" onClick={() => setShowModal(true)}>
                            Add Event
                        </Button>
                        <Link className="btn btn-primary ml-auto" to="/">
                            Home
                        </Link>
                    </div>
                </div>
            </nav>
            <div className="container">
                <h5 className="text-center my-2">List of Events</h5>
                <table className="table table-striped border">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Title</th>
                            <th scope="col">Date</th>
                            <th scope="col">Update</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map(event => (
                            <tr key={event._id}>
                                <th>{event._id}</th>
                                <th>{event.title}</th>
                                <td>{new Date(event.date).toLocaleDateString()}</td>
                                <td><Link className="btn btn-primary ml-auto" to={`/update/${event._id}`}>
                                    Update
                                </Link></td>
                                <td><Button onClick={() => handleDelete(event._id)} variant="danger">Delete</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="inputAddress">Title</label>
                            <input onChange={handleInputChange} value={formData.title} type="text" className="form-control" name="title" id="inputAddress" placeholder="Event Title" />
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="inputAddress2">Description</label>
                            <input onChange={handleInputChange} value={formData.description} type="text" className="form-control" name="description" id="inputAddress2" placeholder="Enter Description" />
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="inputAddress2">Location</label>
                            <input onChange={handleInputChange} value={formData.location} type="text" className="form-control" name="location" id="inputAddress2" placeholder="Enter Location" />
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="inputAddress2">Date</label>
                            <input onChange={handleInputChange} value={formData.date} type="date" className="form-control" name="date" id="inputAddress2" placeholder="Enter Date" />
                        </div>

                        <Button type="submit" variant="primary" className="mt-3">
                            Add Event
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default App;
