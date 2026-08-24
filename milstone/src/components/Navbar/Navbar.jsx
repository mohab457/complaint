import React, { useEffect, useState } from 'react';
import Style from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../../utils/supabase';
import { useAuth } from '../../context/AuthContext';


export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const {userName} = useAuth()

useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/login');
  }

  return<>
<nav className="navbar navbar-expand-lg bg-black navbar-dark  border-bottom">
  <div className="container-fluid">
    <Link to={'/'} className="navbar-brand btn" href="#">Complaint System </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {user ? (
          <>
          <div className="dropdown">
            <button className="btn text-white " type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Options
            </button>
            <ul className="dropdown-menu">
            <li className="nav-item">
              <button onClick={handleLogout} className="nav-link btn active text-danger">Logout</button>
            </li>
            </ul>
          </div>
          
          </>
        ) : (
          <>
          </>
        )}
      </ul>
    </div>
  </div>
</nav>
  </>
}
