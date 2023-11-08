import axios from 'axios';
import { addAgency, getAgency, updateAgency } from './actions';
import { setError, setSuccess } from '../message/messageActions';


export const updateAgencyAction = (agency, id, config) => {
    return (dispatch) => {
        axios.put(`https://malaria-api.preview.im/api/admin/v1/agency/${id}`, agency,config)
            .then(response => {
                console.log(response);
                dispatch(updateAgency());
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const addAgencyAction = (agency, config) => {
    
    return (dispatch) => {
        /// axios is a library used to make request to an API, 
        /// return data and manipulate the data .
        axios.post('https://malaria-api.preview.im/api/admin/v1/agency', agency,config)
            .then(response => {
                dispatch(setSuccess(response.data));
            })
            .catch(error => {
                dispatch(setError(error.response.data));
            });
    }
}


export const getAgencyAction = (config) => {
    return (dispatch) => {
        console.log(config);
        axios.get('https://malaria-api.preview.im/api/admin/v1/agency',config)
            .then(response => {
                dispatch(getAgency(response.data));
            })
            .catch(error => {
                console.log(error);
            });
    }
}