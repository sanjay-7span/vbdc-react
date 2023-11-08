import React, { useEffect, useState } from "react";

const AgencyFilter = (props) => {

  const [currentVal, setDropdown] = useState("");
  const closeFilter = () => {
    props.closeFilter();
  }
  const filterSearch = (event) => {
    props.filterSearch(event);
    setDropdown(event.target.value);
  }
  const clearFilter = () => {
    props.clearFilter();
    props.closeFilter();
    setDropdown("");    
  }
  
  return <div className="vue-portal-target" id="slideover-container">
            <div id="list-filters-agencies" className={"slideover slideover--right " + (props.isopen)} style={{width:"300px"}}>
              <div className="flex items-center justify-between border-gray-200 border-b"><p className="px-4"> Filters </p><button className="w-12 h-12 flex items-center justify-center cursor-pointer group" onClick={closeFilter}><svg width="1em" height="1em" viewBox="0 0 24 24" className="icon text-lg font-semibold"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"></path></svg></button>
              </div>
              <div className="flex-grow overflow-auto">
                <div className="space-y-3 p-4">
                  <div>
                    <span>
                      <div className="field field--label mt-2" name="status">
                        <div className="field__header"><label className="field__label"> Status  </label></div>
                        <div className="field__input">
                          <div className="w-full h-12 mt-2">
                            <div className="input input--lg bg-gray-200 rounded-md">
                              <select value={currentVal} className="select bg-gray-100 text-gray-800 rounded" onChange={filterSearch}>
                                <option value=""> — Select — </option>
                                <option value="active"> Active </option>
                                <option value="inactive"> Inactive </option>
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
              <div className="border-t p-2">
                <div className="mt-0 p-4 block">
                  <button onClick={clearFilter} className="button py-2 px-2 font-normal w-full mt-0 p-3 button--danger-light button--md button--danger button--solid" theme="muted" label="Reset" icon="IconMdiClose">
                    <span className="icon button__icon">
                      <svg width="1em" height="1em" viewBox="0 0 24 24" className="w-full h-full"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"></path></svg>
                    </span>
                    <span className="button__label">Reset</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
};

export default AgencyFilter;