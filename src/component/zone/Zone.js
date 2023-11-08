import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getToken } from '../../auth/common';
import { useDispatch, useSelector } from "react-redux";
import { getZoneAction } from '../../actions/zone/creaters';
import SuccessMessage from "../SuccessMessage";
import ReactPaginate from "react-paginate";
import Pagination from "../Pagination";

const Zone = () => {

  
  const dispatch = useDispatch();
  // console.log(state.agnecy);
  const zoneData  = useSelector(state => state.zone.zone);
  // console.log('zoneData '+zoneData.data);
  const total = (typeof zoneData.data != 'undefined') ? zoneData.meta.total : '0';
  const per_page = (typeof zoneData.data != 'undefined') ? zoneData.meta.per_page : '15';
  
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage] = useState(per_page);
  const token = getToken();
  
  var config = {
      params:{
        page:currentPage,
        limit:per_page,
      },
      headers: {
          'Authorization': "Bearer "+token,
          'Content-Type': 'application/json'
      }
  };
  const handlePageClick = ( event ) => {
    
    setCurrentPage(event.selected + 1);
    
     var config = {
        params:{
          page:event.selected + 1,
          limit:per_page,
        },
        headers: {
            'Authorization': "Bearer "+token,
            'Content-Type': 'application/json'
        }
    };
     dispatch(getZoneAction(config));
  };
  const searchZone = (event) => {
    var config = {
       params:{
         page:currentPage,
         limit:per_page,
         search:event.target.value
       },
       headers: {
           'Authorization': "Bearer "+token,
           'Content-Type': 'application/json'
       }
   };
   dispatch(getZoneAction(config));
 }
 
  useEffect(() => {
    dispatch(getZoneAction(config));
    
  }, [dispatch]);
  
  return <div className="v-list h-100">
          
          <div className='sticky top-0 bg-white z-10 text-gray-900 text-body border-b'>
            <div className='flex h-12 items-stretch bg-white'>
              <div className='px-3 flex items-center justify-center h-12 border-r'>
                <p className='font-bold leading-none text-3xl font-bold underline'>Zone</p>
              </div>
              <div className="v-list-search border-r flex-grow relative">
                <input placeholder="Search" type="text" onChange={searchZone} className="w-full h-12 px-4 outline-none focus:ring-2 focus:ring-inset focus:ring-gray-200"/>
              </div>
            </div>
          </div>
          <SuccessMessage/>
          <div>
            <table className="v-list-table table text-left w-full h-full table-admin p-2 lg:p-4 font-body bg-white text-gray-900 table--row-click row-click-on">
              <thead>
                <tr className="bg-white">
                  <th rowSpan="1" colSpan="1" className="v-list-table__created_at_Date"><div className="v-list-table__head"><span>Zone</span></div></th>
                  <th rowSpan="1" colSpan="1" className="v-list-table__created_at_time"><div className="v-list-table__head"><span>Address</span></div></th>
                  <th rowSpan="1" colSpan="1" className="v-list-table__ward"><div className="v-list-table__head"><span>Status</span></div></th>
                  <th rowSpan="1" colSpan="1" className="v-list-table__rwa"><div className="v-list-table__head"><span>Action</span></div></th>
                </tr>
              </thead>
              <tbody>
                {
                  zoneData.data && zoneData.data.length > 0 &&
                  zoneData.data.map((zone, id) => (
                  <tr className='id' key={id}>
                    <td>{zone.name}</td>
                    <td>{zone.address}</td>
                    <td><div className={"rounded-full py-2 px-4 w-20 text-center text-xs capitalize " + (zone.status == 'active' ? 'bg-success-200 text-success-600' : 'bg-warning-200 text-warning-600')}>{zone.status}</div></td>
                    <td>
                    <Link type="button" to={'/agency_update/' + zone.id} className="btn btn-info">
                      <button  className="button bg-info-100 button--info button--md button--lg button--rounded button--square flex justify-center items-center has-tooltip" data-original-title="null">
                        <span className="icon button__icon">
                          <svg width="32" height="32" viewBox="0 0 24 24" className="w-full h-full"><path fill="currentColor" d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25Z"></path></svg>
                        </span>
                        <span className="button__label"></span>
                      </button>
                      </Link>
                    </td>
                    
                  </tr>
                ))}

                <tr></tr>
              </tbody>
            </table>
            <Pagination total={total} handlePageClick={handlePageClick} postsPerPage={postsPerPage} />
          </div>
          
        </div>;
};

export default Zone;