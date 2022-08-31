import React from "react";
import { useEffect, useState } from "react";
const useRequest = (request, dependency = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    request()
      .then((response) => setData(response.data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [dependency]);

  return [data, loading, error];
};

export default useRequest;
