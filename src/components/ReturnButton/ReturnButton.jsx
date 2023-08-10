import React from 'react';
import {BsArrowLeft} from "react-icons/bs";
import {useLocation, useNavigate} from "react-router-dom";

const ReturnButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  function handleReturn() {
    navigate(-1);
  }

  return (
    <button
      className="flex items-center bg-back hover:bg-back-darker p-2 rounded-full shadow text-primary mb-4"
      onClick={handleReturn}
    >
      <BsArrowLeft size={"24px"}/>
    </button>
  );
};

export default ReturnButton;