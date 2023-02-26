import { useState } from "react";

const useForm = ({ initial, onSubmit, validate }) => {
  const [data, setData] = useState(initial);
  const [errors, setErrors] = useState([]);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const reset = () => {
    setData(initial);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate) {
      const validation = validate(data);
      const result =
        validation instanceof Array
          ? validation
          : validation instanceof String || typeof validation === "string"
          ? [validation]
          : [];
      setErrors(result);
      if (result?.length) {
        return;
      }
    }
    onSubmit(data);
  };
  return { data, handleChange, handleSubmit, reset, errors };
};

export default useForm;
