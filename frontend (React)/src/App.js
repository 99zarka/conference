import './App.css';
import { Route, Routes } from "react-router-dom"
import { Link } from "react-router-dom";
import NavBar from './NavBar';
import Home from './Home';
import CreateHall from './CreateHall';
import CreateEvent from './CreateEvent';
import InviteInfo from './InviteInfo';

//import SideBar from './SideBar';

//<SideBar />

function App() {
  return (
    <>
    <NavBar />
      <div className="App">
        <div className="container text-center">
          <div className="row justify-content-center min-vh-100">
            <div className="col col-10 mycard align-self-center py-5 position-relative mt-5">
              <div className="content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/create/hall" element={<CreateHall />} />
                  <Route path="/create/event" element={<CreateEvent />} />
                  <Route path="/info/invite" element={<InviteInfo />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default App

