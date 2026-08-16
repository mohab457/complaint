import React, { useState } from 'react'
import Style from './Complaint.module.css'
import { supabase } from '../../../utils/supabase'
import { ThreeDots } from 'react-loader-spinner';






export default function Complaint() {


const [userName, setUserName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
const [topic, setTopic] = useState('Wrong Item');
const [complaintText, setComplaintText] = useState('');
const [isloading, setIsLoading] = useState(false);

function handelSubmit(e){
  e.preventDefault();
}

async function sendComplaint(){
  setIsLoading(true)
  const {data , error} = await supabase
    .from('complaint')
    .insert([
        {
        userName: userName,
        phone: phone,
        email: email,
        topic: topic,
        complaintText: complaintText
      }
    ])
  setIsLoading(false)
}
  return<>
<div className='px-5 mb-5 bg-light w-75 mx-auto rounded-5 mt-4 d-flex flex-wrap justify-content-between py-5'>
  <h2 className='text-center w-100 mb-5'>-Compelete This From To Write Your Complaint-</h2>
<div className="input-group w-25 flex-nowrap">
  <span className="input-group-text" id="addon-wrapping">@</span>
  <input 
  type="text" 
  className="form-control" 
  onChange={(e)=> setUserName(e.target.value)} 
  placeholder="Username" 
  aria-label="Username" 
  aria-describedby="addon-wrapping"/>
</div>

<div className="input-group w-25 flex-nowrap">
  <span className="input-group-text" id="addon-wrapping">@</span>
  <input 
  type="text" 
  className="form-control" 
  onChange={ (e)=> setEmail(e.target.value) }
  placeholder="E-mail" 
  aria-label="Username" 
  aria-describedby="addon-wrapping"/>
</div>

<div className="input-group w-25 flex-nowrap">
  <span className="input-group-text" id="addon-wrapping">+20</span>
  <input 
  type="text" 
  className="form-control" 
  onChange={ (e)=> setPhone(e.target.value) }
  placeholder="Phone Number" 
  aria-label="Username" 
  aria-describedby="addon-wrapping"/>
</div>
<div className="input-group mb-3 mt-3">
  <label 
  className="input-group-text"
  >Topic:</label>

  <select className="form-select" id="inputGroupSelect01" onChange={ (e)=> setTopic(e.target.value)}>
    <option value="1">Wrong Item</option>
    <option value="2">Lost Item</option>
    <option value="3">Broken Item</option>
    <option value="4">Dlivary Issue</option>
    <option value="5">Refund Issue</option>
    <option value="6">Payment Issue</option>
    <option value="7">Account Lost</option>
  </select>
</div>
<div className="input-group">
  <span className="input-group-text">Write your Complaint</span>
  <textarea 
  className="form-control" 
  aria-label="With textarea"
  onChange={ (e)=> setComplaintText(e.target.value) }
  required>
  </textarea>
</div>

<button onClick={sendComplaint} disabled={isloading} type='submit' className='btn btn-primary w-25 mt-3 mx-auto'>
  {isloading?'Loading': 'Submit'}
</button>

</div>


  </>
}
