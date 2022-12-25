import './App.css';
import Create from './Create';
import SignIn from './SignIn';
import { Route, Routes } from "react-router-dom"

//import SideBar from './SideBar';

//<SideBar />

function App() {
  return (
    <>
      <div className="App">
        <div className="container text-center">
          <div className="row justify-content-center min-vh-100">
            <div className="col col-10 mycard align-self-center py-5 position-relative">
              <div className="content">
                <Routes>
                  <Route path="/" element={<SignIn />} />
                  <Route path="/create" element={<Create />} />
                  <Route path="/signin" element={<SignIn />} />
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

