import React, { useEffect, useState } from "react";
import axios from 'axios';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import { getToken } from '../../auth/common';
import { monthMap } from "../../contants/month";
Chart.register(CategoryScale);

const Dashboard = () => {

  
  const [statics, setStatics] = useState({});
  const [graphData, setGraph] = useState([]);
  const [errorMessages, setErrorMessages] = useState({});
  const token = getToken();

  const today = new Date();
  
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  useEffect(() => {
    var config = {
      headers: {
          'Authorization': "Bearer "+token,
          'Content-Type': 'application/json'
      }
    };
    axios.get('https://malaria-api.preview.im/api/admin/v1/dashboard',config).then(response => response.data)
      .then(response => { 
        setStatics(response.data.statistics);
      })
      .catch(error => {
      console.log(error);
      if (error.response.status === 401) setErrorMessages({ name: "pass", message: error.response.data.message});
      else setErrorMessages({ name: "pass", message: "Something went wrong.Please try again later."});
    });
    var config = {
      params:{
        month:month,
        year:year,
      },
      headers: {
          'Authorization': "Bearer "+token,
          'Content-Type': 'application/json'
      }
    };
    
    axios.get('https://malaria-api.preview.im/api/admin/v1/get-task-report',config).then(response => response.data)
        .then(response => { 
          setGraph(response.data);
        })
        .catch(error => {
        console.log(error);
      });
    
  }, []);
  
  const getDashboardGraphData = ( event ) => {
    
    var config = {
      params:{
        month:event.target.value,
        year:year,
      },
      headers: {
          'Authorization': "Bearer "+token,
          'Content-Type': 'application/json'
      }
    };
    setMonth(event.target.value);
    axios.get('https://malaria-api.preview.im/api/admin/v1/get-task-report',config).then(response => response.data)
      .then(response => { 
        setGraph(response.data);
      })
      .catch(error => {
      console.log(error);
    });
  };
  const getDashboardYearGraphData = ( event ) => {
    
    var config = {
      params:{
        month:month,
        year:event.target.value,
      },
      headers: {
          'Authorization': "Bearer "+token,
          'Content-Type': 'application/json'
      }
    };
    setYear(event.target.value);
    axios.get('https://malaria-api.preview.im/api/admin/v1/get-task-report',config).then(response => response.data)
      .then(response => { 
        setGraph(response.data);
      })
      .catch(error => {
      console.log(error);
    });
  };
  console.log('graph' + graphData.length);

  //if(graphData.length > 0){
    const state = {
      labels: graphData.map((single) => (new Date(single.date)).getDate()),
      datasets: [
        {
          label: 'RWA',
          backgroundColor: 'rgb(22 144 66)',
          borderColor: 'rgb(22 144 66)',
          borderWidth: 2,
          data: graphData.map((single) => single.rwa)
        },
        {
          label: 'Fogging',
          backgroundColor: 'rgb(0 106 128)',
          borderColor: 'rgb(0 106 128)',
          borderWidth: 2,
          data: graphData.map((single) => single.fogging)
        },
        {
          label: 'IRS',
          backgroundColor: 'rgb(242 6 18)',
          borderColor: 'rgb(242 6 18)',
          borderWidth: 2,
          data: graphData.map((single) => single.irs)
        }
      ]
    }
  //}
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
            <div className="bg-white rounded shadow">
              <div className="p-1 items-center flex justify-between border-b">
                <h3 className="font-semibold px-3">IRS - Fogging - RWA</h3>
                <div className="flex px-3 space-x-1">
                  <div className="w-48">
                    <div>
                      <span>
                        <div className="field field--label mt-2">
                          <div className="field__header"></div>
                          <div className="field__input">
                            <div className="w-full h-12 mt-2">
                              <div className="input input--lg bg-gray-200 rounded-md">
                                <select value={month} className="select bg-gray-100 text-gray-800 rounded" onChange={getDashboardGraphData}>
                                  <option value=""> — Select — </option>
                                  {
                                  monthMap.map((name,i) => <option value={name.value}>{name.label}</option>)
                                  }
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="field__footer">
                          </div>
                        </div>
                      </span>
                    </div>
                  </div>
                  <div className="w-28">
                    <div>
                      <span>
                        <div className="field field--label mt-2">
                          <div className="field__header"></div>
                          <div className="field__input">
                            <div className="w-full h-12 mt-2">
                              <div className="input input--lg bg-gray-200 rounded-md">
                                <select value={year} onChange={getDashboardYearGraphData} className="select bg-gray-100 text-gray-800 rounded">
                                  <option value=""> — Select — </option>
                                  {
                                    Array.from( new Array(10), (v,i) =>
                                      <option key={i} value={year+i}>{year+i}</option>
                                    )
                                  }
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="field__footer"></div>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-2">
                <div className="w-full" id="chart">
                {graphData.length > 0 && <Bar
                  data={state}
                  options={{
                    plugins: {
                      title: {
                        display: true,
                        text: "Number of Task"
                      },
                      legend: {
                        display: false
                      }
                    }
                  }}
                /> }
                </div>
              </div>
            </div>
    </div>;
};

export default Dashboard;