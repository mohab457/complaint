import React, { useState } from 'react'
import Style from './Register.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../../utils/supabase'



export default function Register() {

const [email , setEmail] = useState('')
const [userName , setUserName] = useState('')
const [phone , setPhone] = useState('')
const [password  ,setPassword] = useState('')
const [isLoading , setIsloading] = useState(false)
const [errorMsg , setErrorMsg] = useState('')
const navigate = useNavigate()


async function handleRegister(e){
  e.preventDefault()
  setIsloading(true)
  setErrorMsg('')
  const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if(authError){
      setErrorMsg(authError.message)
      setIsloading(false)
      return
    }
    if(authData?.user){
      const {error: profileError} = await supabase.from('register').insert([
        {
          id: authData.user.id,
          userName: userName,
          phone: phone,
        }
      ])
      if(profileError){
        setErrorMsg(profileError.message)
      }else{
        navigate('/MyComplaints')
      }
    }
    setIsloading(false)
}
  return<>
<div className="container d-flex align-items-center justify-content-center mb-3 mt-3">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm border-0 rounded-3 px-3 bg-light">
            <h2 className="text-center mb-4 mt-3 fw-bold text-dark">Create Account</h2>
            {errorMsg && (<div className='alert alert-danger py-2'>{errorMsg}</div>)}
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={ (e)=>setEmail(e.target.value) }
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
                  value={userName}
                  onChange={ (e)=>setUserName(e.target.value) }
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
                  value={phone}
                  onChange={ (e)=>setPhone(e.target.value) }
                  name="PhoneNumber"
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={ (e)=>setPassword(e.target.value) }
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button type="submit" disabled={isLoading} className="btn btn-primary w-100 py-2">
                {isLoading? "Creating Account...": 'Register'}
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
