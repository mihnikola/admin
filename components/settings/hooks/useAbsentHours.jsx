import { get, post } from "@/api/apiService";
import { useLocalization } from "@/contexts/LocalizationContext";
import { useState } from "react";
function useAbsentHours() {
  const { localization } = useLocalization();

  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState(null);
  const [workHours, setWorkHours] = useState(null);

  const createAbsentHours = async (from, to, comment, token, type) => {
    setIsLoading("post");
    setError(null);

    try {
      const response = await post("admin/availabilities", {
        startDate: from,
        endDate: to,
        token,
        description: comment,
        type,
      });

      setIsMessage(true);

      if (response.status === 201) {
        setMessage(localization.SETTINGS.ABSENTHOURS.success);
      }
    } catch (errorData) {
      setIsMessage(true);
      setError(errorData);
    } finally {
      setIsLoading(null);
    }
  };

  

  const getEmployer = async (id) => {
    setIsLoading("get");
    setError(null);
    try {
      const response = await get(`admin/users/employerData/${id}`);
      if (response.status === 200) {
        setWorkHours(response?.data?.place?.workingHours);
      }
    } catch (errorData) {
      setIsMessage(true);
      setError(errorData);
    } finally {
      setIsLoading(null);
    }
  }

  return {
    createAbsentHours,
    isLoading,
    error,
    isMessage,
    message,
    setIsMessage,
    getEmployer,
    workHours,
    setError
  };
}

export default useAbsentHours;
