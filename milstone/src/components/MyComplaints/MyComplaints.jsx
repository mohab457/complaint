import React from "react";
import Style from "./MyComplaints.module.css";
import { useState, useEffect } from "react";
import { supabase } from "../../../utils/supabase";
import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";


export default function MyComplaints() {
  const [complaints, setComplaint] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const {userName , phone , email , user} = useAuth()

  async function getComplaints() {
    setIsloading(true);
    const { data, error } = await supabase
    .from("complaint")
    .select("*")
    .eq('user_id', user?.id)
    .order("id" , {ascending: false})
    if (data) {
      setComplaint(data);
    }
    setIsloading(false);
    return data;
    }
  let { data: complaintsList } = useQuery({
    queryKey: ["complaints"],
    queryFn: getComplaints,
    enabled: !!user,
  });
  return (
    <>
<div className="container my-4 text-black">
      <div className="bg-white border rounded-4 p-3 p-md-4 shadow">
        
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center gap-3 mb-4">
          <p className="fs-1"><strong>Comlaints Detailes</strong> </p>
          <Link to={'/complaint'} className="btn border bg-black text-white">New Complaint</Link>
        </div>
        <div className="mb-3 text-muted">
          <p className="mb-1"><strong>User Name:</strong> {userName}</p>
          <p className="mb-1"><strong>E-mail:</strong> {email}</p>
          <p className="mb-1"><strong>Phone:</strong> {phone || 'Not available'}</p>
        </div>


                {complaintsList && complaintsList.length > 0 && (
                  <div className="d-flex flex-column gap-3">
                    {complaintsList.map((item) => (
                      <Link 
                        key={item.id} 
                        to={`/Complaintdetailes/${item.id}`} 
                        className="text-decoration-none text-dark"
                      >
                        <div className="card border p-3 rounded-3 shadow-sm bg-light">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <strong className="badge bg-black text-white px-4 py-2 fs-6">{item.topic}</strong>
                            <small className="text-muted">{item.date}</small>
                          </div>
                          <p className="mb-0 fw-bold">Complaint details:</p>
                          <p className="text-secondary mb-0">{item.complaintText}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}



        {complaintsList && complaintsList.length === 0 && (
          <div className="w-100 bg-light text-dark text-center py-4 mt-3 rounded-3">
            <p className="fs-5 mb-0">No Complaints have been Created</p>
          </div>
        )}

        {isLoading && (
          <div className="d-flex justify-content-center py-4">
            <ThreeDots
              visible={true}
              height="40"
              width="40"
              color="#ffffff"
              radius="9"
              ariaLabel="three-dots-loading"
            />
          </div>
        )}

      </div>
    </div>
    </>
  );
}
