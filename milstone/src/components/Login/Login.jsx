import React from 'react'
import Style from './Login.module.css'



export default function Login() {
  return<>




<div className="container d-flex align-items-center justify-content-center mb-3 mt-3">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm border-0 rounded-3 p-4 bg-light">
            <h2 className="text-center mb-4 fw-bold text-dark">Login</h2>

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

              <div className="mb-4">
                <label htmlFor="phone" className="form-label">
                  password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="phone"
                  name="phone"
                  placeholder="Password"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 py-2">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  



  </>
}
