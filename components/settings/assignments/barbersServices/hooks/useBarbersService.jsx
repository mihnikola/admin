import { get, delete as deleteRequest, patch } from "@/api/apiService";
import { useLocalization } from "@/contexts/LocalizationContext";
import axios from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";

const useBarbersService = () => {
  const [barbersData, setBarbersData] = useState([]);
  const [servicesByBarbers, setServicesByBarbers] = useState([]);
  const [barberData, setBarberData] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const { localization } = useLocalization();
  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState(null);


  const getServicesById = async (id) => {
    setIsLoading("getServices");
    setError(null);
    try {
      const response = await get(`employersServices/${id}`);
      if (response.status === 200) {
        setServicesByBarbers(response.data.services);
      }
    } catch (err) {
      setError(localization.SERVICES.errorFetch);
    } finally {
      setIsLoading(null);
    }
  };
  const toggleService = (item) => {
    const servicesBarbersData = [...servicesByBarbers];
    const activeServicesBarbersData = servicesBarbersData.map((barber) => {
      if (barber._id === item._id) {
        return { ...barber, assigned: item.assigned ? false : true }
      }
      return barber;
    })
    setServicesByBarbers(activeServicesBarbersData);
  };

  const submitChangesServiceToBarber = async (id) => {

    setIsLoading("patch");

    const requestServices = servicesByBarbers.map((item) => {
      return {
        _id: item._id,
        assigned: item.assigned
      }
    })
    setError(null);
    try {
      const response = await patch(`employersServices/${id}/services`, { services: requestServices });
      if (response.status === 201) {
        setIsMessage(true);
        setMessage(localization.SERVICES.successMsg);
      }
    } catch (err) {
      setError(localization.SERVICES.errorFetch);
    } finally {
      setIsLoading(null);
    }
  }

  const fetchAllBarbers = async () => {
    setIsLoading("get");
    setError(null);
    try {
      const response = await get("admin/users/employers");
      if (response.status === 200) {
        setBarbersData(response.data);
      }
    } catch (err) {
      setError(localization.BARBERS.errorFetch);
    } finally {
      setIsLoading(null);
    }
  };



  const getBarberHandler = async (id) => {
    setIsLoading("getBarber");
    setError(null);
    try {
      const response = await get(`admin/users/employer/${id}`);
      if (response.status === 200) {
        setBarberData(response.data);
      }
    } catch (err) {
      setError(localization.BARBERS.errorFetch);
    } finally {
      setIsLoading(null);
    }
  };

  const assignmentHandler = async (barber) => {
    router.push({
      pathname: "/(tabs)/(03_settings)/servicesBarbers",
      params: { id: barber._id, name: barber.name, image: barber.image, phoneNumber: barber?.phoneNumber },
    });
  };

  const confirmHandler = async () => {
    setIsMessage(false);
    await fetchAllBarbers();
  };

  useEffect(() => {
    fetchAllBarbers();
  }, []);

  return {
    isLoading,
    error,
    isMessage,
    setIsMessage,
    setMessage,
    message,
    fetchAllBarbers,
    barberData,
    barbersData,
    getServicesById,
    confirmHandler,
    getBarberHandler,
    assignmentHandler,
    toggleService,
    submitChangesServiceToBarber,
    servicesByBarbers
  };
};

export default useBarbersService;
