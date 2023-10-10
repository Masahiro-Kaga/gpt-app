import React from 'react'
import { useParams } from 'react-router-dom';

const ErrorPage = () => {
  const params = useParams();
  const errorCode = params.errorCode || "Unknown"; // errorCodeをparamsから取得
  
  return (
    <div>
      <h1>Error {errorCode}</h1>
      {/* ...その他のエラーメッセージやUI */}
    </div>
  );
}

export default ErrorPage