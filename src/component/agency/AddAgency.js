import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getToken } from '../../auth/common';
import { addAgencyAction } from '../../actions/agency/creaters';
import SuccessNotification from "../SuccessMessage";
import ErrorNotification from '../Message';
import { addAgency } from "../../actions/agency/actions";
import { setError, setSuccess } from "../../actions/message/messageActions";

const initialValues = {
  name: "",
  contact_person_name: "",
  contact_person_number: "",
  status: "active"
};
const AddAgency = () => {
  const history = useNavigate();
  const [values, setValues] = useState(initialValues);
  
  
  const token = getToken();
  const dispatch = useDispatch();
  var config = {
    headers: {
        'Authorization': "Bearer "+token,
        'Content-Type': 'application/json'
    }
  };
  const handleChange = (e) => {
    console.log(e.target.value);
    console.log(values);
    setValues((prevState) => ({ ...values, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    try{
      axios.post('https://malaria-api.preview.im/api/admin/v1/agency', values,config)
      .then(response => {
          setValues({
            name: "",
            contact_person_name: "",
            contact_person_number: "",
            status: "active"
          });
          dispatch(setSuccess(response.data));
          history('/agencies');
      })
      .catch(error => {
          dispatch(setError(error.response.data));
      });
    } catch(e){
      dispatch(setError(e.response.data));
    }
  
  };

  return <div className="v-list h-100">
          <div className='sticky top-0 bg-white z-10 text-gray-900 text-body border-b'>
            <div className='flex h-12 items-stretch bg-white'>
              <div className='px-3 flex items-center justify-center h-12 border-r'>
                <p className='font-bold leading-none'>Agencies</p>
              </div>
            </div>
          </div>
          <SuccessNotification/>
          <div>
            <div className="v-form pb-3">
              <div className="input-container error-required">
                <ErrorNotification/>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="input-container">
                  <label>Agency Name </label>
                  <input type="text"  name='name' value={values.agencyName}   onChange={handleChange} />
                </div>
                <div className="input-container">
                  <label>Contact Person </label>
                  <input type="text" name='contact_person_name' value={values.contactPerson} onChange={handleChange}  />
                  
                </div>
                <div className="input-container">
                  <label>Contact Number </label>
                  <input type="text" name='contact_person_number' value={values.contactNumber} onChange={handleChange}  />
                  
                </div>
                <div className="input-container">
                  <label>Status </label>
                  <div className="flex items-center mb-4">
                      <input id="default-radio-1" checked type="radio" value="active" name="status" onChange={handleChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                      <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Active</label>
                  </div>
                  <div className="flex items-center">
                      <input id="default-radio-2" type="radio" value="inactive" name="status" onChange={handleChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                      <label  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inactive</label>
                  </div>
                </div>
                <div className="button-container">
                  <input type="submit" />
                </div>
              </form>
            </div>
          </div>
        </div>;
};

export default AddAgency;