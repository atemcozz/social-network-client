import {useLocation} from "react-router-dom";
import {useState} from "react";

const useQuery = () => {
  const {search} = useLocation();
  const [query, setQuery] = useState(new URLSearchParams(search));
  return query;
};

export default useQuery;
