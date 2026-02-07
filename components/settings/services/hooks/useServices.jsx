import { get, delete as deleteRequest } from "@/api/apiService";
import { useLocalization } from "@/contexts/LocalizationContext";
import axios from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";

const useServices = () => {
  const [serviceData, setServicesData] = useState([]);
  const [getService, setGetService] = useState([]);

  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const { localization } = useLocalization();
  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState(null);
  const [editScreen, setEditScreen] = useState(false);

  const removeService = async (service) => {
    console.log("service", service);
    const { id } = service;
    setIsLoading("remove");
    setError(null);
    try {
      const response = await deleteRequest(`admin/services/${id}`);
      console.log("response", response);
      setIsMessage(true);
      setMessage(localization.SERVICES.delete);
      // await fetchAllServices();
    } catch (err) {
      setError(localization.SERVICES.errorFetch);
    } finally {
      setIsLoading(null);
    }
  };

  const fetchAllServices = async () => {
    setIsLoading("get");
    setError(null);
    try {
      const response = await get("/services/client");
      setServicesData(response.data);
    } catch (err) {
      setError(localization.SERVICES.errorFetch);
    } finally {
      setIsLoading(null);
    }
  };

  const addEditService = async (userData) => {
    setIsLoading("addEdit");
    setError(null);
    const formData = new FormData();
    if (userData?.nameLocal) {
      formData.append("nameLocal", userData?.nameLocal);
    }
    if (userData?.nameEn) {
      formData.append("nameEn", userData?.nameEn);
    } else {
      formData.append("nameEn", userData?.nameLocal);
    }
    formData.append("duration", userData?.duration);
    formData.append("price", userData?.price);

    if (userData?.image) {
      const filename = userData?.image.split("/").pop();
      const fileType =
        filename.split(".").pop() === "png"
          ? "image/png"
          : filename.split(".").pop() === "jpg"
            ? "image/jpg"
            : "image/jpeg";
      formData.append("image", {
        uri: userData?.image,
        name: filename,
        type: fileType,
      });
    }
    Object.fromEntries(formData._parts);

    if (userData?.id) {
      try {
        const response = await axios.put(
          `${process.env.EXPO_PUBLIC_API_URL}admin/services/${userData?.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
        if (response.status === 200) {
          setIsMessage(true);
          setMessage(localization.SERVICES.editService);
        }
      } catch (err) {
        setError(localization.SERVICES.errorFetch);
        setIsMessage(true);
      } finally {
        setIsLoading(null);
      }
    } else {
      try {
        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_API_URL}admin/services`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Axios might need this explicitly for FormData
            },
          },
        );
        if (response.status === 201) {
          setIsMessage(true);
          setMessage(localization.SERVICES.addService);
        }
      } catch (err) {
        console.log("errrr", err);
        setError(localization.SERVICES.errorFetch);
        setIsMessage(true);
      } finally {
        setIsLoading(null);
      }
    }
  };

  const getServiceHandler = async (id) => {
    setIsLoading("getService");
    setError(null);
    try {
      const response = await get(`admin/services/${id}`);
      if (response.status === 200) {
        setEditScreen(true);

        setGetService(response.data);
      }
    } catch (err) {
      setError(localization.SERVICES.errorFetch);
    } finally {
      setIsLoading(null);
    }
  };

  const startEditing = async (service) => {
    router.push({
      pathname: "/(tabs)/(03_settings)/addServices",
      params: { id: service.id },
    });
  };

  const confirmHandler = async () => {
    setIsMessage(false);
    await fetchAllServices();
  };

  useEffect(() => {
    fetchAllServices();
  }, []);

  return {
    isLoading,
    error,
    isMessage,
    setIsMessage,
    setMessage,
    message,
    addEditService,
    fetchAllServices,
    serviceData,
    removeService,
    confirmHandler,
    startEditing,
    getServiceHandler,
    getService,
    editScreen
  };
};

export default useServices;
