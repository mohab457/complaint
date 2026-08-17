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
      <div className="bg-dark border mt-3 mb-3 px-5 rounded-5 w-75 mx-auto">
          <div className="d-flex justify-content-between ms-auto w-100 mx-auto p-5 ">
            <Link to={'/complaint'} className="btn btn-primary"><i className="fa-solid fa-plus"></i>+ New Complaint</Link>
            <form className="d-flex" role="search">
              <input 
              className="form-control me-2" 
              type="search"
              placeholder="Search by phone" 
              aria-label="Search"/>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        <table className="table table-striped text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>Topic</th>
              <th>Status</th>
              <th>Phone</th>
              <th>Date </th>
            </tr>
          </thead>
<tbody className="table-group-divider">
  {data?.map((item) => (
    <tr key={item.id}>
      <th><Link to="/Complaintdetailes" className="text-dark text-decoration-none p-1 w-100">{item.id}</Link></th>
      <td><Link to="/Complaintdetailes" className="text-dark text-decoration-none p-1 w-100">{item.userName}</Link></td>
      <td><Link to="/Complaintdetailes" className="text-dark text-decoration-none p-1 w-100">{item.topic}</Link></td>
      <td><Link to="/Complaintdetailes" className="text-dark text-decoration-none p-1 w-100 bg-warning rounded-2">{item.statu || "Pending.."}</Link></td>
      <td><Link to="/Complaintdetailes" className="text-dark text-decoration-none p-1 w-100">{item.phone}</Link></td>
      <td><Link to="/Complaintdetailes" className="text-dark text-decoration-none p-1 w-100">{item.date}</Link></td>
    </tr>
  ))}
</tbody>
        </table>
        {data ==''? <div className="w-100 bg-white py-5">
                <p className="fs-3 text-center w-100"> No Complaints hase been Created</p>
              </div>:''}
        {isLoading ? (
          <>
            <div className="d-flex justify-content-center">
              <ThreeDots
                visible={true}
                height="40"
                width="40"
                color="balck"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          </>
            ):""}
      </div>
    </>
  );
}
