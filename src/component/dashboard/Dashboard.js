import React, { useEffect, useState } from "react";
import { getUser , removeUserSession } from '../../auth/common';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../../auth/common';

const Dashboard = () => {
  const [statics, setStatics] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const token = getToken();

 
  var config = {
    headers: {
        'Authorization': "Bearer "+token,
        'Content-Type': 'application/json'
    }
  };

  useEffect(() => {
    axios.get('https://malaria-api.preview.im/api/admin/v1/dashboard',config).then(response => response.data)
      .then(response => { 
        setStatics(response.data.statistics);
      })
      .catch(error => {
      console.log(error);
      if (error.response.status === 401) setErrorMessages({ name: "pass", message: error.response.data.message});
      else setErrorMessages({ name: "pass", message: "Something went wrong.Please try again later."});
    });
  }, []);
 
  return <div className="bg-gray-100 h-screen p-4 space-y-5">
            <div className="w-full bg-white rounded shadow">
                <h3 className="p-3 border-b font-semibold">Statistics</h3>
                <div className="p-4 flex items-center space-x-3 h-32">
                  <div className="flex space-x-3 bg-danger-100 p-5 rounded w-1/4">
                    <h2 key={statics.total_agency}>{statics.total_agency}</h2>
                    <p>Agencies</p>
                  </div>
                  <div className="flex space-x-3 bg-info-100 p-5 rounded w-1/4">
                    <h2 key={statics.total_msi}>{statics.total_msi}</h2>
                    <p>MSI</p>
                  </div>
                  <div className="flex space-x-3 bg-success-100 p-5 rounded w-1/4">
                    <h2 key={statics.total_rwa}>{statics.total_rwa}</h2>
                    <p>RWA</p>
                  </div>
                  <div className="flex space-x-3 bg-secondary-100 p-5 rounded w-1/4">
                    <h2 key={statics.total_teamleader}>{statics.total_teamleader}</h2>
                    <p>Teal Leader</p>
                  </div>
              </div>
        </div>
    </div>;
};

export default Dashboard;