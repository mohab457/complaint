import React, { useEffect, useState } from 'react';
import Style from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../../utils/supabase';


export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
<nav className="navbar navbar-expand-lg bg-dark navbar-dark  border-bottom">
  <div className="container-fluid">
    <Link to={'/'} className="navbar-brand btn" href="#">Complaint System </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {user ? (
          <>
            <li className="nav-item">
              <button onClick={handleLogout} className="nav-link btn active text-danger">Logout</button>
            </li>
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
