import React, { useEffect, useState } from 'react'
import Style from './Register.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../../utils/supabase'
import {useFormik} from 'formik'
import * as Yup from 'yup'

export default function Register() {
let phoneRegex = /^01[0125][0-9]{8}$/;
let passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{8,}$/;
let emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const [isSuccess , setIsSuccess] = useState(false)
const validateSchema = Yup.object({
  email: Yup.string().matches(emailRegex ,'Invalid email address').required('Email is required'),
  userName: Yup.string().min(3 , 'Username must be at least 3 characters').required('Username is required'),
  phone: Yup.string().matches(phoneRegex , 'Must be a valid phone number').required('Phone Number is Required'),
  password: Yup.string().matches(passRegex , 'password must contain at least one upercase letter and one number and one special character like "$ # @ !"  ')
})
const formik = useFormik({
  initialValues:{
    email:'',
    userName:'',
    phone:'',
    password:'',
  },
  validationSchema:validateSchema,
  onSubmit:handleRegister
})
const [isLoading , setIsloading] = useState(false)
const [errorMsg , setErrorMsg] = useState('')
const navigate = useNavigate()

useEffect( ()=>{
  let intervalId;

  if(isSuccess){
    intervalId = setInterval( async ()=> {
      const { data: { user } } = await supabase.auth.getUser();
      if(user && user.email_confirmed_at){
        clearInterval(intervalId)
        navigate('/MyComplaints')
      }
    }, 1000 )
  }
  return ()=>{
    if(intervalId) clearInterval(intervalId)
  }
}, [isSuccess] )

async function handleRegister(values){
  setIsloading(true)
  setErrorMsg('')
  const { data: authData, error: authError } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
      emailRedirectTo: 'https://complaint-an4x.vercel.app/MyComplaints',
      data:{
        userName: values.userName,
        phone: values.phone
      }
    },
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
          userName:values.userName,
          phone:values.phone,
        }
      ])
      if(profileError){
        setErrorMsg(profileError.message)
      }else{
        setIsSuccess(true)
        navigate('/login')
      }
    }
    setIsloading(false)
}
  return<>
<div className="container d-flex vh-100 justify-content-center mb-3 mt-5">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm border-0 rounded-3 px-3 bg-light">
            <h2 className="text-center mb-4 mt-3 fw-bold text-dark">Create Account</h2>
            {errorMsg && (<div className='alert alert-danger py-2'>{errorMsg}</div>)}
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="email"
                  value={formik.values.email}
                  id="email"
                  placeholder="name@example.com"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="alert alert-danger py-1 mt-1">{formik.errors.email}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">
                  User Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="UserName"
                  onBlur={formik.handleBlur}
                  name="userName"
                  onChange={formik.handleChange}
                  value={formik.values.userName}
                  placeholder="e.g Sara_2026"
                />
                  {formik.touched.userName && formik.errors.userName && (
                  <div className="alert alert-danger py-1 mt-1">{formik.errors.userName}</div>
                )}
              </div>
                <div className="mb-3">
                <label  className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="PhoneNumber"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  name="phone"
                  placeholder="name@example.com"
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className="alert alert-danger py-1 mt-1">{formik.errors.phone}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">
                  password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  name="password"
                  placeholder="Password"
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="alert alert-danger py-1 mt-1">{formik.errors.password}</div>
                )}
              </div>
              <button type="submit" className="btn bg-black text-white w-100 py-2">
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
