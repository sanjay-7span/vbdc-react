import '../../main-style.css';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { getToken } from '../../auth/common';

const Blogs = () => {
  const [rwatasks, setRwatask] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const token = getToken();

  var config = {
    headers: {
        'Authorization': "Bearer "+token,
        'Content-Type': 'application/json'
    }
  };
  useEffect(() => {
    axios.get('https://malaria-api.preview.im/api/admin/v1/rwa/tasks?include=zone,ward,rwaUser.msiUser&limit=15&page=1',config).then(response => response.data)
      .then(response => { 
        setRwatask(response.data);
      })
      .catch(error => {
      console.log(error);
      if (error.response.status === 401) setErrorMessages({ name: "pass", message: error.response.data.message});
      else setErrorMessages({ name: "pass", message: "Something went wrong.Please try again later."});
    });
  }, []);
  return <div className="v-list h-100">
          <div className='sticky top-0 bg-white z-10 text-gray-900 text-body border-b'>
            <div className='flex h-12 items-stretch bg-white'>
              <div className='px-3 flex items-center justify-center h-12 border-r'>
                <p className='font-bold leading-none'>RWA Tasks</p>
              </div>
            </div>
          </div>
          <div>
            <table className="v-list-table table text-left w-full h-full table-admin p-2 lg:p-4 font-body bg-white text-gray-900 table--row-click row-click-on">
              <thead>
                <tr className="bg-white">
                  <th rowSpan="1" colSpan="1" className="v-list-table__created_at_Date"><div className="v-list-table__head"><span>Date</span></div></th>
                  <th rowSpan="1" colSpan="1" className="v-list-table__created_at_time"><div className="v-list-table__head"><span>Time</span></div></th>
                  <th rowSpan="1" colSpan="1" className="v-list-table__zone"><div className="v-list-table__head"><span>Zone</span></div></th>
                  <th rowSpan="1" colSpan="1" className="v-list-table__ward"><div className="v-list-table__head"><span>Ward</span></div></th>
                  <th rowSpan="1" colSpan="1" className="v-list-table__rwa"><div className="v-list-table__head"><span>RWA</span></div></th>
                  <th rowSpan="1" colSpan="1" className="v-list-table__msi"><div className="v-list-table__head"><span>MSI</span></div></th>
                  <th rowSpan="1" colSpan="1" className="v-list-table__task_type"><div className="v-list-table__head"><span>Task Type</span></div></th>
                  <th rowSpan="1" colSpan="1" className="v-list-table__daily_report_count"><div className="v-list-table__head"><span>Total Daily Work Report</span></div></th>
                </tr>
              </thead>
              <tbody>
                {
                  rwatasks.length > 0 &&
                  rwatasks.map((rwatask, id) => (
                  <tr className='id' key={id}>
                    <td>{rwatask.created_at}</td>
                    <td>{rwatask.created_at}</td>
                    <td>{rwatask.zone.name}</td>
                    <td>{rwatask.ward.name}</td>
                    <td>{rwatask.rwa_user.first_name}</td>
                    <td>{rwatask.msi_user}</td>
                    <td>{rwatask.type}</td>
                    <td>{rwatask.daily_report_count}</td>
                    
                  </tr>
                ))}

                <tr></tr>
              </tbody>
            </table>
          </div>
        </div>;
};

export default Blogs;