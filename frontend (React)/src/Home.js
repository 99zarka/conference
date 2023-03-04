import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const axios = require('axios');
const baseURL = "http://192.168.1.103:5557/"


const Home = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios.get(baseURL+'halls')
    .then(function (response) {
        setData(Object.values(response.data))
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      })

// empty dependency array means this effect will only run once
}, []);






    return (


<div className="container-fluid hall-list">
  <div className="row">
{

data.map(hall => (
<div className="col-6">
  <div className="card mb-3" style={{maxWidth: "540px"}}>
    <div className="row justify-content-center g-0">
      <div className="col-md-4">
        <img src={hall.picture_preview} alt="" className="img-fluid" />
      </div>
      <div className="col-md-8">
        <div className="card-body">
        <h5 className="card-title">{hall.name}</h5>
        <p className="card-text">Location: {hall.location}</p>
        <p className="card-text">Capacity: {hall.capacity}</p>
        <p className="card-text">Rent: {hall.rent}</p>
        <p className="card-text">Hall reservation ID: {hall.id}</p>

        </div>
      </div>
    </div>
  </div>
</div>
  ))

}</div></div>
);
}
 
export default Home;