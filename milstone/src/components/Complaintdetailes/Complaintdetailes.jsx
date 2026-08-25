import React, { useState , useEffect } from 'react'
import Style from './Complaintdetailes.module.css'
import { useAuth } from '../../context/AuthContext'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../../utils/supabase'



export default function Complaintdetailes() {
  const {complaints , refreshUserData} = useAuth()
  const {id} = useParams()
  const currentComplaint = complaints?.find( (item)=> String(item.id) === String(id) )
  const [text, setText] = useState('');
  let navigate = useNavigate('/MyComplaints')

  useEffect(() => {
  if (currentComplaint) {
    setText(currentComplaint.complaintText);
  }
}, [currentComplaint]);

async function handelSave(){
  const now = new Date();
    const formattedDate =
      now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }) +
      ', ' +
      now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
try {
      const {data , error } = await supabase
        .from('complaint')
        .update({ complaintText: text, date: formattedDate }) 
        .eq('id', id); 
      if (error) {
        alert('Error updating complaint: ' + error.message);
        return;
      }      
      await refreshUserData(); 
      navigate('/MyComplaints'); 
    } catch (err) {
      console.error(err);
    }
}

  if (!currentComplaint) {
    return (
      <div className="container py-5 text-center">
        <h3 className="text-muted">Loading...</h3>
      </div>
    );
  }
  
  return<>

    <div className="container py-4 text-black">
      <h1 className="text-center mb-4">Edit Your Complaint</h1>
      <div className="card border p-4 rounded-4 shadow-sm bg-light">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="p-2 rounded-3 bg-black mx-auto text-white px-3 py-2 fs-6">
            {currentComplaint.topic}
          </span>
        </div>
        <div className="mb-3">
          <h5 className="fw-bold">Complaint Details:</h5>
          <small className="text-muted">Date: {currentComplaint.date}</small>
            <textarea
              className="form-control mb-3 mt-3 bg-white p-3 rounded-3 border"
              rows="4"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
        </div>
        <div className='d-flex justify-content-between'>
          <span className=" text-center px-3 py-2 text-muted  rounded-3 bg-warning text-dark"> Under Review</span>
          <button onClick={handelSave} className='btn btn-outline-success'>Save</button>
        </div>
      </div>
    </div>




  </>
}
