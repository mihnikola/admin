import { get, delete as deleteRequest, put } from "@/api/apiService";
import { useLocalization } from "@/contexts/LocalizationContext";
import axios from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";

const useBarbers = () => {
  const [barbersData, setBarbersData] = useState([]);
  const [seniorityData, setSeniorityData] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [barberData, setBarberData] = useState(null);

  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const { localization } = useLocalization();
  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState(null);

  const removeBarber = async (data) => {
    const { id, firedDate } = data;
    setIsLoading("remove");
    setError(null);
    try {
      const response = await put(`admin/users/${id}/softDelete`, { firedDate });
      setIsMessage(true);
      setMessage(localization.BARBERS.delete);
    } catch (err) {
      setError(localization.BARBERS.errorFetch);
    } finally {
      setIsLoading(null);
    }
  };

  const fetchAllBarbers = async () => {
    setIsLoading("get");
    setError(null);
    try {
      const response = await get("/admin/users/employers");
      if (response.status === 200) {
        setBarbersData(response.data);
      }
    } catch (err) {
      setError(localization.BARBERS.errorFetch);
    } finally {
      setIsLoading(null);
    }
  };

  const fetchAllSeniority = async () => {
    setIsLoading("get");
    setError(null);
    try {
      const response = await get("/seniority");
      if (response.status === 200) {
        setSeniorityData(response.data);
      }
    } catch (err) {
      setError(localization.BARBERS.errorFetch);
    } finally {
      setIsLoading(null);
    }
  };

  const fetchAllStatusChecking = async () => {
    setIsLoading("getStatuses");
    setError(null);
    try {
      const response = await get("/statusNotification");
      if (response.status === 200) {
        setStatuses(response.data);
      }
    } catch (err) {
      setError(localization.BARBERS.errorFetch);
    } finally {
      setIsLoading(null);
    }
  };
  const validateBarber = (data, localization) => {
    if (
      !data?.name ||
      !data?.phoneNumber ||
      !data?.seniority?._id ||
      !data?.email ||
      !data?.statusCheck
    ) {
      return localization.REGISTER.error;
    }
  };

  const addEditBarber = async (userData) => {
    const validationErrors = validateBarber(userData, localization);

    if (validationErrors && validationErrors?.length > 0) {
      setError(validationErrors);
      setIsMessage(true);
      return;
    }

    setIsLoading("addEdit");
    setError(null);
    try {
      const formData = new FormData();

      if (userData?.name) formData.append("name", userData.name);
      if (userData?.phoneNumber) formData.append("phoneNumber", userData.phoneNumber);
      if (userData?.seniority?._id) formData.append("seniority", userData.seniority._id);
      if (userData?.email) formData.append("email", userData.email);
      formData.append("statusCheck", userData?.statusCheck ?? false);

      if (userData?.image) {
        const filename = userData.image.split("/").pop();
        const ext = filename?.split(".").pop()?.toLowerCase();

        const mimeTypes = {
          png: "image/png",
          jpg: "image/jpeg",
          jpeg: "image/jpeg",
        };

        formData.append("image", {
          uri: userData.image,
          name: filename || "photo.jpg",
          type: mimeTypes[ext] || "image/jpeg",
        });
      }

      const isEdit = Boolean(userData?.id);
      const url = isEdit
        ? `${process.env.EXPO_PUBLIC_API_URL}/admin/users/${userData.id}`
        : `${process.env.EXPO_PUBLIC_API_URL}/admin/users`;

      const method = isEdit ? "put" : "post";

      const response = await axios({
        method,
        url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          "Accept-Language": localization.code,
        },
      });

      if (
        (isEdit && response.status === 200) ||
        (!isEdit && response.status === 201)
      ) {
        setIsMessage(true);
        setMessage(
          isEdit ? localization.BARBERS.edit : localization.BARBERS.add,
        );
      }
    } catch (err) {
      console.log("POST || PUT ERROR:", err?.response || err);
      setError(localization.BARBERS.errorFetch);
      setIsMessage(true);
    } finally {
      setIsLoading(null);
    }
  };

  const getBarberHandler = async (id) => {
    setIsLoading("getBarber");
    setError(null);
    try {
      const response = await get(`/admin/users/employer/${id}`);

      if (response.status === 200) {
        setBarberData(response.data);
      }
    } catch (err) {
      setError(localization.BARBERS.errorFetch);
    } finally {
      setIsLoading(null);
    }
  };

  const startEditing = async (barber) => {
    router.push({
      pathname: "/(tabs)/(03_settings)/addBarbers",
      params: { id: barber._id },
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
    addEditBarber,
    fetchAllBarbers,
    barberData,
    barbersData,
    removeBarber,
    confirmHandler,
    startEditing,
    getBarberHandler,
    fetchAllSeniority,
    seniorityData,
    fetchAllStatusChecking,
    statuses,
    setError
  };
};

export default useBarbers;
