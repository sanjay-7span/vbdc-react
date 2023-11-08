import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getToken } from '../../auth/common';
import { useDispatch, useSelector } from "react-redux";
import { getAgencyAction } from '../../actions/agency/creaters';
import SuccessMessage from "../SuccessMessage";
import Pagination from "../Pagination";
import useDocumentTitle from "../../useDocumentTitle";
import AgencyFilter from "./AgencyFilter";

const Agency = () => {

  useDocumentTitle('Agencies - VBDC');
  const dispatch = useDispatch();
  const agencies  = useSelector(state => state.agency.agency);

  const total = (agencies && typeof agencies.data != 'undefined' ) ? agencies.meta.total : '0';
  const per_page = (agencies && typeof agencies.data != 'undefined') ? agencies.meta.per_page : '15';
  
  const [currentPage, setCurrentPage] = useState(0);
  const [isopen, setOpenFilter] = useState("");
  const [postsPerPage] = useState(per_page);

  const token = getToken();
  var config = {
      headers: {
          'Authorization': "Bearer "+token,
          'Content-Type': 'application/json'
      }
  };
  const showsidebar = () => {
    setOpenFilter("slideover--open");
  }
  const closeFilter = () => {
    setOpenFilter("");
  }
  
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
    dispatch(getAgencyAction(config));
  };
  const searchAgency = (event) => {
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
    dispatch(getAgencyAction(config));
  }
  const filterSearch = (event) => {
    console.log('event '+event);
    var config = {
       params:{
         page:currentPage,
         limit:per_page,
         filter: {
          status:event.target.value
         }
       },
       headers: {
           'Authorization': "Bearer "+token,
           'Content-Type': 'application/json'
       }
   };
   dispatch(getAgencyAction(config));
 }
 const clearFilter = (event) => {
    var config = {
      params:{
        page:currentPage,
        limit:per_page,
        filter: {
          status:""
        }
      },
      headers: {
          'Authorization': "Bearer "+token,
          'Content-Type': 'application/json'
      }
    };
    dispatch(getAgencyAction(config));
  }
  
  useEffect(() => {
    dispatch(getAgencyAction(config));
    
  }, [dispatch]);
  return <div className="v-list h-100">
          <div className="app__header">
            <div className="flex items-center justify-end py-2 px-4 shadow relative z-30 bg-white">
              <div>
                <div className="vue-portal-target">
                <Link to="/add_agencies" className="button__label">
                    <button className="button py-2 px-2 rounded py-1 h-10 button--md button--primary button--solid" icon="IconMdiPlus" label="Add Agency"><span className="icon button__icon"><svg width="1em" height="1em" viewBox="0 0 24 24" className="w-full h-full"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z"></path></svg></span><span className="button__label">Add Agency</span></button>
                </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className='sticky top-0 bg-white z-10 text-gray-900 text-body border-b'>
            <div className='flex h-12 items-stretch bg-white'>
              <div className='px-3 flex items-center justify-center h-12 border-r'>
                <p className='font-bold leading-none text-3xl font-bold underline'>Agencies</p>
              </div>
              <div className="v-list-search border-r flex-grow relative">
                <input placeholder="Search" type="text" onChange={searchAgency} className="w-full h-12 px-4 outline-none focus:ring-2 focus:ring-inset focus:ring-gray-200"/>
              </div>
              <div className="divide-x flex text-xl">
                {/* <button className="cursor-pointer group w-12"><span className="block relative"><svg width="1em" height="1em" viewBox="0 0 24 24" className="icon group-hover:text-gray-900 mx-auto relative z-10 text-gray-400"><path fill="currentColor" d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path></svg></span></button> */}
                <button className="cursor-pointer group w-12" onClick={showsidebar}><span className="block relative"><svg width="1em" height="1em" viewBox="0 0 24 24" className="icon group-hover:text-gray-900 mx-auto relative z-10 text-primary-400"><path fill="currentColor" d="M7 6h10l-5.01 6.3L7 6zm-2.75-.39C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39A.998.998 0 0 0 18.95 4H5.04c-.83 0-1.3.95-.79 1.61z"></path></svg></span></button>
                {/* <button className="cursor-pointer group w-12"><span className="block relative"><svg width="1em" height="1em" viewBox="0 0 24 24" className="icon group-hover:text-gray-900 mx-auto relative z-10 text-gray-400"><path fill="currentColor" d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"></path></svg></span></button> */}
              </div>
            </div>
          </div>
          
          <SuccessMessage/>
          <div>
            <table className="v-list-table table text-left w-full h-full table-admin p-2 lg:p-4 font-body bg-white text-gray-900 table--row-click row-click-on">
              <thead>
                <tr className="bg-white">
                  <th rowSpan="1" colSpan="1" className="v-list-table__created_at_Date"><div className="v-list-table__head"><span>Agency Name</span></div></th>
                  <th rowSpan="1" colSpan="1" className="v-list-table__created_at_time"><div className="v-list-table__head"><span>Contact Person</span></div></th>
                  <th rowSpan="1" colSpan="1" className="v-list-table__zone"><div className="v-list-table__head"><span>Contact Number</span></div></th>
                  <th rowSpan="1" colSpan="1" className="v-list-table__ward"><div className="v-list-table__head"><span>Status</span></div></th>
                  <th rowSpan="1" colSpan="1" className="v-list-table__rwa"><div className="v-list-table__head"><span>Action</span></div></th>
                </tr>
              </thead>
              <tbody>
                {
                  agencies && agencies.data && agencies.data.length > 0 &&
                  agencies.data.map((agencyData, id) => (
                  <tr className='id' key={id}>
                    <td>{agencyData.name}</td>
                    <td>{agencyData.contact_person_name}</td>
                    <td>{agencyData.contact_person_number}</td>
                    <td><div className={"rounded-full py-2 px-4 w-20 text-center text-xs capitalize " + (agencyData.status == 'active' ? 'bg-success-200 text-success-600' : 'bg-warning-200 text-warning-600')}>{agencyData.status}</div></td>
                    <td>
                    <Link type="button" to={'/agency_update/' + agencyData.id} className="btn btn-info">
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
          <AgencyFilter isopen={isopen} filterSearch={filterSearch} clearFilter={clearFilter} closeFilter={closeFilter}  />
        </div>;
};

export default Agency;