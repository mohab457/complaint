import React from 'react'
import Style from './Navbar.module.css'
import { Link } from 'react-router-dom'



export default function Navbar() {
  return<>
<nav className="navbar navbar-expand-lg bg-dark navbar-dark">
  <div className="container-fluid">
    <Link to={'/'} className="navbar-brand btn " href="#">Complaint System</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to={'/'} className="nav-link btn active" aria-current="page" href="#">Home</Link>
        </li>
        <li className="nav-item">
          <Link to={'login'} className="nav-link btn active" aria-current="page" href="#">Login</Link>
        </li>
        <li className="nav-item">
          <Link to={'register'} className="nav-link active" aria-current="page" href="#">Register</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
  </>
}
