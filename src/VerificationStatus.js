import React from 'react'
import { useLocation } from 'react-router-dom';

export default function VerificationStatus() {
  const location = useLocation();
  const response = location.state?.data;


  console.log(location.state);

  return (
    <div><p>{response.message}</p></div>
  )
}
