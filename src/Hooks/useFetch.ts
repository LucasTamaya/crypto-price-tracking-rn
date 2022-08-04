import { useState, useEffect } from "react";
import axios from "axios";

import { ICrypto, IUseFetch } from "../Interfaces";

// Custom hook to fetch data and manage error and loading
const useFetch = (url: string): IUseFetch => {
  const [isPending, setIsPending] = useState<boolean>(true);
  const [data, setData] = useState<ICrypto[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getData = async (): Promise<void> => {
    // if no error
    try {
      const data = await axios.get(url);
      // console.log(data.data)
      setIsPending(false);
      setData(data.data);
      setError(null);
      // if error
    } catch (error: any) {
      setIsPending(false);
      setError(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
