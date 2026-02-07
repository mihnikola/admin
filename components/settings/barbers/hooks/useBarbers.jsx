import { get, delete as deleteRequest } from "@/api/apiService";
import { useLocalization } from "@/contexts/LocalizationContext";
import axios from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";

const useBarbers = () => {
  const [barbersData, setBarbersData] = useState([]);
  const [barberData, setBarberData] = useState([]);

  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const { localization } = useLocalization();
  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState(null);
  const [editScreen, setEditScreen] = useState(false);

  const removeBarber = async (barber) => {
    const { _id:id } = barber;
    setIsLoading("remove");

    setError(null);
    try {
      const response = await deleteRequest(`admin/users/${id}`);
      setIsMessage(true);
      setMessage(localization.BARBERS.delete);
    } catch (err) {
      console.log("errorrr",err)

      setError(localization.BARBERS.errorFetch);
    } finally {
      setIsLoading(null);
    }
  };

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

  const addEditBarber = async (userData) => {
    console.log("addEditBarber",userData)
    setIsLoading("addEdit");
    setError(null);
    const formData = new FormData();
    if (userData?.name) {
      formData.append("name", userData?.name);
    }
   
    formData.append("phoneNumber", userData?.phoneNumber);
    formData.append("email", userData?.email);
    formData.append("password", userData?.password);

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
          `${process.env.EXPO_PUBLIC_API_URL}admin/users/${userData?.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
        if (response.status === 200) {
          setIsMessage(true);
          setMessage(localization.BARBERS.edit);
        }
      } catch (err) {
        setError(localization.BARBERS.errorFetch);
        setIsMessage(true);
      } finally {
        setIsLoading(null);
      }
    } else {
      try {
        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_API_URL}admin/users`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Axios might need this explicitly for FormData
            },
          },
        );
        if (response.status === 201) {
          setIsMessage(true);
          setMessage(localization.BARBERS.add);
        }
      } catch (err) {
        console.log("errrr", err);
        setError(localization.BARBERS.errorFetch);
        setIsMessage(true);
      } finally {
        setIsLoading(null);
      }
    }
  };

  const getBarberHandler = async (id) => {
    setIsLoading("getBarber");
    setError(null);
    try {
      const response = await get(`admin/users/employer/${id}`);
      console.log("phoneNumber",response);
      if (response.status === 200) {
        setEditScreen(true);

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
    editScreen,
  };
};

export default useBarbers;
