import { get } from "@/api/apiService";
import { useAuth } from "@/contexts/AuthContext";
import { useLocalization } from "@/contexts/LocalizationContext";
import { useEffect, useState } from "react";

const useRequirements = () => {
  const { localization } = useLocalization();
  const [requirements, setRequirements] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const { isToken } = useAuth();

  const fetchRequirements = async () => {
    setError(null);
    setIsLoading("fetchRequirements");
    try {
      const response = await get(`admin/availabilities/requirements/${isToken}`);

      if (response.status === 200) {
        setRequirements(response.data);
      }
    } catch (err) {
      setError(localization.PLACES.error);
    } finally {
      setIsLoading(null);
    }
  };


  return { requirements, isLoading, error, fetchRequirements };
};

export default useRequirements;
