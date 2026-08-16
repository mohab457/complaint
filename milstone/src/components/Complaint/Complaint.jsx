import React, { useState } from "react";
import Style from "./Complaint.module.css";
import { supabase } from "../../../utils/supabase";
import { ThreeDots } from "react-loader-spinner";

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
  function handelSubmit(e) {
    e.preventDefault();
  }

    
  function clearform(){
    setUserName('')
    setEmail('')
    setPhone('')
    setTopic('')
    setComplaintText('')
  }
  async function sendComplaint() {
    setIsLoading(true);
    const { data, error } = await supabase.from("complaint").insert([
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
      <div className="px-5 mb-5 bg-light w-75 mx-auto rounded-5 mt-4 d-flex flex-wrap justify-content-between py-5">
        <h2 className="text-center w-100 mb-5">
          -Compelete This From To Write Your Complaint-
        </h2>
        <div className="input-group w-25 flex-nowrap">
          <span className="input-group-text" id="addon-wrapping">
            @
          </span>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username"
            value={userName}
            aria-label="Username"
            aria-describedby="addon-wrapping"
          />
        </div>

        <div className="input-group w-25 flex-nowrap">
          <span className="input-group-text" id="addon-wrapping">
            @
          </span>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            aria-label="email"
            value={email}
            aria-describedby="addon-wrapping"
          />
        </div>

        <div className="input-group w-25 flex-nowrap">
          <span className="input-group-text" id="addon-wrapping">
            +20
          </span>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            aria-label="Phone"
            value={phone}
            aria-describedby="addon-wrapping"
          />
        </div>
        <div className="input-group mb-3 mt-3">
          <label className="input-group-text">Topic:</label>

          <select
            className="form-select"
            id="inputGroupSelect01"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            <option value="Wrong Item">Wrong Item</option>
            <option value="Lost Item">Lost Item</option>
            <option value="Broken Item">Broken Item</option>
            <option value="Dlivary Issue">Dlivary Issue</option>
            <option value="Refund Issue">Refund Issue</option>
            <option value="Payment Issue">Payment Issue</option>
            <option value="Account Lost">Account Lost</option>
          </select>
        </div>
        <div className="input-group">
          <span className="input-group-text">Write your Complaint</span>
          <textarea
            className="form-control"
            aria-label="textarea"
            value={complaintText}
            onChange={(e) => setComplaintText(e.target.value)}
            required
          ></textarea>
        </div>

        <button
          onClick={sendComplaint}
          disabled={isloading}
          type="submit"
          className="btn btn-primary w-25 mt-3 mx-auto"
        >
          {isloading ? "Loading" : "Submit"}
        </button>
      </div>
    </>
  );
}
