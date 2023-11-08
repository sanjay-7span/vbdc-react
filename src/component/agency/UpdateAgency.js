import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams  } from "react-router-dom";
import { updateAgencyAction } from '../../actions/agency/creaters';
import { getToken } from '../../auth/common';

const initialValues = {
  name: "",
  contact_person_name: "",
  contact_person_number: "",
  status: "active"
};
const UpdateAgency = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const history = useNavigate();
  const [values, setValues] = useState(initialValues);
  
  const editAgency = useSelector((state) =>
    state.agency.agency.data.find((ag => ag.id == id))
  );
  const token = getToken();
  var config = {
    headers: {
        'Authorization': "Bearer "+token,
        'Content-Type': 'application/json'
    }
  };
  useEffect(() => {
    console.log(editAgency);
      if (editAgency) {
        setValues({ ...editAgency });
      }
  }, [editAgency]);

  const handleChange = (e) => {
    console.log(e.target.value);
    console.log(values);
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    console.log(values);
    dispatch(updateAgencyAction(values, id, config));
    history('/agencies');
  };
  return <div className="v-list h-100">
    <div className='sticky top-0 bg-white z-10 text-gray-900 text-body border-b'>
      <div className='flex h-12 items-stretch bg-white'>
        <div className='px-3 flex items-center justify-center h-12 border-r'>
          <p className='font-bold leading-none'>Agencies</p>
        </div>
      </div>
    </div>
    <div>
      <div className="v-form pb-3">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Agency Name </label>
            <input type="text"  name='name' value={values.name || ""} required  onChange={handleChange} />
          </div>
          <div className="input-container">
            <label>Contact Person </label>
            <input type="text" name='contact_person_name' value={values.contact_person_name || ""} onChange={handleChange} required />
            
          </div>
          <div className="input-container">
            <label>Contact Number </label>
            <input type="text" name='contact_person_number' value={values.contact_person_number || ""} onChange={handleChange} required />
            
          </div>
          <div className="input-container">
            <label>Status </label>
            <div className="flex items-center mb-4">
                <input id="default-radio-1" type="radio" value="active" name="status" checked={values.status == 'active' || ""} onChange={handleChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Active</label>
            </div>
            <div className="flex items-center">
                <input id="default-radio-2" type="radio" value="inactive" name="status" checked={values.status == "inactive" || ""} onChange={handleChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
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

export default UpdateAgency;