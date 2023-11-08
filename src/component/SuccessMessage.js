import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

const SuccessMessage = () => {
 const success = useSelector(state => state.error.message);
 console.log('come success '+success);
 return (
    <>
    {success != null && success.message != null && success && (
    <div className="border border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
        <span>{success.message}</span>
    </div>
    )}
      </>
  )
}

export default SuccessMessage;