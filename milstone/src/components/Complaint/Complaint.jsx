import React, { useState } from "react";
import Style from "./Complaint.module.css";
import { supabase } from "../../../utils/supabase";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function Complaint() {
    function getCurrentDate(){
    const now = new Date()
    return now.toLocaleString('en-US' ,{
      month: "short",
      day:'numeric',
      hour:'numeric',
      minute:'numeric',
      hour12: true
    })
    }
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("");
  const [date , setdate] =useState(getCurrentDate())
  const [complaintText, setComplaintText] = useState("");
  const [isloading, setIsLoading] = useState(false);
  function clearform(){
    setUserName('')
    setEmail('')
    setPhone('')
    setTopic('')
    setComplaintText('')
  }
  async function sendComplaint() {
    setIsLoading(true);
    const { data, error } = await supabase.from("complaint")
    .insert([
      {
        userName: userName,
        phone: phone,
        email: email,
        topic: topic,
        complaintText: complaintText,
        date: date
      },
    ]);
    setIsLoading(false);
    clearform()
  }
  return (
    <>
<div className="container mt-4 mb-5">
      <div className="card bg-light p-4 p-md-5 rounded-4 shadow-sm">
        <h2 className="text-center mb-4 fw-bold text-dark">
          - Complete This Form To Write Your Complaint -
        </h2>

        <form onSubmit={sendComplaint}>
          <div className="row g-3">
            <div className="col-12 col-md-4">
              <label className="form-label fw-semibold">Username</label>
              <div className="input-group">
                <span className="input-group-text">@</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="col-12 col-md-4">
              <label className="form-label fw-semibold">Email</label>
              <div className="input-group">
                <span className="input-group-text">@</span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="col-12 col-md-4">
              <label className="form-label fw-semibold">Phone</label>
              <div className="input-group">
                <span className="input-group-text">+20</span>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="01xxxxxxxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold">Topic</label>
              <div className="input-group">
                <label className="input-group-text">Topic:</label>
                <select
                  className="form-select"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                >
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
                    disabled={isloading}
                    type="submit"
                    className="btn btn-primary w-100 py-2"
                  >
                    {isloading ? 'Loading...' : 'Submit'}
                  </button>
                </div>
                <div className="col-12 col-md-6">
                  <Link to={'/MyComplaints'} className="btn btn-success w-100 py-2">
                    Reports
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
