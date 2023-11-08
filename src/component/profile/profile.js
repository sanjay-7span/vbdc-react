import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getToken, Path } from '../../auth/common';
import SuccessNotification from "../SuccessMessage";
import ErrorNotification from '../Message';
import { setError, setSuccess } from "../../actions/message/messageActions";
import { getProfile } from "../../actions/profile/actions";

const initialValues = {
  first_name: "",
  last_name: "",
  middle_name: "",
  pincode:"",
  address:"",
  status: "active",
  media_id:""
};
const Profile = () => {
  const history = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [image, setImage] = useState({});
  const profile  = useSelector(state => state.profile.profile);
  
  const token = getToken();
  const dispatch = useDispatch();
  var config = {
    headers: {
        'Authorization': "Bearer "+token,
        'Content-Type': 'application/json',
    }
  };
  useEffect(() => {

      axios.get('https://malaria-api.preview.im/api/v1/me',config)
          .then(response => {
              dispatch(getProfile(response.data));
          })
          .catch(error => {
              console.log(error);
          });

    
  }, [dispatch]);

  useEffect(() => {
      if (profile) {
        setValues({ ...profile });
      }
  }, [profile]);
  const handleChange = (e) => {
    console.log(e.target.value);
    console.log(values);
    setValues(() => ({ ...values, [e.target.name]: e.target.value }));
  };

  const uploadImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      console.log('image'+URL.createObjectURL(img));
      setImage({
        image: URL.createObjectURL(img)
      });
      try{
        const formData = new FormData();
        var config = {
          headers: {
              'Authorization': "Bearer "+token,
              'Content-type': 'multipart/form-data'
          }
        };
        // Update the formData object
        formData.append("files[]",img);
        formData.append('used_for',"profile_picture");
 
     
        axios.post('https://malaria-api.preview.im/api/v1/medias', formData,config)
        .then(response => {
          console.log('uploadimage'+response.data[0].id);
           // dispatch(setSuccess(response.data));
           setValues(() => ({ ...values, ['media_id']: response.data[0].id }));
        })
        .catch(error => {
            dispatch(setError(error.response.data));
        });
      } catch(e){
        dispatch(setError(e.response.data));
      }
    }
  }
  const deleteImage = (event,id) => {
    //Prevent page reload
    event.preventDefault();
    
    try{
      axios.delete(`https://malaria-api.preview.im/api/v1/medias/${id}`,config)
      .then(response => {
          dispatch(setSuccess(response.data));
      })
      .catch(error => {
          dispatch(setError(error.response.data));
      });
    } catch(e){
      dispatch(setError(e.response.data));
    }
  
  };
 
  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    try{
      axios.post(Path.PATH+'/edit-profile', values,config)
      .then(response => {
          setValues({
            name: "",
            contact_person_name: "",
            contact_person_number: "",
            status: "active"
          });
          dispatch(setSuccess(response.data));
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
                <p className='font-bold leading-none'>User Profile</p>
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
                  <label>Profile Picture </label>
                  <div className="flex mt-2 w-fit relative space-x-5 items-center">
                    { !profile.profile_picture && 
                    <input type="file"  name='media_id' onChange={uploadImage} />
                    }
                    { profile.profile_picture && 
                    <div><img src={profile.profile_picture ? profile.profile_picture.url : ""} className="h-24 w-24 cursor-pointer rounded-md object-cover"/></div>
                    
                    }
                    { profile.profile_picture && 
                    <div className="flex absolute -top-2 -right-3 items-center space-x-2">
                    <button type="button" onClick={(e) => deleteImage(e,profile.profile_picture.id)} className="bg-danger-500 text-white button--sm rounded-full button--square flex justify-center items-center"><svg width="1em" height="1em" viewBox="0 0 24 24" class="icon w-5 h-5"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"></path></svg></button>
                    </div>
                    }
                  </div>
                </div>
                <div className="input-container">
                  <label>First Name* </label>
                  <input type="text"  name='first_name' value={values.first_name || ""}   onChange={handleChange} />
                </div>
                <div className="input-container">
                  <label>Middle Name </label>
                  <input type="text" name='middle_name' value={values.middle_name || ""} onChange={handleChange}  />
                  
                </div>
                <div className="input-container">
                  <label>Last Name  </label>
                  <input type="text" name='last_name' value={values.last_name || ""} onChange={handleChange}  />
                  
                </div>
                
                <div className="input-container">
                  <label>Residential Address * </label>
                  <input type="text" name='address' className="textbox input--rounded focus:outline-none" value={values.address || ""} onChange={handleChange}  />
                </div>
                <div className="input-container">
                  <label>Pincode * </label>
                  <input type="text" name='pincode' value={values.pincode || ""} onChange={handleChange}  />
                </div>
                <div className="input-container">
                  <label>Mobile Number * </label>
                  <input type="text" name='contact_person_number' readOnly value={values.mobile || ""} onChange={handleChange}  />
                </div>
                <div className="button-container">
                  <input type="submit" />
                </div>
              </form>
            </div>
          </div>
        </div>;
};

export default Profile;