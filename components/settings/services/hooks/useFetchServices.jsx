// src/hooks/useFetchServices.js
import { get } from "@/api/apiService";
import { useLocalization } from "@/contexts/LocalizationContext";
import { useEffect, useState } from "react";

const useFetchServices = () => {
  const [serviceData, setServicesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { localization } = useLocalization();
  
  const fetchAllServices = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await get("/services/client");
      setServicesData(response);
      setIsLoading(false);
    } catch (err) {
      setError(localization.SERVICES.errorFetch);

      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllServices();
  }, []);

  return { serviceData, isLoading, error };
};

export default useFetchServices;
