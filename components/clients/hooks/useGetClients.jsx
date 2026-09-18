import { get } from "@/api/apiService";
import { useLocalization } from "@/contexts/LocalizationContext";
import { useState } from "react";

const useGetClients = () => {
  const { localization } = useLocalization();

  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllClients = async () => {
    setIsLoading(true);

    setError(null);

    try {
      const response = await get("/admin/users");
      if (response.status === 200) {
        setClients(response.users);
      }
    } catch (err) {
      setError(localization.PLACES.error);
    } finally {
      setIsLoading(false);
    }
  };

  return { clients, isLoading, error, fetchAllClients };
};

export default useGetClients;
