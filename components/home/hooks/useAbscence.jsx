import { get } from "@/api/apiService";
import { useAuth } from "@/contexts/AuthContext";
import { useLocalization } from "@/contexts/LocalizationContext";
import { useEffect, useState } from "react";

const useAbsence = () => {
  const { localization } = useLocalization();
  const [absenceData, setAbsenceData] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const { isToken } = useAuth();

  const fetchAbsence = async () => {
    setError(null);
    setIsLoading("fetchAbsence");
    try {
      const response = await get(`/admin/availabilities/${isToken}/absence`);
      if (response.status === 200) {
        setAbsenceData(response.data);
      }
    } catch (err) {
      setError(localization.PLACES.error);
    } finally {
      setIsLoading(null);
    }
  };


  return { absenceData, isLoading, error, fetchAbsence };
};

export default useAbsence;
