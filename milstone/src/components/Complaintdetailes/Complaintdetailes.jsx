import React from 'react'
import Style from './Complaintdetailes.module.css'
import { useAuth } from '../../context/AuthContext'
import { useParams } from 'react-router-dom'



export default function Complaintdetailes() {
  const {complaints} = useAuth()
  const {id} = useParams()
  const currentComplaint = complaints?.find( (item)=> String(item.id) === String(id) )

  if (!currentComplaint) {
    return (
      <div className="container py-5 text-center">
        <h3 className="text-muted">Complaint not found...</h3>
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
          <p className="mt-3 bg-white p-3 rounded-3 border">
            {currentComplaint.complaintText}
          </p>
        </div>
        <div>
          <span className="px-2 py-1 rounded-3 bg-warning text-dark"> Under Review</span>
        </div>
      </div>
    </div>




  </>
}
