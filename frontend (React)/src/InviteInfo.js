import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const axios = require('axios');
const baseURL = "http://192.168.1.103:5557/"


const InviteInfo = () => {

  const [data, setData] = useState([]);
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [speakers, setSpeakers] = useState('');
  const [hall_name, setHallName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [location, setLocation] = useState('');
  const [picURL, setPicURL] = useState('');


  const getInviteInfo=()=>{
    // GET request using axios inside useEffect React hook
    axios.get(baseURL+'get/invite/'+code)
    .then(function (response) {
        console.log(response.data);
        //setData(Object.values(response.data));
        let eventInfo=response.data['event'];
        let hallInfo=response.data['hall']
        console.log(eventInfo);
        console.log(hallInfo);
        setTitle(eventInfo['title'])
        setTime(eventInfo['time'])
        setSpeakers(eventInfo['speakers'])
        setHallName(hallInfo['name'])
        setCapacity(hallInfo['capacity'])
        setLocation(hallInfo['location'])
        setPicURL(hallInfo['picture_preview'])

        
      })
      .catch(function (error) {
        console.log(error);
      })

// empty dependency array means this effect will only run once
}


    return (


<div className="container">

  <div className="col-7 my-2">
      <input
          required 
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="form-control border border-dark border-2"
          type="id"
          placeholder="Invite code"/>
  </div>

  <button className="btn btn-dark col-7 my-2 p-2 border border-dark border-1" onClick={getInviteInfo}>Get Info</button>



  <div className="row">
{
title&&
<div className="col-12">
  <div className="card mb-3 g">
    <div className="row justify-content-center g-0">
      <div className="col-12">
        <div className="card-body">
          <h5 className="card-title">title: {title}</h5>
          <p className="card-text">speakers: {speakers}</p>
          <p className="card-text">time: {time}</p>
          <p className="card-text">Location: {location}</p>
          <p className="card-text">Hall name: {hall_name}</p>
          <p className="card-text">Capacity: {capacity}</p>
          <p className="card-text">Invite code: {code}</p>
        </div>
      </div>
      <div className="col-12 col-lg-8">
        <img src={picURL} alt="" className="img-fluid" />
      </div>
      
    </div>
  </div>
</div>

}</div>
        <Link to="/">
            <button type="button" className="btn-close border rounded-circle bg-white p-3 position-absolute top-0 end-0 m-3" aria-label="Close"></button>
        </Link>
</div>
);
}
 
export default InviteInfo;