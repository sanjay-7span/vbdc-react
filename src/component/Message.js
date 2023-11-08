import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

const ErrorMessage = () => {
 const dispatch = useDispatch();
 const error = useSelector(state => state.error.message);

 console.log('error come :'+error);
 function handleClose(){
 dispatch({ type: 'HIDE_ERROR' });
 }
 
 return (
    <>
    {typeof error !== 'undefined' && error !== null && error.errors != null && error && (
    <div className="border border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
        <span>{error.errors.name}</span>
    </div>
    )}
      </>
  )
}

export default ErrorMessage;