import {useEffect, useState} from "react";

const useRequest = (request, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const update = () => {
    setLoading(true);
    request()
      .then((response) => setData(response.data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    update();
  }, dependencies);

  return [data, loading, error, update];
};

export default useRequest;
