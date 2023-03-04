import { Link } from "react-router-dom";

//<a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
//<a class="nav-link active" aria-current="page" href="#">Hall Managers</a>
//<a class="nav-link active" aria-current="page" href="#">Hall Managers</a>


const NavBar = () => {
    return (
<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
  <div className="container-fluid">
    <Link to="/" className="navbar-brand">Conference System</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <Link to="/create/hall" className="nav-link">Hall Managers</Link>
        <Link to="/create/event" className="nav-link">Host</Link>
        <Link to="/info/invite" className="nav-link">Guest</Link>
      </div>
    </div>
  </div>
</nav>
    );
}
 
export default NavBar;