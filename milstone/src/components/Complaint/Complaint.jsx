import React, { useState } from "react";
import Style from "./Complaint.module.css";
import { supabase } from "../../../utils/supabase";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Complaint() {
  const [topic, setTopic] = useState("");
  const [date, setdate] = useState(getCurrentDate());
  const [complaintText, setComplaintText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const { user, userName, phone } = useAuth();

  function getCurrentDate() {
    const now = new Date();
    return now.toLocaleString('en-US', {
      month: "short",
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  }

  function clearform() {
    setTopic('');
    setComplaintText('');
  }

  async function sendComplaint(e) {
    e.preventDefault();
    setIsSubmitting(true);

    const { data, error } = await supabase.from("complaint").insert([
      {
        userName: userName || user.user_metadata?.userName || "User",
        user_id: user.id,
        phone: phone,
        email: user.email, 
        topic: topic,
        complaintText: complaintText,
        date: date
      },
    ]);

    if (error) {
      console.error("Error inserting complaint:", error);
      setErrorMsg('Something went wrong, please try again');
      setSuccessMsg(''); 
    } else {
      setSuccessMsg('Complaint sent successfully!');
      setErrorMsg(''); 
      clearform();
      clearform();
    }
    setIsSubmitting(false);
        if(!error){
      setSuccessMsg('Complaint sent successfully!')
      setErrorMsg('')
      setTimeout( ()=> {
        setSuccessMsg('')
      }, 1500 )
      clearform()
    }
  }
  

  return (
    <div className="container vh-100 mt-4 mb-5">
      <div className="card bg-light p-4 p-md-5 rounded-4 shadow-sm">
        <h2 className="text-center mb-4 fw-bold text-dark">
          - Complete This Form To Write Your Complaint -
        </h2>
        {successMsg && (
          <div className="alert alert-success text-center mx-auto w-75 p-2"> {successMsg} </div>
        )}
        {errorMsg && (
          <div className="alert alert-danger text-center mx-auto w-75 p-2">{errorMsg}</div>
        )}

        <form onSubmit={sendComplaint}>
          <div className="row g-3">
            <div className="col-12 mb-3">
              <label className="form-label fw-semibold">What is your complaint about?</label>
              <div className="input-group">
                <label className="input-group-text">Topic:</label>
                <select
                  className="form-select"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                >
                  <option value="">Choose Topic...</option>
                  <option value="Wrong Item">Wrong Item</option>
                  <option value="Lost Item">Lost Item</option>
                  <option value="Broken Item">Broken Item</option>
                  <option value="Delivery Issue">Delivery Issue</option>
                  <option value="Refund Issue">Refund Issue</option>
                  <option value="Payment Issue">Payment Issue</option>
                  <option value="Account Lost">Account Lost</option>
                </select>
              </div>
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold">Write your Complaint</label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Describe your issue in detail..."
                value={complaintText}
                onChange={(e) => setComplaintText(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="col-12 mt-4">
              <div className="row g-2">
                <div className="col-12 col-md-6">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="btn btn-outline-primary w-100 py-2"
                  >
                    {isSubmitting ? 'Sending...' : 'Submit'}
                  </button>
                </div>
                <div className="col-12 col-md-6">
                  <Link to={'/MyComplaints'} className="btn btn-outline-success w-100 py-2">
                    My complaints
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}