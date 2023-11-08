import { Outlet, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { removeUserSession } from '../auth/common';
import { useNavigate } from 'react-router-dom';
import { setauthenticated, getToken } from "../auth/common";
import Login from "./Login";
const Layout = () => {
  const history = useNavigate();
  const handleLogout = () => {
    removeUserSession();
    history('/');
  }
  const [authenticated, setauthenticated] = useState(null);
  const loggedInUser = getToken();
  useEffect(() => {
    const loggedInUser = getToken();
    if (loggedInUser) {
      setauthenticated(loggedInUser);
    }
  }, []);
  if (!loggedInUser) {
    return <Login/>
  }
  return (
    <>
      {loggedInUser && 
      <div className="bg-white flex-col h-full bg-gray-900 w-min w-60">
        <div className="flex-col flex">
              <div className="w-full border-b-2 border-gray-200">
              </div>
              <div className="flex bg-gray-100  overflow-x-hidden">
                  <div className="bg-white lg:flex md:w-64 md:flex-col hidden">
                      <div className="flex-col pt-5 flex overflow-y-auto">
                          <div className="h-full flex-col justify-between px-4 flex">
                              <div className="space-y-4">
                                  <div className="bg-top bg-cover space-y-1">
                                    <Link to="/dashboard" className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex transition-all duration-200 hover:bg-gray-200 group cursor-pointer">
                                          <span className="justify-center items-center flex">
                                              <span className="justify-center items-center flex">
                                                  <span className="justify-center items-center flex">
                                                      <span className="items-center justify-center flex">
                                                          <svg className="flex-shrink-0 w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                              viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path 
                                                                  strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1
                        1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                                      </span>
                                                  </span>
                                              </span>
                                          </span>
                                          <span>Dashboard</span>
                                      </Link>
                                  </div>
                                  <div className="bg-top bg-cover space-y-1">
                                    <Link to="/rwa-tasks" className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex transition-all duration-200 hover:bg-gray-200 group cursor-pointer">
                                          <span className="justify-center items-center flex">
                                              <span className="justify-center items-center flex">
                                                  <span className="justify-center items-center flex">
                                                      <span className="items-center justify-center flex">
                                                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="w-full h-full mr-1"><path fill="currentColor" d="M16 9c0 5.33-8 5.33-8 0h2c0 2.67 4 2.67 4 0m6 9v3H4v-3c0-2.67 5.33-4 8-4s8 1.33 8 4m-1.9 0c0-.64-3.13-2.1-6.1-2.1c-2.97 0-6.1 1.46-6.1 2.1v1.1h12.2M12.5 2c.28 0 .5.22.5.5v3h1V3a3.89 3.89 0 0 1 2.25 3.75s.7.14.75 1.25H7c0-1.11.75-1.25.75-1.25A3.89 3.89 0 0 1 10 3v2.5h1v-3c0-.28.22-.5.5-.5"></path></svg>
                                                      </span>
                                                  </span>
                                              </span>
                                          </span>
                                          <span>RWA Task</span>
                                      </Link>
                                  </div>
                                  <div>
                                      <p className="px-4 font-semibold text-xs tracking-widest text-gray-400 uppercase">Master</p>
                                      <div className="mt-2 bg-top bg-cover space-y-1">
                                          <Link to="/agencies"  className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex transition-all duration-200 hover:bg-gray-200 group cursor-pointer">
                                              <span className="justify-center items-center flex">
                                                  <span className="justify-center items-center flex">
                                                      <span className="justify-center items-center flex">
                                                          <span className="items-center justify-center flex">
                                                            <svg  className="w-full h-full mr-1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454l-6 5.454V19zm2.591-5.191a3.508 3.508 0 0 1 0-1.622l-.991-.572l1-1.732l.991.573a3.495 3.495 0 0 1 1.404-.812V8.5h2v1.144c.532.159 1.01.44 1.404.812l.991-.573l1 1.731l-.991.573a3.508 3.508 0 0 1 0 1.622l.991.572l-1 1.731l-.991-.572a3.495 3.495 0 0 1-1.404.811v1.145h-2V16.35a3.495 3.495 0 0 1-1.404-.811l-.991.572l-1-1.73l.991-.573zm3.404.688a1.5 1.5 0 1 0 0-2.998a1.5 1.5 0 0 0 0 2.998z"></path></svg>
                                                          </span>
                                                      </span>
                                                  </span>
                                              </span>
                                              <span>Agency</span>
                                          </Link>
                                      </div>
                                      <div className="mt-2 bg-top bg-cover space-y-1">
                                          <Link to="/zone"  className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex transition-all duration-200 hover:bg-gray-200 group cursor-pointer">
                                              <span className="justify-center items-center flex">
                                                  <span className="justify-center items-center flex">
                                                      <span className="justify-center items-center flex">
                                                          <span className="items-center justify-center flex">
                                                          <svg width="1em" height="1em" viewBox="0 0 24 24" className="w-full h-full mr-1"><path fill="currentColor" d="M12 2c3.31 0 6 2.66 6 5.95C18 12.41 12 19 12 19S6 12.41 6 7.95C6 4.66 8.69 2 12 2m0 4a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2m8 13c0 2.21-3.58 4-8 4s-8-1.79-8-4c0-1.29 1.22-2.44 3.11-3.17l.64.91C6.67 17.19 6 17.81 6 18.5c0 1.38 2.69 2.5 6 2.5s6-1.12 6-2.5c0-.69-.67-1.31-1.75-1.76l.64-.91C18.78 16.56 20 17.71 20 19Z"></path></svg>
                                                          </span>
                                                      </span>
                                                  </span>
                                              </span>
                                              <span>Zone</span>
                                          </Link>
                                      </div>
                                  </div>
                              </div>
                              <div className="pb-4">
                                  <div className="bg-top bg-cover space-y-1">
                                    <div className="mt-2 bg-top bg-cover space-y-1">
                                          <Link to="/profile/general"  className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex transition-all duration-200 hover:bg-gray-200 group cursor-pointer">
                                              <span className="justify-center items-center flex">
                                                  <span className="justify-center items-center flex">
                                                      <span className="justify-center items-center flex">
                                                          <span className="items-center justify-center flex">
                                                          <svg width="1em" height="1em" viewBox="0 0 24 24" className="w-full h-full mr-1"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zM7.35 18.5C8.66 17.56 10.26 17 12 17s3.34.56 4.65 1.5c-1.31.94-2.91 1.5-4.65 1.5s-3.34-.56-4.65-1.5zm10.79-1.38a9.947 9.947 0 0 0-12.28 0A7.957 7.957 0 0 1 4 12c0-4.42 3.58-8 8-8s8 3.58 8 8c0 1.95-.7 3.73-1.86 5.12z"></path><path fill="currentColor" d="M12 6c-1.93 0-3.5 1.57-3.5 3.5S10.07 13 12 13s3.5-1.57 3.5-3.5S13.93 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z"></path></svg>
                                                          </span>
                                                      </span>
                                                  </span>
                                              </span>
                                              <span>Profile</span>
                                          </Link>
                                      </div>
                                      <a href="#" onClick={handleLogout} className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex transition-all duration-200 hover:bg-gray-200 group cursor-pointer">
                                          <span className="justify-center items-center flex">
                                              <span className="justify-center items-center flex">
                                                  <span className="justify-center items-center flex">
                                                      <span className="items-center justify-center flex">
                                                      <svg width="1em" height="1em" viewBox="0 0 24 24" className="w-full h-full mr-1"><path fill="currentColor" d="M20 11v2H8l5.5 5.5l-1.42 1.42L4.16 12l7.92-7.92L13.5 5.5L8 11h12Z"></path></svg>
                                                      </span>
                                                  </span>
                                              </span>
                                          </span>
                                          <span>Logout</span>
                                      </a>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
        </div>
      </div>
      }

      <Outlet />
    </>
  )
};

export default Layout;