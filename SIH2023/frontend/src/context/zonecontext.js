import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ZoneContext = createContext();

export const ZoneContextProvider = ({ children }) => {
  const [zone, setZone] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/zone/all");
        setZone(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    fetchData(); // Fetch data initially when the component mounts

    return () => clearInterval(interval); // Clean up the interval
  }, []);

  return (
    <ZoneContext.Provider value={zone}>
      {children}
    </ZoneContext.Provider>
  );
};
