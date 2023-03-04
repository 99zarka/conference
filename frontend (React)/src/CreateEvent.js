import { Link } from "react-router-dom";
import { useState } from "react";

const axios = require('axios');
const baseURL = "http://192.168.1.103:5557/"

const CreateEvent = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhone] = useState('');

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [speakers, setSpeakers] = useState('');
    const [hall_id, setHallId] = useState('');
    const [id, setId] = useState('');


    const [event_id, setEventId] = useState('');
    const [first_code, setFirstCode] = useState('');
    const [last_code, setLastCode] = useState('');
    const [host_id, setHostId] = useState('');





const postEvent=()=>{

    axios.post(baseURL+'create/host', {
        email:email ,
        name:name ,
        phone_number: phone_number
      })
      .then(function (response) {
        console.log(response);
        setHostId(response.data.id)
        alert("the host id is: "+response.data.id);
      })
      .catch(function (error) {
        console.log(error);
        alert("fill all fields");
      })
      .then(function () {
        axios.post(baseURL+'create/event', {
            title:title ,
            time:date+" "+time ,
            speakers:speakers ,
            host_id:host_id,
            hall_id:hall_id
            }).then(function (response) {
                console.log(response);
                setEventId(response.data.id)
                alert("the event id is: "+response.data.id)
                })
                .catch(function (error) {
                console.log(error);
                alert("fill event fields");
                })
                .then(function (response) {
                    axios.get(baseURL+'firstinvite/'+event_id)
                    .then(function (response) {
                        setFirstCode(response.data[0]);
                        setLastCode(response.data[1]);
                        alert("invited codes are: "+response.data[0]+" to "+response.data[1])
                        console.log(response.data);
                      })
                      .catch(function (error) {
                        console.log(error);
                      })
                });
      })
}




    return (

    <div className="row justify-content-evenly">
        <div className="col-md-5">
            <div className="col-12 my-2 float-start">
                <h2 className="float-start">Add a new Event</h2>
            </div>
            <div className="col-12 my-2 float-start">
                <p className="float-start">Fill in host info</p>
            </div>
            <div className="col-12 my-2">
                <input
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control border border-dark border-2"
                    type="name"
                    placeholder="name"/>
            </div>
            <div className="col-12 my-2">
                <input
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control border border-dark border-2"
                    type="email"
                    placeholder="email"/>
            </div>
            <div className="col-12 my-2">
                <input
                    required 
                    value={phone_number}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control border border-dark border-2"
                    type="phone"
                    placeholder="phone"/>
            </div>

        </div>


        <div className="col-md-5">
            <div className="col-12 my-2 float-start">
                <h2 className="float-start">.</h2>
            </div>
            <div className="col-12 my-2 float-start">
                <p className="float-start">Event info</p>
            </div>
            <div className="col-12 my-2">
                <input
                    required 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-control border border-dark border-2"
                    type="name"
                    placeholder="event name"/>
            </div>
            <div className="col-12 my-2">
                <input
                    required 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="form-control border border-dark border-2"
                    type="date"
                    placeholder="date"/>
            </div>
            <div className="col-12 my-2">
                <input
                    required 
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="form-control border border-dark border-2"
                    type="time"
                    placeholder="time"/>
            </div>
            <div className="col-12 my-2">
                <input
                    required 
                    value={speakers}
                    onChange={(e) => setSpeakers(e.target.value)}
                    className="form-control border border-dark border-2"
                    type="speakers"
                    placeholder="speakers"/>
            </div>
            <div className="col-12 my-2">
                <input
                    required 
                    value={hall_id}
                    onChange={(e) => setHallId(e.target.value)}
                    className="form-control border border-dark border-2"
                    type="hall_id"
                    placeholder="hall id"/>
            </div>



            <button className="btn btn-primary col-12 my-2 p-2 border border-dark border-1" onClick={postEvent}>Submit</button>

        </div>
            <br />
            {host_id && <p className="">Host ID: {host_id}</p>}
            {event_id && <p className="">Event ID: {event_id}</p>}
            {first_code && <p className="">Invites codes to invite people: {first_code} to {last_code}</p>}
        <div>

        </div>

        <Link to="/">
            <button type="button" className="btn-close border rounded-circle bg-white p-3 position-absolute top-0 end-0 m-3" aria-label="Close"></button>
        </Link>

    </div>

     );
}
 
export default CreateEvent;