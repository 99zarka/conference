import { Link } from "react-router-dom";
import { useState } from "react";

const axios = require('axios');
const baseURL = "http://192.168.1.103:5557/"


const CreateHall = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhone] = useState('');

    const [hall_name, setHallName] = useState('');
    const [capacity, setCapacity] = useState('');
    const [rent, setRent] = useState('');
    const [location, setLocation] = useState('');
    const [picURL, setPicURL] = useState('');
    const [id, setId] = useState('');

    let hall_id


const postHall=()=>{
    axios.post(baseURL+'create/hall', {
        capacity: capacity,
        location: location,
        name: hall_name,
        picture_preview: picURL,
        rent: rent
      })
      .then(function (response) {
        console.log(response);
        hall_id=response.data.id
        alert("the hall id is: "+response.data.id);
      })
      .catch(function (error) {
        console.log(error);
        alert("fill all fields");
      })
      .then(function () {
        axios.post(baseURL+'create/manager', {
            email:email ,
            hall_id:hall_id ,
            name:name ,
            phone_number: phone_number
            }).then(function (response) {
                console.log(hall_id)
                console.log(response);
                alert("the hall manager id is: "+response.data.id)
                })
                .catch(function (error) {
                console.log(error);
                alert("fill managers fields");
                });
      })

}


const onFileUpload =(ev)=> {
            const formdata = new FormData()
            formdata.append("image", ev.target.files[0])
            fetch("https://api.imgur.com/3/image/", {
                method: "post",
                headers: {
                    Authorization: "Client-ID f80df40f68f0923"
                },
                body: formdata
            }).then(data => data.json()).then(data => {
                setPicURL(data.data.link)
            })
        }

    return (

    <div className="row justify-content-evenly">
        <div className="col-md-5">
            <div className="col-12 my-2 float-start">
                <h2 className="float-start">Add a new hall</h2>
            </div>
            <div className="col-12 my-2 float-start">
                <p className="float-start">Fill in manager info</p>
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
                <p className="float-start">Hall info</p>
            </div>
            <div className="col-12 my-2">
                <input
                    required 
                    value={hall_name}
                    onChange={(e) => setHallName(e.target.value)}
                    className="form-control border border-dark border-2"
                    type="name"
                    placeholder="hall name"/>
            </div>
            <div className="col-12 my-2">
                <input
                    required 
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="form-control border border-dark border-2"
                    type="capacity"
                    placeholder="capacity"/>
            </div>
            <div className="col-12 my-2">
                <input
                    required 
                    value={rent}
                    onChange={(e) => setRent(e.target.value)}
                    className="form-control border border-dark border-2"
                    type="rent"
                    placeholder="rent"/>
            </div>
            <div className="col-12 my-2">
                <input
                    required 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="form-control border border-dark border-2"
                    type="location"
                    placeholder="location"/>
            </div>
            <div className="col-12 my-2 mb-3">
                <label for="formFile" className="form-label float-start">upload pic</label>
                <input className="form-control" type="file" id="formFile" onChange={(ev) => onFileUpload(ev)}/>
            </div>

            <div className="col-6 my-2">
                {picURL&&<img src={picURL} alt="" className="img-fluid" />}
            </div>

            <div className="col-12 my-2">
                <input
                    required 
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="form-control border border-dark border-2"
                    type="id"
                    placeholder="(optional) hall id to edit old info"/>
            </div>

            <button className="btn btn-primary col-12 my-2 p-2 border border-dark border-1" onClick={postHall}>Submit</button>

        </div>

        <Link to="/">
            <button type="button" className="btn-close border rounded-circle bg-white p-3 position-absolute top-0 end-0 m-3" aria-label="Close"></button>
        </Link>

    </div>

     );
}
 
export default CreateHall;