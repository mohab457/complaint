import React from 'react'
import Style from './Register.module.css'
import { Link } from 'react-router-dom'



export default function Register() {
  return<>

<div className="container d-flex align-items-center justify-content-center mb-3 mt-3">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm border-0 rounded-3 px-3 bg-light">
            <h2 className="text-center mb-4 mt-3 fw-bold text-dark">Create Account</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  required
                />
              </div>
                            <div className="mb-3">
                <label className="form-label">
                  User Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="UserName"
                  name="UserName"
                  placeholder="e.g Sara_2026"
                  required
                />
              </div>
                <div className="mb-3">
                <label  className="form-label">
                  Phone Number
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="PhoneNumber"
                  name="PhoneNumber"
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 py-2">
                Create Account
              </button>
              <div className='w-100 text-center mt-2 mb-3'>
                    <Link className='text-decoration-none text-dark' to={'/login'}>Already have Account? Login Now</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
}
