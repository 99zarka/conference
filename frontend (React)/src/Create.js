import { Link } from "react-router-dom";

const Create = () => {
    return (

    <div className="row justify-content-evenly">
        <div className="col-md-5">
            <div className="col-12 my-2 float-start">
                <h2 className="float-start">Create An Account</h2>
            </div>
            <div className="col-12 my-2 float-start">
                <p className="float-start">Already a user? <Link to="/signin" className="">Sign In</Link></p>
            </div>
            <div className="row justify-content-evenly my-2">
                <div className="col">
                    <input className="form-control border border-dark border-2" type="first name" placeholder="first name"/>
                </div>
                <div className="col">
                    <input className="form-control border border-dark border-2" type="last name" placeholder="last name" />
                </div>
            </div>
            <div className="col-12 my-2"><input className="form-control border border-dark border-2" type="email" placeholder="email" /></div>
            <div className="col-12 my-2"><input className="form-control border border-dark border-2" type="password" placeholder="password"/></div>
            <button className="btn btn-primary col-12 my-2 p-2 border border-dark border-1">Sign Up</button>

            <div className="row my-2"><hr className="col align-self-center"/><p className="col-auto">Or Sign In With</p><hr className="col align-self-center"/></div>


            <div className="justify-content-center my-2">
                <div className="btn btn-white border border-dark border-1 rounded-circle mx-2 col bg-white"><i className="bi bi-facebook text-primary"></i></div>
                <div className="btn btn-white border border-dark border-1 rounded-circle mx-2 col bg-white"><i className="bi bi-google text-danger"></i></div>
            </div>

        </div>


        <div className="col-md-5 align-self-center">
            <img className="img-fluid" src="create.svg" alt="" />
        </div>

        <button type="button" className="btn-close border rounded-circle bg-white p-3 position-absolute top-0 end-0 m-3" aria-label="Close"></button>


        
    </div>



     );
}
 
export default Create;