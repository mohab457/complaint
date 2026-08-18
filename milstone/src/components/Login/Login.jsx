import { useState , useEffect } from 'react'
import React from 'react'
import Style from './Login.module.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../utils/supabase';
import * as Yup from 'yup'
import { useFormik } from 'formik';

export default function Login() {
const navigate = useNavigate();
  useEffect(() => {
    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        navigate('/MyComplaints', { replace: true });
      } else {
        setIsCheckingAuth(false);
      }
    }
    checkSession();
  }, [navigate]);
let passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
let emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const [isLoading, setIsLoading] = useState(false);
const [errorMsg, setErrorMsg] = useState('');

const validateSchema = Yup.object({
  email: Yup.string().matches(emailRegex ,'Invalid email address').required('Email is required'),
  password: Yup.string().matches(passRegex , 'password must contain at least one upercase letter and one number and one special character like "$ # @ !"  ')
})
const formik = useFormik({
  initialValues:{
    email:'',
    password:'',
  },
  validationSchema:validateSchema,
  onSubmit:handleLogin
})
async function handleLogin(values){
  setIsLoading(true)
  setErrorMsg('')
  const {data , error} = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
  })
  if (error) {
    setErrorMsg(error.message);
    setIsLoading(false);
    return;
  }
  if (data?.user) {
    navigate('/MyComplaints');
  }
  setIsLoading(false);
}
return<>
<div className="container vh-100 d-flex  justify-content-center mt-5 mb-3">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm border-0 rounded-3 p-4 bg-light">
            <h2 className="text-center fw-bold text-dark">Login</h2>
            {errorMsg && (<div className='alert alert-danger py-2'>{errorMsg}</div>)}
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                />
                {formik.touched.email && formik.errors.email && (
                      <div className="alert alert-danger py-1 mt-1">{formik.errors.email}</div>
                    )}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Password"
                  required
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="alert alert-danger py-1 mt-1">{formik.errors.password}</div>
                )}
              </div>
              <button disabled={isLoading || !formik.isValid || !formik.dirty} type="submit" className="btn btn-primary w-100 py-2">
                {isLoading?'Loading':'Login'}
              </button>
              <div className='w-100 text-center mt-2'>
                    <Link className='text-decoration-none text-dark' to={'/Register'}>Dont have Account? Register Now</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
}
