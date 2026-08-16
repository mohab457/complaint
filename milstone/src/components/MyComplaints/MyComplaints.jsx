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
    const { data, error } = await supabase.from("complaint").select("*");
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
      <h1 className="text-center">your complaints</h1>
      <div className="bg-light mt-3 mb-3 p-5 rounded-3 w-75 mx-auto">
        <table className="table rounded-3">
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
                <th scope="row">{item.id}</th>
                <td>{item.userName}</td>
                <td>{item.topic}</td>
                <td>{item.status || "Pending"}</td>
                <td>{item.phone}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
        ) : (
          ""
        )}
      </div>
    </>
  );
}
