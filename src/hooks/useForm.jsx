import { useState } from "react";

const useForm = (initialState = {}, sumbitAction) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const reset = () => {
    setFormData(initialState);
  };
  const handleSumbit = (e) => {
    e.preventDefault();
    sumbitAction();
  };
  return [formData, handleInputChange, handleSumbit, reset];
};

export default useForm;
