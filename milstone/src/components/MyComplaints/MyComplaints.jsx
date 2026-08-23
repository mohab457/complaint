import React from "react";
import Style from "./MyComplaints.module.css";
import { useState, useEffect } from "react";
import { supabase } from "../../../utils/supabase";
import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { useQuery } from "@tanstack/react-query";


export default function MyComplaints() {
  const [complaints, setComplaint] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  async function getComplaints() {
    setIsloading(true);
    const { data, error } = await supabase
    .from("complaint")
    .select("*")
    .order("id" , {ascending: false})
    if (data) {
      setComplaint(data);
    }
    setIsloading(false);
    return data;
    }
  let { data } = useQuery({
    queryKey: ["complaints"],
    queryFn: getComplaints,
  });
  return (
    <>
<div className="container my-4 text-black">
      <div className="bg-white border rounded-4 p-3 p-md-4 shadow">
        
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center gap-3 mb-4">
          <Link to={'/complaint'} className="btn btn-primary text-nowrap">
            <i className="fa-solid fa-plus me-1"></i> + New Complaint
          </Link>

          <form className="d-flex w-100 w-md-auto" role="search" onSubmit={(e) => e.preventDefault()}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search by phone"
              aria-label="Search"
            />
            <button className="btn btn-outline-success text-nowrap" type="submit">
              Search
            </button>
          </form>
        </div>

        <div className="table-responsive rounded-3">
          <table className="table table-striped table-light text-center text-black align-middle mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>User Name</th>
                <th>Topic</th>
                <th>Status</th>
                <th>Phone</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {data?.map((item) => (
                <tr key={item.id}>
                  <th>
                    <Link to="/Complaintdetailes" className="text-black text-decoration-none d-block p-1">
                      {item.id}
                    </Link>
                  </th>
                  <td>
                    <Link to="/Complaintdetailes" className="text-black text-decoration-none d-block p-1">
                      {item.userName}
                    </Link>
                  </td>
                  <td>
                    <Link to="/Complaintdetailes" className="text-black text-decoration-none d-block p-1">
                      {item.topic}
                    </Link>
                  </td>
                  <td>
                    <Link to="/Complaintdetailes" className=" badge bg-warning text-dark text-decoration-none p-2">
                      {item.statu || 'Pending..'}
                    </Link>
                  </td>
                  <td>
                    <Link to="/Complaintdetailes" className="text-black text-decoration-none d-block p-1">
                      {item.phone}
                    </Link>
                  </td>
                  <td>
                    <Link to="/Complaintdetailes" className="text-black text-decoration-none d-block p-1">
                      {item.date}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data && data.length === 0 && (
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
